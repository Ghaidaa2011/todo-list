//Container
import Container from "@mui/material/Container";
//Components
import TodoList from "./components/common/TodoList/TodoList";
import { TodosContext } from "./contexts/TodosContext";
import { initialTodos } from "./data/todos";
import { useState } from "react";
import { TTodo } from "./types/todo.types";

function App() {
  const [todos, setTodos] = useState<TTodo[]>(initialTodos);
  return (
    <div style={{ direction: "rtl" }}>
      <Container
        maxWidth="sm"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </Container>
    </div>
  );
}

export default App;
