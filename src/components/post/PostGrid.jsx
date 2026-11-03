import { useDispatch } from "react-redux";
import { openModal } from "../../store/uiSlice";

// items: [{ _id, post }]  — click par post detail modal Redux se khulta hai
export default function PostGrid({ items }) {
  const dispatch = useDispatch();

  return (
    <ul className="grid grid-cols-3 gap-1 md:gap-5">
      {items.map((p) => (
        <li key={p._id}>
          <button
            onClick={() => dispatch(openModal({ name: "postDetail", data: { postId: p._id } }))}
            aria-label="Open post"
            className="block aspect-square w-full overflow-hidden rounded-xl bg-[var(--soft)]"
          >
            <img src={p.post} alt="" loading="lazy" className="h-full w-full object-cover transition-opacity hover:opacity-85" />
          </button>
        </li>
      ))}
    </ul>
  );
}
