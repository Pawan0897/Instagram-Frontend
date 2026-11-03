import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ENUMS } from "../../api/endpoint";
import { followApi } from "../../api/services";
import { notify } from "../../lib/alert";
import { displayName } from "../../lib/format";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import { Empty, Loader } from "../ui/Loader";

export default function RequestForm() {
  const queryClient = useQueryClient();
  const { data: requests = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["followRequests"],
    queryFn: followApi.requests,
  });

  const respond = useMutation({
    mutationFn: followApi.respond,
    onSuccess: (res) => {
      notify.success(res.message || "Request updated");
      queryClient.invalidateQueries({ queryKey: ["followRequests"] });
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <div className="p-5 text-center"><p className="mb-3 text-sm text-mute">Could not load requests.</p><Button light onClick={() => refetch()}>Try again</Button></div>;
  if (!requests.length) return <Empty title="No pending requests" text="New follow requests will appear here." />;

  return (
    <ul className="divide-y divide-line">
      {requests.map((request) => {
        const person = request.followFrom || {};
        return (
          <li key={request._id} className="flex items-center gap-3 px-4 py-3">
            <Avatar src={person.image} name={displayName(person)} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{displayName(person)}</p>
              <p className="truncate text-xs text-mute">{person.email}</p>
            </div>
            <div className="flex gap-2">
              <Button className="!h-8 !px-3 !text-xs" loading={respond.isPending} onClick={() => respond.mutate({ _id: request._id, followStatus: ENUMS.FOLLOW_STATUS.ACCEPT })}>Accept</Button>
              <Button className="!h-8 !px-3 !text-xs" light disabled={respond.isPending} onClick={() => respond.mutate({ _id: request._id, followStatus: ENUMS.FOLLOW_STATUS.REJECT })}>Decline</Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
