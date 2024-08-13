import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: 60000, // 1 minute
    },
  },
});
