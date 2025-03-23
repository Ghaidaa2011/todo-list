import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
//Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import styles from "./styles.module.css";
//Types
import { TTodo } from "../../../types/todo.types";
//Hooks
import { useContext, useState } from "react";
//contexts
import { TodosContext } from "../../../contexts/TodosContext";
//Styles
const { iconButton, todoCard } = styles;

const Todo = ({ id, title, details, isCompleted }: TTodo) => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("TodosContext must be used within a TodosContext.Provider");
  }
  const { todos, setTodos } = context;
  const [updatedTodo, setUpdatedTodo] = useState({
    title: title,
    details: details,
  });
  // EVENT HANDLERS
  const handleIsCompleted = (todoId: string) => {
    const todosWithCompletedTodo = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(todosWithCompletedTodo);
    localStorage.setItem("todos", JSON.stringify(todosWithCompletedTodo));
  };
  const HandleDelete = (todoId: string) => {
    const todosAfterDeletion = todos.filter((todo) => todo.id !== todoId);
    setTodos(todosAfterDeletion);
    localStorage.setItem("todos", JSON.stringify(todosAfterDeletion));

    handleCloseDeleteDialog();
  };
  const HandleUpdate = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handleCloseUpdateDialog();
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTodo({ ...updatedTodo, [e.target.name]: e.target.value });
  };
  // === EVENT HANDLERS ===

  //Dialog Delete
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  //Dialog Update
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };
  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
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
              HandleDelete(id);
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
            value={updatedTodo.title}
            onChange={inputHandler}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="details"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={inputHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateDialog}>إلغاء</Button>
          <Button
            onClick={() => {
              HandleUpdate(id);
            }}
            autoFocus
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Update Dialog === */}
      <Card
        className={todoCard}
        sx={{
          width: "100%",
          backgroundColor: "#283593",
          color: "white",
          margin: "20px auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "300px",
            }}
            style={{ textDecoration: isCompleted ? "line-through" : "none" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "300px",
            }}
          >
            {details}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" sx={{ gap: "5px" }}>
            {/* CHECK ICON BUTTON */}
            <IconButton
              className={iconButton}
              sx={{
                color: isCompleted ? "white" : "#8bc34a",
                border: "3px solid #8bc34a",
                backgroundColor: isCompleted ? "#8bc34a" : "white",
              }}
              onClick={() => {
                handleIsCompleted(id);
              }}
            >
              <CheckIcon />
            </IconButton>
            {/* ===CHECK ICON BUTTON=== */}
            {/* UPDATE BUTTON */}
            <IconButton
              className={iconButton}
              sx={{
                color: "#1769aa",
                border: "3px solid #1769aa",
                backgroundColor: "white",
              }}
              onClick={handleOpenUpdateDialog}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
            {/* ===UPDATE BUTTON=== */}
            {/* DELETE BUTTON */}
            <IconButton
              className={iconButton}
              sx={{
                color: "#b23c17",
                border: "3px solid #b23c17",
                backgroundColor: "white",
              }}
              onClick={handleOpenDeleteDialog}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            {/* ===DELETE BUTTON=== */}
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};
export default Todo;
