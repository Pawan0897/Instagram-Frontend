import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tokenStore } from "../api/http";
import { profileApi } from "../api/services";
import { qk } from "../hooks/queries";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const qc = useQueryClient();
  const [token, setToken] = useState(() => tokenStore.get());

  const meQuery = useQuery({
    queryKey: qk.me,
    queryFn: profileApi.me,
    enabled: !!token,
    retry: false,
    staleTime: 60_000,
  });

  // login / signup / otp-login response (data) me token + user dono aate hain
  const signIn = useCallback(
    (data) => {
      const { token: jwt, password, ...user } = data;
      tokenStore.set(jwt);
      setToken(jwt);
      qc.setQueryData(qk.me, user);
    },
    [qc]
  );

  const signOut = useCallback(() => {
    tokenStore.clear();
    setToken(null);
    qc.clear();
  }, [qc]);

  // http.js 401 + isSessionExpired par ye event fire karta hai
  useEffect(() => {
    const onExpired = () => {
      setToken(null);
      qc.clear();
    };
    window.addEventListener("auth:expired", onExpired);
    return () => window.removeEventListener("auth:expired", onExpired);
  }, [qc]);

  const value = useMemo(
    () => ({
      token,
      user: meQuery.data,
      isAuthed: !!token,
      isLoadingUser: !!token && meQuery.isLoading,
      signIn,
      signOut,
    }),
    [token, meQuery.data, meQuery.isLoading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
