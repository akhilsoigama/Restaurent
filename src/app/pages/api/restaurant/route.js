import { connectionStr } from "@/app/lib/db"; 
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Restaurant } from "../../models/restaurantModel";
import bcrypt from "bcrypt";

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (err) {
            throw new Error("Database connection error");
        }
    }
}

export async function GET() {
    try {
        await connectDB();
        const data = await Restaurant.find();
        return NextResponse.json({ success: true, data });
    } catch (err) {
        return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const payload = await request.json();
        await connectDB();

        if (payload.login) {
            const { email, password } = payload;

            if (!email || !password) {
                return NextResponse.json(
                    { success: false, error: "Email and password are required" },
                    { status: 400 }
                );
            }

            const restaurant = await Restaurant.findOne({ email });

            if (!restaurant) {
                return NextResponse.json(
                    { success: false, error: "Invalid email or password" },
                    { status: 401 }
                );
            }

            const match = await bcrypt.compare(password, restaurant.password);
            if (match) {
                return NextResponse.json({ success: true, data: restaurant });
            } else {
                return NextResponse.json(
                    { success: false, error: "Invalid email or password" },
                    { status: 401 }
                );
            }
        } else {
            const { firstname, lastname, email, password, mobile, gender } = payload;

            const requiredFields = ["firstname", "lastname", "email", "password", "mobile", "gender"];
            for (const field of requiredFields) {
                if (!payload[field]) {
                    return NextResponse.json(
                        { success: false, error: `${field} is required` },
                        { status: 400 }
                    );
                }
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newRestaurant = new Restaurant({
                firstname,
                lastname,
                email,
                password: hashedPassword,
                mobile,
                gender,
            });

            const savedRestaurant = await newRestaurant.save();
            return NextResponse.json({ success: true, data: savedRestaurant });
        }
    } catch (err) {
        return NextResponse.json(
            { success: false, error: err.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
