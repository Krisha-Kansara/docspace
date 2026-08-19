import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET ALL DOCUMENTS
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId") || "user-1";

    const client = await clientPromise;
    const db = client.db("docspace");

    const documents = await db
      .collection("documents")
      .find({
        $or: [
          { ownerId: userId },
          { sharedWith: userId },
        ],
      })
      .sort({ updatedAt: -1 })
      .toArray();

    const formattedDocuments = documents.map((document) => ({
      id: document._id.toString(),
      title: document.title,
      content: document.content,
      ownerId: document.ownerId,
      sharedWith: document.sharedWith || [],
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    }));

    return NextResponse.json(formattedDocuments);
  } catch (error) {
    console.error("Get documents error:", error);

    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// CREATE NEW DOCUMENT
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = body.title || "Untitled Document";
    const content = body.content || "";
    const ownerId = body.ownerId;

    if (!ownerId) {
      return NextResponse.json(
        {
          error: "ownerId is required",
        },
        {
          status: 400,
        },
      );
    }

    const client = await clientPromise;
    const db = client.db("docspace");

    const result = await db.collection("documents").insertOne({
      title,
      content,
      ownerId,
      sharedWith: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      documentId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Create document error:", error);

    return NextResponse.json(
      {
        error: "Failed to create document",
      },
      {
        status: 500,
      },
    );
  }
}
