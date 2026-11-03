import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { postApi } from "../api/services";
import { openModal } from "../store/uiSlice";
import Composer from "../components/feed/Composer";
import StoryRail from "../components/feed/StoryRail";
import PostCard from "../components/post/PostCard";
import Button from "../components/ui/Button";
import { Empty, PostSkeleton } from "../components/ui/Loader";

export default function FeedPage() {
  const dispatch = useDispatch();
  const { data: posts = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["feed"],
    queryFn: postApi.feed,
  });

  return (
    <div className="mx-auto max-w-[640px] space-y-4">
      <Composer />
      <StoryRail />

      {isLoading && <><PostSkeleton /><PostSkeleton /></>}

      {isError && (
        <div className="vs-card p-6 text-center">
          <p className="text-sm text-heart">{error.message}</p>
          <button onClick={() => refetch()} className="mt-2 text-sm font-semibold text-brand">Try again</button>
        </div>
      )}

      {!isLoading && !isError && posts.length === 0 && (
        <div className="vs-card">
          <Empty title="Your feed is empty" text="Share your first photo, or follow people to see their posts here." />
          <div className="pb-8 text-center">
            <Button onClick={() => dispatch(openModal({ name: "createPost" }))}>Create a post</Button>
          </div>
        </div>
      )}

      {posts.map((post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
}
