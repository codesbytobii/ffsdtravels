// // import { useState } from "react";
// // import { Card, CardContent, CardHeader } from "@/components/ui/card";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { CalendarDays, PlaneIcon, LucideProps } from "lucide-react";
// // import Flight from "../admin/dashboard/Flight";

// // interface TabButtonProps {
// //   isActive: boolean;
// //   onClick: () => void;
// //   icon: React.ComponentType<LucideProps>;
// //   label: string;
// // }

// // const FLIGHT = "flight";
// // const HOTEL = "hotel";

// // const FlightComponent = () => <Flight />;
// // const HotelComponent = () => <div>Hotel Component</div>;

// // const TabButton: React.FC<TabButtonProps> = ({
// //   isActive,
// //   onClick,
// //   icon: Icon,
// //   label,
// // }) => (
// //   <button
// //     className={`transition-colors flex gap-1 ${
// //       isActive
// //         ? "text-primaryRed text-sm font-bold"
// //         : "text-gray-500 text-sm font-medium"
// //     }`}
// //     onClick={onClick}
// //   >
// //     <Icon size={20} />
// //     {label}
// //   </button>
// // );

// // const CorporateSearch = () => {
// //   const [activeComponent, setActiveComponent] = useState<
// //     typeof FLIGHT | typeof HOTEL
// //   >(FLIGHT);

// //   const componentsMap: { [key: string]: React.ComponentType } = {
// //     [FLIGHT]: FlightComponent,
// //     [HOTEL]: HotelComponent,
// //   };

// //   const ActiveComponent = componentsMap[activeComponent];

// //   return (
// //     <Card className="w-full p-2 rounded-sm flex flex-col gap-3 shadow-sm">
// //       <CardHeader className="flex flex-row items-center px-2 py-1 justify-between">
// //         <h1 className="text-gray-800 font-bold capitalize leading-4 tracking-tight">
// //           Search
// //         </h1>
// //         <div className="flex justify-between gap-6 font-medium">
// //           <TabButton
// //             isActive={activeComponent === FLIGHT}
// //             onClick={() => setActiveComponent(FLIGHT)}
// //             icon={PlaneIcon}
// //             label="Flight"
// //           />
// //           <TabButton
// //             isActive={activeComponent === HOTEL}
// //             onClick={() => setActiveComponent(HOTEL)}
// //             icon={CalendarDays}
// //             label="Hotel"
// //           />
// //         </div>
// //       </CardHeader>
// //       <CardContent className="p-2">
// //         <AnimatePresence mode="wait">
// //           <motion.div
// //             key={activeComponent}
// //             initial={{ opacity: 0, x: -50 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             exit={{ opacity: 0, x: 50 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             <ActiveComponent />
// //           </motion.div>
// //         </AnimatePresence>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default CorporateSearch;


// // import logo from '../../assets/FfsdTravelLogo.svg'
// // // import Modal from "../modal/Modal";
// // import { Button } from "@/components/ui/button";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const CorporateSearch = () => {
// //   const navigate = useNavigate();
// //   // const [navOpen, setNavOpen] = useState(false);
// //   const [modalOpen, setModalOpen] = useState(false);
// //   // const toggleNav = () => setNavOpen(!navOpen);
// //   const toggleModal = () => setModalOpen(!modalOpen);

// //   return (
// //     <div className="sticky top-0 bg-white z-50 h-16 w-full px-4 shadow-md border-b-[1px] text-black">
// //       <div className="section-width flex justify-between items-center h-16">
// //         <button
// //           onClick={() => navigate("/")}
// //           className="font-semibold cursor-pointer"
// //         >
// //           <img src={logo} alt="" className='w-[100px]' />
// //           {/* <p>Logo</p> */}
// //         </button>

// //         <ul className="flex items-center gap-3 font-medium text-gray-800">
// //           <li>
// //             <Button
// //               onClick={toggleModal}
// //               className="bg-primaryRed duration-300"
// //             >
// //               Manage Bookings
// //             </Button>
// //           </li>
// //           <li>
// //             <Button
// //               onClick={() => navigate("/authentication")}
// //               variant="outline"
// //               className="border-primaryRed border-2 text-primaryRed hover:text-black hover:bg-white hover:border-black duration-300 font-semibold"
// //             >
// //               Login
// //             </Button>
// //           </li>
// //         </ul>
// //       </div>

