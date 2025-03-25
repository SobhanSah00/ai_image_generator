import { searchSimilarImages } from "../../../lib/db/searchVector";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { queryText } = await req.json(); 
        if (!queryText) {
            return NextResponse.json({ error: "Query text is required" }, { status: 400 });
        }

        const results = await searchSimilarImages(queryText);
        return NextResponse.json({ results }, { status: 200 });

    } catch (error) {
        console.error("Vector Search Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
