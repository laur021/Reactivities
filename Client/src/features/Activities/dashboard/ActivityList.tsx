import { Box, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityCard from "./ActivityCard";

export default function ActivityList() {
  const { activities, isLoading } = useActivities();

  if (isLoading) return <Typography textAlign="center">Loading...</Typography>;
  if (!activities) return <Typography textAlign="center">No activities found</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Box>
  );
}
