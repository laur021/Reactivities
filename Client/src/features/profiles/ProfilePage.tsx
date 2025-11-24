import { Grid } from "@mui/material";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

export default function ProfilePage() {
  return (
    <Grid container>
      <Grid size={12}>
        <ProfileHeader />
        <ProfileContent />
      </Grid>
    </Grid>
  );
}
