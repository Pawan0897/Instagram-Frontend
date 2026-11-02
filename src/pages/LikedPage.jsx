import { useState } from "react";
import { useMyLikes } from "../hooks/queries";
import PostDetailModal from "../components/post/PostDetailModal";
import PostGrid from "../components/post/PostGrid";
import { EmptyState, ErrorState, Skeleton } from "../components/ui/States";

export default function LikedPage() {
  const { data = [], isLoading, isError, error, refetch } = useMyLikes();
  const [open, setOpen] = useState(null);

  // GET /like/mylikedPost -> [{ _id, postId: { _id, post } | null }]  (deleted posts null aate hain)
  const items = data.filter((l) => l.postId).map((l) => ({ _id: l.postId._id, post: l.postId.post }));

  return (
    <div className="mx-auto max-w-[935px]">
      <h1 className="mb-5 text-xl font-semibold">Posts you've liked</h1>
      {isLoading && (
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="aspect-square !rounded-none" />)}
        </div>
      )}
      {isError && <ErrorState error={error} onRetry={refetch} />}
      {!isLoading && !isError && (
        <PostGrid
          items={items}
          onOpen={setOpen}
          empty={<EmptyState icon="heart" title="No liked posts" text="Tap the heart on a post and it will show up here." />}
        />
      )}
      {open && <PostDetailModal postId={open._id} fallback={open} open onClose={() => setOpen(null)} />}
    </div>
  );
}
