import { Course } from "@/lib/models/models";
import { connectDB } from "@/lib/mongo";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const data = await Course.aggregate([
            { $match: { stream: { $in: ["science", "commerce", "arts"] } } },
            {
                $group: {
                    _id: "$stream",
                    courses: {
                        $push: {
                            id: "$course_id",
                            name: "$full_name"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    stream: "$_id",
                    items: { $slice: ["$courses", 4] }
                }
            }
        ]);

        // Convert array to object: { science: [...], commerce: [...] }
        const formattedResponse = data.reduce((acc: any, curr) => {
            acc[curr.stream] = curr.items;
            return acc;
        }, { science: [], commerce: [], arts: [] });
        console.log(formattedResponse);
        
        return NextResponse.json(formattedResponse);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}