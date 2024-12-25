
// // import React, { useCallback, useState } from "react";
// // import { ticketClasses } from "../../data/data.json";
// // import { toast } from "react-toastify";
// // import axiosInstance from "@/config/axios";
// // import CityInput from "@/components/components/input/CityInput";
// // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // import SelectInput from "@/components/components/input/SelectInput";
// // import {
// //     PASSENGER_LIMIT,
// //     NO_CITY_MESSAGE,
// //     PASSENGER_LIMIT_MESSAGE,
// //     INFANT_EXCEED_ADULT_MESSAGE,
// //     NO_FLIGHT_MESSAGE,
// // } from "@/config/api";
// // import DateInput from "@/components/components/input/DateInput";
// // import Dropdown from "@/components/components/dropdown/Dropdown";
// // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // import { Button } from "@/components/ui/button";
// // import Loading from "@/components/components/withStatus/loading/Loading";
// // import { useNavigate } from "react-router-dom";
// // import { format } from "date-fns";
// // import axios from "axios";

// // // interface ErrorResponseData {
// // //   message?: string;
// // //   errors?: {
// // //     [key: string]: string[];
// // //   };
// // // }

// // type SearchParams = {
// //     departureCity: string;
// //     arrivalCity: string;
// //     departureDate: string;
// //     returnDate: string;
// //     adultCount: number;
// //     childCount: number;
// //     infantCount: number;
// //     selectedClass: string;
// // };

// // type MultiCityMultiCitySearchHeaderProps = {
// //     searchParams: SearchParams;
// //     onChange: (params: SearchParams) => void;
// // };

// // type CityDataResponse = {
// //     iataCode: string;
// //     name: string;
// //     address: {
// //         cityCode: string;
// //         cityName: string;
// //         countryName: string;
// //     };
// // };

// // type DataItem = {
// //     value: string;
// //     label: React.ReactNode;
// //     city: {
// //         address: {
// //             cityCode: string;
// //             cityName: string;
// //             countryName: string;
// //         };
// //         name: string;
// //         iata: string;
// //         city: string;
// //         country: string;
// //     };
// // };

// // const MultiCityMultiCitySearchHeader: React.FC<MultiCityMultiCitySearchHeaderProps> = ({
// //     searchParams,
// //     onChange,
// // }) => {
// //     const navigate = useNavigate();

// //     const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
// //         []
// //     );
// //     const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// //     const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// //     const [departureLoading, setDepartureLoading] = useState(false);
// //     const [arrivalLoading, setArrivalLoading] = useState(false);

// //     const handleInputChange = useCallback(
// //         (field: keyof SearchParams, value: string | number) => {
// //             if (searchParams[field] !== value) {
// //                 const updatedParams = { ...searchParams, [field]: value };
// //                 onChange(updatedParams);
// //             }
// //         },
// //         [searchParams, onChange]
// //     );

// //     // Show error message using toast
// //     const showErrorMessage = useCallback((message: string) => {
// //         toast.error(message);
// //     }, []);

// //     const totalPassengers =
// //         searchParams.adultCount +
// //         searchParams.childCount +
// //         searchParams.infantCount;

// //     // Increment passenger count
// //     const handleIncrement = (field: keyof SearchParams, count: number) => {
// //         if (totalPassengers < PASSENGER_LIMIT) {
// //             handleInputChange(field, count + 1);
// //         } else {
// //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// //         }
// //     };

// //     // Decrement passenger count
// //     const handleDecrement = (field: keyof SearchParams, count: number) => {
// //         handleInputChange(field, count > 0 ? count - 1 : 0);
// //     };

// //     // Increment adult count
// //     const handleAdultIncrement = useCallback(() => {
// //         if (totalPassengers < PASSENGER_LIMIT) {
// //             const newCount = searchParams.adultCount + 1;
// //             if (newCount < searchParams.infantCount) {
// //                 showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// //             } else {
// //                 handleInputChange("adultCount", newCount);
// //             }
// //         } else {
// //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// //         }
// //     }, [
// //         totalPassengers,
// //         searchParams.adultCount,
// //         searchParams.infantCount,
// //         showErrorMessage,
// //     ]);

// //     // Decrement adult count
// //     const handleAdultDecrement = useCallback(() => {
// //         if (searchParams.adultCount > 0) {
// //             const newCount = searchParams.adultCount - 1;
// //             if (newCount < searchParams.infantCount) {
// //                 showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// //                 handleInputChange("infantCount", newCount);
// //             }
// //             handleInputChange("adultCount", newCount);
// //         }
// //     }, [searchParams.adultCount, searchParams.infantCount, showErrorMessage]);

// //     // Increment child count
// //     const handleChildIncrement = useCallback(
// //         () => handleIncrement("childCount", searchParams.childCount),
// //         [totalPassengers, searchParams.childCount, showErrorMessage]
// //     );

// //     // Decrement child count
// //     const handleChildDecrement = useCallback(
// //         () => handleDecrement("childCount", searchParams.childCount),
// //         [searchParams.childCount]
// //     );

// //     // Increment infant count
// //     const handleInfantIncrement = useCallback(() => {
// //         if (
// //             searchParams.adultCount === 0 ||
// //             searchParams.infantCount >= searchParams.adultCount
// //         ) {
// //             showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// //         } else if (totalPassengers < PASSENGER_LIMIT) {
// //             handleInputChange("infantCount", searchParams.infantCount + 1);
// //         } else {
// //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// //         }
// //     }, [
// //         searchParams.adultCount,
// //         searchParams.infantCount,
// //         totalPassengers,
// //         showErrorMessage,
// //     ]);

