import {
  boolean,
  pgTable,
  serial,
  //   text,
  //   timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { InferModel, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export const todos = pgTable("todo", {
  id: serial("id").primaryKey(),
  taskname: varchar("task", {
    length: 255,
  }),
  isDone: boolean("is_done").notNull(),
  //   createdat: timestamp("createdat").defaultNow().notNull(),
});

export type Todo = InferModel<typeof todos>;
export type NewTodo = InferModel<typeof todos, "insert">;

export const db = drizzle(sql);
