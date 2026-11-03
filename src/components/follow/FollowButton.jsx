import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followApi } from "../../api/services";

export default function FollowButton({ userId }) {
  const queryClient = useQueryClient();
  const { data: relation, isLoading } = useQuery({
    queryKey: ["followStatus", userId],
    queryFn: () => followApi.status(userId),
    enabled: Boolean(userId),
  });
  const toggle = useMutation({
    mutationFn: () => followApi.toggle(userId),
    onSuccess: (res) => {
      queryClient.setQueryData(["followStatus", userId], res.data || null);
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["followRequests"] });
    },
  });
  const state = relation?.followStatus;
  const label = state === 1 ? "Following" : state === 0 ? "Requested" : "Follow";
  const filled = state !== 1 && state !== 0;

  return (
    <button
      className={filled ? "chip chip-fill" : "chip"}
      disabled={toggle.isPending || isLoading}
      onClick={() => toggle.mutate()}
    >
      {label}
    </button>
  );
}
