import { Empty } from "../components/ui/Loader";

export default function MessagesPage() {
  return (
    <div className="vs-card">
      <h1 className="page-title px-5 pt-5">Messages</h1>
      <Empty title="No messages yet" text="When someone writes to you, it will show up here." />
    </div>
  );
}
