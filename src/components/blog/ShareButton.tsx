'use client';

import * as React from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  url: string;
}

export function ShareButton({ url }: ShareButtonProps) {
  const [isChecked, setIsChecked] = React.useState(false);

  const onCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${url}`);
      setIsChecked(true);
      setTimeout(() => setIsChecked(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL to clipboard:', error);
      window.alert('Failed to copy the URL to your clipboard. Please copy it manually.');
    }
  }, [url]);

  return (
    <Button
      variant="outline"
      size="default"
      onClick={onCopy}
      className="gap-2 border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90 hover:shadow-md"
      aria-label={isChecked ? 'Copied URL' : 'Share Post'}
    >
      {isChecked ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {isChecked ? 'Copied URL' : 'Share Post'}
    </Button>
  );
}
