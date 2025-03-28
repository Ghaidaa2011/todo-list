import Container from "@mui/material/Container";
import { ReactNode } from "react";

const AppContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      maxWidth="sm"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        direction: "rtl",
      }}
    >
      {children}
    </Container>
  );
};
export default AppContainer;
