"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

type EditorProps = {
  content: string;
  onChange: (content: string) => void;
};

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable underline in StarterKit because we add it separately
        underline: false,
      }),
      Underline,
    ],

    content,

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <p className="text-gray-500">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-white p-3">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-button font-bold ${
            editor.isActive("bold") ? "toolbar-button-active" : ""
          }`}
          title="Bold"
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-button italic ${
            editor.isActive("italic") ? "toolbar-button-active" : ""
          }`}
          title="Italic"
        >
          I
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`toolbar-button underline ${
            editor.isActive("underline") ? "toolbar-button-active" : ""
          }`}
          title="Underline"
        >
          U
        </button>

        <div className="mx-1 h-6 w-px bg-gray-200" />

        {/* H1 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`toolbar-button ${
            editor.isActive("heading", { level: 1 })
              ? "toolbar-button-active"
              : ""
          }`}
          title="Heading 1"
        >
          H1
        </button>

        {/* H2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`toolbar-button ${
            editor.isActive("heading", { level: 2 })
              ? "toolbar-button-active"
              : ""
          }`}
          title="Heading 2"
        >
          H2
        </button>

        <div className="mx-1 h-6 w-px bg-gray-200" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-button ${
            editor.isActive("bulletList") ? "toolbar-button-active" : ""
          }`}
          title="Bullet List"
        >
          • List
        </button>

        {/* Numbered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`toolbar-button ${
            editor.isActive("orderedList") ? "toolbar-button-active" : ""
          }`}
          title="Numbered List"
        >
          1. List
        </button>
      </div>

      {/* Editor */}
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}