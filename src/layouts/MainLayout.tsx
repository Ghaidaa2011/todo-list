//Container
import AppContainer from "../components/common/Container/AppContainer";
//Components
import App from "../App";
//other
import { ToastProvider } from "../contexts/ToastContext";
import { SnackbarProvider } from "notistack";
import TodosProvider from "../contexts/TodosContext";

const MainLayout = () => {
  return (
    <AppContainer>
      <TodosProvider>
        <SnackbarProvider maxSnack={3}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </SnackbarProvider>
      </TodosProvider>
    </AppContainer>
  );
};
export default MainLayout;
