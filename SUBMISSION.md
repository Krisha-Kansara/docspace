# DocSpace Assignment Submission

## Project

DocSpace — Lightweight Collaborative Document Editor

## Live Product

https://docspace-woad.vercel.app

## Source Code

https://github.com/Krisha-Kansara/docspace

## Included Materials

- Source code
- README.md
- ARCHITECTURE.md
- AI_WORKFLOW.md
- SUBMISSION.md
- WALKTHROUGH_VIDEO.txt
- Automated tests

## Working Features

### Document Creation

Users can create a new document.

### Document Editing

Users can edit document titles and rich-text content.

### Rich Text

Supported:

- Bold
- Italic
- Underline
- Headings
- Bulleted lists
- Numbered lists

### Persistence

Documents are persisted using MongoDB and remain available after refresh.

### File Import

`.txt` files can be imported into the document workflow and converted into editable documents.

### Sharing

A document owner can share a document with another seeded user using their user ID.

### Owned and Shared Documents

The document list uses owner/shared access logic to determine which documents a user can see.

### Testing

Automated testing is included using Jest and React Testing Library.

### Deployment

The application is deployed on Vercel with MongoDB Atlas as the database.

## Seeded Users

user-1 — Krisha

user-2 — Shared User

## Intentionally Deprioritized

The following were intentionally not implemented because of the assignment timebox:

- Real-time multi-user editing
- Comments
- Version history
- Enterprise authentication
- Advanced permissions
- PDF export
- Google Docs-level collaboration features

## If Given Another 2-4 Hours

I would prioritize:

1. Real authentication
2. Improved sharing permissions
3. Real-time collaboration indicators
4. Better file import support such as Markdown/DOCX
5. More automated API/integration tests
6. Improved production error states

## AI Usage

AI was used as an engineering accelerator for implementation, debugging, testing setup, and documentation. Generated output was reviewed and modified before being integrated.
