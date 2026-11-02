import { useLikers } from "../../hooks/queries";
import { displayName } from "../../utils";
import Avatar from "../ui/Avatar";
import Modal from "../ui/Modal";
import { EmptyState, Skeleton } from "../ui/States";

export default function LikesModal({ postId, open, onClose }) {
  const { data = [], isLoading } = useLikers(postId, open);

  return (
    <Modal open={open} onClose={onClose} title="Likes">
      <div className="min-h-40 p-2">
        {isLoading && (
          <div className="space-y-3 p-3">
            {[0, 1, 2].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
          </div>
        )}
        {!isLoading && data.length === 0 && (
          <EmptyState icon="heart" title="No likes yet" text="Be the first to like this post." />
        )}
        {data.map((row) => {
          const u = row.userDetails?.[0];
          const name = displayName(u);
          return (
            <div key={row._id} className="flex items-center gap-3 rounded-lg p-3 hover:bg-paper">
              <Avatar name={name} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{name}</p>
                {u?.email && <p className="truncate text-xs text-mute">{u.email}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
