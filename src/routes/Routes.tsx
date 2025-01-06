// import BookFlightPage from "@/pages/search/bookflight";
// import StaffDashboard from "@/pages/staff/dashboard/Dashboard";
// import { lazy } from "react";

// const LandingPage = lazy(() => import("@/pages/Landing"));
// const WalletPage = lazy(() => import("@/pages/admin/Wallet"));
// const SearchPage = lazy(() => import("@/pages/search/Search"));
// const RoundTripSearchPage = lazy(() => import("@/pages/search/RoundTripSearch"));
// const MultiCitySearchPage = lazy(() => import("@/pages/search/MultiCitySearch"));
// const AuthenticationPage = lazy(
//   () => import("@/pages/auth/AuthenticationPage")
// );
// const DashBoardPage = lazy(() => import("@/pages/admin/dashboard/Dashboard"));
// const OrganizationDashboard = lazy(() => import("@/pages/organization/dashboard/Dashboard"));
// const ManageUserPage = lazy(
//   () => import("@/pages/admin/manageUser/ManageUsers")
// );
// const ManageOrganizationUserPage = lazy(
//   () => import("@/pages/admin/manageUser/ManageOrganizationUsers")
// );
// const ManagePermissionsPage = lazy(
//   () => import("@/pages/admin/ManagePermissions")
// );
// const ProfilePage = lazy(() => import("@/pages/admin/AdminProfile"));
// // import OrganizationDashboard from '../pages/admin/dashboard/OrganizationDashboard';

// const routes = {
//   landing: {
//     link: "/",
//     element: <LandingPage />,
//     pageName: "Landing Page",
//   },
//   search: {
//     link: "/search",
//     element: <SearchPage />,
//     pageName: "Search",
//   },
//   roundtripsearch: {
//     link: "/roundtripsearch",
//     element: <RoundTripSearchPage />,
//     pageName: "Roundtripsearch",
//   },
//   multicitysearch: {
//     link: "/multicitysearch",
//     element: <MultiCitySearchPage />,
//     pageName: "MultiCitysearch",
//   },
//   authentication: {
//     link: "/authentication",
//     element: <AuthenticationPage />,
//     pageName: "Authentication",
//   },
//   dashboard: {
//     link: "/admin/dashboard",
//     element: <DashBoardPage />,
//     pageName: "Dashboard",
//   },
//   organizationDashboard: {
//     link: "/admin/organizationdashboard",
//     element: <OrganizationDashboard />,
//     pageName: "Organization Dashboard",
//   },
//   staffDashboard: {
//     link: "/admin/staffdashboard",
//     element: <StaffDashboard />,
//     pageName: "Staff Dashboard",
//   },
//   manageUser: {
//     link: "/admin/manageuser",
//     element: <ManageUserPage />,
//     pageName: "Manage User",
//   },
//   manageorganizationUser: {
//     link: "/admin/manageorganizationuser",
//     element: <ManageOrganizationUserPage />,
//     pageName: "Manage Organization User",
//   },
//   managePermissions: {
//     link: "/admin/managepermissions",
//     element: <ManagePermissionsPage />,
//     pageName: "Manage Permissions",
//   },
//   wallet: {
//     link: "/admin/wallet",
//     element: <WalletPage />,
//     pageName: "Wallet",
//   },
//   profile: {
//     link: "/admin/profile",
//     element: <ProfilePage />,
//     pageName: "Profile",
//   },
//   BookFlightPage: {
//     link: "/book-flight",
//     element: <BookFlightPage />,
//     pageName: "book flight",
//   },
// };

// export const PUBLIC_ROUTES = [
//   routes.landing,
//   routes.search,
//   routes.roundtripsearch,
//   routes.multicitysearch,
//   routes.authentication,
//   routes.BookFlightPage,
// ];

// export const PRIVATE_ROUTES = [
//   routes.wallet,
//   routes.profile,
//   routes.dashboard,
//   routes.manageUser,
//   routes.managePermissions,
//   routes.organizationDashboard,
//   routes.staffDashboard,
//   routes.manageorganizationUser,
// ];



import FlightData from "@/pages/admin/FlightData";
import PssLanding from "@/pages/PssLanding";
import BookFlightPage from "@/pages/search/bookflight";
import StaffDashboard from "@/pages/staff/dashboard/Dashboard";
import { lazy } from "react";

