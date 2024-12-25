import { usePageName } from "@/hooks/usePageName";
import OrganizationHeader from "./OrganizationHeader";
import OrganizationSidebar from "./OrganizationSidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const pageName = usePageName();

  return (
    <div className="flex overflow-hidden w-full h-screen">
      <OrganizationSidebar />
      <div className="flex flex-col w-full overflow-hidden">
        <OrganizationHeader pageName={pageName} />
        <div className="overflow-hidden h-screen p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
