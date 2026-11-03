import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../../api/services";
import { logout } from "../../store/authSlice";
import { closeAllModals } from "../../store/uiSlice";
import { confirmBox } from "../../lib/alert";
import Button from "../ui/Button";

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // DELETE /onboarding
  const remove = useMutation({
    mutationFn: profileApi.deleteAccount,
    onSuccess: () => {
      dispatch(closeAllModals());
      dispatch(logout());
      queryClient.clear();
    },
  });

  async function handleDelete() {
    const ok = await confirmBox({
      title: "Delete your account?",
      text: "You will be logged out and your profile will be removed.",
      confirmText: "Delete account",
    });
    if (ok) remove.mutate();
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-medium">Delete account</p>
        <p className="text-sm text-mute">This logs you out everywhere.</p>
      </div>
      <Button danger loading={remove.isPending} onClick={handleDelete}>Delete</Button>
    </div>
  );
}
