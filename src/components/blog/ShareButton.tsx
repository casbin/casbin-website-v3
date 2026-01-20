"use client";

import * as React from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  url: string;
}

export function ShareButton({ url }: ShareButtonProps) {
  const [isChecked, setIsChecked] = React.useState(false);

  const onCopy = React.useCallback(() => {
    void navigator.clipboard.writeText(`${window.location.origin}${url}`);
    setIsChecked(true);
    setTimeout(() => setIsChecked(false), 2000);
  }, [url]);

  return (
    <Button
      variant="outline"
      size="default"
      onClick={onCopy}
      className="gap-2 border-[#443D80] bg-[#443D80] text-white hover:bg-[#443D80]/90 hover:shadow-md"
    >
      {isChecked ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {isChecked ? "Copied URL" : "Share Post"}
    </Button>
  );
}
