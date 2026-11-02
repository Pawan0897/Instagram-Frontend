import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useComments, useLikeCount, useLikedByMe, useToggleLike } from "../../hooks/queries";
import { displayName, plural, timeAgo } from "../../utils";
import FollowButton from "../follow/FollowButton";
import LikeButton from "../like/LikeButton";
import LikesModal from "../like/LikesModal";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import PostDetailModal from "./PostDetailModal";
import PostMenu from "./PostMenu";

/**
 * Feed item. Feed API ({post, createdAt, userId, user:{userName}}) se render hota hai.
 */
export default function PostCard({ post }) {
  const { user: me } = useAuth();
  const isMine = String(post.userId) === String(me?._id);
  const name = displayName(post.user, post.userId);

  const { data: likeCount = 0 } = useLikeCount(post._id);
  const { data: liked = false } = useLikedByMe(post._id);
  const { data: comments = [] } = useComments(post._id);
  const toggle = useToggleLike(post._id);

  const [detail, setDetail] = useState(false);
  const [likes, setLikes] = useState(false);
  const [burst, setBurst] = useState(false);

  // double-click on photo = like (unlike nahi)
  const onDouble = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 720);
    if (!liked) toggle.mutate();
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-card">
      <header className="flex items-center gap-3 px-3 py-2.5">
        <Avatar name={name} size="sm" ring />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="text-xs text-mute">{timeAgo(post.createdAt)}</p>
        </div>
        {isMine ? (
          <PostMenu post={post} />
        ) : (
          <FollowButton userId={post.userId} userName={post.user?.userName} />
        )}
      </header>

      <div className="relative bg-paper" onDoubleClick={onDouble}>
        <img src={post.post} alt={post.caption || `Post by ${name}`} loading="lazy" className="aspect-square w-full select-none object-cover" />
        {burst && (
          <span className="burst pointer-events-none absolute inset-0 grid place-items-center text-white drop-shadow-lg">
            <Icon name="heart" filled className="h-24 w-24" />
          </span>
        )}
      </div>

      <div className="space-y-1.5 px-4 pb-3 pt-3">
        <div className="flex items-center gap-4">
          <LikeButton postId={post._id} />
          <button onClick={() => setDetail(true)} aria-label="Comments" className="text-ink hover:text-mute">
            <Icon name="comment" className="h-7 w-7" />
          </button>
        </div>

        <button
          onClick={() => likeCount > 0 && setLikes(true)}
          className="block text-sm font-semibold"
          disabled={likeCount === 0}
        >
          {likeCount === 0 ? "Be the first to like this" : plural(likeCount, "like")}
        </button>

        {post.caption && (
          <p className="text-sm">
            <span className="mr-1.5 font-semibold">{name}</span>
            {post.caption}
          </p>
        )}

        {comments.length > 0 ? (
          <button onClick={() => setDetail(true)} className="text-sm text-mute hover:text-ink">
            View {comments.length === 1 ? "1 comment" : `all ${comments.length} comments`}
          </button>
        ) : (
          <button onClick={() => setDetail(true)} className="text-sm text-mute hover:text-ink">
            Add a comment
          </button>
        )}
      </div>

      <PostDetailModal postId={post._id} fallback={post} open={detail} onClose={() => setDetail(false)} />
      <LikesModal postId={post._id} open={likes} onClose={() => setLikes(false)} />
    </article>
  );
}
