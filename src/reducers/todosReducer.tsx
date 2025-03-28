import { TTodo } from "../types/todo.types";
import { v4 as uuid } from "uuid";

export type TodoAction =
  | { type: "ADD_TODO"; payload: { titleInput: string } }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "UPDATE_TODO"; payload: TTodo }
  | { type: "GET_TODOS" }
  | {
      type: "ISCOMPLETED_TODO";
      payload: { id: string; isCompleted?: boolean };
    };
const todosReducer = (currentTodos: TTodo[], action: TodoAction): TTodo[] => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = {
        id: uuid(),
        title: action.payload.titleInput,
        details: "",
        isCompleted: false,
      };
      const todosAfterAdded = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(todosAfterAdded));
      return todosAfterAdded;
    }
    case "DELETE_TODO": {
      const todosAfterDeletion = currentTodos.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem("todos", JSON.stringify(todosAfterDeletion));
      return todosAfterDeletion;
    }
    case "UPDATE_TODO": {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "GET_TODOS": {
      const storageTodos = localStorage.getItem("todos");
      if (storageTodos) {
        const todos = JSON.parse(storageTodos);
        return todos;
      } else {
        return [];
      }
    }
    case "ISCOMPLETED_TODO": {
      const todosWithCompletedTodo = currentTodos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(todosWithCompletedTodo));

      return todosWithCompletedTodo;
    }
  }
};

export default todosReducer;
