import NextAuth from "next-auth";
import Github from "next-auth/providers/github"

export const {auth,handlers,signIn,signOut} = NextAuth({
    providers : [
        Github
    ]
})

// auth like useSession hook , by the help of this we can check that the user is logedin or not 