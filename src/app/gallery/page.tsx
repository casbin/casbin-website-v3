'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

export default function GalleryPage() {
  const { theme } = useTheme();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(`https://editor.casbin.org/gallery?theme=${theme}&lang=en`);
  }, [theme]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      
      {/* Content */}
      <div className="w-full px-6 py-8">
        <div className="w-full h-[90vh] overflow-hidden bg-card rounded-lg">
          {src && (
            <iframe
              src={src}
              className="w-full h-full"
              title="Casbin Gallery"
            />
          )}
        </div>
      </div>

      {/* Comments */}
      <div className="comments-container px-6 py-8 max-w-7xl mx-auto">
        <Giscus
          id="comments"
          repo="casbin/casbin"
          repoId="MDEwOlJlcG9zaXRvcnk4NzYxNzUwOA=="
          category="Docs comments"
          categoryId="DIC_kwDOBTjv5M4CRIiA"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={theme === 'dark' ? 'dark' : 'light'}
          lang="en"
          loading="lazy"
        />
      </div>
    </div>
  );
}