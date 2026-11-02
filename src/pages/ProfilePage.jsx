import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFollowers, useFollowing, useMyPosts } from "../hooks/queries";
import { displayName } from "../utils";
import EditProfileForm from "../components/profile/EditProfileForm";
import PostDetailModal from "../components/post/PostDetailModal";
import PostGrid from "../components/post/PostGrid";
import CreatePostModal from "../components/post/CreatePostModal";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { EmptyState, ErrorState, Skeleton } from "../components/ui/States";
import { Link } from "react-router-dom";

const Stat = ({ n, label, to }) => {
  const body = (
    <>
      <span className="block text-lg font-bold leading-none">{n}</span>
      <span className="text-sm text-mute">{label}</span>
    </>
  );
  return to ? <Link to={to} className="text-center md:text-left">{body}</Link> : <div className="text-center md:text-left">{body}</div>;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const posts = useMyPosts();
  const followers = useFollowers();
  const following = useFollowing();
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [open, setOpen] = useState(null);

  const name = displayName(user);
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const details = [user?.location, user?.qualification].filter(Boolean).join(" • ");
  const list = posts.data || [];

  return (
    <div className="mx-auto max-w-[935px]">
      <header className="flex flex-col items-center gap-6 border-b border-line pb-8 md:flex-row md:items-start md:gap-14 md:px-8">
        <Avatar src={user?.image} name={name} size="xl" ring />
        <div className="w-full space-y-4 text-center md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <h1 className="text-xl font-semibold">{name}</h1>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setEditing(true)}>Edit profile</Button>
              <Button variant="secondary" onClick={() => setCreating(true)}>New post</Button>
            </div>
          </div>
          <div className="flex justify-center gap-8 md:justify-start">
            <Stat n={list.length} label="posts" />
            <Stat n={followers.data?.followersCount ?? 0} label="followers" to="/connections" />
            <Stat n={following.data?.followingCount ?? 0} label="following" to="/connections" />
          </div>
          <div className="text-sm">
            {fullName && <p className="font-semibold">{fullName}</p>}
            {details && <p className="text-mute">{details}</p>}
            <p className="text-mute">{user?.socialAccount === 1 ? "Private account" : "Public account"}</p>
          </div>
        </div>
      </header>

      <div className="pt-6">
        {posts.isLoading && (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square !rounded-none" />)}
          </div>
        )}
        {posts.isError && <ErrorState error={posts.error} onRetry={posts.refetch} />}
        {!posts.isLoading && !posts.isError && (
          <PostGrid
            items={list}
            onOpen={setOpen}
            empty={
              <EmptyState
                title="Share your first photo"
                text="Photos you post will appear here."
                action={<Button onClick={() => setCreating(true)}>Create a post</Button>}
              />
            }
          />
        )}
      </div>

      {open && (
        <PostDetailModal postId={open._id} fallback={open} open onClose={() => setOpen(null)} />
      )}
      <Modal open={editing} onClose={() => setEditing(false)} title="Edit profile">
        <EditProfileForm user={user} onDone={() => setEditing(false)} />
      </Modal>
      <CreatePostModal open={creating} onClose={() => setCreating(false)} />
    </div>
  );
}
