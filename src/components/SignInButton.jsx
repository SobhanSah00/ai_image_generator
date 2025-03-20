"use client";

import { loginWithGitHub, loginWithGoogle } from "../lib/actions/auth";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignInButtons() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* GitHub Sign-In Button */}
      <button
        onClick={() => loginWithGitHub()}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white bg-black rounded-lg font-medium hover:bg-gray-900 transition"
      >
        <FaGithub className="text-xl" />
        Sign in with GitHub
      </button>

      {/* Google Sign-In Button */}
      <button
        onClick={() => loginWithGoogle()}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white bg-red-600 rounded-lg font-medium hover:bg-red-700 transition"
      >
        <FaGoogle className="text-xl" />
        Sign in with Google
      </button>
    </div>
  );
}
