import Link from "next/link"

interface AuthorCardProps {
  author?: string
  authorURL?: string
  date?: string
}

export function AuthorCard({ author, authorURL, date }: AuthorCardProps) {
  if (!author || !authorURL) return null

  const githubUrl = authorURL.replace(/^http:\/\//, "https://").replace(/^"|"$/g, "")

  const formattedDate = date ? new Date(date).toDateString() : null

  return (
    <div className="flex flex-row gap-4 text-sm mb-8">
      <div>
        <p className="mb-1 text-muted-foreground">Written by</p>
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="font-medium">{author}</Link>
      </div>

      {formattedDate && (
        <div>
          <p className="mb-1 text-sm text-muted-foreground">At</p>
          <time dateTime={date} className="font-medium">{formattedDate}</time>
        </div>
      )}
    </div>
  )
}
