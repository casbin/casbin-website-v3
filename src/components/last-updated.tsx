"use client";
import { useState, useEffect } from "react";

interface LastUpdatedData {
  [filePath: string]: string;
}

interface LastUpdatedProps {
  filePath: string;
}

export function LastUpdated({ filePath }: LastUpdatedProps) {
  const [lastModified, setLastModified] = useState<Date | null>(null);

  useEffect(() => {
    async function loadDate() {
      try {
        const response = await fetch("/last-updated.json");
        if (!response.ok) {
          return;
        }

        const jsonData = (await response.json()) as LastUpdatedData;

        const dateString = jsonData[filePath];

        if (dateString) {
          setLastModified(new Date(dateString));
        }
      } catch (error) {
        console.debug("Could not read last-updated.json for", filePath);
      }
    }

    loadDate();
  }, [filePath]);

  if (!lastModified) {
    return null;
  }

  const formattedDate = lastModified.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-sm text-fd-muted-foreground mt-3">Last modified on {formattedDate}</div>
  );
}
