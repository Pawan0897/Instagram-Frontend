import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { ENUMS } from "../../api/endpoint";
import { profileApi } from "../../api/services";
import { setUser } from "../../store/authSlice";
import { notify } from "../../lib/alert";

// Uiverse-style toggle (CSS: .uv-switch)
export default function PrivacySwitch() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const isPrivate = user.socialAccount === ENUMS.SOCIAL_ACCOUNT.PRIVATE;

  // PUT /onboarding/user { socialAccount }
  const update = useMutation({
    mutationFn: profileApi.update,
    onSuccess: (res) => {
      dispatch(setUser(res.data));
      notify.success(res.message);
    },
  });

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-medium">Private account</p>
        <p className="text-sm text-mute">
          {isPrivate ? "People need your approval to follow you." : "Anyone can follow you."}
        </p>
      </div>
      <label className="uv-switch">
        <input
          type="checkbox"
          role="switch"
          checked={isPrivate}
          disabled={update.isPending}
          onChange={() =>
            update.mutate({ socialAccount: isPrivate ? ENUMS.SOCIAL_ACCOUNT.PUBLIC : ENUMS.SOCIAL_ACCOUNT.PRIVATE })
          }
        />
        <span className="uv-slider" />
      </label>
    </div>
  );
}
