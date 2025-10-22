import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import "./styles.css";

function App() {
  return (
    <Box sx={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
