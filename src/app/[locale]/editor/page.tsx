"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Comments from "@/components/Comments";

export default function EditorPage() {
  const { theme } = useTheme();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(`https://editor.casbin.org/?theme=${theme}&lang=en`);
  }, [theme]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Content */}
      <div className="w-full px-6 py-8">
        <div className="w-full h-[90vh] overflow-hidden bg-card rounded-lg">
          {src && <iframe src={src} className="w-full h-full" title="Casbin Editor" />}
        </div>
      </div>

      {/* Comments */}
      <Comments />
    </div>
  );
}
