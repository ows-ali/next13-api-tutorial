"use client";
import { NewTodo, Todo } from "@/lib/drizzle";
import { useRouter } from "next/navigation";
import React from "react";

const TodoList = (props: { todos: Todo[] }) => {
  const router = useRouter();
  const removeTodo = async (id: number) => {
    const resp = await fetch("/api/todo/" + id, {
      method: "DELETE",
    });
    router.refresh();
  };
  const changeStatus = async (id: number, isDone: boolean) => {
    const resp = await fetch("/api/todo/" + id, {
      method: "PUT",
      body: JSON.stringify({
        isdone: !isDone,
      }),
    });
    router.refresh();
  };
  return (
    <>
      <ul className="list-reset max-h-[300px] overflow-scroll">
        {props.todos.map((todo) => {
          console.log("first", todo.isDone, todo.taskname);
          return (
            <li
              key={todo.id}
              className="relative flex items-center justify-between px-2 py-6 border-b"
            >
              <div>
                <input
                  type="checkbox"
                  className=""
                  checked={todo.isDone}
                  onChange={() => changeStatus(todo.id, todo.isDone)}
                />
                <p className="inline-block mt-1 text-gray-600">
                  {todo.taskname}
                </p>
              </div>
              <button
                type="button"
                className="absolute right-0 flex items-center"
                onClick={() => {
                  removeTodo(todo.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-red-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
