"use client";

import { useState } from "react";

export default function ImageGenerator() {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateImage = async () => {
        setLoading(true);
        setError("");
        setImageUrl(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to generate image");

            setImageUrl(data.imageUrl);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-4">AI Image Generator</h1>
            
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
                <input
                    type="text"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                    onClick={generateImage}
                    disabled={loading || !prompt}
                    className="w-full bg-blue-600 text-white font-semibold py-2 mt-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Generating..." : "Generate Image"}
                </button>

                {error && <p className="text-red-500 mt-3">{error}</p>}
            </div>

            {imageUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Generated Image:</h2>
                    <img src={imageUrl} alt="AI Generated" className="rounded-lg shadow-md" />
                </div>
            )}
        </div>
    );
}
