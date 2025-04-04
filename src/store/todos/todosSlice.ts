import { TTodo } from "./../../types/todo.types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from "uuid";

export interface ITodosState {
  todos: TTodo[]
}
const initialState: ITodosState = {
  todos: [],
}
export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addNewTodo: (state, action: PayloadAction<{ titleInput: string }>) => {
      const newTodo = {
        id: uuid(),
        title: action.payload.titleInput,
        details: "",
        isCompleted: false,
      };
      state.todos = [...state.todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    getTodos: (state) => {
      const storageTodos = localStorage.getItem("todos");
      if (storageTodos) {
        state.todos = JSON.parse(storageTodos);
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    isCompletedTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    }
  },
})
export const { addNewTodo, getTodos, deleteTodo, updateTodo, isCompletedTodo } = todosSlice.actions
export default todosSlice.reducer