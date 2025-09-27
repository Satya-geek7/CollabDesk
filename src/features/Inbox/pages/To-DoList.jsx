import React, { useState, useEffect, useMemo } from "react";
import ToDoForm from "../components/todo/ToDoForm";
import ToDoList from "../components/todo/ToDoList";
import Message from "../components/todo/Message";
import EmptyState from "../components/todo/EmptyState";
import { supabase } from "../../../lib/supabaseClient";
import ToDoLayout from "../components/todo/ToDoLayout";
import AllDel from "../components/todo/AllDel";
import { useTodos } from "../../../services/useTodos";

//Common error page
import ErrorPage from "../../../Components/ui/CmnCmpnts/ErrorPage";

const nowPath = location.pathname.toLowerCase();

const ToDoPage = () => {
  const [todos, setTodos] = useTodos();
  const [todoInput, setTodoInput] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [error, setError] = useState(null);

  // Drag & drop reorder
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  const fetchTodos = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) return setError(userError);
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    if (error) {
      return setError(error);
    } else {
      setTodos(data);
    }
  };

  // Realtime sync
  useEffect(() => {
    const channel = supabase
      .channel("todos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todos" },
        () => fetchTodos() // <- pass a function that calls fetchTodos
      )
      .subscribe();

    // also load once on mount
    fetchTodos();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setTodos]);

  // Create todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase
      .from("todos")
      .insert([{ text: todoInput, user_id: user.id, done: false }]);
    setTodoInput("");
    setMessage("Todo created successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  // Delete todo
  const delTodo = async (id) => {
    await supabase.from("todos").delete().eq("id", id);
    await fetchTodos();
  };

  // Toggle done
  const toggleDone = async (id, currentValue) => {
    await supabase.from("todos").update({ done: !currentValue }).eq("id", id);
    await fetchTodos();
  };

  // Delete all
  const handleAllDel = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("todos").delete().eq("user_id", user.id);
    await fetchTodos();
  };

  // Save edit
  const saveEdit = async (id) => {
    await supabase.from("todos").update({ text: editingText }).eq("id", id);
    setEditingId(null);
  };

  const completedTask = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );

  return (
    <>
      {error ? (
        <ErrorPage children={error} path={nowPath} />
      ) : (
        <div className="flex w-screen scrollbar-hide md:h-screen lg:h-[550px] sm:h-screen h-[550px] mt-[100px] md:mt-[100px] sm:mt-[120px] rounded-2xl justify-center">
          <ToDoLayout>
            <ToDoForm
              handleSubmit={handleSubmit}
              setTodoInput={setTodoInput}
              todoInput={todoInput}
            />
            <Message message={message} />
            {todos && todos.length > 0 ? (
              <>
                <AllDel handleAllDel={handleAllDel} />
                <div className="text-sm font-medium ml-2 text-gray-400 mb-1">
                  Completed: {completedTask}/{todos.length}
                </div>
                <ToDoList
                  handleOnDragEnd={handleOnDragEnd}
                  todos={todos}
                  toggleDone={toggleDone}
                  delTodo={delTodo}
                  startEdit={(id, text) => {
                    setEditingId(id);
                    setEditingText(text);
                  }}
                  saveEdit={saveEdit}
                  editingId={editingId}
                  editingText={editingText}
                  setEditingText={setEditingText}
                />
              </>
            ) : (
              <EmptyState />
            )}
          </ToDoLayout>
        </div>
      )}
    </>
  );
};

export default ToDoPage;
