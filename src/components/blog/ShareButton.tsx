"use client";

import * as React from "react";
import { Share2, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

interface ShareButtonProps {
  url: string;
  className?: string;
}

export function ShareButton({ url, className }: ShareButtonProps) {
  const [isChecked, setIsChecked] = React.useState(false);

  const onCopy = React.useCallback(() => {
    void navigator.clipboard.writeText(`${window.location.origin}${url}`);
    setIsChecked(true);
    setTimeout(() => setIsChecked(false), 2000);
  }, [url]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className={buttonVariants({
        className: `gap-2 bg-[#443D80] text-white hover:bg-[#443D80]/90 hover:shadow-md ${className}`,
      })}
    >
      {isChecked ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {isChecked ? "Copied URL" : "Share Post"}
    </button>
  );
}
