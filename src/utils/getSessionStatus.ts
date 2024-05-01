export const getSessionStatus = (
  status: "authenticated" | "loading" | "unauthenticated"
) => {
  return {
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    isUnauthenticated: status === "unauthenticated",
  };
};
