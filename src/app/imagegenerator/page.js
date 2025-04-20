"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";

export default function App() {
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const generateImage = async () => {
        setLoading(true);
        setImageUrl(null);
        setToast(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to generate image");

            setImageUrl(data.imageUrl);
            showToast("Success!", "Your image has been generated successfully.", "success");
        } catch (err) {
            showToast("Uh oh! Something went wrong.", err.message || "Failed to generate image", "error");
        } finally {
            setLoading(false);
        }
    };

    const showToast = (title, description, variant) => {
        setToast({ title, description, variant });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto text-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    AI Image Generator
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Transform your ideas into stunning visuals with our AI-powered image generator.
                    Just describe what you want to see, and watch the magic happen.
                </p>

                <div className="w-full max-w-2xl bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl text-center text-gray-200 mb-4">Create Your Image</h2>

                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Describe the image you want to create..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                        <button
                            onClick={generateImage}
                            disabled={loading || !prompt}
                            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-semibold text-white disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center"
                        >
                            {loading ? (
                                "Generating..."
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Generate
                                </>
                            )}
                        </button>
                    </div>

                    {loading && (
                        <div className="mt-6 space-y-4">
                            <div className="h-[400px] w-full bg-gray-700 rounded-lg animate-pulse" />
                            <p className="text-sm text-gray-400 text-center animate-pulse">
                                Creating your masterpiece...
                            </p>
                        </div>
                    )}

                    {imageUrl && (
                        <div className="mt-6 space-y-4">
                            <div className="relative group">
                                <img
                                    src={imageUrl}
                                    alt="AI Generated"
                                    className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                            </div>
                            <p className="text-sm text-gray-400 text-center">Prompt: &quot;{prompt}&quot;</p>
                        </div>
                    )}
                </div>
            </div>

            {toast && (
                <div className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white ${toast.variant === "error" ? "bg-red-600" : "bg-green-600"}`}>
                    <p className="font-semibold">{toast.title}</p>
                    <p className="text-sm">{toast.description}</p>
                </div>
            )}
        </div>
    );
}


