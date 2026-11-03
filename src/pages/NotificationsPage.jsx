import { useQuery } from "@tanstack/react-query";
import { followApi } from "../api/services";
import RequestForm from "../components/follow/RequestForm";
import { Empty, Loader } from "../components/ui/Loader";

export default function NotificationsPage() {
  const { data: requests = [], isLoading } = useQuery({ queryKey: ["followRequests"], queryFn: followApi.requests });

  return (
    <div className="vs-card overflow-hidden">
      <h1 className="page-title px-5 pt-5">Notifications</h1>
      {isLoading && <Loader />}
      {!isLoading && requests.length === 0 && (
        <Empty title="You're all caught up" text="Follow requests and activity will land here." />
      )}
      {!isLoading && requests.length > 0 && <RequestForm />}
    </div>
  );
}