const LandingPage = lazy(() => import("@/pages/Landing"));
const WalletPage = lazy(() => import("@/pages/admin/Wallet"));
const SearchPage = lazy(() => import("@/pages/search/Search"));
// const CorporateSearchPage = lazy(() => import("@/pages/search/corporateSearch"));
const RoundTripSearchPage = lazy(() => import("@/pages/search/RoundTripSearch"));
const MultiCitySearchPage = lazy(() => import("@/pages/search/MultiCitySearch"));
const AuthenticationPage = lazy(
  () => import("@/pages/auth/AuthenticationPage")
);
const DashBoardPage = lazy(() => import("@/pages/admin/dashboard/Dashboard"));
const OrganizationDashboard = lazy(() => import("@/pages/organization/dashboard/Dashboard"));
const ManageUserPage = lazy(
  () => import("@/pages/admin/manageUser/ManageUsers")
);
const ManageOrganizationUserPage = lazy(
  () => import("@/pages/admin/manageUser/ManageOrganizationUsers")
);
const ManagePermissionsPage = lazy(
  () => import("@/pages/admin/ManagePermissions")
);
const ProfilePage = lazy(() => import("@/pages/admin/AdminProfile"));
// import OrganizationDashboard from '../pages/admin/dashboard/OrganizationDashboard';

const routes = {
  landing: {
    link: "/",
    element: <LandingPage />,
    pageName: "Landing Page",
  },
  search: {
    link: "/search",
    element: <SearchPage />,
    pageName: "Search",
  },
  // corporatesearch: {
  //   link: "/corporatesearch",
  //   element: <CorporateSearchPage />,
  //   pageName: "Search",
  // },
  roundtripsearch: {
    link: "/roundtripsearch",
    element: <RoundTripSearchPage />,
    pageName: "Roundtripsearch",
  },
  multicitysearch: {
    link: "/multicitysearch",
    element: <MultiCitySearchPage />,
    pageName: "MultiCitysearch",
  },
  authentication: {
    link: "/authentication",
    element: <AuthenticationPage />,
    pageName: "Authentication",
  },
  dashboard: {
    link: "/admin/dashboard",
    element: <DashBoardPage />,
    pageName: "Dashboard",
  },
  organizationDashboard: {
    link: "/admin/organizationdashboard",
    element: <OrganizationDashboard />,
    pageName: "Organization Dashboard",
  },
  staffDashboard: {
    link: "/admin/staffdashboard",
    element: <StaffDashboard />,
    pageName: "Staff Dashboard",
  },
  manageUser: {
    link: "/admin/manageuser",
    element: <ManageUserPage />,
    pageName: "Manage User",
  },
  manageorganizationUser: {
    link: "/admin/manageorganizationuser",
    element: <ManageOrganizationUserPage />,
    pageName: "Manage Organization User",
  },
  managePermissions: {
    link: "/admin/managepermissions",
    element: <ManagePermissionsPage />,
    pageName: "Manage Permissions",
  },
  wallet: {
    link: "/admin/wallet",
    element: <WalletPage />,
    pageName: "Wallet",
  },
  flightData: {
    link: "/admin/FlightData",
    element: <FlightData />,
    pageName: "Flight Data",
  },
  profile: {
    link: "/admin/profile",
    element: <ProfilePage />,
    pageName: "Profile",
  },
  BookFlightPage: {
    link: "/book-flight",
    element: <BookFlightPage />,
    pageName: "Book Flight",
  },
  PssLandingPage: {
    link:"/advert",
    element: <PssLanding />,
    pageName: "PssLanding"
  }
};

export const PUBLIC_ROUTES = [
  routes.landing,
  routes.search,
  // routes.corporatesearch,
  routes.roundtripsearch,
  routes.multicitysearch,
  routes.authentication,
  routes.BookFlightPage,
  routes.PssLandingPage
];

export const PRIVATE_ROUTES = [
  routes.wallet,
  routes.flightData,
  routes.profile,
  routes.dashboard,
  routes.manageUser,
  routes.managePermissions,
  routes.organizationDashboard,
  routes.staffDashboard,
  routes.manageorganizationUser,
];