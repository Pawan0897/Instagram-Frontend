import { MutationCache, QueryClient } from "@tanstack/react-query";
import { notify } from "./alert";

export const queryClient = new QueryClient({
  // Koi bhi mutation fail ho to ek hi jagah se error toast aa jata hai
  mutationCache: new MutationCache({
    onError: (error) => notify.error(error.message),
  }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: (count, err) => ![400, 401].includes(err?.status) && count < 1,
    },
  },
});
