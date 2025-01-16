import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminUserIcon from "@/assets/svg/AdminUserIcon";
import DashBoardIcon from "@/assets/svg/DashBoardIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import CompanyIcon from "@/assets/svg/CompanyIcon";
// import WalletIcon from "@/assets/svg/WalletIcon";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import { Button } from "@/components/ui/button";
import LogoutIcon from "@/assets/svg/LogoutIcon";
import FlightDataIcon from "@/assets/svg/FlightDataIcon";
import logo from '@/assets/img/ffsdTravelLogo.png'
// import { WalletIcon } from "lucide-react";

interface MenuItem {
  url: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  tooltip: string;
}

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const isMenuActive = (menuUrl: string) => location.pathname === menuUrl;

  const mainMenuItems: MenuItem[] = [
    {
      url: "/admin/dashboard",
      icon: <DashBoardIcon useGrayScale={true} size="40" />,
      activeIcon: <DashBoardIcon size="40" />,
      tooltip: "Dashboard",
    },
    {
      url: "/admin/manageuser",
      icon: <AdminUserIcon useGrayScale={true} size="40" />,
      activeIcon: <AdminUserIcon size="40" />,
      tooltip: "Users",
    },
    {
      url: "/admin/managepermissions",
      icon: <CompanyIcon useGrayScale={true} size="40" />,
      activeIcon: <CompanyIcon size="40" />,
      tooltip: "Permissions",
    },
    // {
    //   url: "/admin/Wallet",
    //   icon: <WalletIcon useGrayScale={true} size="40" />,
    //   activeIcon: <WalletIcon size="40" />,
    //   tooltip: "Wallet",
    // },
    {
      url: "/admin/FlightData",
      icon: <FlightDataIcon useGrayScale={true} size="40" />,
      activeIcon: <FlightDataIcon size="40" />,
      tooltip: "FlightData",
    },
    {
      url: "/admin/Markup",
      icon: <FlightDataIcon useGrayScale={true} size="40" />,
      activeIcon: <FlightDataIcon size="40" />,
      tooltip: "Markup",
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      url: "/admin/profile",
      icon: <ProfileIcon useGrayScale={true} size="40" />,
      activeIcon: <ProfileIcon size="40" />,
      tooltip: "Profile",
    },
  ];

  const menuVariants = {
    active: {
      scale: 1.1,
      backgroundColor: "rgba(113, 113, 113, 0.1)",
      transition: { duration: 0.3 },
    },
    inactive: {
      scale: 1,
      backgroundColor: "transparent",
      transition: { duration: 0.3 },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");

    navigate("/authentication?view=login");
  };

  return (
    <div className="w-200 h-screen p-4 shadow-sm shadow-gray-200 lg:flex flex-col md:flex sm:hidden hidden">
      {/* <div className="mb-6">Logo</div> */}
        <button
          onClick={() => navigate("/")}
          className="font-semibold cursor-pointer"
        >
          <img src={logo} alt="Logo" className="w-[100px]" />
        </button>

      <div className="flex flex-col flex-grow">
        <div className="flex flex-col gap-4 mt-[80px]">
          {mainMenuItems.map((menuItem, index) => {
            const isActive = isMenuActive(menuItem.url);
            return (
              <motion.div
                key={index}
                initial={false}
                animate={isActive ? "active" : "inactive"}
                variants={menuVariants}
                className={classNames(
                  "h-10 rounded-md flex items-center justify-center transition-colors duration-200 ease-in-out relative group",
                  {
                    "bg-primaryDark bg-opacity-10 p-2": isActive,
                    "hover:bg-gray-300 p-2": !isActive,
                  }
                )}
              >
                <Link
                  to={menuItem.url}
                  aria-current={isActive ? "page" : undefined}
                  className="flex items-center justify-left w-full"
                >
                  <span>{isActive ? menuItem.activeIcon : menuItem.icon}</span>
                  <span> {menuItem.tooltip}</span>
                </Link>
                {/* <span className="absolute z-20 left-full ml-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {menuItem.tooltip}
                </span> */}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-4 items-center">
          <div>
            {bottomMenuItems.map((menuItem, index) => {
              const isActive = isMenuActive(menuItem.url);
              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={isActive ? "active" : "inactive"}
                  variants={menuVariants}
                  className={classNames(
                    "h-10 rounded-md flex items-center justify-center transition-colors duration-200 ease-in-out relative group",
                    {
                      "bg-primaryDark bg-opacity-10 p-2": isActive,
                      "hover:bg-gray-300 p-2": !isActive,
                    }
                  )}
                >
                  <Link
                    to={menuItem.url}
                    aria-current={isActive ? "page" : undefined}
                    className="flex items-center justify-center w-full"
                  >
                    <span>
                      {isActive ? menuItem.activeIcon : menuItem.icon}
                    </span>
                    <span> {menuItem.tooltip}</span>
                  </Link>
                  {/* <span className="absolute left-full ml-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {menuItem.tooltip}
                  </span> */}
                </motion.div>
              );
            })}
          </div>

          <div>
            <Button
              className="bg-transparent p-0 hover:bg-transparent"
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
              onClick={handleLogout}
            >
              <LogoutIcon useGrayScale={!isLogoutHovered} size="30" />

              <span className="text-black">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;




