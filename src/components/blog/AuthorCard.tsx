"use client"

import * as React from "react"
import Link from "next/link"

interface AuthorCardProps {
  author?: string
  authorURL?: string
  authorImageURL?: string
  date?: string
}

export function AuthorCard({ author, authorURL, date }: AuthorCardProps) {
  if (!author || !authorURL) return null

  const normalizedUrl = authorURL
    .trim()
    .replace(/^http:\/\//, "https://")
    .replace(/^['"]|['"]$/g, "")

  const isGithubUrl = normalizedUrl.startsWith("https://github.com/")

  const formattedDate = date ? new Date(date).toDateString() : null

  return (
    <div className="flex flex-row gap-4 text-sm mb-8">
      <div>
        <p className="mb-1 text-muted-foreground">Written by</p>
        {isGithubUrl ? (
          <Link
            href={normalizedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium"
          >
            {author}
          </Link>
        ) : (
          <span className="font-medium">{author}</span>
        )}
      </div>

      {formattedDate && (
        <div>
          <p className="mb-1 text-sm text-muted-foreground">At</p>
          <time className="font-medium">{formattedDate}</time>
        </div>
      )}
    </div>
  )
}
