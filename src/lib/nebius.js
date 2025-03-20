import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export const dynamic = 'force-dynamic'; // because we do not want to cache the page

const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: process.env.NEBIUS_API_KEY,
});

export async function generateImage(prompt) {
    try {
        console.log("Generating image with prompt:", prompt);
        
        const response = await client.images.generate({
            model: "black-forest-labs/flux-dev",
            response_format: "b64_json",
            extra_body: {
                response_extension: "webp",
                width: 1024,
                height: 1024,
                num_inference_steps: 28,
                negative_prompt: "",
                seed: -1
            },
            prompt: prompt
        });
        
        console.log("Response received from API:", response);
        
        // Check if we have the expected response structure
        if (response && response.data && response.data[0]) {
            if (response.data[0].url) {
                console.log("Image URL generated:", response.data[0].url);
                return { image: response.data[0].url };
            } else if (response.data[0].b64_json) {
                console.log("Base64 image data received");
                const imageUrl = `data:image/webp;base64,${response.data[0].b64_json}`;
                return { image: imageUrl };
            }
        }
        
        // If we reach here, log the entire response for debugging
        console.error("Unexpected response structure:", JSON.stringify(response, null, 2));
        throw new Error("Invalid response format from Nebius API");
    } catch (error) {
        console.error("Nebius API Error:", error.message);
        console.error("Error details:", error);
        throw new Error(`Failed to generate image: ${error.message}`);
    }
}