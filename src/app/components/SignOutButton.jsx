'use client'

import {logout} from "../../lib/actions/auth"

export default function SignOutButton() {
  return (
    <button
        className="cursor-pointer bg-red-600 rounded-2xl p-4"
        onClick={() => logout()}
    >
        logout
    </button>
  )
}