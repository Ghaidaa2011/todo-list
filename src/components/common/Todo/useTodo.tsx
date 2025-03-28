import { useToast } from "../../../contexts/ToastContext";
import { useTodos } from "../../../contexts/TodosContext";
import { TTodo } from "../../../types/todo.types";

const useTodo = ({ selectedTodo }: { selectedTodo: TTodo }) => {
  const { dispatch } = useTodos();

  const { showHideToast } = useToast();

  // EVENT HANDLERS
  const handleIsCompleted = (todoId: string) => {
    if (selectedTodo) {
      dispatch({
        type: "ISCOMPLETED_TODO",
        payload: { id: todoId, isCompleted: selectedTodo.isCompleted },
      });
    }
    //Toast
    showHideToast(" تم الإضافة إلي المنجزة!", "success");
  };
  return { handleIsCompleted };
};
export default useTodo;
