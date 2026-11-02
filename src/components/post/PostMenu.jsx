import { useState } from "react";
import { useDeletePost } from "../../hooks/queries";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import EditPostModal from "./EditPostModal";

/** Sirf apni post par dikhta hai: Edit + Delete */
export default function PostMenu({ post, onDeleted }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const del = useDeletePost({
    onSuccess: () => {
      setConfirm(false);
      onDeleted?.();
    },
  });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Post options"
        aria-expanded={open}
        className="rounded-full p-1.5 text-ink hover:bg-paper"
      >
        <Icon name="dots" className="h-5 w-5" strokeWidth={2.4} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="modal-in absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-xl border border-line bg-card py-1 shadow-lg">
            <button
              onClick={() => { setOpen(false); setEdit(true); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm hover:bg-paper"
            >
              <Icon name="edit" className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={() => { setOpen(false); setConfirm(true); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-heart hover:bg-paper"
            >
              <Icon name="trash" className="h-4 w-4" /> Delete
            </button>
          </div>
        </>
      )}

      <EditPostModal post={post} open={edit} onClose={() => setEdit(false)} />

      <Modal open={confirm} onClose={() => setConfirm(false)} title="Delete post?">
        <div className="space-y-4 p-5">
          <p className="text-sm text-mute">This post will be removed from your profile and your followers' feeds.</p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirm(false)}>Keep post</Button>
            <Button variant="danger" loading={del.isPending} onClick={() => del.mutate(post._id)}>
              Delete post
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
