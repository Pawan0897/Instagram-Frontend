import { useState } from "react";
import { useCreatePost } from "../../hooks/queries";
import Button from "../ui/Button";
import { FormError, Textarea } from "../ui/Field";
import Modal from "../ui/Modal";
import ImagePicker from "./ImagePicker";

export default function CreatePostModal({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");

  const close = () => { setFile(null); setCaption(""); onClose(); };
  const create = useCreatePost({ onSuccess: close });

  return (
    <Modal open={open} onClose={close} title="New post">
      <form
        className="space-y-4 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (file) create.mutate({ file, caption: caption.trim() });
        }}
      >
        <ImagePicker file={file} onChange={setFile} />
        <Textarea label="Caption" rows={3} maxLength={500} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write a caption" />
        <FormError error={create.error} />
        <Button type="submit" full size="lg" disabled={!file} loading={create.isPending}>
          Share
        </Button>
      </form>
    </Modal>
  );
}
