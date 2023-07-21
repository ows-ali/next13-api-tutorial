"use client";

import { useRouter } from "next/navigation";

import React, { useState } from "react";

export const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const router = useRouter();

  const addTodo = async () => {
    const resp = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({
        taskname: todo,
      }),
    });
    console.log({ resp });

    router.refresh();
  };
  return (
    <>
      <div className="relative">
        <input
          type="text"
          placeholder="What needs to be done today?"
          className="w-full px-2 py-3 border rounded outline-none border-grey-600"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          className="w-full bg-gray-400 text-white py-2 my-2"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
    </>
  );
};
