import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { followApi } from "../../api/services";
import { openModal } from "../../store/uiSlice";
import { displayName } from "../../lib/format";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";

export default function StoryRail() {
  const dispatch = useDispatch();
  const me = useSelector((s) => s.auth.user);
  const { data } = useQuery({ queryKey: ["following"], queryFn: followApi.following });
  const people = data?.following || [];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      <button onClick={() => dispatch(openModal({ name: "createPost" }))} className="story-item">
        <div className="relative h-[92px] overflow-hidden rounded-2xl bg-[#ece4f6]">
          {me?.image ? <img src={me.image} alt="" className="h-full w-full object-cover opacity-80" /> : null}
          <span className="absolute bottom-2 left-1/2 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full bg-[var(--color-brand)] text-white">
            <Icon name="plus" className="h-4 w-4" />
          </span>
        </div>
        <p>Create Story</p>
      </button>
      {people.map((u, i) => (
        <div key={u._id || u.email || i} className="story-item">
          <div className="mx-auto">
            <Avatar src={u.image} name={displayName(u)} size="lg" ring />
          </div>
          <p>{displayName(u)}</p>
        </div>
      ))}
      <Link to="/people" className="story-item hidden sm:block">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#2a2438] text-white">
          <Icon name="grid" />
        </div>
        <p>View All</p>
      </Link>
    </div>
  );
}
