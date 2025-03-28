import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
//Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
//Types
import { TTodo } from "../../../types/todo.types";
//Custom Hooks
import useTodo from "./useTodo";
//Styles
import styles from "./styles.module.css";

const { iconButton, todoCard } = styles;

interface ITodoProps extends TTodo {
  selectedTodo: TTodo;
  handleOpenDeleteDialog: (selectedTodo: TTodo) => void;
  handleOpenUpdateDialog: (selectedTodo: TTodo) => void;
}
const Todo = ({
  id,
  title,
  details,
  isCompleted,
  selectedTodo,
  handleOpenDeleteDialog,
  handleOpenUpdateDialog,
}: ITodoProps) => {
  const { handleIsCompleted } = useTodo({ selectedTodo });
  return (
    <>
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
              onClick={() => {
                handleOpenUpdateDialog(selectedTodo);
              }}
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
              onClick={() => {
                handleOpenDeleteDialog(selectedTodo);
              }}
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
