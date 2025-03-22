import { connectDB } from "./VectorDatabase";
import { generateEmbedding } from "../utils/embedding";

export async function storeVector(prompt,imageUrl) {
    const collection = await connectDB();

    const embedding = await generateEmbedding(prompt);

    const newEntry = {
        prompt,
        imageUrl,
        embedding
    };

    await collection.insertOne(newEntry);

    return {
        success : true,
        message : "Vector Stored Successfully"
    }
}