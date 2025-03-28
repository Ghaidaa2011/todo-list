//Components
import TodoList from "./components/common/TodoList/TodoList";
import { useState } from "react";
import { TTodo } from "./types/todo.types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useToast } from "./contexts/ToastContext";
import { useTodos } from "./contexts/TodosContext";

function App() {
  const { dispatch } = useTodos();

  const { showHideToast } = useToast();

  const [isError, setIsError] = useState(false); // Tracks input error state

  const [selectedTodo, setSelectedTodo] = useState<TTodo | null>(null);
  //Dialog Delete
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = (selectedTodo: TTodo) => {
    setOpenDeleteDialog(true);
    setSelectedTodo(selectedTodo);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const HandleDelete = () => {
    if (selectedTodo) {
      dispatch({ type: "DELETE_TODO", payload: selectedTodo.id });
    }
    handleCloseDeleteDialog();
    //Toast
    showHideToast(" تم الحذف بنجاح!", "error");
  };
  //Dialog Update
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleOpenUpdateDialog = (selectedTodo: TTodo) => {
    setOpenUpdateDialog(true);
    setSelectedTodo(selectedTodo);
  };
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };
  const HandleUpdate = (selectedTodo: TTodo) => {
    if (!selectedTodo) return;
    // Validate input
    if (!selectedTodo.title.trim() || selectedTodo.title.length < 5) {
      setIsError(true); // Set error state
      return; // Prevent adding invalid todos
    }
    dispatch({ type: "UPDATE_TODO", payload: selectedTodo });

    handleCloseUpdateDialog();
    //Toast
    showHideToast(" تم التحديث بنجاح!", "info");
  };
  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>إغلاق</Button>
          <Button
            onClick={() => {
              HandleDelete();
            }}
            autoFocus
          >
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Delete Dialog === */}
      {/* Update Dialog */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="العنوان"
            fullWidth
            variant="standard"
            value={selectedTodo?.title}
            onChange={(e) => {
              setIsError(false); // Reset error state when user starts typing

              setSelectedTodo({
                ...selectedTodo,
                title: e.target.value,
                details: selectedTodo?.details || "",
                isCompleted: selectedTodo?.isCompleted || false,
                id: selectedTodo?.id || "",
              });
            }}
            error={isError} // Dynamically set error state
            helperText={
              isError && "Title must be at least 5 characters" // Show helper text when there's an error
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="details"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={selectedTodo?.details}
            onChange={(e) => {
              setSelectedTodo({
                ...selectedTodo,
                title: selectedTodo?.title || "",
                details: e.target.value,
                isCompleted: selectedTodo?.isCompleted || false,
                id: selectedTodo?.id || "",
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>إلغاء</Button>
          <Button
            onClick={() => {
              if (selectedTodo) {
                HandleUpdate(selectedTodo);
              }
            }}
            autoFocus
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Update Dialog === */}

      <TodoList
        selectedTodo={selectedTodo}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        handleOpenUpdateDialog={handleOpenUpdateDialog}
      />
    </>
  );
}

export default App;
