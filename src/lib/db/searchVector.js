import { connectDB } from "./VectorDatabase";
import { generateEmbedding } from "../utils/embedding";

export async function searchSimilarImages(queryPrompt) {
    const collection = await connectDB();
    const queryEmbedding = await generateEmbedding(queryPrompt);

    const results = await collection.aggregate([
        {
            $vectorSearch: {
                index: "vector_index_prox_g", 
                path: "embedding",
                queryVector: queryEmbedding,
                numCandidates: 5,
                limit: 3,
            },
        }
    ]).toArray();

    return results;
}  