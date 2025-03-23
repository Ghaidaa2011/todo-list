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
//Components
import Todo from "../Todo/Todo";
//others
import { v4 as uuid } from "uuid";
//Hooks
import { useContext, useEffect, useState } from "react";
//Contexts
import { TodosContext } from "../../../contexts/TodosContext";

const TodoList = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("TodosContext must be used within a TodosContext.Provider");
  }
  const { todos, setTodos } = context;

  const [titleInput, setTitleInput] = useState("");

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
  const filteredTodos = todos.filter((todo) => {
    if (displayedTodoType === "completed") {
      return todo.isCompleted;
    } else if (displayedTodoType === "notCompleted") {
      return !todo.isCompleted;
    }
    return true; // "all" shows all todos
  });
  // Render filtered todos
  const todosList = filteredTodos.map((todo) => (
    <Todo key={todo.id} {...todo} />
  ));
  const addTodoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
    setIsError(false); // Reset error state when user starts typing
  };
  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTodo = {
      id: uuid(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    // Validate input
    if (!titleInput.trim() || titleInput.length < 5) {
      setIsError(true); // Set error state
      return; // Prevent adding invalid todos
    }
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));

    // Reset input field
    setTitleInput("");
  };

  useEffect(() => {
    const storageTodos = localStorage.getItem("todos");
    if (storageTodos) {
      setTodos(JSON.parse(storageTodos));
    } else {
      setTodos([]);
    }
  }, [setTodos]);
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
            {todosList}
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
