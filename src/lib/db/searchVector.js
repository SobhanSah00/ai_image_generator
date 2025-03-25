import { connectDB } from "./VectorDatabase";
import { generateEmbedding } from "../utils/embedding";

export async function searchSimilarImages(queryText) {
    const db = await connectDB();
    const collection = db.collection("vectorEmbeddings"); 

    // Generate embedding using Nebius
    const queryEmbedding = await generateEmbedding(queryText);

    if (!queryEmbedding || !Array.isArray(queryEmbedding)) {
        throw new Error("Invalid embedding generated.");
    }

    // MongoDB vector search
    const results = await collection.aggregate([
        {
            $vectorSearch: {
                index: "vector_index_prox_g",
                path: "embedding", 
                queryVector: queryEmbedding,
                numCandidates: 30,  
                limit: 1,
                similarity: "cosine" 
            }
        }
    ]).toArray();

    if (results.length > 0) {
        return results[0];  // Return the most similar image
    }

    return null; // agar similar image nehi milato 
}
