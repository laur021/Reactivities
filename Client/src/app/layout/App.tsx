import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ActivityDashboard from "../../features/Activities/dashboard/ActivityDashboard";
import NavBar from "./NavBar";
import "./styles.css";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);

  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await axios.get<Activity[]>("https://localhost:5001/api/activities");
      return response.data;
    },
  });

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (activity: Activity) => {
    // if (activity.id) {
    //   setActivities(activities.map((x) => (x.id === activity.id ? activity : x)));
    // } else {
    //   const newActivity = { ...activity, id: activities.length.toString() };
    //   setSelectedActivity(newActivity);
    //   setActivities([...activities, newActivity]);
    // }
    console.log(activity);
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    // setActivities(activities.filter(x => x.id !== id))
    console.log(id);
  };

  return (
    <Box sx={{ backgroundColor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity}
            closeForm={handleCloseForm}
            openForm={handleOpenForm}
            editMode={editMode}
            submitForm={handleSubmitForm}
            deleteActivity={handleDelete}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