// //     // Decrement infant count
// //     const handleInfantDecrement = useCallback(
// //         () => handleDecrement("infantCount", searchParams.infantCount),
// //         [searchParams.infantCount]
// //     );

// //     // Fetch city data based on keyword
// //     const fetchCityData = async (
// //         keyword: string,
// //         setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// //         setLoading: React.Dispatch<React.SetStateAction<boolean>>
// //     ) => {
// //         setLoading(true);
// //         try {
// //             const response = await axiosInstance.get<{ data: CityDataResponse[] }>(
// //                 `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// //             );
// //             const cityData: DataItem[] = response.data.data.map((item: any) => ({
// //                 value: item?.iataCode,
// //                 label: item?.name,
// //                 city: {
// //                     address: {
// //                         cityCode: item.address.cityCode,
// //                         cityName: item.address.cityName,
// //                         countryName: item.address.countryName,
// //                     },
// //                     name: item.name,
// //                     iata: item?.iata,
// //                     city: item?.city,
// //                     country: item?.country,
// //                 },
// //             }));
// //             setCityOptions(cityData);
// //         } catch (error) {
// //             showErrorMessage(NO_CITY_MESSAGE);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const fetchDepartureCityData = (keyword: string) =>
// //         fetchCityData(keyword, setDepartureCityOptions, setDepartureLoading);

// //     const fetchArrivalCityData = (keyword: string) =>
// //         fetchCityData(keyword, setArrivalCityOptions, setArrivalLoading);

// //     const searchFlight = async () => {
// //         console.log("sections", sections);
// //         setFlightSearchLoading(true); // Start loading
// //         const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";
    
// //         const totalAdults = sections.reduce(
// //           (sum, section) => sum + section.adultCount,
// //           0
// //         );
// //         const totalChildren = sections.reduce(
// //           (sum, section) => sum + section.childCount,
// //           0
// //         );
// //         const totalInfants = sections.reduce(
// //           (sum, section) => sum + section.infantCount,
// //           0
// //         );
    
// //         // Create the originDestinations array based on the sections
// //         const originDestinations = sections.map((section, index) => ({
// //           id: (index + 1).toString(), // Unique ID for each section
// //           originLocationCode: section.departureCity,
// //           destinationLocationCode: section.arrivalCity,
// //           departureDateTimeRange: {
// //             date: section.departureDate.toISOString().split("T")[0], // Format date as 'YYYY-MM-DD'
// //             time: "10:00:00", // You can make this dynamic if needed
// //           },
// //         }));
    
// //         // Generate the traveler array, ensuring unique traveler IDs across all sections
// //         const travelers = [
// //           ...Array.from({ length: totalAdults }, (_, i) => ({
// //             id: `${i + 1}`,
// //             travelerType: "ADULT",
// //             fareOptions: ["STANDARD"],
// //           })),
// //           ...Array.from({ length: totalChildren }, (_, i) => ({
// //             id: `${totalAdults + i + 1}`,
// //             travelerType: "CHILD",
// //             fareOptions: ["STANDARD"],
// //           })),
// //           ...Array.from({ length: totalInfants }, (_, i) => ({
// //             id: `${totalAdults + totalChildren + i + 1}`,
// //             travelerType: "HELD_INFANT",
// //             associatedAdultId: `${i + 1}`, // Infants associated with the first adults
// //             fareOptions: ["STANDARD"],
// //           })),
// //         ];
    
// //         // Format departure date to 'YYYY-MM-DD'
// //         // const formattedDepartureDate = departureDate.toISOString().split('T')[0];
    
// //         // ...existing payload logic...
// //         const payload = {
// //           currencyCode: "NGN",
// //           originDestinations,
// //           travelers,
// //           sources: ["GDS"],
// //           searchCriteria: {
// //             maxFlightOffers: 50, // Adjust as needed
// //             pricingOptions: {
// //               fareType: ["PUBLISHED"],
// //             },
// //             flightFilters: {
// //               cabinRestrictions: [
// //                 {
// //                   cabin: selectedClass.toUpperCase(),
// //                   coverage: "MOST_SEGMENTS",
// //                   originDestinationIds: ["1"],
// //                 },
// //               ],
// //             },
// //           },
// //           additionalInformation: {
// //             brandedFares: true,
// //           },
// //         };
    
// //         console.log("payload is", payload);
    
// //         try {
// //           const response = await fetch(apiUrl, {
// //             method: "POST",
// //             headers: {
// //               "Content-Type": "application/json",
// //               Authorization: `Bearer YOUR_API_TOKEN`, // Replace with your actual token
// //             },
// //             body: JSON.stringify(payload),
// //           });
    
// //           if (!response.ok) {
// //             throw new Error("Network response was not ok");
// //           }
    
// //           const data = await response.json();
    
// //           console.log("data isdjsd", data.data);
    
// //           // const flightData: FlightData[] = data.map((offer: any) => mapFlightData(offer));
    
