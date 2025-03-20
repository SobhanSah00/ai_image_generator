"use server"

import { auth } from ".././auth"
import SignOutButton from "../components/SignOutButton";
import SignInPage from "./signin/page"

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    console.log(session);
    return <div>
      {" "}
      <h1>user signed in with name  : {session?.user.name}</h1>
      <SignOutButton />

    </div>
  }
  return (
    <div>
      <SignInPage />
    </div>
  )
}
