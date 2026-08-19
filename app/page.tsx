"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Document = {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  sharedWith?: string[];
  updatedAt: string;
};

export default function Home() {
  const router = useRouter();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = "user-1";

  const ownedDocuments = documents.filter(
    (document) => document.ownerId === currentUser
  );

  const sharedDocuments = documents.filter(
    (document) =>
      document.ownerId !== currentUser &&
      document.sharedWith?.includes(currentUser)
  );

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      const response = await fetch(
        `/api/documents?userId=${currentUser}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }

      const data = await response.json();

      setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Convert HTML content into readable plain text
  // for document card previews.
  function getPreviewText(html: string) {
    if (!html) {
      return "Empty document";
    }

    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  async function createDocument() {
    try {
      setCreating(true);

      const response = await fetch("/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Untitled Document",
          content: "",
          ownerId: currentUser,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create document");
      }

      const data = await response.json();

      router.push(`/documents/${data.documentId}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create document");
    } finally {
      setCreating(false);
    }
  }

  // Convert uploaded plain text into editor-compatible HTML.
  function textToHtml(text: string) {
    return text
      .split(/\r?\n/)
      .map((line) => {
        const escapedLine = line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        return escapedLine
          ? `<p>${escapedLine}</p>`
          : "<p></p>";
      })
      .join("");
  }

async function handleFileUpload(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) {
    return;
  }

  // =========================================
  // VALIDATION
  // =========================================

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

  // Check extension
  if (!file.name.toLowerCase().endsWith(".txt")) {
    alert("Invalid file type. Please upload a .txt file only.");
    event.target.value = "";
    return;
  }

  // Check size
  if (file.size > MAX_FILE_SIZE) {
    alert("File is too large. Maximum allowed size is 2 MB.");
    event.target.value = "";
    return;
  }

  try {
    setUploading(true);

    // =========================================
    // READ FILE
    // =========================================

    const text = await file.text();

    // Check empty file
    if (!text.trim()) {
      alert("The uploaded file is empty.");
      return;
    }

    // =========================================
    // CREATE DOCUMENT
    // =========================================

    const title = file.name.replace(/\.txt$/i, "");

    const content = textToHtml(text);

    const response = await fetch("/api/documents", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        content,
        ownerId: currentUser,
      }),
    });

    // =========================================
    // API ERROR
    // =========================================

    if (!response.ok) {
      let message = "Failed to import file.";

      try {
        const errorData = await response.json();

        if (errorData?.error) {
          message = errorData.error;
        }
      } catch {
        // Ignore JSON parsing errors
      }

      throw new Error(message);
    }

    // =========================================
    // SUCCESS
    // =========================================

    const data = await response.json();

    if (!data.documentId) {
      throw new Error("Document was created but no document ID was returned.");
    }

    router.push(`/documents/${data.documentId}`);
  } catch (error) {
    console.error("File upload error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong while importing the file."
    );
  } finally {
    setUploading(false);

    // Allow selecting the same file again
    event.target.value = "";
  }
}

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              DocSpace
            </h1>

            <p className="text-sm text-gray-500">
              Your collaborative documents
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Krisha
            </span>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Upload button */}
            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={uploading}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Importing..."
                : "Upload .txt"}
            </button>

            {/* New document */}
            <button
              onClick={createDocument}
              disabled={creating}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating
                ? "Creating..."
                : "+ New Document"}
            </button>
          </div>
        </div>
      </header>

      {/* Documents */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            My Documents
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Documents you have created
          </p>

          <p className="mt-2 text-xs text-gray-400">
            Supported file import: .txt
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="rounded-xl border bg-white p-8 text-center text-gray-500">
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          /* Empty state */
          <div className="rounded-xl border border-dashed bg-white p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900">
              No documents yet
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Create or import your first document
              to get started.
            </p>

            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={createDocument}
                disabled={creating}
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {creating
                  ? "Creating..."
                  : "Create Document"}
              </button>

              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={uploading}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {uploading
                  ? "Importing..."
                  : "Import .txt"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* My Documents */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                My Documents
              </h2>

              {ownedDocuments.length === 0 ? (
                <div className="rounded-xl border border-dashed bg-white p-8 text-center text-sm text-gray-500">
                  You haven't created any documents yet.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ownedDocuments.map((document) => (
                    <button
                      key={document.id}
                      onClick={() =>
                        router.push(
                          `/documents/${document.id}`
                        )
                      }
                      className="rounded-xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="truncate font-semibold text-gray-900">
                          {document.title}
                        </h3>

                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          Owner
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-3 text-sm text-gray-500">
                        {getPreviewText(
                          document.content
                        )}
                      </p>

                      <p className="mt-5 text-xs text-gray-400">
                        Updated{" "}
                        {new Date(
                          document.updatedAt
                        ).toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shared With Me */}
            <div className="mt-10">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Shared With Me
              </h2>

              {sharedDocuments.length === 0 ? (
                <div className="rounded-xl border border-dashed bg-white p-8 text-center text-sm text-gray-500">
                  No documents have been shared with you.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sharedDocuments.map((document) => (
                    <button
                      key={document.id}
                      onClick={() =>
                        router.push(
                          `/documents/${document.id}`
                        )
                      }
                      className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="truncate font-semibold text-gray-900">
                          {document.title}
                        </h3>

                        <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                          Shared
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                        {getPreviewText(
                          document.content
                        )}
                      </p>

                      <p className="mt-3 text-xs text-gray-500">
                        Owner: {document.ownerId}
                      </p>

                      <p className="mt-2 text-xs text-gray-400">
                        Updated{" "}
                        {new Date(
                          document.updatedAt
                        ).toLocaleString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}