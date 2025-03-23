import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
  typography: { fontFamily: "Alexandria, Arial, sans-serif" },
  palette: { primary: { main: "#ab003c" } },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
