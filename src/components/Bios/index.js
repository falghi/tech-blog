import React from "react"

import Bio from "./bio"

export default function Bios({ authors }) {
  if (!authors || authors.length === 0) {
    return null
  }

  return authors.map((author, idx) => {
    const username = author.username || author.name
    const name = author.name
    const summary = author.summary
    const profilePicture = author.profilePicture

    return (
      <div key={idx}>
        <Bio username={username} name={name} summary={summary} picture={profilePicture} coauthor={idx > 0} />
      </div>
    )
  })
}
