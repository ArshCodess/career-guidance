import { Course } from "@/lib/models/models";
import { connectDB } from "@/lib/mongo";

export async function GET(request: Request){
    const db = await connectDB();
    //this is not a scalable approach for now im implementing it just to test the connection and data retrieval from the database
    const science = (await Course.find({
        "stream":"science"
    }).limit(5)).map((course)=>{
        return {
            "id":course.course_id,
            "name":course.course_name,
        }
    })
    const commerce = (await Course.find({
        "stream":"commerce"
    }).limit(5)).map((course)=>{
        return {
            "id":course.course_id,
            "name":course.course_name,
        }
    })
    const arts = (await Course.find({
        "stream":"arts"
    }).limit(5)).map((course)=>{
        return {
            "id":course.course_id,
            "name":course.course_name,
        }
    })
    return new Response(JSON.stringify({
        science,
        commerce,
        arts
    }));
}