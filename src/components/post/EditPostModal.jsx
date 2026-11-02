import { useEffect, useState } from "react";
import { usePost, useUpdatePost } from "../../hooks/queries";
import Button from "../ui/Button";
import { FormError, Textarea } from "../ui/Field";
import Modal from "../ui/Modal";
import ImagePicker from "./ImagePicker";

export default function EditPostModal({ post, open, onClose }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState(post.caption || "");
  // feed API caption nahi deti, isliye GET /post/:id se caption laate hain
  const { data: full } = usePost(post._id, open);
  useEffect(() => {
    if (full) setCaption(full.caption || "");
  }, [full]);

  const close = () => { setFile(null); onClose(); };
  const update = useUpdatePost({ onSuccess: close });

  return (
    <Modal open={open} onClose={close} title="Edit post">
      <form
        className="space-y-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (file) update.mutate({ id: post._id, file, caption: caption.trim() });
        }}
      >
        <ImagePicker file={file} onChange={setFile} currentSrc={post.post} />
        <Textarea label="Caption" rows={3} maxLength={500} value={caption} onChange={(e) => setCaption(e.target.value)} />
        {/* Backend PUT /post/:id me file zaroori hai (post.js service), isliye photo chunna padega */}
        <p className="text-xs text-mute">Choose a photo to save changes. The server replaces the image on every edit.</p>
        <FormError error={update.error} />
        <Button type="submit" full size="lg" disabled={!file} loading={update.isPending}>
          Save changes
        </Button>
      </form>
    </Modal>
  );
}
