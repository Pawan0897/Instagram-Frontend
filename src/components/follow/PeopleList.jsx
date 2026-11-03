import { useQuery } from "@tanstack/react-query";
import { followApi, profileApi } from "../../api/services";
import { displayName } from "../../lib/format";
import Avatar from "../ui/Avatar";
import FollowButton from "./FollowButton";
import { Empty, Loader } from "../ui/Loader";

export default function PeopleList({ type }) {
  const { data, isLoading } = useQuery({
    queryKey: [type === "all" ? "people" : type],
    queryFn: type === "all" ? profileApi.people : type === "followers" ? followApi.followers : followApi.following,
  });

  const people = type === "all" ? data || [] : (type === "followers" ? data?.followers : data?.following) || [];

  if (isLoading) return <Loader />;
  if (people.length === 0) {
    if (type === "all") return <Empty title="No people yet" text="When others sign up, they show up here." />;
    if (type === "followers") return <Empty title="No followers yet" text="When people follow you, they'll show up here." />;
    return <Empty title="Not following anyone" text="Use the Follow button to follow someone." />;
  }

  return (
    <ul className="divide-y divide-line">
      {people.map((u) => (
        <li key={u._id || u.email} className="flex items-center gap-3 px-4 py-3">
          <Avatar src={u.image} name={displayName(u)} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{displayName(u)}</p>
            <p className="truncate text-xs text-mute">{u.email}</p>
          </div>
          {u._id && <FollowButton userId={u._id} />}
        </li>
      ))}
    </ul>
  );
}
