import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLikeCount, usePost } from "../../hooks/queries";
import { displayName, plural, timeAgo } from "../../utils";
import CommentSection from "../comment/CommentSection";
import LikeButton from "../like/LikeButton";
import LikesModal from "../like/LikesModal";
import Avatar from "../ui/Avatar";
import Modal from "../ui/Modal";
import { Skeleton } from "../ui/States";
import PostMenu from "./PostMenu";

/**
 * GET /post/:id -> caption + populated user (userName, email, ...)
 * `fallback` = grid/feed se mila basic post, taaki image turant dikhe.
 */
export default function PostDetailModal({ postId, fallback, open, onClose }) {
  const { user: me } = useAuth();
  const { data: full, isLoading } = usePost(postId, open);
  const { data: likeCount = 0 } = useLikeCount(postId);
  const [likes, setLikes] = useState(false);

  const post = full || fallback;
  const author = full?.userId && typeof full.userId === "object" ? full.userId : fallback?.user;
  const authorId = typeof full?.userId === "object" ? full.userId._id : full?.userId ?? fallback?.userId;
  const name = displayName(author, authorId);
  const isMine = String(authorId) === String(me?._id);

  return (
    <Modal open={open} onClose={onClose} wide bare title="Post">
      <div className="grid max-h-[92vh] md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="bg-ink">
          <img src={post?.post} alt={post?.caption || "Post"} className="h-full max-h-[60vh] w-full object-contain md:max-h-[92vh]" />
        </div>

        <div className="flex min-h-0 flex-col md:max-h-[92vh]">
          <header className="flex items-center gap-3 border-b border-line px-4 py-3 pr-14">
            <Avatar name={name} size="sm" ring />
            <p className="min-w-0 flex-1 truncate text-sm font-semibold">{name}</p>
            {isMine && full && <PostMenu post={full} onDeleted={onClose} />}
          </header>

          <div className="border-b border-line px-4 py-3">
            {isLoading ? (
              <Skeleton className="h-4 w-3/4" />
            ) : post?.caption ? (
              <p className="text-sm">
                <span className="mr-1.5 font-semibold">{name}</span>
                {post.caption}
              </p>
            ) : (
              <p className="text-sm text-mute">No caption.</p>
            )}
          </div>

          <CommentSection postId={postId} className="flex-1" />

          <div className="space-y-1 border-t border-line px-4 py-3">
            <LikeButton postId={postId} />
            <button onClick={() => likeCount > 0 && setLikes(true)} className="block text-sm font-semibold">
              {plural(likeCount, "like")}
            </button>
            <p className="text-xs text-mute">{timeAgo(post?.createdAt)}</p>
          </div>
        </div>
      </div>
      <LikesModal postId={postId} open={likes} onClose={() => setLikes(false)} />
    </Modal>
  );
}
