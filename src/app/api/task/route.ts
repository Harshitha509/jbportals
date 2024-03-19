import { db } from "@/db";
import { tasks } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    const taskData = await request.json();
    
   
    if (!taskData.content || typeof taskData.content !== 'string') {
      throw new Error("Task content is missing or invalid.");
    }
    
    const newTask = {
      content: taskData.content,
      userId: user.id,
    };
    
    await db.insert(newTask).into(tasks);
    
    return Response.json({ message: "Task created successfully" });
  } catch (e) {
    return Response.json(
      { message: e.message || "Couldn't create the task!" },
      { status: 500 }
    );
  }
}
