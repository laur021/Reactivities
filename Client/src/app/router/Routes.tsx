import { createBrowserRouter } from "react-router";
import ActivityForm from "../../features/Activities/ActivityForm";
import ActivityDashboard from "../../features/Activities/dashboard/ActivityDashboard";
import ActivityDetail from "../../features/Activities/details/ActivityDetail";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetail /> },
      { path: "createActivity", element: <ActivityForm /> },
      { path: "manage/:id", element: <ActivityForm /> },
    ],
  },
]);
