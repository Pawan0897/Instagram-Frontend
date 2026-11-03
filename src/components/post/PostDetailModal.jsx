import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { postApi } from "../../api/services";
import { displayName, timeAgo } from "../../lib/format";
import Comments from "../comment/Comments";
import LikeButton from "../like/LikeButton";
import LikeCount from "../like/LikeCount";
import Avatar from "../ui/Avatar";
import { Loader } from "../ui/Loader";
import Modal from "../ui/Modal";
import OwnerActions from "./OwnerActions";

export default function PostDetailModal({ postId }) {
  const me = useSelector((s) => s.auth.user);

  // GET /post/:id -> { post, caption, createdAt, userId: { _id, userName, ... } }
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => postApi.byId(postId),
  });

  if (isLoading || !post) {
    return <Modal bare title="Post"><Loader /></Modal>;
  }

  const author = post.userId;
  const name = displayName(author, author?._id);
  const isMine = author?._id === me._id;

  return (
    <Modal bare wide title="Post">
      <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <img src={post.post} alt={post.caption || "Post"} className="max-h-[50vh] w-full bg-black object-contain md:max-h-[92vh]" />

        <div className="flex min-h-0 flex-col md:max-h-[92vh]">
          <header className="flex items-center gap-3 border-b border-line py-3 pl-4 pr-14">
            <Avatar name={name} size="sm" ring />
            <p className="min-w-0 flex-1 truncate text-sm font-semibold">{name}</p>
            {isMine && <OwnerActions postId={postId} />}
          </header>

          <p className="border-b border-line px-4 py-3 text-sm">
            {post.caption ? <><span className="mr-1.5 font-semibold">{name}</span>{post.caption}</> : <span className="text-mute">No caption</span>}
          </p>

          <Comments postId={postId} />

          <footer className="space-y-1.5 border-t border-line px-4 py-3">
            <LikeButton postId={postId} />
            <LikeCount postId={postId} />
            <p className="text-xs uppercase tracking-wide text-mute">{timeAgo(post.createdAt)}</p>
          </footer>
        </div>
      </div>
    </Modal>
  );
}
