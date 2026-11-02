import { useEffect, useRef, useState } from "react";
import { useLikedByMe, useToggleLike } from "../../hooks/queries";
import Icon from "../ui/Icon";

export default function LikeButton({ postId, className = "h-7 w-7" }) {
  const { data: liked = false } = useLikedByMe(postId);
  const toggle = useToggleLike(postId);
  const [pop, setPop] = useState(false);
  const prev = useRef(liked);

  // sirf like hone par pop animation
  useEffect(() => {
    if (liked && !prev.current) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 340);
      return () => clearTimeout(t);
    }
    prev.current = liked;
  }, [liked]);

  return (
    <button
      onClick={() => toggle.mutate()}
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      className={`transition-transform active:scale-90 ${liked ? "text-heart" : "text-ink hover:text-mute"}`}
    >
      <span className={`inline-block ${pop ? "heart-pop" : ""}`}>
        <Icon name="heart" filled={liked} className={className} />
      </span>
    </button>
  );
}
