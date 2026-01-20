'use client';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { MessageSquare, ThumbsDown, ThumbsUp } from 'lucide-react';
import {
  ReactNode,
  type SyntheticEvent,
  useRef,
  useState,
  useTransition,
} from 'react';
import { Collapsible, CollapsibleContent } from '../ui/collapsible';
import { cva } from 'class-variance-authority';
import { usePathname } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import type { FeedbackBlockProps } from 'fumadocs-core/mdx-plugins/remark-feedback-block';
import {
  actionResponse,
  blockFeedback,
  pageFeedback,
  type ActionResponse,
  type BlockFeedback,
  type PageFeedback,
} from './schema';
import { z } from 'zod/mini';

const rateButtonVariants = cva(
  'inline-flex items-center gap-2 px-3 py-2 rounded-full font-medium border text-sm [&_svg]:size-4 disabled:cursor-not-allowed',
  {
    variants: {
      active: {
        true: 'bg-fd-accent text-fd-accent-foreground [&_svg]:fill-current',
        false: 'text-fd-muted-foreground',
      },
    },
  },
);

const pageFeedbackResult = z.extend(pageFeedback, {
  response: actionResponse,
});

const blockFeedbackResult = z.extend(blockFeedback, {
  response: actionResponse,
});

export function Feedback({
  onSendAction,
}: {
  onSendAction: (feedback: PageFeedback) => Promise<ActionResponse>;
}) {
  const url = usePathname();
  const { previous, setPrevious } = useSubmissionState();
  const [opinion, setOpinion] = useState<'good' | 'bad' | null>(null);
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  function submit(e?: SyntheticEvent) {
    if (opinion == null) return;

    startTransition(async () => {
      const feedback: PageFeedback = {
        url,
        opinion,
        message,
      };

      const response = await onSendAction(feedback);
      setPrevious({
        response,
        ...feedback,
      });
      setMessage('');
      setOpinion(null);
    });

    e?.preventDefault();
  }

  const activeOpinion = (previous as { opinion?: string })?.opinion ?? opinion;

  return (
    <Collapsible
      open={opinion !== null || previous !== null}
      onOpenChange={(v) => {
        if (!v) setOpinion(null);
      }}
      className='border-y py-3'
    >
      <div className='flex flex-row items-center gap-2'>
        <p className='text-sm font-medium pe-2'>How is this guide?</p>
        <button
          disabled={previous !== null}
          className={cn(
            rateButtonVariants({
              active: activeOpinion === 'good',
            }),
          )}
          onClick={() => {
            setOpinion('good');
          }}
        >
          <ThumbsUp />
          Good
        </button>
        <button
          disabled={previous !== null}
          className={cn(
            rateButtonVariants({
              active: activeOpinion === 'bad',
            }),
          )}
          onClick={() => {
            setOpinion('bad');
          }}
        >
          <ThumbsDown />
          Bad
        </button>
      </div>
      <CollapsibleContent className='mt-3'>
        {previous ? (
          <p className='flex items-center gap-2 text-sm text-fd-muted-foreground'>
            <span>✨</span>
            Thanks for your feedback!
          </p>
        ) : (
          <form className='flex flex-col gap-3' onSubmit={submit}>
            <Textarea
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='min-h-[80px] resize-none'
              placeholder='Leave your feedback...'
              onKeyDown={(e) => {
                if (!e.shiftKey && e.key === 'Enter') {
                  submit(e);
                }
              }}
            />
            <button
              type='submit'
              className={cn(buttonVariants({ variant: 'outline' }), 'w-fit px-3')}
              disabled={isPending}
            >
              Submit
            </button>
          </form>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function FeedbackBlock({
  id,
  body,
  onSendAction,
  children,
}: FeedbackBlockProps & {
  onSendAction: (feedback: BlockFeedback) => Promise<ActionResponse>;
  children: ReactNode;
}) {
  const url = usePathname();
  const blockId = `${url}-${id}`;
  const { previous, setPrevious } = useSubmissionState();
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submissionRef = useRef<number>(0);

  function submit(e?: SyntheticEvent) {
    // Prevent double submission
    if (isPending) return;
    
    const currentSubmission = Date.now();
    submissionRef.current = currentSubmission;
    
    startTransition(async () => {
      try {
        const feedback: BlockFeedback = {
          blockId,
          blockBody: body,
          url,
          message,
        };

        const response = await onSendAction(feedback);
        
        // Check if this is still the latest submission
        if (submissionRef.current !== currentSubmission) {
          return; // Ignore old submissions
        }
        
        // Batch state updates
        setPrevious({ response, ...feedback });
        setMessage('');
        setError(null);
        setShowSuccess(true);
        
        // After 3 seconds, close popover and reset
        const timer = setTimeout(() => {
          if (submissionRef.current === currentSubmission) {
            setShowSuccess(false);
            setPrevious(null);
            setOpen(false);
          }
        }, 3000);
        
        // Store timer for cleanup if needed
        (feedback as any)._timer = timer;
        
      } catch (error) {
        console.error('Feedback submission failed:', error);
        setError('Failed to submit feedback. Please try again.');
      }
    });

    e?.preventDefault();
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='relative group/feedback'>
        <div
          className={cn(
            'absolute -inset-1 rounded-sm pointer-events-none z-[-1]',
            open ? 'bg-fd-accent' : 'group-hover/feedback:bg-fd-accent',
          )}
        />
        <PopoverTrigger
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'sm' }),
            'absolute -top-7 end-0 backdrop-blur-sm text-fd-muted-foreground gap-1.5',
            !open && 'invisible group-hover/feedback:visible hover:visible',
          )}
          onClick={(e) => {
            setOpen((prev) => !prev);
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <MessageSquare className='size-3.5' />
          Feedback
        </PopoverTrigger>

        <div className='[.prose-no-margin_&]:prose-no-margin'>{children}</div>
      </div>

      <PopoverContent className='min-w-[300px]'>
        {showSuccess ? (
          <p className='flex items-center gap-2 text-sm text-fd-muted-foreground'>
            <span className='animate-pulse'>✨</span>
            Thanks for your feedback!
          </p>
        ) : previous ? (
          <p className='flex items-center gap-2 text-sm text-fd-muted-foreground'>
            <span>✨</span>
            Thanks for your feedback!
          </p>
        ) : (
          <form className='flex flex-col gap-2' onSubmit={submit}>
            {error && (
              <p className='text-sm text-red-500' role='alert'>
                {error}
              </p>
            )}
            <Textarea
              autoFocus
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError(null);
              }}
              className='min-h-[80px] resize-none'
              placeholder='Leave your feedback...'
              onKeyDown={(e) => {
                if (!e.shiftKey && e.key === 'Enter') {
                  submit(e);
                }
              }}
            />
            <button
              type='submit'
              className={cn(buttonVariants({ variant: 'outline' }), 'w-fit px-3')}
              disabled={isPending}
            >
              {isPending ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
      </PopoverContent>
    </Popover>
  );
}

function useSubmissionState<Result>() {
  const [value, setValue] = useState<Result | null>(null);
  
  return {
    previous: value,
    setPrevious: setValue,
  };
}
