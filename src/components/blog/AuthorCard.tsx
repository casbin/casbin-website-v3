import Link from "next/link"

interface AuthorCardProps {
  author?: string
  authorURL?: string
  date?: string
}

function sanitizeAuthorUrl(authorURL?: string): string | null {
  if (!authorURL) return null

  const trimmed = authorURL.trim().replace(/^"|"$/g, "")
  if (!trimmed) return null

  // If there is no scheme, treat as a relative/path URL and return as-is.
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return trimmed
  }

  try {
    const url = new URL(trimmed)
    if (url.protocol === "http:") {
      url.protocol = "https:"
    }
    return url.toString()
  } catch {
    return null
  }
}

export function AuthorCard({ author, authorURL, date }: AuthorCardProps) {
  if (!author && !date) return null

  const githubUrl = sanitizeAuthorUrl(authorURL)

  const formattedDate = date ? new Date(date).toDateString() : null

  return (
    <div className="flex flex-row gap-4 text-sm mb-8">
      {author && (
        <div>
          <p className="mb-1 text-muted-foreground">Written by</p>
          {githubUrl ? (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="font-medium">
              {author}
            </Link>
          ) : (
            <span className="font-medium">{author}</span>
          )}
        </div>
      )}

      {formattedDate && (
        <div>
          <p className="mb-1 text-sm text-muted-foreground">At</p>
          <time dateTime={date} className="font-medium">{formattedDate}</time>
        </div>
      )}
    </div>
  )
}
