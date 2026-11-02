import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppShell from "./components/layout/AppShell";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import LikedPage from "./pages/LikedPage";
import ConnectionsPage from "./pages/ConnectionsPage";
import SettingsPage from "./pages/SettingsPage";
import { PostSkeleton } from "./components/ui/States";

export default function App() {
  const { isAuthed, isLoadingUser } = useAuth();

  if (!isAuthed) return <AuthPage />;

  // user._id chahiye (apni post / comment pehchanne ke liye) -> profile aane tak wait
  if (isLoadingUser) {
    return (
      <div className="mx-auto max-w-[470px] p-6">
        <PostSkeleton />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<FeedPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="liked" element={<LikedPage />} />
        <Route path="connections" element={<ConnectionsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
