'use client'

import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        {session ? (
          <>
            <p className="text-lg font-semibold mb-2">
              Signed in as <span className="text-blue-500">{session.user.email}</span>
            </p>
            <img src={session.user.image} alt="User Avatar" className="w-16 h-16 rounded-full mx-auto mb-4" />
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold mb-4">You are not signed in</p>
            <button
              onClick={() => signIn("github")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign in with GitHub
            </button>
          </>
        )}
      </div>
    </div>
  );
}
