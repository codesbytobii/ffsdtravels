import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PROTECTED_ROUTES = () => {
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to="/authentication?view=login"
        state={{ from: location }}
        replace
      />
    );
  }
};

export default PROTECTED_ROUTES;