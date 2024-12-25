import { usePageName } from "@/hooks/usePageName";
import StaffHeader from "./StaffHeader";
import StaffSidebar from "./StaffSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const pageName = usePageName();

  return (
    <div className="flex overflow-hidden w-full h-screen">
      <StaffSidebar />
      <div className="flex flex-col w-full overflow-hidden">
        <StaffHeader pageName={pageName} />
        <div className="overflow-hidden h-screen p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
