//context
import { useToast } from "../../../contexts/ToastContext";
//Store
import { useAppDispatch } from "../../../store/hooks";
import { isCompletedTodo } from "../../../store/todos/todosSlice";
//Types
import { TTodo } from "../../../types/todo.types";

const useTodo = ({ selectedTodo }: { selectedTodo: TTodo }) => {
  const dispatch = useAppDispatch();

  const { showHideToast } = useToast();

  // EVENT HANDLERS
  const handleIsCompleted = (todoId: string) => {
    if (selectedTodo) {
      dispatch(isCompletedTodo({ id: todoId }));
    }
    //Toast
    showHideToast(" تم الإضافة إلي المنجزة!", "success");
  };
  return { handleIsCompleted };
};
export default useTodo;
