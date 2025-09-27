import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
      setTodos(data);
    };
    fetchTodos();
  }, []);

  return [todos, setTodos];
}
