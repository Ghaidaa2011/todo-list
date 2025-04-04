import { createRoot } from "react-dom/client";
//styles
import "./styles/index.css";
//MUI
import { createTheme, ThemeProvider } from "@mui/material";
//Layout
import MainLayout from "./layouts/MainLayout.tsx";
//Store
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
const theme = createTheme({
  typography: { fontFamily: "Alexandria, Arial, sans-serif" },
  palette: { primary: { main: "#ab003c" } },
});
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <MainLayout />
    </ThemeProvider>
  </Provider>
);