// //           navigate("/multicitysearch", {
// //             state: {
// //               searchResults: data.data,
// //               searchParams: {
// //                 departureCity,
// //                 arrivalCity,
// //                 departureDate,
// //                 adultCount: totalAdults,
// //                 childCount: totalChildren,
// //                 infantCount: totalInfants,
// //                 selectedClass,
// //               },
// //             },
// //           });
// //           // console.log('Flight Search Results:', data);
// //           // return data;
// //         } catch (error) {
// //           console.error("Error fetching flight data:", error);
// //           showErrorMessage("Failed to fetch flight data."); // Show a generic error message
// //         } finally {
// //           setFlightSearchLoading(false); // End loading
// //         }
// //       };

// //     // Handle date change and update the search parameters
// //     const handleDateChange = useCallback(
// //         (field: keyof SearchParams, date: Date | undefined) => {
// //             if (date) {
// //                 handleInputChange(field, format(date, "yyyy-MM-dd"));
// //             }
// //         },
// //         [handleInputChange]
// //     );

// //     return (
// //         <div className="flex flex-col gap-5 w-full items-center px-4">
// //             <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full lg:items-center justify-between">
// //                 <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// //                     <CityInput 
// //                         data={departureCityOptions}
// //                         placeholder="City"
// //                         onSearch={fetchDepartureCityData}
// //                         loading={departureLoading}
// //                         value={searchParams?.departureCity}
// //                         onChange={(value) => handleInputChange("departureCity", value)}
// //                     />
// //                     <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// //                         <TransactionIcon size="10" stroke="#E5302f" />
// //                     </div>
// //                     <CityInput
// //                         data={arrivalCityOptions}
// //                         placeholder="City"
// //                         onSearch={fetchArrivalCityData}
// //                         loading={arrivalLoading}
// //                         value={searchParams?.arrivalCity}
// //                         onChange={(value) => handleInputChange("arrivalCity", value)}
// //                     />
// //                 </div>

// //                 <DateInput
// //                     onChange={(date: Date | undefined) =>
// //                         handleDateChange("departureDate", date)
// //                     }
// //                     value={new Date(searchParams?.departureDate)}
// //                 />

// //                 {searchParams?.returnDate && (
// //                     <DateInput
// //                         onChange={(date: Date | undefined) =>
// //                             handleDateChange("returnDate", date)
// //                         }
// //                         value={new Date(searchParams.returnDate)}
// //                     />
// //                 )}

// //                 <SelectInput
// //                     data={ticketClasses}
// //                     placeholder="Class"
// //                     value={searchParams.selectedClass}
// //                     onChange={(value) => handleInputChange("selectedClass", value)}
// //                 />

// //                 <Dropdown btnText="Add Passenger">
// //                     <div className="flex flex-col gap-3 py-2">
// //                         <PassengerCounter
// //                             label="Adults ( ≥ 12 years)"
// //                             count={searchParams?.adultCount}
// //                             increment={handleAdultIncrement}
// //                             decrement={handleAdultDecrement}
// //                         />
// //                         <PassengerCounter
// //                             label="Children ( 2 - 12 years)"
// //                             count={searchParams?.childCount}
// //                             increment={handleChildIncrement}
// //                             decrement={handleChildDecrement}
// //                         />
// //                         <PassengerCounter
// //                             label="Infants ( < 2 years)"
// //                             count={searchParams?.infantCount}
// //                             increment={handleInfantIncrement}
// //                             decrement={handleInfantDecrement}
// //                         />
// //                     </div>
// //                 </Dropdown>

// //                 <Button
// //                     onClick={searchFlight}
// //                     className="bg-primaryRed duration-300 lg:w-[120px] w-[100px] h-12"
// //                     disabled={flightSearchLoading}
// //                 >
// //                     {flightSearchLoading ? (
// //                         <Loading color="#FFFFFF" size="20" />
// //                     ) : (
// //                         "Search"
// //                     )}
// //                 </Button>
// //             </div>
// //         </div>
// //     );
// // };

// // export default MultiCityMultiCitySearchHeader;















// import React, { useState, useCallback, useEffect } from "react";
// import TransactionIcon from "@/assets/svg/TransactionIcon";
// // import { format } from "date-fns";
// import SelectInput from "@/components/components/input/SelectInput";
// import { Button } from "@/components/ui/button";
// import Dropdown from "@/components/components/dropdown/Dropdown";
// import { toast } from "react-toastify";
// import axiosInstance from "@/config/axios";
// import { ticketClasses } from "../../data/data.json";
// import CityInput from "@/components/components/input/CityInput";
// import Loading from "@/components/components/withStatus/loading/Loading";
// import { useNavigate } from "react-router-dom";
// import {
//   PASSENGER_LIMIT,
//   NO_CITY_MESSAGE,
//   // NO_FLIGHT_MESSAGE,
//   PASSENGER_LIMIT_MESSAGE,
//   // INFANT_EXCEED_ADULT_MESSAGE,
// } from "@/config/api";
// import DateInput from "@/components/components/input/DateInput";
// import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// import { Trash2 } from "lucide-react"; // Import Trash icon

// type DataItem = {
//   value: string;
//   label: React.ReactNode;
//   city: {
//     address: {
//       cityCode?: string;
//       cityName?: string;
//       countryName?: string;
//     };
//     name: string;
//     iata: string;
//     city: string;
//     country: string;
//   };
// };

// interface Section {
//   id: number; // Add a unique ID field
//   departureCityInput: string;
//   departureCity: string;
//   arrivalCityInput: string;
//   arrivalCity: string;
//   departureDate: Date;
//   adultCount: number;
//   childCount: number;
//   infantCount: number;
//   selectedClass: string;
// }

