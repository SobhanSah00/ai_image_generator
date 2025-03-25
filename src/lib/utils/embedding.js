import { connectDB } from "../db/VectorDatabase";
import nebiusClient from "../utils/NebuisClient";  // Import Nebius API client

export async function generateEmbedding(text) {
    const db = await connectDB();
    const collection = db.collection("vectorEmbeddings");

    // Check if the embedding already exists
    const existingEmbedding = await collection.findOne({ prompt: text });
    if (existingEmbedding) {
        console.log("return the existing embeddign not the new one ;");
        return existingEmbedding.embedding;
    }

    // Generate a new embedding using Nebius API
    const response = await nebiusClient.embeddings.create({
        model: "BAAI/bge-en-icl", // Nebius embedding model
        input: text
    });

    const embedding = response.data[0].embedding;

    // // Store the new embedding in MongoDB
    // await collection.insertOne({ text, embedding });

    return embedding;
}