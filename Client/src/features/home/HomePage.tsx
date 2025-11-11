import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";

export default function HomePage() {
  const { currentUser } = useAccount();
  return (
    <Paper
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: "linear-gradient(135deg, #182A73 0%, #218aae 69%, #20a7ac 89%)",
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          color: "white",
          gap: "3",
        }}
      >
        <Group sx={{ height: 110, width: 110 }} />
        <Typography variant="h1">Reactivities</Typography>
      </Box>
      <Typography variant="h2">Welcome to Reactivities</Typography>
      <Button
        component={Link}
        to={currentUser ? "/activities" : "/login"}
        state={currentUser ? undefined : { from: "/activities" }}
        size="large"
        variant="contained"
        sx={{ height: 80, borderRadius: 4, fontSize: "1.5rem" }}
      >
        Take me to activities
      </Button>
    </Paper>
  );
}
