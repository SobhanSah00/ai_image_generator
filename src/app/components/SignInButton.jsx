"use client";

import { login } from "../../lib/actions/auth";
import { FaGithub } from "react-icons/fa";

export default function SignInButton() {
  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 w-full px-4 py-3 text-white bg-black rounded-lg font-medium hover:bg-gray-900 transition"
    >
      <FaGithub className="text-xl" />
      Sign in with GitHub
    </button>
  );
}
