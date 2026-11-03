import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { likeApi } from "../../api/services";
import { openModal } from "../../store/uiSlice";
import { formatCount } from "../../lib/format";

export default function LikeCount({ postId }) {
  const dispatch = useDispatch();
  const { data: count = 0 } = useQuery({
    queryKey: ["likeCount", postId],
    queryFn: () => likeApi.count(postId),
    select: (rows) => rows?.[0]?.likeCount ?? 0,
  });

  return (
    <button onClick={() => dispatch(openModal({ name: "likes", data: { postId } }))}>
      {formatCount(count)}
    </button>
  );
}
