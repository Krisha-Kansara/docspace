"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/components/Editor";

type DocumentData = {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [document, setDocument] = useState<DocumentData | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareUserId, setShareUserId] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    loadDocument();
  }, [id]);

  async function loadDocument() {
    try {
      const response = await fetch(`/api/documents/${id}`);

      if (!response.ok) {
        throw new Error("Document not found");
      }

      const data = await response.json();

      setDocument(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveDocument() {
    try {
      setSaving(true);
      setSaved(false);

      const response = await fetch(`/api/documents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save document");
      }

      setSaved(true);
    } catch (error) {
      console.error(error);
      alert("Failed to save document");
    } finally {
      setSaving(false);
    }
  }

  async function shareDocument() {
    if (!shareUserId.trim()) {
      setShareMessage("Please enter a user ID");
      return;
    }

    try {
      setSharing(true);
      setShareMessage("");

      const response = await fetch(`/api/documents/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: shareUserId.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to share document");
      }

      setShareMessage("Document shared successfully!");
      setShareUserId("");
    } catch (error) {
      console.error(error);
      setShareMessage("Failed to share document");
    } finally {
      setSharing(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading document...</p>
      </main>
    );
  }

  if (!document) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">Document not found</h1>

        <button
          onClick={() => router.push("/")}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-white"
        >
          Back to Documents
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-gray-600 hover:text-black"
          >
            ← Documents
          </button>

          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="document-title flex-1 border-none bg-transparent text-xl font-semibold outline-none"
          />

          <div className="flex items-center gap-3">
            <input
              value={shareUserId}
              onChange={(e) => setShareUserId(e.target.value)}
              placeholder="User ID"
              className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
            />

            <button
              onClick={shareDocument}
              disabled={sharing}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              {sharing ? "Sharing..." : "Share"}
            </button>

            {saving && <span className="text-sm text-gray-500">Saving...</span>}

            {saved && !saving && (
              <span className="text-sm text-green-600">✓ Saved</span>
            )}

            <button
              onClick={saveDocument}
              disabled={saving}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              Save
            </button>
          </div>
          {shareMessage && (
            <p className="mt-2 text-sm text-gray-600">{shareMessage}</p>
          )}
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <Editor content={content} onChange={setContent} />
      </section>
    </main>
  );
}
