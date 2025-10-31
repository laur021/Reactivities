import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../lib/hooks/useActivities";

export default function ActivityForm() {
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const { id } = useParams();
  const { updateActivity, createActivity, activity, IsLoadingActivity } = useActivities(id);

  useEffect(() => {
    if (activity) reset(activity);
  }, [activity, reset]);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  if (IsLoadingActivity) return <Typography>Loading activity...</Typography>;

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit activity" : "Create activity"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField {...register("title")} label="Title" defaultValue={activity?.title} />
        <TextField
          {...register("description")}
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField {...register("category")} label="Category" defaultValue={activity?.category} />
        <TextField
          {...register("date")}
          label="Date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          type="date"
        />
        <TextField {...register("city")} label="City" defaultValue={activity?.city} />
        <TextField {...register("civenuety")} label="Venue" defaultValue={activity?.venue} />
        <Box display="flex" justifyContent="end" gap={3} marginTop={3}>
          <Button onClick={() => navigate("/activities")} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
