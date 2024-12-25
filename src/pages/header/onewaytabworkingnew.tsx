// import React, { useState, useCallback } from "react";
// import TransactionIcon from "@/assets/svg/TransactionIcon";
// import { format } from "date-fns";
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
//   NO_FLIGHT_MESSAGE,
//   PASSENGER_LIMIT_MESSAGE,
//   INFANT_EXCEED_ADULT_MESSAGE,
// } from "@/config/api";
// import DateInput from "@/components/components/input/DateInput";
// import PassengerCounter from "@/components/components/dropdown/PassengerCounter";

// type DataItem = {
//   value: string;
//   label: React.ReactNode;
//   city: {
//     address: {
//       cityCode: string;
//       cityName: string;
//       countryName: string;
//     };
//     name: string;
//   };
// };

// const OneWayTab = () => {
//   const navigate = useNavigate();

//   const [adultCount, setAdultCount] = useState(0);
//   const [childCount, setChildCount] = useState(0);
//   const [infantCount, setInfantCount] = useState(0);

//   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
//     []
//   );
//   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
//   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
//   const [departureLoading, setDepartureLoading] = useState(false);
//   const [arrivalLoading, setArrivalLoading] = useState(false);

//   const [departureCity, setDepartureCity] = useState("");
//   const [arrivalCity, setArrivalCity] = useState("");
//   const [departureDate, setDepartureDate] = useState(new Date());
//   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

//   const showErrorMessage = useCallback((message: string) => {
//     toast.error(message);
//   }, []);

//   const totalPassengers = adultCount + childCount + infantCount;

//   const handleIncrement = (
//     setter: React.Dispatch<React.SetStateAction<number>>
//   ) => {
//     if (totalPassengers < PASSENGER_LIMIT) {
//       setter((prev) => prev + 1);
//     } else {
//       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
//     }
//   };

//   const handleDecrement = (
//     setter: React.Dispatch<React.SetStateAction<number>>
//   ) => {
//     setter((prev) => (prev > 0 ? prev - 1 : 0));
//   };

//   const handleAdultIncrement = useCallback(() => {
//     if (totalPassengers < PASSENGER_LIMIT) {
//       const newCount = adultCount + 1;
//       if (newCount < infantCount) {
//         showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
//       } else {
//         setAdultCount(newCount);
//       }
//     } else {
//       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
//     }
//   }, [totalPassengers, adultCount, infantCount, showErrorMessage]);

//   const handleAdultDecrement = useCallback(() => {
//     if (adultCount > 0) {
//       const newCount = adultCount - 1;
//       if (newCount < infantCount) {
//         showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
//         setInfantCount(newCount);
//       }
//       setAdultCount(newCount);
//     }
//   }, [adultCount, infantCount, showErrorMessage]);

//   const handleChildIncrement = useCallback(
//     () => handleIncrement(setChildCount),
//     [totalPassengers, showErrorMessage]
//   );
//   const handleChildDecrement = useCallback(
//     () => handleDecrement(setChildCount),
//     []
//   );

//   const handleInfantIncrement = useCallback(() => {
//     if (adultCount === 0 || infantCount >= adultCount) {
//       showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
//     } else if (totalPassengers < PASSENGER_LIMIT) {
//       setInfantCount((prev) => prev + 1);
//     } else {
//       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
//     }
//   }, [adultCount, infantCount, totalPassengers, showErrorMessage]);

//   const handleInfantDecrement = useCallback(
//     () => handleDecrement(setInfantCount),
//     []
//   );