// const MultiCityTab = () => {
//   const navigate = useNavigate();

//   const [sections, setSections] = useState<Section[]>([
//     {
//       id: 1, // Assign a unique ID
//       departureCityInput: "",
//       departureCity: "",
//       arrivalCityInput: "",
//       arrivalCity: "",
//       departureDate: new Date(),
//       adultCount: 1,
//       childCount: 0,
//       infantCount: 0,
//       selectedClass: ticketClasses[0].value,
//     },
//   ]);

//   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
//     []
//   );
//   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
//   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
//   const [departureLoading, setDepartureLoading] = useState(false);
//   const [arrivalLoading, setArrivalLoading] = useState(false);

//   const [departureCityInput, setDepartureCityInput] = useState("");
//   const [arrivalCityInput, setArrivalCityInput] = useState("");
//   const [departureCity, setDepartureCity] = useState("");
//   const [arrivalCity, setArrivalCity] = useState("");
//   const [departureDate, setDepartureDate] = useState(new Date());
//   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

//   const showErrorMessage = useCallback((message: string) => {
//     toast.error(message);
//   }, []);

//   const totalPassengers = sections.reduce(
//     (sum, section) =>
//       sum + section.adultCount + section.childCount + section.infantCount,
//     0
//   );

//   const maxPassengers = PASSENGER_LIMIT;

//   const handleIncrement = (index: number, field: keyof Section) => {
//     if (totalPassengers < maxPassengers) {
//       setSections((prevSections) =>
//         prevSections.map((section, i) =>
//           i === index
//             ? {
//                 ...section,
//                 [field]:
//                   typeof section[field] === "number"
//                     ? section[field] + 1
//                     : section[field], // Leave it unchanged if it's not a number
//               }
//             : section
//         )
//       );
//     } else {
//       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
//     }
//   };

//   const handleDecrement = (index: number, field: keyof Section) => {
//     setSections((prevSections) =>
//       prevSections.map((section, i) =>
//         i === index
//           ? {
//               ...section,
//               [field]:
//                 typeof section[field] === "number"
//                   ? Math.max(0, section[field] - 1)
//                   : section[field], // Leave it unchanged if it's not a number
//             }
//           : section
//       )
//     );
//   };

//   // Ensure infants do not exceed adults in each section
//   useEffect(() => {
//     setSections((prevSections) =>
//       prevSections.map((section) => {
//         if (section.infantCount > section.adultCount) {
//           return { ...section, infantCount: section.adultCount };
//         }
//         return section;
//       })
//     );
//   }, [sections]);

//   const useDebounce = <T,>(value: T, delay: number): T => {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//       const handler = setTimeout(() => {
//         setDebouncedValue(value);
//       }, delay);

//       return () => {
//         clearTimeout(handler);
//       };
//     }, [value, delay]);

//     return debouncedValue;
//   };

//   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
//   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

//   const addSection = () => {
//     setSections((prevSections) => [
//       ...prevSections,
//       {
//         id: prevSections.length + 1, // Assign a unique ID
//         departureCityInput: "",
//         departureCity: "",
//         arrivalCityInput: "",
//         arrivalCity: "",
//         departureDate: new Date(),
//         adultCount: 1,
//         childCount: 0,
//         infantCount: 0,
//         selectedClass: ticketClasses[0].value,
//       },
//     ]);
//   };

//   const deleteSection = (index: number) => {
//     setSections((prevSections) => {
//       if (prevSections.length === 1) {
//         // Prevent deleting the last remaining section
//         showErrorMessage("At least one section is required.");
//         return prevSections;
//       }
//       return prevSections.filter((_, i) => i !== index);
//     });
//   };

//   const fetchCityData = async (
//     keyword: string,
//     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
//     setLoading: React.Dispatch<React.SetStateAction<boolean>>
//   ) => {
//     if (keyword.length < 2) return;

//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(
//         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
//       );

//       const cityData = response.data?.map((item: any) => ({
//         value: item?.iata,
//         label: `${item?.name}`,
//         city: {
//           address: {
//             cityCode: item?.address?.cityCode,
//             cityName: item?.address?.cityName,
//             countryName: item?.address?.countryName,
//           },
//           name: item?.name,
//           iata: item?.iata,
//           city: item?.city,
//           country: item?.country,
//         },
//       }));

//       // console.log(cityData)

//       if (cityData && cityData.length > 0) {
//         setCityOptions(cityData);
//       } else {
//         showErrorMessage(NO_CITY_MESSAGE);
//       }
//     } catch (error) {
//       showErrorMessage(NO_CITY_MESSAGE);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (debouncedDepartureCity) {
//       fetchCityData(
//         debouncedDepartureCity,
//         setDepartureCityOptions,
//         setDepartureLoading
//       );
//     }
//   }, [debouncedDepartureCity]);

//   useEffect(() => {
//     if (debouncedArrivalCity) {
//       fetchCityData(
//         debouncedArrivalCity,
//         setArrivalCityOptions,
//         setArrivalLoading
//       );
//     }
//   }, [debouncedArrivalCity]);

//   const searchFlight = async () => {
//     console.log("sections", sections);
//     setFlightSearchLoading(true); // Start loading
//     const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";

//     const totalAdults = sections.reduce(
//       (sum, section) => sum + section.adultCount,
//       0
//     );
//     const totalChildren = sections.reduce(
//       (sum, section) => sum + section.childCount,
//       0
//     );
//     const totalInfants = sections.reduce(
//       (sum, section) => sum + section.infantCount,
//       0
//     );

