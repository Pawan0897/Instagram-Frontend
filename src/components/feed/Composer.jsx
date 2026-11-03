import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/uiSlice";
import { displayName } from "../../lib/format";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";

export default function Composer() {
  const dispatch = useDispatch();
  const me = useSelector((s) => s.auth.user);
  const open = () => dispatch(openModal({ name: "createPost" }));

  return (
    <section className="vs-card p-4">
      <div className="flex items-center gap-3">
        <Avatar src={me?.image} name={displayName(me)} size="md" />
        <button onClick={open} className="flex-1 text-left text-[15px] text-[var(--muted)]">
          What's on your mind?
        </button>
        <span className="hidden text-[var(--color-brand)] sm:block"><Icon name="spark" /></span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="composer-tools">
          <button className="tool" onClick={open}><Icon name="image" className="h-4 w-4 text-emerald-500" /> Photo</button>
          <button className="tool" onClick={open}><Icon name="video" className="h-4 w-4 text-rose-500" /> Video</button>
          <button className="tool" onClick={open}><Icon name="smile" className="h-4 w-4 text-amber-500" /> Feeling</button>
          <button className="tool" onClick={open}><Icon name="pin" className="h-4 w-4 text-sky-500" /> Check In</button>
        </div>
        <button className="chip chip-fill hidden sm:inline-flex" onClick={open}>Post →</button>
      </div>
    </section>
  );
}
