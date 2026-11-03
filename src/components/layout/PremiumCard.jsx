import { useNavigate } from "react-router-dom";
import Icon from "../ui/Icon";

export default function PremiumCard() {
  const navigate = useNavigate();

  return (
    <div className="premium">
      <div className="mb-2 flex items-center gap-2 text-amber-300">
        <Icon name="crown" className="h-4 w-4" filled />
        <span className="text-xs font-bold">Go Premium</span>
      </div>
      <h3>Unlock extra tools</h3>
      <p>Keep posting, following and chatting — upgrade when you want more reach.</p>
      <button onClick={() => navigate("/settings")}>Upgrade Now →</button>
    </div>
  );
}
