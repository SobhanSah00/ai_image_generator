"use client";

import SignInButton from "../../components/SignInButton";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mb-6">Sign in with GitHub to continue.</p>

        <SignInButton />
      </div>
    </div>
  );
}
