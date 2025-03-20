import { auth } from "../../../auth";
import { decrementImageCount } from "../../../helper/ImageGenerationCount";
import { generateImage } from "../../../lib/nebius";
import ImageModel from "../../../model/Image";
import { connect } from "../../../lib/db/Database";

export async function POST(req) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const body = await req.json();
        const { prompt } = body;
        
        if (!prompt) {
            return Response.json({ error: "Prompt is required" }, { status: 400 });
        }
        
        await connect();
        const result = await decrementImageCount(session.user.id);
        
        if (!result.success) {
            return Response.json({ error: result.message }, { status: 403 });
        }
        
        try {
            const response = await generateImage(prompt);
            
            if (!response || !response.image) {
                console.error("No image returned from generateImage function");
                return Response.json({ error: "Image generation failed - no image returned" }, { status: 500 });
            }
            
            console.log("Image URL received:", response.image);
            
            const newImage = await ImageModel.create({
                userId: session.user.id,
                prompt,
                imageUrl: response.image
            });
            
            return Response.json({ success: true, imageUrl: newImage.imageUrl }, { status: 200 });
        } catch (imageError) {
            console.error("Image generation error:", imageError);
            return Response.json({ error: imageError.message }, { status: 500 });
        }
    } catch (error) {
        console.error("API route error:", error);
        return Response.json({ error: "Internal Server Error: " + error.message }, { status: 500 });
    }
}