//     // Create the originDestinations array based on the sections
//     const originDestinations = sections.map((section, index) => ({
//       id: (index + 1).toString(), // Unique ID for each section
//       originLocationCode: section.departureCity,
//       destinationLocationCode: section.arrivalCity,
//       departureDateTimeRange: {
//         date: section.departureDate.toISOString().split("T")[0], // Format date as 'YYYY-MM-DD'
//         time: "10:00:00", // You can make this dynamic if needed
//       },
//     }));

//     // Generate the traveler array, ensuring unique traveler IDs across all sections
//     const travelers = [
//       ...Array.from({ length: totalAdults }, (_, i) => ({
//         id: `${i + 1}`,
//         travelerType: "ADULT",
//         fareOptions: ["STANDARD"],
//       })),
//       ...Array.from({ length: totalChildren }, (_, i) => ({
//         id: `${totalAdults + i + 1}`,
//         travelerType: "CHILD",
//         fareOptions: ["STANDARD"],
//       })),
//       ...Array.from({ length: totalInfants }, (_, i) => ({
//         id: `${totalAdults + totalChildren + i + 1}`,
//         travelerType: "HELD_INFANT",
//         associatedAdultId: `${i + 1}`, // Infants associated with the first adults
//         fareOptions: ["STANDARD"],
//       })),
//     ];

//     // Format departure date to 'YYYY-MM-DD'
//     // const formattedDepartureDate = departureDate.toISOString().split('T')[0];

//     // ...existing payload logic...
//     const payload = {
//       currencyCode: "NGN",
//       originDestinations,
//       travelers,
//       sources: ["GDS"],
//       searchCriteria: {
//         maxFlightOffers: 50, // Adjust as needed
//         pricingOptions: {
//           fareType: ["PUBLISHED"],
//         },
//         flightFilters: {
//           cabinRestrictions: [
//             {
//               cabin: selectedClass.toUpperCase(),
//               coverage: "MOST_SEGMENTS",
//               originDestinationIds: ["1"],
//             },
//           ],
//         },
//       },
//       additionalInformation: {
//         brandedFares: true,
//       },
//     };

