import { useQuery } from "@tanstack/react-query";
import { likeApi } from "../../api/services";
import { displayName } from "../../lib/format";
import Avatar from "../ui/Avatar";
import { Empty, Loader } from "../ui/Loader";
import Modal from "../ui/Modal";

export default function LikesModal({ postId }) {
  // GET /like/likeUserListing/:id -> [{ userDetails: [{ userName, email }] }]
  const { data = [], isLoading } = useQuery({
    queryKey: ["likers", postId],
    queryFn: () => likeApi.users(postId),
  });

  return (
    <Modal title="Likes">
      {isLoading && <Loader />}
      {!isLoading && data.length === 0 && <Empty title="No likes yet" />}
      <ul className="p-2">
        {data.map((row) => {
          const u = row.userDetails?.[0];
          return (
            <li key={row._id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-paper">
              <Avatar name={displayName(u)} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{displayName(u)}</p>
                <p className="truncate text-xs text-mute">{u?.email}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
