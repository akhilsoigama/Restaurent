import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { OAuth2Client } from "google-auth-library";
import { GoogleUser } from "@/app/pages/models/signupSchema";  // Assuming GoogleUser is your Mongoose model

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Connect to the database
async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(connectionStr, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (err) {
            throw new Error("Database connection failed");
        }
    }
}

export async function GET() {
    try {
        await connectDB();
        const users = await GoogleUser.find();
        return NextResponse.json({ success: true, data: users });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { success: false, error: "Token is required" },
                { status: 400 }
            );
        }

        if (!process.env.GOOGLE_CLIENT_ID) {
            return NextResponse.json(
                { success: false, error: "Server misconfiguration" },
                { status: 500 }
            );
        }

        let ticket;
        try {
            ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
        } catch (err) {
            return NextResponse.json(
                { success: false, error: "Token verification failed" },
                { status: 401 }
            );
        }

        // Get payload data from the token
        const payload = ticket.getPayload();
        const { email, given_name: firstName, family_name: lastName, picture: profilePicture, nbf } = payload;

        // Validate required fields from the token payload
        if (!email || !firstName || !lastName || !profilePicture) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if token is valid (not used too early)
        const currentTime = Math.floor(Date.now() / 1000); 
        if (currentTime < nbf) {
            return NextResponse.json(
                { success: false, error: "Token used too early" },
                { status: 401 }
            );
        }

        // Connect to the database
        await connectDB();

        // Check if the user already exists in the database
        let user = await GoogleUser.findOne({ email });

        if (!user) {
            user = new GoogleUser({
                email,
                firstName,
                lastName,
                profilePicture,
            });
            await user.save();  // Save the new user to the database
            console.log("New user added to the database:", user);
        } else {
            user.firstName = firstName;
            user.lastName = lastName;
            user.profilePicture = profilePicture;
            await user.save(); 
            console.log("Existing user updated in the database:", user);
        }

        return NextResponse.json({
            success: true,
            message: "User validated and saved successfully",
            user: { email, firstName, lastName, profilePicture },
        });

    } catch (err) {
        console.error("Error in POST method:", err.message);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
