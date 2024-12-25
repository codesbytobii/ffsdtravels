import { PRIVATE_ROUTES } from "@/routes/Routes";
import { useLocation } from "react-router-dom";

export const usePageName = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const route = PRIVATE_ROUTES.find((route) => route.link === currentPath);

  return route ? route.pageName : "Default Page Name";
};