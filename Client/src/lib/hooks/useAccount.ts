import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import agent from "../api/agent";
import type { LoginSchema } from "../schemas/loginSchema";
import type { RegisterSchema } from "../schemas/registerSchema";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = useMutation({
    mutationFn: async (creds: LoginSchema) => {
      await agent.post("/login?useCookies=true", creds);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      const user = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: async () => {
          const response = await agent.get<User>(`/account/user-info`);
          return response.data;
        },
      });

      // Only navigate if we successfully got user data
      if (user) {
        const from = location.state?.from?.pathname || "/activities";
        navigate(from, { replace: true });
      }
    },
  });

  const registerUser = useMutation({
    mutationFn: async (creds: RegisterSchema) => {
      await agent.post("/account/register", creds);
    },
    onSuccess: () => {
      toast.success("Register successful - you can now login");
      navigate("/login");
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.post("/account/logout");
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["activities"] });
      navigate("/");
    },
  });

  const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await agent.get<User>(`/account/user-info`);
      return response.data;
    },
    enabled:
      !queryClient.getQueryData(["user"]) &&
      location.pathname !== "/login" &&
      location.pathname !== "/register", //only run when dont have user data and the location is not login or register
  });

  return {
    loginUser,
    currentUser,
    logoutUser,
    loadingUserInfo,
    registerUser,
  };
};
