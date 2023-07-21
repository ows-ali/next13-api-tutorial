import { NewTodo, db, todos } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const allTodos = await db.select().from(todos);
  console.log("all todos", allTodos);
  return NextResponse.json({
    message: "GET request successful",
    todos: allTodos,
  });
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const newTodo: NewTodo = {
    taskname: body.taskname,
    isDone: false,
    // isdone: body.isDone,
    // createdat: new Date(),
  };

  console.log(newTodo);
  try {
    const insertedTodo = await db.insert(todos).values(newTodo).returning();
    console.log(insertedTodo);
    return NextResponse.json({
      message: "POST request successful",
      data: body,
    });
  } catch (err) {
    console.log({ err });
    return NextResponse.json({
      message: "Something went wrong",
      error: err,
    });
  }
};

// export const PUT = (request: NextRequest) => {
//     return NextResponse.json({ message: "GET request successful" });
// };

// export const DELETE = (request: NextRequest) => {
//     return NextResponse.json({ message: "GET request successful" });
// };
