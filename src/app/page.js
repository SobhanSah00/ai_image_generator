"use client"

import {login} from "../lib/actions/auth"

export default function Home() {
  return (
    <div>
      <p>
        you are not sign in in github
      </p>
      <button
        onClick={() => login()}
       className=' cursor-pointer p-4 bg-green-600 rounded-2xl'>
        sign in with github
      </button>
    </div>
  )
}
