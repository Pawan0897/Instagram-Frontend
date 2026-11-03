import { useState } from "react";
import PeopleList from "../components/follow/PeopleList";
import RequestForm from "../components/follow/RequestForm";

const tabs = [
  { key: "all", label: "People" },
  { key: "followers", label: "Followers" },
  { key: "following", label: "Following" },
  { key: "requests", label: "Requests" },
];

export default function PeoplePage() {
  const [tab, setTab] = useState("all");

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="page-title">Explore</h1>
      <div className="vs-card overflow-hidden">
        <div className="flex" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 border-b-2 py-3 text-sm font-bold ${tab === t.key ? "border-[var(--color-brand)] text-[var(--color-brand)]" : "border-transparent text-[var(--muted)]"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "requests" ? <RequestForm /> : <PeopleList type={tab} />}
      </div>
    </div>
  );
}
