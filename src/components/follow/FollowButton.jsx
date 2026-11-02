import { useState } from "react";
import { ENUMS } from "../../api/endpoint";
import { useFollowing, useToggleFollow } from "../../hooks/queries";
import Button from "../ui/Button";

/**
 * Backend ek hi route deta hai (POST /follow) jo toggle karta hai:
 *   - response data = null  -> unfollowed / request cancelled
 *   - followStatus 1        -> following
 *   - followStatus 0        -> request sent (private account)
 * Initial state ke liye following list me userName match karte hain (list me _id nahi aati).
 */
export default function FollowButton({ userId, userName, size = "sm" }) {
  const { data } = useFollowing();
  const [override, setOverride] = useState(null);

  const guessed =
    userName && data?.following?.some((u) => u.userName === userName) ? "following" : "none";
  const state = override ?? guessed;

  const toggle = useToggleFollow({
    onSuccess: (res) => {
      if (!res.data) return setOverride("none");
      setOverride(res.data.followStatus === ENUMS.FOLLOW_STATUS.ACCEPT ? "following" : "requested");
    },
  });

  const label = { none: "Follow", following: "Following", requested: "Requested" }[state];

  return (
    <Button
      size={size}
      variant={state === "none" ? "primary" : "secondary"}
      loading={toggle.isPending}
      onClick={() => toggle.mutate(userId)}
    >
      {label}
    </Button>
  );
}
