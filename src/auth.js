import NextAuth from "next-auth";
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { connect } from "./lib/db/Database";
import User from "./model/User";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Github,

        /*
            ({
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.login, // Use login name if full name is not available
                    email: profile.email || null, // GitHub might not return an email
                    image: profile.avatar_url,
                }
            }
        }),
        
        */
        Google

    ],
    callbacks: {
        async session({ session, token }) {
            await connect();

            console.log("🔎 Checking if user exists: ", session.user.email);

            if (!session.user.email) {
                console.log("⚠️ User email is missing. Skipping database entry.");
                return session;
            }

            let existingUser = await User.findOne({ email: session.user.email });

            // Determine the provider (GitHub or Google)
            const providerId = token.sub;
            const provider = token.provider || (session.user.email.includes("@gmail.com") ? "google" : "github");

            // If user does not exist, create a new one
            if (!existingUser) {
                console.log("⚡ Creating a new user...");
                existingUser = await User.create({
                    email: session.user.email,
                    githubId: provider === "github" ? providerId : undefined,
                    googleId: provider === "google" ? providerId : undefined,
                    imageGenerationCount: 5, // Default free credits
                    isSubscribed: false,
                });
                console.log("✅ New User Created: ", existingUser);
            } else {
                console.log("✅ User already exists: ", existingUser);
                // Update user to store provider ID if missing
                if (provider === "github" && !existingUser.githubId) {
                    existingUser.githubId = providerId;
                }
                if (provider === "google" && !existingUser.googleId) {
                    existingUser.googleId = providerId;
                }
                await existingUser.save();
            }

            // Add custom fields to session
            session.user.id = existingUser._id.toString();
            session.user.imageGenerationCount = existingUser.imageGenerationCount;
            session.user.isSubscribed = existingUser.isSubscribed;

            return session;
        },
        async jwt({ token, account }) {
            // Attach provider and user ID to token
            if (account) {
                token.sub = account.providerAccountId;
                token.provider = account.provider;
            }
            return token;
        }
    }
})

// auth like useSession hook , by the help of this we can check that the user is logedin or not 