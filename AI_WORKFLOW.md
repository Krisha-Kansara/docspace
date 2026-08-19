# AI Workflow Note

## AI Tools Used

I used AI coding assistants during development to accelerate implementation, debugging, and documentation.

The primary AI assistance was used for:

- Structuring the Next.js application
- Generating initial API route implementations
- Debugging MongoDB and deployment issues
- Working through TypeScript and Jest configuration
- Improving UI implementation
- Reviewing implementation approaches
- Preparing documentation

## Where AI Materially Helped

AI significantly reduced the time required for boilerplate implementation and debugging.

For example, AI helped identify and resolve issues involving:

- Next.js API route parameters
- MongoDB ObjectId handling
- Jest and TypeScript configuration
- Vercel environment variables
- MongoDB Atlas network access
- Rich-text editor integration

This allowed more time to be spent on deciding which features were important within the assignment's timebox.

## What I Changed or Rejected

I did not blindly accept generated code.

Generated solutions were reviewed and adapted to the actual application structure.

Examples of changes included:

- Adjusting API routes to match the project's MongoDB schema
- Changing UI behavior to fit the existing document workflow
- Simplifying sharing to use seeded user IDs
- Limiting file import to `.txt` to keep the feature reliable
- Fixing styling and editor presentation issues
- Debugging deployment-specific MongoDB connectivity rather than assuming the generated implementation was correct

## Verification

I verified functionality by testing the application locally and through the deployed Vercel application.

I manually tested:

- Creating documents
- Opening documents
- Editing content
- Formatting content
- Saving changes
- Importing `.txt` files
- Sharing documents
- Reloading the application
- MongoDB persistence
- Production deployment

Automated tests were also added using Jest and React Testing Library.

## Engineering Judgment

AI was used as an accelerator rather than as a replacement for engineering judgment.

The main product decisions were made based on the assignment requirements and the 4-6 hour time constraint.

I prioritized a smaller number of complete workflows over implementing a large number of incomplete features.