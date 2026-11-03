import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../../api/services";
import { setUser } from "../../store/authSlice";
import { notify } from "../../lib/alert";
import { displayName } from "../../lib/format";
import Avatar from "../ui/Avatar";

export default function ProfilePhoto() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((s) => s.auth.user);
  const inputRef = useRef(null);

  const upload = useMutation({
    mutationFn: (file) => profileApi.avatar(file),
    onSuccess: (res) => {
      dispatch(setUser(res.data));
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["people"] });
      notify.success(res.message || "Photo updated");
    },
  });

  function onPick(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) upload.mutate(file);
  }

  return (
    <button type="button" className="dp-btn" onClick={() => inputRef.current?.click()} aria-label="Change profile photo">
      <Avatar src={user?.image} name={displayName(user)} size="xl" ring />
      <span className="dp-hover">{upload.isPending ? "Saving…" : "Change photo"}</span>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onPick} />
    </button>
  );
}
