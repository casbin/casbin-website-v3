import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AuthorCardProps {
  author?: string;
  authorURL?: string;
  authorImageURL?: string;
  date?: string;
  readTime?: string;
  className?: string;
}

function sanitizeAuthorUrl(authorURL?: string): string | null {
  if (!authorURL) return null;

  const trimmed = authorURL.trim().replace(/^"|"$/g, "");
  if (!trimmed) return null;

  // If there is no scheme, treat as a relative/path URL and return as-is.
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:") {
      url.protocol = "https:";
    }
    return url.toString();
  } catch {
    return null;
  }
}

export function AuthorCard({
  author,
  authorURL,
  authorImageURL,
  date,
  readTime,
  className,
}: AuthorCardProps) {
  if (!author && !date) return null;

  const githubUrl = sanitizeAuthorUrl(authorURL);
  const avatarUrl =
    authorImageURL?.trim().replace(/^"|"$/g, "") ||
    (author && !author.includes(" ") ? `https://github.com/${author}.png` : null);

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2 text-sm text-muted-foreground", className)}
    >
      {avatarUrl && (
        <div className="relative shrink-0">
          {githubUrl ? (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block leading-none"
            >
              <Avatar className="h-6 w-6 border border-border/50">
                <AvatarImage src={avatarUrl} alt={author || "Author"} className="object-cover" />
                <AvatarFallback>{author ? author.charAt(0).toUpperCase() : "A"}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Avatar className="h-6 w-6 border border-border/50">
              <AvatarImage src={avatarUrl} alt={author || "Author"} className="object-cover" />
              <AvatarFallback>{author ? author.charAt(0).toUpperCase() : "A"}</AvatarFallback>
            </Avatar>
          )}
        </div>
      )}

      {author && (
        <div className="font-semibold text-foreground">
          {githubUrl ? (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {author}
            </Link>
          ) : (
            <span>{author}</span>
          )}
        </div>
      )}

      {readTime && (
        <>
          <span aria-hidden="true">·</span>
          <span>{readTime} read</span>
        </>
      )}

      {formattedDate && (
        <>
          <span aria-hidden="true">·</span>
          <time dateTime={date}>{formattedDate}</time>
        </>
      )}
    </div>
  );
}
