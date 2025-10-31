import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../lib/hooks/useActivities";
import { activitySchema, type ActivitySchema } from "../../lib/schemas/activitySchema";

export default function ActivityForm() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivitySchema>({
    mode: "onTouched",
    resolver: zodResolver(activitySchema),
  });
  const { id } = useParams();
  const { updateActivity, createActivity, activity, IsLoadingActivity } = useActivities(id);

  useEffect(() => {
    if (activity) reset(activity);
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
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
        <TextField
          {...register("title")}
          label="Title"
          defaultValue={activity?.title}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          {...register("description")}
          label="Description"
          defaultValue={activity?.description}
          error={!!errors.description}
          helperText={errors.description?.message}
          multiline
          rows={3}
        />
        <TextField
          {...register("category")}
          error={!!errors.category}
          helperText={errors.category?.message}
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          {...register("date")}
          error={!!errors.date}
          helperText={errors.date?.message}
          label="Date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          type="date"
        />
        <TextField
          {...register("city")}
          error={!!errors.city}
          helperText={errors.city?.message}
          label="City"
          defaultValue={activity?.city}
        />
        <TextField
          {...register("venue")}
          error={!!errors.venue}
          helperText={errors.venue?.message}
          label="Venue"
          defaultValue={activity?.venue}
        />
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
