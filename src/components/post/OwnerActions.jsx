import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../../api/services";
import { closeAllModals, openModal } from "../../store/uiSlice";
import { confirmBox, notify } from "../../lib/alert";
import Icon from "../ui/Icon";

// Apni post par Edit + Delete icons
export default function OwnerActions({ postId }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // DELETE /post  { postId }
  const remove = useMutation({
    mutationFn: () => postApi.remove(postId),
    onSuccess: (res) => {
      notify.success(res.message);
      ["feed", "myPosts", "myLikes"].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      dispatch(closeAllModals());
    },
  });

  async function handleDelete() {
    const ok = await confirmBox({
      title: "Delete this post?",
      text: "It will be removed from your profile and your followers' feeds.",
      confirmText: "Delete",
    });
    if (ok) remove.mutate();
  }

  return (
    <div className="flex items-center gap-1 text-mute">
      <button onClick={() => dispatch(openModal({ name: "editPost", data: { postId } }))}
        aria-label="Edit post" className="rounded-full p-1.5 hover:bg-black/5 hover:text-ink">
        <Icon name="edit" className="h-5 w-5" />
      </button>
      <button onClick={handleDelete} aria-label="Delete post" className="rounded-full p-1.5 hover:bg-black/5 hover:text-heart">
        <Icon name="trash" className="h-5 w-5" />
      </button>
    </div>
  );
}
