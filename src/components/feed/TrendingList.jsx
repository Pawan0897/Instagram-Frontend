import { useQuery } from "@tanstack/react-query";
import { postApi } from "../../api/services";
import { formatCount } from "../../lib/format";
import Icon from "../ui/Icon";

export default function TrendingList() {
  const { data: posts = [] } = useQuery({ queryKey: ["feed"], queryFn: postApi.feed });
  const tags = {};
  posts.forEach((p) => {
    String(p.caption || "").match(/#[\w]+/g)?.forEach((t) => {
      tags[t] = (tags[t] || 0) + 1;
    });
  });
  const list = Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <section className="vs-card p-4">
      <h2 className="mb-4 text-[15px] font-extrabold">Trending Today 🔥</h2>
      {list.length === 0 && <p className="text-sm text-[var(--muted)]">Hashtags from captions show up here.</p>}
      <ul className="space-y-3">
        {list.map(([tag, n]) => (
          <li key={tag} className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f4eefc] text-[var(--color-brand)]">
              <Icon name="spark" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{tag.replace("#", "")}</p>
              <p className="text-[11px] text-[var(--muted)]">{formatCount(n)} posts</p>
            </div>
            <Icon name="chevron" className="h-4 w-4 text-[var(--muted)]" />
          </li>
        ))}
      </ul>
    </section>
  );
}
