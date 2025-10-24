import { Grid } from "@mui/material";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";

export default function ActivityDashboardPage() {
  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityList />
      </Grid>
      <Grid size={4}>
        <ActivityFilters />
      </Grid>
    </Grid>
  );
}
