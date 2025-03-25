import OpenAI from "openai";

const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: process.env.NEBIUS_API_KEY,
});

export default async function isSafePrompt(prompt) {
    try {
        const response = await client.chat.completions.create({
            model: "meta-llama/Llama-Guard-3-8B",
            max_tokens: 512,
            temperature: 0.6,
            top_p: 0.9,
            extra_body: {
                top_k: 50
            },
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: prompt
                        }
                    ]
                }
            ]
        })

        console.log("saftey api responce",response);

        // check karna he ki prompt safe he ki nehi 
        if(response.choices[0].message.content.includes("unsafe")) {
            return false; // is prompt ko age mot badhao wohi pe block 
        }
        
        return true;
        
    }
    catch (error) {
        console.error("Error checking safety:", error);
        return false; // If safety check fails, block it
    }
}