//   // Fetch city data based on user input
//   const fetchCityData = async (
//     keyword: string,
//     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
//     setLoading: React.Dispatch<React.SetStateAction<boolean>>
//   ) => {
//     if (keyword.length < 2) return; // Prevent API calls for short inputs
  
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(
//         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
//       );
  
//       // Debugging: Log the response data
//       console.log('API response:', response.data);
//       console.log("Response:", response);
// console.log("Response Data:", response?.data);
// console.log("Response Data Data:", response?.data?.data);

  
//       const cityData = response.data?.map((item: any) => ({
//         value: item?.iataCode,
//         label: `${item?.address?.cityName} - ${item?.address?.cityCode}`,
//         city: {
//           address: {
//             cityCode: item?.address?.cityCode,
//             cityName: item?.address?.cityName,
//             countryName: item?.address?.countryName,
//           },
//           name: item?.name,
//         },
//       }));

//       console.log(cityData);
  
//       if (cityData && cityData.length > 0) {
//         setCityOptions(cityData);
//       } else {
//         showErrorMessage(NO_CITY_MESSAGE);
//       }
//     } catch (error) {
//       console.error('Error fetching city data:', error); // Debugging: Log any errors
//       showErrorMessage(NO_CITY_MESSAGE);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const fetchDepartureCityData = (keyword: string) =>
//     fetchCityData(keyword, setDepartureCityOptions, setDepartureLoading);
//   const fetchArrivalCityData = (keyword: string) =>
//     fetchCityData(keyword, setArrivalCityOptions, setArrivalLoading);

//   const searchFlight = useCallback(async () => {
//     setFlightSearchLoading(true);
//     try {
//       const response = await axiosInstance.get(
//         `flight/search/offer?originLocationCode=${departureCity}&destinationLocationCode=${arrivalCity}&departureDate=${format(
//           departureDate,
//           "yyyy-MM-dd"
//         )}&adults=${adultCount}&max=50&infants=${infantCount}&children=${childCount}&currencyCode=NGN&travelClass=${selectedClass}`
//       );

//       const searchParams = {
//         departureCity,
//         arrivalCity,
//         departureDate,
//         adultCount,
//         childCount,
//         infantCount,
//         selectedClass,
//       };

//       navigate("/search", {
//         state: {
//           searchResults: response?.data,
//           searchParams,
//         },
//       });
//     } catch (error: any) {
//       if (error.response && error.response.data && error.response.data.errors) {
//         const { adults, infants, children } = error.response.data.errors;

//         if (adults) {
//           showErrorMessage(`${adults.join(", ")}`);
//         }
//         if (infants) {
//           showErrorMessage(`${infants.join(", ")}`);
//         }
//         if (children) {
//           showErrorMessage(`${children.join(", ")}`);
//         }
//       } else {
//         showErrorMessage(NO_FLIGHT_MESSAGE);
//       }
//     } finally {
//       setFlightSearchLoading(false);
//     }
//   }, [
//     departureCity,
//     arrivalCity,
//     departureDate,
//     adultCount,
//     infantCount,
//     childCount,
//     selectedClass,
//     showErrorMessage,
//     navigate,
//   ]);

//   const handleDepartureDateChange = useCallback(
//     (date: Date | undefined) => setDepartureDate(date || new Date()),
//     []
//   );

//   return (
//     <div className="flex flex-col gap-5 w-full items-center">
//       <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between">
//         <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
//           <CityInput
//             data={departureCityOptions}
//             label="From where?"
//             placeholder="City"
//             onSearch={fetchDepartureCityData}
//             loading={departureLoading}
//             onChange={(city) => setDepartureCity(city)}
//           />

//           <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
//             <TransactionIcon size="10" stroke="#E5302f" />
//           </div>
//           <CityInput
//             data={arrivalCityOptions}
//             label="To where?"
//             placeholder="City"
//             onSearch={fetchArrivalCityData}
//             loading={arrivalLoading}
//             onChange={(city) => setArrivalCity(city)}
//           />
//         </div>

//         <DateInput labelText="Departure" onChange={handleDepartureDateChange} />

//         <SelectInput
//           data={ticketClasses}
//           label="Class"
//           placeholder="Class"
//           value={selectedClass}
//           onChange={setSelectedClass}
//         />

//         <Dropdown label="Passengers" btnText="Add passengers">
//           <div className="flex flex-col gap-3 py-2">
//             <PassengerCounter
//               label="Adults ( ≥ 12 years)"
//               count={adultCount}
//               increment={handleAdultIncrement}
//               decrement={handleAdultDecrement}
//             />
//             <PassengerCounter
//               label="Children ( 2 - 12 years)"
//               count={childCount}
//               increment={handleChildIncrement}
//               decrement={handleChildDecrement}
//             />
//             <PassengerCounter
//               label="Infants ( < 2 years)"
//               count={infantCount}
//               increment={handleInfantIncrement}
//               decrement={handleInfantDecrement}
//             />
//           </div>
//         </Dropdown>
//       </div>

//       <Button
//         className="col-span-2 bg-primaryRed duration-300 capitalize"
//         onClick={searchFlight}
//         disabled={flightSearchLoading}
//       >
//         {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
//       </Button>
//     </div>
//   );
// };

// export default OneWayTab;