// //       {/* <Modal isOpen={modalOpen} onClose={toggleModal} /> */}
// //     </div>
// //   );
// // };

// // export default CorporateSearch;




// import { useEffect, useState, useCallback } from "react";
// import { useLocation } from "react-router-dom";
// // import SearchHeader from "./SearchHeader";
// // import SearchSidebar from "./SearchSidebar";
// import SearchResult from "./SearchResult";
// // import Navbar from "@/components/components/navbar/Navbar";

// // Define the type for search parameters
// type SearchParams = {
//   departureCity: string;
//   arrivalCity: string;
//   departureDate: string;
//   returnDate: string;
//   adultCount: number;
//   childCount: number;
//   infantCount: number;
//   selectedClass: string;
// };

// // Define the types for your data structure
// interface Segment {
//   aircraft: {
//     code: string;
//   };
//   airlineLogo: string;
//   airlineName: string;
//   arrival: {
//     at: string;
//     iataCode: string;
//     terminal: string;
//   };
//   arrival_airport: string;
//   blacklistedInEU: boolean;
//   carrierCode: string;
//   departure: {
//     at: string;
//     iataCode: string;
//     terminal: string;
//   };
//   departure_airport: string;
//   duration: string;
//   id: string;
//   number: string;
//   numberOfStops: number;
//   operating: {
//     carrierCode: string;
//   };
// }

// interface Itinerary {
//   duration: string;
//   segments: Segment[];
// }

// interface Price {
//   base: string;
//   currency: string;
//   fees: { amount: string }[];
//   grandTotal: string;
//   total: string;
// }

// interface Flight {
//   id: string;
//   DepartureAirport: string;
//   arrivalAirport: string;
//   instantTicketingRequired: boolean;
//   isUpsellOffer: boolean;
//   itineraries: Itinerary[];
//   lastTicketingDate: string;
//   lastTicketingDateTime: string;
//   logo: string;
//   nonHomogeneous: boolean;
//   numberOfBookableSeats: number;
//   oneWay: boolean;
//   price: Price;
//   pricingOptions: { fareType: string[]; includedCheckedBagsOnly: boolean };
//   source: string;
//   travelerPricings: {
//     travelerType: string;
//     fareDetailsBySegment: {
//       class: string;
//       includedCheckedBags: { quantity: number };
//     }[];
//   }[];
//   type: string;
//   validatingAirlineCodes: string[];
// }

// const CorporateSearch: React.FC = () => {
//   const location = useLocation();
//   const searchResults = location.state?.searchResults;
//   const searchData = searchResults;

//   const initialSearchParams: SearchParams = location.state?.searchParams || {
//     departureCity: "",
//     arrivalCity: "",
//     departureDate: "",
//     returnDate: "",
//     adultCount: 0,
//     childCount: 0,
//     infantCount: 0,
//     selectedClass: "",
//   };

//   const [searchParams, setSearchParams] =
//     useState<SearchParams>(initialSearchParams);
//   const [filteredData, setFilteredData] = useState<Flight[]>(searchData);

//   useEffect(() => {
//     if (location.state?.searchParams) {
//       setSearchParams(location.state.searchParams);
//     }
//   }, [location.state?.searchParams]);

//   // const handleSearchParamsChange = useCallback((newParams: SearchParams) => {
//   //   setSearchParams(newParams);
//   // }, []);

//   const handleFilterChange = useCallback((newFilteredData: Flight[]) => {
//     setFilteredData(newFilteredData);
//   }, []);

//   handleFilterChange;


//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className="w-full overflow-hidden pt-4 section-width">
//         <div className="w-full lg:flex hidden">
//           {/* <SearchHeader
//             searchParams={searchParams}
//             onChange={handleSearchParamsChange}
//           /> */}
//         </div>
//         <div className="flex flex-1 mt-3 gap-2 justify-between">
//           <h1>Hello</h1>
//           {/* <div className="lg:flex hidden w-[40%] px-4 my-3">
//             <SearchSidebar
//               searchData={searchData}
//               onFilterChange={handleFilterChange}
//             />
//           </div> */}
//           <div className="w-full overflow-hidden px-4 my-3">
//             {/* Pass the filteredData correctly to SearchResult */}
//             {/* <SearchResult searchData={filteredData} /> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CorporateSearch;

