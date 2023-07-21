import { db, todos } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: number } }
) => {
  const id = params.id;
  const body = await request.json();
  const updatedValue: { taskname?: string; isDone?: boolean } = {};

  if (body.taskname != null) {
    updatedValue.taskname = body.taskname;
  }

  //   if (body.isdone) { //dont write like this because isdone can be false
  if (body.isdone != null) {
    updatedValue.isDone = body.isdone;
  }

  const resp = await db
    .update(todos)
    .set(updatedValue)
    .where(eq(todos.id, id))
    .returning({ updated: todos.taskname });

  console.log("resp", resp);
  return NextResponse.json({
    message: "PUT request successful. Update todo having id " + id,
    data: resp,
  });
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: number } }
) => {
  const id = params.id;
  const resp = await db
    .delete(todos)
    .where(eq(todos.id, id))
    .returning({ taskname: todos.id });
  console.log({ resp });
  return NextResponse.json({
    message: "DELETE request successful. Todo having id " + id + " is deleted",
  });
};
