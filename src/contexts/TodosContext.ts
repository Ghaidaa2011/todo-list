import { createContext } from "react";
import { TTodo } from "../types/todo.types";

interface TodosContextType {
  todos: TTodo[];
  setTodos: React.Dispatch<React.SetStateAction<TTodo[]>>;
}
export const TodosContext = createContext<TodosContextType | null>(null);