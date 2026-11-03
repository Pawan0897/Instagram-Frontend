import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "./api/services";
import { logout, setUser } from "./store/authSlice";
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import LoginWithOtp from "./components/auth/LoginWithOtp";
import ForgotPassword from "./components/auth/ForgotPassword";
import Button from "./components/ui/Button";
import { Loader } from "./components/ui/Loader";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import LikedPage from "./pages/LikedPage";
import PeoplePage from "./pages/PeoplePage";
import SettingsPage from "./pages/SettingsPage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";

export default function App() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { token, user } = useSelector((s) => s.auth);

  const { data, isError, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: profileApi.me,
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data, dispatch]);

  useEffect(() => {
    const handleExpired = () => {
      dispatch(logout());
      queryClient.clear();
    };
    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, [dispatch, queryClient]);

  if (!token) {
    return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login-otp" element={<LoginWithOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    );
  }

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center">
        {isError ? (
          <div className="space-y-3 text-center">
            <p className="text-sm text-mute">Could not reach the server.</p>
            <div className="flex justify-center gap-2">
              <Button onClick={() => refetch()}>Retry</Button>
              <Button light onClick={() => dispatch(logout())}>Log out</Button>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<FeedPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="liked" element={<LikedPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
