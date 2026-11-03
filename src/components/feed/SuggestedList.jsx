import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../../api/services";
import { displayName } from "../../lib/format";
import Avatar from "../ui/Avatar";
import FollowButton from "../follow/FollowButton";

export default function SuggestedList() {
  const { data: people = [] } = useQuery({ queryKey: ["people"], queryFn: profileApi.people });

  return (
    <section className="vs-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-extrabold">Suggested for you</h2>
        <Link to="/people" className="text-xs font-bold text-[var(--color-brand)]">See all →</Link>
      </div>
      {people.length === 0 && <p className="text-sm text-[var(--muted)]">No other accounts yet.</p>}
      <ul className="suggest-list space-y-3">
        {people.map((u) => (
          <li key={u._id} className="flex items-center gap-3">
            <Avatar src={u.image} name={displayName(u)} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{displayName(u)}</p>
              <p className="truncate text-[11px] text-[var(--muted)]">{u.email}</p>
            </div>
            <FollowButton userId={u._id} />
          </li>
        ))}
      </ul>
    </section>
  );
}
