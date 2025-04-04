import { createContext, ReactNode, useContext } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

interface ToastContextType {
  showHideToast: (
    message: string,
    variant: "success" | "error" | "warning" | "info"
  ) => void;
}
const ToastContext = createContext<ToastContextType>({
  showHideToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { enqueueSnackbar } = useSnackbar();
  const showHideToast = (
    message: string,
    variant: "success" | "error" | "warning" | "info"
  ) => {
    enqueueSnackbar(message, { variant });
  };
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  return useContext(ToastContext);
};
