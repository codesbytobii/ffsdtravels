// import { usePageName } from "@/hooks/usePageName";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   const pageName = usePageName();

//   return (
//     <div className="flex  w-full h-screen">
//       <AdminSidebar />
//       <div className="flex flex-col w-full ">
//         <AdminHeader pageName={pageName} />
//         <div className=" h-screen p-4">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;






import { useEffect, useState } from "react";
import { usePageName } from "@/hooks/usePageName";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import OrganizationSidebar from "../organization/OrganizationSidebar";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../staff/StaffSidebar";

const Layout = () => {
  const pageName = usePageName();
  const [userType, setUserType] = useState<string | null>(null); // State to track user_type

  // Use useEffect to run the logic only once after the component mounts
  useEffect(() => {
    // Retrieve user_type from localStorage
    const user_type = localStorage.getItem("userType");

    // Set the userType state
    if (user_type) {
      setUserType(user_type);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="flex w-full h-screen">
      {/* Conditionally render sidebars based on user role or login status */}
      {userType === "admin" || userType === "system_admin" ? (
        <AdminSidebar />
      ) : userType === "staff" ? (
        <StaffSidebar />
      ) : (
        <OrganizationSidebar />
      )}

      <div className="flex flex-col w-full ">
        <AdminHeader pageName={pageName} />
        <div className=" h-screen p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;





// import { useEffect, useState } from "react";
// import { usePageName } from "@/hooks/usePageName";
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import OrganizationSidebar from "../organization/OrganizationSidebar";
// import StaffSidebar from "../staff/StaffSidebar";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   const pageName = usePageName();
//   const [userType, setUserType] = useState<string | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

//   useEffect(() => {
//     const user_type = localStorage.getItem("userType");
//     if (user_type) {
//       setUserType(user_type);
//     }
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const renderSidebar = () => {
//     if (userType === "admin" || userType === "system_admin") {
//       return <AdminSidebar />;
//     }
//     if (userType === "staff") {
//       return <StaffSidebar />;
//     }
//     return <OrganizationSidebar />;
//   };

//   return (
//     <div className="flex w-full h-screen">
//       {/* Sidebar with conditional visibility */}
//       <div
//         className={`fixed z-50 h-screen bg-white shadow-md transition-transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:static md:translate-x-0`}
//       >
//         {renderSidebar()}
//       </div>

//       {/* Main content */}
//       <div className="flex flex-col w-full">
//         {/* <AdminHeader pageName={pageName}> */}
//           {/* Breadcrumb button for mobile */}
//           <button
//             className="md:hidden p-2 text-gray-600 hover:text-gray-800"
//             onClick={toggleSidebar}
//           >
//             ☰
//           </button>
//         {/* </AdminHeader> */}
//         <div className="h-screen p-4">
//           <Outlet />
//         </div>
//       </div>

//       {/* Overlay for mobile view */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default Layout;
