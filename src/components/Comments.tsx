"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
  const { theme } = useTheme();

  return (
    <div className="comments-container w-full px-6 py-8 max-w-7xl mx-auto">
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
        theme={theme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
