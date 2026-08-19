# DocSpace Architecture

## Overview

DocSpace is a Next.js full-stack application using MongoDB for persistent document storage.

## Architecture

Browser
   |
   v
Next.js App Router
   |
   +---- Document UI
   |
   +---- Tiptap Editor
   |
   v
Next.js API Routes
   |
   v
MongoDB
   |
   v
docspace.documents

## Main Components

### Frontend

The frontend is implemented using Next.js and React.

Responsibilities:

- Display document list
- Create documents
- Edit document title
- Edit rich-text content
- Save documents
- Import text files
- Share documents

### Editor

Tiptap provides the rich-text editing experience.

Supported formatting includes:

- Bold
- Italic
- Underline
- Headings
- Bullet lists
- Ordered lists

Document content is persisted as HTML.

### Backend

Next.js API routes handle:

- Document creation
- Document retrieval
- Document updates
- Document sharing
- Document listing

### Database

MongoDB stores documents in the `documents` collection.

Example structure:

{
  title: String,
  content: String,
  ownerId: String,
  sharedWith: [String],
  createdAt: Date,
  updatedAt: Date
}

## Sharing

Sharing is intentionally lightweight for the assignment.

Each document contains:

- `ownerId`
- `sharedWith`

A document is visible to a user when:

- They are the owner, or
- Their user ID exists in `sharedWith`

This demonstrates the access model without introducing unnecessary authentication complexity.

## Deployment

The application is deployed using Vercel.

MongoDB Atlas provides the persistent database.

## Scope Decisions

The assignment was timeboxed to 4-6 hours, so I prioritized:

1. Working document creation/editing
2. Persistent storage
3. File import
4. Sharing
5. Deployment
6. Automated testing

I intentionally did not implement real-time collaborative editing, comments, version history, or enterprise authentication.

These would be appropriate future enhancements.