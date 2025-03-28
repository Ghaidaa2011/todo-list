import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
//Spinner
import CircularProgress from "@mui/material/CircularProgress";
//Components
import Todo from "../Todo/Todo";
//Custom Hook
import useTodoList from "./useTodoList";
//Types
import { TTodo } from "../../../types/todo.types";

interface ITodoListProps {
  selectedTodo: TTodo | null;
  handleOpenDeleteDialog: (selectedTodo: TTodo) => void;
  handleOpenUpdateDialog: (selectedTodo: TTodo) => void;
}

const TodoList = ({
  handleOpenDeleteDialog,
  handleOpenUpdateDialog,
}: ITodoListProps) => {
  const {
    filteredTodos,
    addTodoHandler,
    handleAddClick,
    handleDisplayedTodoType,
    isError,
    displayedTodoType,
    titleInput,
    loading,
  } = useTodoList();

  // Render filtered todos
  const todosList = filteredTodos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        {...todo}
        selectedTodo={todo}
        handleOpenDeleteDialog={handleOpenDeleteDialog}
        handleOpenUpdateDialog={handleOpenUpdateDialog}
      />
    );
  });

  return (
    <>
      <Card
        sx={{
          width: "100%",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider sx={{ width: "100%" }} />
          <ToggleButtonGroup
            style={{ direction: "ltr", margin: "30px auto 10px auto" }}
            color="primary"
            exclusive
            aria-label="Platform"
            value={displayedTodoType}
            onChange={handleDisplayedTodoType}
          >
            <ToggleButton value="notCompleted">غير منجز</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {/*  === Todos List === */}
          <Box
            sx={{
              overflow: "auto", // Enable scrolling for overflowing content
              maxHeight: "50vh", // Limit the height to prevent excessive growth
              width: "100%",
            }}
          >
            {loading ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "20vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress color="primary" />
              </div>
            ) : todosList.length > 0 ? (
              todosList
            ) : (
              <Typography
                color="primary"
                variant="body1"
                sx={{
                  textAlign: "center",
                  padding: "30px 0px",
                }}
              >
                لم تقم بإضافة أي مهام حتى الآن! 😊
              </Typography>
            )}
          </Box>
          {/* ===/// Todos List ///===*/}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="عنوان المهمة"
            variant="outlined"
            autoFocus
            value={titleInput}
            onChange={addTodoHandler}
            sx={{ flexGrow: 3 }}
            error={isError} // Dynamically set error state
            helperText={
              isError && "Title must be at least 5 characters" // Show helper text when there's an error
            }
          />
          <Button
            variant="contained"
            sx={{ flexGrow: 1, height: "50px" }}
            onClick={handleAddClick}
          >
            إضافة
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default TodoList;
