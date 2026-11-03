import { useQuery } from "@tanstack/react-query";
import { likeApi } from "../api/services";
import PostGrid from "../components/post/PostGrid";
import { Empty, Loader } from "../components/ui/Loader";

export default function LikedPage() {
  const { data = [], isLoading } = useQuery({ queryKey: ["myLikes"], queryFn: likeApi.mine });
  const posts = data.filter((l) => l.postId).map((l) => l.postId);

  return (
    <div className="mx-auto max-w-[760px]">
      <h1 className="page-title">Reels</h1>
      {isLoading && <Loader />}
      {!isLoading && posts.length === 0 && (
        <div className="vs-card">
          <Empty title="No liked posts" text="Tap the heart on a post and it shows up here." />
        </div>
      )}
      <PostGrid items={posts} />
    </div>
  );
}
