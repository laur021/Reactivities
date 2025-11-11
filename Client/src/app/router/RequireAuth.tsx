import { Typography } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";

export default function RequireAuth() {
  const { currentUser, loadingUserInfo } = useAccount();
  const location = useLocation();

  if (loadingUserInfo) return <Typography>Loading...</Typography>;
  if (!currentUser) return <Navigate to="/login" state={{ from: location }} replace />; // redirect to login, In other words — this is like leaving a sticky note saying, “User was trying to go to /createActivity — once logged in, send them back there.”

  return <Outlet />; // render protected children if authenticated
}
