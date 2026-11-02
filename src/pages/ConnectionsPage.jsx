import { useState } from "react";
import { useFollowers, useFollowing } from "../hooks/queries";
import FollowRequests from "../components/follow/FollowRequests";
import PeopleList from "../components/follow/PeopleList";

export default function ConnectionsPage() {
  const [tab, setTab] = useState("followers");
  const followers = useFollowers();
  const following = useFollowing();

  const tabs = [
    ["followers", `Followers${followers.data ? ` (${followers.data.followersCount})` : ""}`],
    ["following", `Following${following.data ? ` (${following.data.followingCount})` : ""}`],
    ["requests", "Requests"],
  ];

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-5 text-xl font-semibold">People</h1>
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <div className="flex border-b border-line" role="tablist">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`flex-1 border-b-2 px-3 py-3 text-sm font-semibold transition-colors ${
                tab === key ? "border-ink text-ink" : "border-transparent text-mute hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "followers" && (
          <PeopleList query={followers} items={followers.data?.followers || []} emptyTitle="No followers yet" emptyText="When people follow you, they'll show up here." />
        )}
        {tab === "following" && (
          <PeopleList query={following} items={following.data?.following || []} emptyTitle="Not following anyone" emptyText="Use the Follow button on a post to follow its author." />
        )}
        {tab === "requests" && <FollowRequests />}
      </div>
    </div>
  );
}
