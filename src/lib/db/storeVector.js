import { connectDB } from "./VectorDatabase";
import { generateEmbedding } from "../utils/embedding";

export async function storeVector(prompt, imageUrl) {
    const db = await connectDB();
    const collection = db.collection("vectorEmbeddings");

    try {
        // Check if the prompt already exists
        const existingEntry = await collection.findOne({ prompt });

        if (existingEntry) {
            console.log("Prompt already exists, returning the existing image.");

            // Just return the existing image instead of inserting a new vector
            return {
                success: true,
                imageUrl: existingEntry.imageUrl
            };
        }

        // Generate embedding
        const embedding = await generateEmbedding(prompt);

        // Store new entry
        await collection.insertOne({
            prompt,
            imageUrl,
            embedding
        });

        return {
            success: true,
            message: "Vector Stored Successfully",
            imageUrl
        };

    } catch (error) {
        console.error("Error storing vector:", error);
        return {
            success: false,
            message: "Failed to store vector",
            error: error.message
        };
    }
}