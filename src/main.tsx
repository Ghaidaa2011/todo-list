import { createRoot } from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import MainLayout from "./layouts/MainLayout.tsx";
const theme = createTheme({
  typography: { fontFamily: "Alexandria, Arial, sans-serif" },
  palette: { primary: { main: "#ab003c" } },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <MainLayout />
  </ThemeProvider>
);