//     console.log("payload is", payload);

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer YOUR_API_TOKEN`, // Replace with your actual token
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();

//       console.log("data isdjsd", data.data);

//       // const flightData: FlightData[] = data.map((offer: any) => mapFlightData(offer));

//       navigate("/multicitysearch", {
//         state: {
//           searchResults: data.data,
//           searchParams: {
//             departureCity,
//             arrivalCity,
//             departureDate,
//             adultCount: totalAdults,
//             childCount: totalChildren,
//             infantCount: totalInfants,
//             selectedClass,
//           },
//         },
//       });
//       // console.log('Flight Search Results:', data);
//       // return data;
//     } catch (error) {
//       console.error("Error fetching flight data:", error);
//       showErrorMessage("Failed to fetch flight data."); // Show a generic error message
//     } finally {
//       setFlightSearchLoading(false); // End loading
//     }
//   };

//   // Call the function
//   // searchFlight();

//   const handleDepartureDateChange = (date: Date | undefined, index: number) => {
//     setSections((prevSections) =>
//       prevSections.map((section, i) =>
//         i === index
//           ? { ...section, departureDate: date || new Date() }
//           : section
//       )
//     );

//     // Update the global or independent departure date state
//     setDepartureDate(date || new Date());
//   };

//   const handleDepartureCityChange = (
//     value: string,
//     city: DataItem,
//     index: number
//   ) => {
//     setSections((prevSections) =>
//       prevSections.map((section, i) =>
//         i === index
//           ? {
//               ...section,
//               departureCity: city.city.iata,
//               departureCityInput: city.city.iata, // Update the input field as well
//               someOtherField: value,
//             }
//           : section
//       )
//     );
//     // Update the global departure city state (or any other state tracking this)
//     setDepartureCity(city.city.iata);
//   };

//   const handleArrivalCityChange = (
//     value: string,
//     city: DataItem,
//     index: number
//   ) => {
//     setSections((prevSections) =>
//       prevSections.map((section, i) =>
//         i === index
//           ? {
//               ...section,
//               arrivalCity: city.city.iata,
//               arrivalCityInput: city.city.iata, // Update the input field as well
//               someOtherField: value,
//             }
//           : section
//       )
//     );

//     // Update the global departure city state (or any other state tracking this)
//     setArrivalCity(city.city.iata);
//   };

//   return (
//     <div className="flex flex-col gap-5 w-full items-center">
//       {sections.map((section, index) => (
//         <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between">
//           <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
//             <CityInput
//               value={section.departureCityInput}
//               data={departureCityOptions}
//               label="From where?"
//               placeholder="City"
//               onSearch={setDepartureCityInput}
//               loading={departureLoading}
//               onChange={(value, city) =>
//                 handleDepartureCityChange(value, city, index)
//               } // Use updated handler
//             />

//             <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
//               <TransactionIcon size="10" stroke="#E5302f" />
//             </div>

//             <CityInput
//               value={section.arrivalCityInput}
//               data={arrivalCityOptions}
//               label="To where?"
//               placeholder="City"
//               onSearch={setArrivalCityInput}
//               loading={arrivalLoading}
//               onChange={(value, city) =>
//                 handleArrivalCityChange(value, city, index)
//               } // Use updated handler
//             />
//           </div>

//           <DateInput
//             labelText="Departure"
//             onChange={(date) => handleDepartureDateChange(date, index)}
//           />

//           <SelectInput
//             data={ticketClasses}
//             label="Class"
//             placeholder="Class"
//             value={selectedClass}
//             onChange={setSelectedClass}
//           />

//           <Dropdown
//             label="Add Passengers"
//             btnText={`${section.adultCount} Adults, ${section.childCount} Children, ${section.infantCount} Infants`}
//           >
//             <div className="flex flex-col gap-3 py-2">
//               <PassengerCounter
//                 label="Adults ( ≥ 12 years)"
//                 count={section.adultCount}
//                 increment={() => handleIncrement(index, "adultCount")}
//                 decrement={() => handleDecrement(index, "adultCount")}
//               />
//               <PassengerCounter
//                 label="Children ( 2 - 12 years)"
//                 count={section.childCount}
//                 increment={() => handleIncrement(index, "childCount")}
//                 decrement={() => handleDecrement(index, "childCount")}
//               />
//               <PassengerCounter
//                 label="Infants ( < 2 years)"
//                 count={section.infantCount}
//                 increment={() => handleIncrement(index, "infantCount")}
//                 decrement={() => handleDecrement(index, "infantCount")}
//               />
//             </div>
//           </Dropdown>

//           {/* Delete Button */}
//           {sections.length > 1 && (
//             <Button
//               variant="destructive"
//               className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
//               onClick={() => deleteSection(index)}
//               aria-label="Delete section"
//             >
//               <Trash2 size={16} color="#FFFFFF" />
//             </Button>
//           )}
//         </div>
//       ))}

//       <div className="flex gap-5">
//         <Button
//           className="bg-primaryRed duration-300 h-12"
//           onClick={addSection}
//         >
//           Add Another Flight
//           {/* <Plus /> */}
//         </Button>

//         <Button
//           className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
//           onClick={searchFlight}
//           disabled={flightSearchLoading}
//         >
//           {flightSearchLoading ? (
//             <Loading color="#FFFFFF" size="20" />
//           ) : (
//             "Search"
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MultiCityTab;




import React, { useCallback, useEffect, useState } from "react";
import { ticketClasses } from "../../data/data.json";
import { toast } from "react-toastify";
import axiosInstance from "@/config/axios";
import CityInput from "@/components/components/input/CityInput";
import TransactionIcon from "@/assets/svg/TransactionIcon";
import SelectInput from "@/components/components/input/SelectInput";
import {
    PASSENGER_LIMIT,
    NO_CITY_MESSAGE,
    PASSENGER_LIMIT_MESSAGE,
    INFANT_EXCEED_ADULT_MESSAGE,
    // NO_FLIGHT_MESSAGE,
} from "@/config/api";
import DateInput from "@/components/components/input/DateInput";
import Dropdown from "@/components/components/dropdown/Dropdown";
import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
import { Button } from "@/components/ui/button";
import Loading from "@/components/components/withStatus/loading/Loading";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
// import axios from "axios";

type SearchParams = {
    departureCity: string;
    arrivalCity: string;
    departureDate: string;
    returnDate: string;
    adultCount: number;
    childCount: number;
    infantCount: number;
    selectedClass: string;
};

type MultiCitySearchHeaderProps = {
    searchParams: SearchParams;
    onChange: (params: SearchParams) => void;
};

type DataItem = {
    value: string;
    label: React.ReactNode;
    city: {
        address: {
            cityCode: string;
            cityName: string;
            countryName: string;
        };
        name: string;
        iata: string;
        city: string;
        country: string;
    };
};

const MultiCitySearchHeader: React.FC<MultiCitySearchHeaderProps> = ({
    searchParams,
    onChange,
}) => {
    const navigate = useNavigate();

    const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
        []
    );
    const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
    const [flightSearchLoading, setFlightSearchLoading] = useState(false);
    const [departureLoading, setDepartureLoading] = useState(false);
    const [arrivalLoading, setArrivalLoading] = useState(false);

  const [departureCityInput, setDepartureCityInput] = useState("");
  const [arrivalCityInput, setArrivalCityInput] = useState("");

    const handleInputChange = useCallback(
        (field: keyof SearchParams, value: string | number) => {
            if (searchParams[field] !== value) {
                const updatedParams = { ...searchParams, [field]: value };
                onChange(updatedParams);
            }
        },
        [searchParams, onChange]
    );

    // Show error message using toast
    const showErrorMessage = useCallback((message: string) => {
        toast.error(message);
    }, []);

    const totalPassengers =
        searchParams.adultCount +
        searchParams.childCount +
        searchParams.infantCount;

    // Increment passenger count
    const handleIncrement = (field: keyof SearchParams, count: number) => {
        if (totalPassengers < PASSENGER_LIMIT) {
            handleInputChange(field, count + 1);
        } else {
            showErrorMessage(PASSENGER_LIMIT_MESSAGE);
        }
    };

    // Decrement passenger count
    const handleDecrement = (field: keyof SearchParams, count: number) => {
        handleInputChange(field, count > 0 ? count - 1 : 0);
    };

    // Increment adult count
    const handleAdultIncrement = useCallback(() => {
        if (totalPassengers < PASSENGER_LIMIT) {
            const newCount = searchParams.adultCount + 1;
            if (newCount < searchParams.infantCount) {
                showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
            } else {
                handleInputChange("adultCount", newCount);
            }
        } else {
            showErrorMessage(PASSENGER_LIMIT_MESSAGE);
        }
    }, [
        totalPassengers,
        searchParams.adultCount,
        searchParams.infantCount,
        showErrorMessage,
    ]);

    // Decrement adult count
    const handleAdultDecrement = useCallback(() => {
        if (searchParams.adultCount > 0) {
            const newCount = searchParams.adultCount - 1;
            if (newCount < searchParams.infantCount) {
                showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
                handleInputChange("infantCount", newCount);
            }
            handleInputChange("adultCount", newCount);
        }
    }, [searchParams.adultCount, searchParams.infantCount, showErrorMessage]);

    // Increment child count
    const handleChildIncrement = useCallback(
        () => handleIncrement("childCount", searchParams.childCount),
        [totalPassengers, searchParams.childCount, showErrorMessage]
    );

    // Decrement child count
    const handleChildDecrement = useCallback(
        () => handleDecrement("childCount", searchParams.childCount),
        [searchParams.childCount]
    );

    // Increment infant count
    const handleInfantIncrement = useCallback(() => {
        if (
            searchParams.adultCount === 0 ||
            searchParams.infantCount >= searchParams.adultCount
        ) {
            showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
        } else if (totalPassengers < PASSENGER_LIMIT) {
            handleInputChange("infantCount", searchParams.infantCount + 1);
        } else {
            showErrorMessage(PASSENGER_LIMIT_MESSAGE);
        }
    }, [
        searchParams.adultCount,
        searchParams.infantCount,
        totalPassengers,
        showErrorMessage,
    ]);

    // Decrement infant count
    const handleInfantDecrement = useCallback(
        () => handleDecrement("infantCount", searchParams.infantCount),
        [searchParams.infantCount]
    );

    const useDebounce = <T,>(value: T, delay: number): T => {
        const [debouncedValue, setDebouncedValue] = useState(value);
    
        useEffect(() => {
          const handler = setTimeout(() => {
            setDebouncedValue(value);
          }, delay);
    
          return () => {
            clearTimeout(handler);
          };
        }, [value, delay]);
    
        return debouncedValue;
      };
    
      const debouncedDepartureCity = useDebounce(departureCityInput, 300);
      const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

    // Fetch city data based on keyword
    const fetchCityData = async (
        keyword: string,
        setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        if (keyword.length < 2) return;
        
        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `flight/search/city?subType=AIRPORT&keyword=${keyword}`
            );
            const cityData = response.data?.map((item: any) => ({
                value: item?.iata,
                label: `${item?.name}`,
                city: {
                    address: {
                        cityCode: item?.address?.cityCode,
                        cityName: item?.address?.cityName,
                        countryName: item?.address?.countryName,
                    },
                    name: item?.name,
                    iata: item?.iata,
                    city: item?.city,
                    country: item?.country,
                },
            }));
            if (cityData && cityData.length > 0) {
                setCityOptions(cityData);
              } else {
                showErrorMessage(NO_CITY_MESSAGE);
              }
            // } catch (error) {
            //   showErrorMessage(NO_CITY_MESSAGE);
            } finally {
              setLoading(false);
            }
    };

    useEffect(() => {
        if (debouncedDepartureCity) {
          fetchCityData(
            debouncedDepartureCity,
            setDepartureCityOptions,
            setDepartureLoading
          );
        }
      }, [debouncedDepartureCity]);
    
      useEffect(() => {
        if (debouncedArrivalCity) {
          fetchCityData(
            debouncedArrivalCity,
            setArrivalCityOptions,
            setArrivalLoading
          );
        }
      }, [debouncedArrivalCity]);

    // const searchFlight = useCallback(async () => {
    //     setFlightSearchLoading(true);
        
    //     try {
    //         const formattedDepartureDate = format(
    //             new Date(searchParams.departureDate),
    //             "yyyy-MM-dd"
    //         );
    //         const formattedReturnDate = searchParams.returnDate
    //             ? format(new Date(searchParams.returnDate), "yyyy-MM-dd")
    //             : undefined;

    //         const response = await axiosInstance.get(`/flight/search/offer`, {
    //             params: {
    //                 originLocationCode: searchParams.departureCity,
    //                 destinationLocationCode: searchParams.arrivalCity,
    //                 departureDate: formattedDepartureDate,
    //                 returnDate: formattedReturnDate,
    //                 adults: searchParams.adultCount,
    //                 children: searchParams.childCount,
    //                 infants: searchParams.infantCount,
    //                 max: 10,
    //                 currencyCode: "NGN",
    //                 travelClass: searchParams.selectedClass,
    //             },
    //         });

    //         navigate("/search", {
    //             state: {
    //                 searchResults: response.data,
    //                 searchParams,
    //             },
    //         });
    //     } catch (error) {
    //         console.error("Error during flight search:", error);

    //         if (axios.isAxiosError(error)) {
    //             const responseData = error.response?.data;

    //             if (responseData && responseData.errors) {
    //                 const { adults, infants, children } = responseData.errors;

    //                 if (adults) {
    //                     showErrorMessage(adults.join(", "));
    //                 }
    //                 if (infants) {
    //                     showErrorMessage(infants.join(", "));
    //                 }
    //                 if (children) {
    //                     showErrorMessage(children.join(", "));
    //                 }
    //             } else {
    //                 showErrorMessage(NO_FLIGHT_MESSAGE);
    //             }
    //         } else {
    //             showErrorMessage("An unexpected error occurred.");
    //         }
    //     } finally {
    //         setFlightSearchLoading(false);
    //     }
    // }, [searchParams, showErrorMessage, navigate]);


    const searchFlight = useCallback(async () => {
        setFlightSearchLoading(true); // Start loading
        const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";
    
        const formattedDepartureDate = format(
          new Date(searchParams.departureDate),
          "yyyy-MM-dd"
        );
    
        const payload = {
          currencyCode: "NGN",
          originDestinations: [
            {
              id: "1",
              originLocationCode: searchParams.departureCity,
              destinationLocationCode: searchParams.arrivalCity,
              departureDateTimeRange: {
                date: formattedDepartureDate,
                time: "10:00:00", // You can make this dynamic if needed
              },
            },
          ],
          travelers: [
            ...Array.from({ length: searchParams.adultCount }, (_, i) => ({
              id: `${i + 1}`,
              travelerType: "ADULT",
              fareOptions: ["STANDARD"],
            })),
            ...Array.from({ length: searchParams.childCount }, (_, i) => ({
              id: `${searchParams.adultCount + i + 1}`,
              travelerType: "CHILD",
              fareOptions: ["STANDARD"],
            })),
            ...Array.from({ length: searchParams.infantCount }, (_, i) => ({
              id: `${searchParams.adultCount + searchParams.childCount + i + 1}`,
              travelerType: "HELD_INFANT",
              associatedAdultId: `${i + 1}`, // Assuming first adult is associated
              fareOptions: ["STANDARD"],
            })),
          ],
          sources: ["GDS"],
          searchCriteria: {
            maxFlightOffers: 50,
            pricingOptions: {
              fareType: ["PUBLISHED"],
            },
            flightFilters: {
              cabinRestrictions: [
                {
                  cabin: searchParams.selectedClass.toUpperCase(),
                  coverage: "MOST_SEGMENTS",
                  originDestinationIds: ["1"],
                },
              ],
            },
          },
          additionalInformation: {
            brandedFares: true,
          },
        };
    
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_API_TOKEN`, // Replace with your actual token
            },
            body: JSON.stringify(payload),
          });
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
    
          const data = await response.json();
    
          navigate("/multicitysearch", {
            state: {
              searchResults: data.data,
              searchParams,
            },
          });
        } catch (error) {
          console.error("Error fetching flight data:", error);
          showErrorMessage("Failed to fetch flight data."); // Show a generic error message
        } finally {
          setFlightSearchLoading(false); // End loading
        }
      }, [searchParams, navigate]);

    // Handle date change and update the search parameters
    const handleDateChange = useCallback(
        (field: keyof SearchParams, date: Date | undefined) => {
            if (date) {
                handleInputChange(field, format(date, "yyyy-MM-dd"));
            }
        },
        [handleInputChange]
    );

    return (
        <div className="flex flex-col gap-5 w-full items-center px-4">
            <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full lg:items-center justify-between">
                <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
                    <CityInput 
                        data={departureCityOptions}
                        placeholder="City"
                        onSearch={setDepartureCityInput}
                        loading={departureLoading}
                        value={searchParams?.departureCity}
                        onChange={(value) => handleInputChange("departureCity", value)}
                    />
                    <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
                        <TransactionIcon size="10" stroke="#E5302f" />
                    </div>
                    <CityInput
                        data={arrivalCityOptions}
                        placeholder="City"
                        onSearch={setArrivalCityInput}
                        loading={arrivalLoading}
                        value={searchParams?.arrivalCity}
                        onChange={(value) => handleInputChange("arrivalCity", value)}
                    />
                </div>

                <DateInput
                    onChange={(date: Date | undefined) =>
                        handleDateChange("departureDate", date)
                    }
                    value={new Date(searchParams?.departureDate)}
                />

                {searchParams?.returnDate && (
                    <DateInput
                        onChange={(date: Date | undefined) =>
                            handleDateChange("returnDate", date)
                        }
                        value={new Date(searchParams.returnDate)}
                    />
                )}

                <SelectInput
                    data={ticketClasses}
                    placeholder="Class"
                    value={searchParams.selectedClass}
                    onChange={(value) => handleInputChange("selectedClass", value)}
                />

                <Dropdown btnText="Add Passenger">
                    <div className="flex flex-col gap-3 py-2">
                        <PassengerCounter
                            label="Adults ( ≥ 12 years)"
                            count={searchParams?.adultCount}
                            increment={handleAdultIncrement}
                            decrement={handleAdultDecrement}
                        />
                        <PassengerCounter
                            label="Children ( 2 - 12 years)"
                            count={searchParams?.childCount}
                            increment={handleChildIncrement}
                            decrement={handleChildDecrement}
                        />
                        <PassengerCounter
                            label="Infants ( < 2 years)"
                            count={searchParams?.infantCount}
                            increment={handleInfantIncrement}
                            decrement={handleInfantDecrement}
                        />
                    </div>
                </Dropdown>

                <Button
                    onClick={searchFlight}
                    className="bg-primaryRed duration-300 lg:w-[120px] w-[100px] h-12"
                    disabled={flightSearchLoading}
                >
                    {flightSearchLoading ? (
                        <Loading color="#FFFFFF" size="20" />
                    ) : (
                        "Search"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default MultiCitySearchHeader;









