import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";
import agent from "../api/agent";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();
  const location = useLocation();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
    enabled: !id && location.pathname === "/activities" && !!currentUser,
    select: (data) => {
      return data.map((activity) => {
        const host = activity.attendees.find((x) => x.id === activity.hostId);
        return {
          ...activity,
          isHost: currentUser?.id === activity.hostId,
          isGoing: activity.attendees.some((x) => x.id === currentUser?.id),
          hostImageUrl: host?.imageUrl,
        };
      });
    },
  });

  const { data: activity, isLoading: IsLoadingActivity } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
    select: (data) => {
      const host = data.attendees.find((x) => x.id === data.hostId);
      return {
        ...data,
        isHost: currentUser?.id === data.hostId,
        isGoing: data.attendees.some((x) => x.id === currentUser?.id),
        hostImageUrl: host?.imageUrl,
      };
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put("/activities", activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post("/activities", activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/activities/${id}/attend`);
    },
    onMutate: async (activityId: string) => {
      // Cancel ongoing queries so they don't overwrite optimistic changes
      await queryClient.cancelQueries({ queryKey: ["activities", activityId] });

      // Get previous activity data for rollback
      const prevActivity = queryClient.getQueryData<Activity>(["activities", activityId]);

      // Optimistically update cache
      queryClient.setQueryData<Activity>(["activities", activityId], (oldActivity) => {
        // guard against missing data
        if (!oldActivity || !currentUser) {
          return oldActivity;
        }

        const isHost = oldActivity.hostId === currentUser.id;
        const isAttending = oldActivity.attendees.some((x) => x.id === currentUser.id);

        return {
          ...oldActivity,
          isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled, // toggle cancelled for hosts
          attendees: isAttending
            ? isHost
              ? oldActivity.attendees // hosts don't change attendee list
              : oldActivity.attendees.filter((x) => x.id !== currentUser.id) // remove attendee
            : [
                ...oldActivity.attendees,
                {
                  id: currentUser.id,
                  displayName: currentUser.displayName,
                  imageUrl: currentUser.imageUrl,
                },
              ],
        };
      });

      // Provide previous activity for rollback
      return { prevActivity };
    },
    onError: (error, activityId, context) => {
      console.log(error);
      if (context?.prevActivity) {
        queryClient.setQueryData<Activity>(["activities", activityId], context.prevActivity);
      }
    },
  });

  return {
    activities,
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    IsLoadingActivity,
    updateAttendance,
  };
};
