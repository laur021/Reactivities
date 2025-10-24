import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailChat from "./ActivityDetailChat";
import ActivityDetailHeader from "./ActivityDetailHeader";
import ActivityDetailInfo from "./ActivityDetailInfo";
import ActivityDetailSidebar from "./ActivityDetailSidebar";

export default function ActivityDetailPage() {
  const { id } = useParams();
  const { activity, IsLoadingActivity } = useActivities(id);

  if (IsLoadingActivity) return <Typography>Loading...</Typography>;

  if (!activity) return <Typography>Activity not found</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid size={8}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid>
      <Grid size={4}>
        <ActivityDetailSidebar />
      </Grid>
    </Grid>
  );
}
