import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFeed, useFollowing } from "../hooks/queries";
import { displayName } from "../utils";
import CreatePostModal from "../components/post/CreatePostModal";
import PostCard from "../components/post/PostCard";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { EmptyState, ErrorState, PostSkeleton } from "../components/ui/States";
import { Link } from "react-router-dom";

function SideCard() {
  const { user } = useAuth();
  const { data } = useFollowing();
  const list = data?.following || [];
  return (
    <aside className="sticky top-8 hidden w-72 space-y-5 xl:block">
      <Link to="/profile" className="flex items-center gap-3">
        <Avatar src={user?.image} name={displayName(user)} size="md" ring />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{displayName(user)}</p>
          <p className="truncate text-xs text-mute">{user?.email}</p>
        </div>
      </Link>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-mute">Following</h3>
          <Link to="/connections" className="text-xs font-semibold hover:text-mute">See all</Link>
        </div>
        {list.length === 0 ? (
          <p className="text-sm text-mute">Follow people from their posts to see them here.</p>
        ) : (
          <ul className="space-y-2.5">
            {list.slice(0, 5).map((u, i) => (
              <li key={u.email || i} className="flex items-center gap-3">
                <Avatar src={u.image} name={displayName(u)} size="sm" />
                <span className="truncate text-sm font-medium">{displayName(u)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

export default function FeedPage() {
  const { data: posts = [], isLoading, isError, error, refetch } = useFeed();
  const [creating, setCreating] = useState(false);

  return (
    <div className="mx-auto flex max-w-[860px] justify-center gap-12">
      <div className="w-full max-w-[470px] space-y-5">
        {isLoading && [0, 1].map((i) => <PostSkeleton key={i} />)}
        {isError && <ErrorState error={error} onRetry={refetch} />}
        {!isLoading && !isError && posts.length === 0 && (
          <EmptyState
            title="Your feed is quiet"
            text="Share your first photo, or follow people to see their posts here."
            action={<Button onClick={() => setCreating(true)}>Create a post</Button>}
          />
        )}
        {posts.map((p) => <PostCard key={p._id} post={p} />)}
      </div>
      <SideCard />
      <CreatePostModal open={creating} onClose={() => setCreating(false)} />
    </div>
  );
}
