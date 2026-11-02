import { EmptyState } from "../ui/States";

/** items: [{_id, post}] — profile aur liked page dono use karte hain */
export default function PostGrid({ items, onOpen, empty }) {
  if (!items.length) return empty || <EmptyState title="Nothing here yet" />;
  console.log(items, "............");
  return (
    <ul className="grid grid-cols-3 gap-1 md:gap-2">
      {items.map(
        (p) => (
          console.log(p),
          (
            <li key={p._id}>
              <button
                onClick={() => onOpen(p)}
                className="group relative block aspect-square w-full overflow-hidden bg-paper"
                aria-label="Open post"
              >
                <img
                  src={p.post}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            </li>
          )
        ),
      )}
    </ul>
  );
}
