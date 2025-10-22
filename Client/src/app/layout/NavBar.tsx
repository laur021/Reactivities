import { Group } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

export default function NavBar() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundImage: "linear-gradient(135deg, #182A73 0%, #218aae 69%, #20a7ac 89%)" }}
        >
          <Container maxWidth="xl">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <MenuItem sx={{ display: "flex", gap: 2 }}>
                  <Group fontSize="large" />
                  <Typography variant="h4" fontWeight="bold">
                    Reactivities
                  </Typography>
                </MenuItem>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                <MenuItem>
                  <Typography
                    sx={{ fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    Activities
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    sx={{ fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    About
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    sx={{ fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "bold" }}
                  >
                    Contact
                  </Typography>
                </MenuItem>
              </Box>
              <Button onClick={() => {}} size="large" variant="contained" color="warning">
                Create Activity
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
