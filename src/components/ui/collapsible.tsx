'use client';
import * as Primitive from '@radix-ui/react-collapsible';
import { forwardRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Collapsible = Primitive.Root;

const CollapsibleTrigger = Primitive.CollapsibleTrigger;

const CollapsibleContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Primitive.CollapsibleContent>
>(({ children, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay setting mounted to avoid synchronous state update warning and ensure animation only plays after interactions
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <Primitive.CollapsibleContent
      ref={ref}
      {...props}
      className={cn(
        'overflow-hidden',
        mounted &&
          'data-[state=closed]:animate-fd-collapsible-up data-[state=open]:animate-fd-collapsible-down',
        props.className,
      )}
    >
      {children}
    </Primitive.CollapsibleContent>
  );
});

CollapsibleContent.displayName = Primitive.CollapsibleContent.displayName;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

export type CollapsibleProps = Primitive.CollapsibleProps;
export type CollapsibleContentProps = Primitive.CollapsibleContentProps;
export type CollapsibleTriggerProps = Primitive.CollapsibleTriggerProps;
