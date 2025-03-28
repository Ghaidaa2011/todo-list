//Hooks
import { useEffect, useMemo, useState } from "react";
import { useToast } from "../../../contexts/ToastContext";

//Contexts & Reducers
import { useTodos } from "../../../contexts/TodosContext";
const useTodoList = () => {
  const { todos, dispatch } = useTodos();

  const { showHideToast } = useToast();

  const [titleInput, setTitleInput] = useState("");

  const [loading, setLoading] = useState(false); // Tracks loading state
  const [isError, setIsError] = useState(false); // Tracks input error state

  const [displayedTodoType, setDisplayedTodoType] = useState<
    "all" | "completed" | "notCompleted"
  >("all");
  const handleDisplayedTodoType = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: "all" | "completed" | "notCompleted"
  ) => {
    setDisplayedTodoType(newValue);
  };
  // Filter todos based on active filter
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (displayedTodoType === "completed") {
        return todo.isCompleted;
      } else if (displayedTodoType === "notCompleted") {
        return !todo.isCompleted;
      }
      return true; // "all" shows all todos
    });
  }, [todos, displayedTodoType]);

  const addTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
    setIsError(false); // Reset error state when user starts typing
  };
  const handleAddClick = () => {
    // Validate input
    if (!titleInput.trim() || titleInput.length < 5) {
      setIsError(true); // Set error state
      return; // Prevent adding invalid todos
    }
    setLoading(true);
    dispatch({ type: "ADD_TODO", payload: { titleInput } });
    setLoading(false);
    // Reset input field
    setTitleInput("");
    //Toast
    showHideToast("تمت الإضافة بنجاح!", "success");
  };

  useEffect(() => {
    setLoading(true);
    dispatch({ type: "GET_TODOS" });
    setLoading(false);
  }, [dispatch]);

  return {
    isError,
    loading,
    handleDisplayedTodoType,
    filteredTodos,
    addTodoHandler,
    handleAddClick,
    displayedTodoType,
    titleInput,
  };
};
export default useTodoList;
