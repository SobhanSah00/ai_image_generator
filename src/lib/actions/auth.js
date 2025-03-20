"use server"

import { signIn, signOut } from "../../auth";
export const loginWithGitHub = async () => {
    await signIn("github", {
        redirectTo : "/"
    })
};

export const loginWithGoogle = async () => {
    await signIn("google" ,{
        redirectTo : "/imagegenerator"
    })
}

export const logout = async () => {
    await signOut({
        redirectTo : "/imagegenerator"
    })
}