import { useState } from "react";
import { ENUMS } from "../../api/endpoint";
import { useRespondFollow } from "../../hooks/queries";
import Button from "../ui/Button";
import { FormError, Input } from "../ui/Field";

/**
 * POST /follow/accept-reject {_id, followStatus}
 * Backend pending requests ki list nahi deta, isliye request ID se respond karte hain.
 */
export default function FollowRequests() {
  const [id, setId] = useState("");
  const respond = useRespondFollow({ onSuccess: () => setId("") });
  const valid = /^[0-9a-f]{24}$/i.test(id.trim());

  const send = (followStatus) => respond.mutate({ _id: id.trim(), followStatus });

  return (
    <div className="space-y-4 p-5">
      <div>
        <h3 className="font-semibold">Respond to a follow request</h3>
        <p className="mt-1 text-sm text-mute">
          Private account? Paste the request ID to accept or decline it.
        </p>
      </div>
      <Input label="Request ID" value={id} onChange={(e) => setId(e.target.value)} placeholder="24-character ID" className="font-mono text-sm" />
      <FormError error={respond.error} />
      <div className="flex gap-2">
        <Button disabled={!valid} loading={respond.isPending} onClick={() => send(ENUMS.FOLLOW_STATUS.ACCEPT)}>
          Accept
        </Button>
        <Button variant="secondary" disabled={!valid || respond.isPending} onClick={() => send(ENUMS.FOLLOW_STATUS.REJECT)}>
          Decline
        </Button>
      </div>
    </div>
  );
}
