import { Avatar, Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";

export default function ProfileHeader() {
  const isFollowing = true;
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar sx={{ width: 150, height: 150 }} />
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h4">Display name</Typography>
              {isFollowing && <Chip variant="outlined" color="seconday" label="Following" />}
            </Box>
          </Stack>
        </Grid>
        <Grid size={4}>
          <Stack spacing={2} alignItems="center"></Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
