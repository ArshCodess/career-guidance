import { College, Course } from "@/lib/models/models";
import { connectDB } from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // 1. Ensure the database is connected
        await connectDB();

        // 2. Fetch all colleges from the 'colleges' collection
        // Use .lean() for better performance if you only need the JSON data
        const colleges = await College.find({}).lean();

        // 3. Return the response
        return NextResponse.json(colleges, { status: 200 });
        
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}