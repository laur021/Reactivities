import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";
import "./styles.css";

function App() {
  const location = useLocation();
  return (
    <Box sx={{ backgroundColor: "#eeeeee", minHeight: "100vh" }}>
      <ScrollRestoration />
      <CssBaseline />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;
