import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  LinearProgress,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Observer } from "mobx-react-lite";
import { NavLink } from "react-router";
import { useStore } from "../../lib/hooks/useStore";
import MenuItemLink from "../../shared/components/MenuItemLink";

export default function NavBar() {
  const { uiStore } = useStore();
  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundImage: "linear-gradient(135deg, #182A73 0%, #218aae 69%, #20a7ac 89%)",
            position: "relative",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <MenuItem component={NavLink} to="/" sx={{ display: "flex", gap: 2 }}>
                  <Group fontSize="large" />
                  <Typography variant="h4" fontWeight="bold">
                    Reactivities
                  </Typography>
                </MenuItem>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                <MenuItemLink to="/activities">Activities</MenuItemLink>
                <MenuItemLink to="/createActivity">Create Activity</MenuItemLink>
                <MenuItemLink to="/counter">Counter</MenuItemLink>
                <MenuItemLink to="/errors">Errors</MenuItemLink>
              </Box>
              <MenuItem>User Menu</MenuItem>
            </Toolbar>
          </Container>
          <Observer>
            {() =>
              uiStore.isLoading ? (
                <LinearProgress
                  color="secondary"
                  sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4 }}
                />
              ) : null
            }
          </Observer>
        </AppBar>
      </Box>
    </>
  );
}
