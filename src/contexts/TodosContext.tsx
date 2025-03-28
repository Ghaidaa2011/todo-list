import { createContext, ReactNode, useContext, useReducer } from "react";
import { TTodo } from "../types/todo.types";
import todosReducer, { TodoAction } from "../reducers/todosReducer";

interface TodosContextType {
  todos: TTodo[];
  dispatch: (action: TodoAction) => void;
}
const TodosContext = createContext<TodosContextType>({
  todos: [],
  dispatch: () => {},
});
const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
export default TodosProvider;
export const useTodos = () => {
  return useContext(TodosContext);
};
