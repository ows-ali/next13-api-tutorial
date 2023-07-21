import Image from "next/image";
import TodoList from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";

const fetchTodos = async () => {
  const data = await fetch(process.env.NEXT_URL + "/api/todo", {
    cache: "no-cache",
  });
  const todos = await data.json();
  return todos;
};

export default async function Home() {
  const data = await fetchTodos();

  console.log("ghggh", { data });

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3">
          <div className="flex items-center mb-6">
            <h1 className="mr-6 text-4xl font-bold text-purple-600">
              {" "}
              TODO APP
            </h1>
          </div>
          <AddTodo />
          <TodoList todos={data.todos} />
        </div>
      </div>
    </>
  );
}
