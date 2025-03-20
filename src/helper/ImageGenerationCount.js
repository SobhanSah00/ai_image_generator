import User from "../model/User";
import { connect } from "../lib/db/Database";

export async function decrementImageCount(userId) {
    if (!userId) {
        throw new Error("User ID is required");
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.imageGenerationCount > 0) {
        user.imageGenerationCount -= 1;
        await user.save();

        return {
            success: true,
            remaining: user.imageGenerationCount,
        };
    } else {
        return {
            success: false,
            remaining: 0,
            message: "No free generations left. Subscribe to continue.",
        };
    }
}
