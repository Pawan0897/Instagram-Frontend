import { displayName } from "../../utils";
import Avatar from "../ui/Avatar";
import { EmptyState, ErrorState, Skeleton } from "../ui/States";

/** Followers / Following dono ke liye same list. Items: {userName, email, image, socialAccount} */
export default function PeopleList({ query, items, emptyTitle, emptyText }) {
  if (query.isLoading) {
    return (
      <div className="space-y-3 p-4">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }
  if (query.isError) return <ErrorState error={query.error} onRetry={query.refetch} />;
  if (!items.length) return <EmptyState icon="users" title={emptyTitle} text={emptyText} />;

  return (
    <ul className="divide-y divide-line">
      {items.map((u, i) => {
        const name = displayName(u);
        return (
          <li key={u.email || i} className="flex items-center gap-3 px-4 py-3">
            <Avatar src={u.image} name={name} size="md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{name}</p>
              <p className="truncate text-xs text-mute">{u.email}</p>
            </div>
            {u.socialAccount === 1 && (
              <span className="flex items-center gap-1 rounded-full bg-ink/5 px-2 py-1 text-xs font-medium text-mute">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                Private
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
