import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { commentApi } from "../../api/services";
import { openModal } from "../../store/uiSlice";
import { displayName, formatCount, timeAgo } from "../../lib/format";
import FollowButton from "../follow/FollowButton";
import LikeButton from "../like/LikeButton";
import LikeCount from "../like/LikeCount";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import OwnerActions from "./OwnerActions";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  const me = useSelector((s) => s.auth.user);
  const isMine = post.userId === me._id;
  const name = displayName(post.user, post.userId);
  const parts = String(post.caption || "").split(/(#[\w]+)/g);

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", post._id],
    queryFn: () => commentApi.list(post._id),
  });

  const openDetail = () => dispatch(openModal({ name: "postDetail", data: { postId: post._id } }));

  return (
    <article className="vs-card overflow-hidden">
      <header className="flex items-center gap-3 px-4 py-3">
        <Avatar src={post.user?.image} name={name} size="sm" ring />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-extrabold">{name}</p>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            {timeAgo(post.createdAt)}
            {post.user?.location ? ` · ${post.user.location}` : ""}
          </p>
        </div>
        {isMine ? <OwnerActions postId={post._id} /> : <FollowButton userId={post.userId} />}
      </header>

      <div className="post-media">
        <img src={post.post} alt={`Post by ${name}`} loading="lazy" />
        <span className="media-count">1/1</span>
        <button className="media-btn prev" aria-hidden="true"><Icon name="chevron" className="h-4 w-4 rotate-180" /></button>
        <button className="media-btn next" aria-hidden="true"><Icon name="chevron" className="h-4 w-4" /></button>
      </div>

      <div className="space-y-2 px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="stat text-heart"><LikeButton postId={post._id} /><LikeCount postId={post._id} /></span>
          <button className="stat" onClick={openDetail}><Icon name="comment" className="h-5 w-5" /> {formatCount(comments.length)}</button>
          <button className="stat" onClick={openDetail}><Icon name="share" className="h-5 w-5" /></button>
          <button className="stat ml-auto" aria-label="Save"><Icon name="bookmark" className="h-5 w-5" /></button>
        </div>

        {post.caption && (
          <p className="text-sm leading-relaxed">
            <span className="mr-1 font-extrabold">{name}</span>
            {parts.map((part, i) =>
              part.startsWith("#") ? <span key={i} className="hash">{part} </span> : <span key={i}>{part}</span>
            )}
          </p>
        )}

        <button onClick={openDetail} className="block text-sm text-[var(--muted)]">
          {comments.length > 0 ? `View all ${comments.length} comments` : "Add a comment"}
        </button>
      </div>
    </article>
  );
}
