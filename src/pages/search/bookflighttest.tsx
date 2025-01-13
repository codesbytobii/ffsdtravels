// import React, { useState, useCallback, useEffect } from "react";
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
//   // NO_FLIGHT_MESSAGE,
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

// const BookFlightPage = () => {
//   const navigate = useNavigate();

//   const [adultCount, setAdultCount] = useState(1);
//   const [childCount, setChildCount] = useState(0);
//   const [infantCount, setInfantCount] = useState(0);

//   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
//   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
//   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
//   const [departureLoading, setDepartureLoading] = useState(false);
//   const [arrivalLoading, setArrivalLoading] = useState(false);

//   const [departureCityInput, setDepartureCityInput] = useState('');
//   const [arrivalCityInput, setArrivalCityInput] = useState('');
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
//     // } catch (error) {
//     //   showErrorMessage(NO_CITY_MESSAGE);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (debouncedDepartureCity) {
//       fetchCityData(debouncedDepartureCity, setDepartureCityOptions, setDepartureLoading);
//     }
//   }, [debouncedDepartureCity]);

//   useEffect(() => {
//     if (debouncedArrivalCity) {
//       fetchCityData(debouncedArrivalCity, setArrivalCityOptions, setArrivalLoading);
//     }
//   }, [debouncedArrivalCity]);


//   const searchFlight = async () => {
//     setFlightSearchLoading(true); // Start loading
//     const apiUrl = 'https://test.ffsdtravels.com/api/flight/search/offer';

//     // Format departure date to 'YYYY-MM-DD'
//     // const formattedDepartureDate = departureDate.toISOString().split('T')[0];
//     const formattedDepartureDate = format(departureDate, "yyyy-MM-dd");

//     // ...existing payload logic...
//     const payload = {
//       currencyCode: "NGN",
//       originDestinations: [
//         {
//           id: "1",
//           originLocationCode: departureCity,
//           destinationLocationCode: arrivalCity,
//           departureDateTimeRange: {
//             date: formattedDepartureDate,
//             time: "10:00:00" // You can make this dynamic if needed
//           }
//         }
//       ],
//       travelers: [
//         ...Array.from({ length: adultCount }, (_, i) => ({
//           id: `${i + 1}`,
//           travelerType: "ADULT",
//           fareOptions: ["STANDARD"]
//         })),
//         ...Array.from({ length: childCount }, (_, i) => ({
//           id: `${adultCount + i + 1}`,
//           travelerType: "CHILD",
//           fareOptions: ["STANDARD"]
//         })),
//         ...Array.from({ length: infantCount }, (_, i) => ({
//           id: `${adultCount + childCount + i + 1}`,
//           travelerType: "HELD_INFANT",
//           associatedAdultId: `${i + 1}`, // Assuming first adult is associated
//           fareOptions: ["STANDARD"]
//         }))
//       ],
//       sources: ["GDS"],
//       searchCriteria: {
//         maxFlightOffers: 50, // Adjust as needed
//         pricingOptions: {
//           fareType: ["PUBLISHED"]
//         },
//         flightFilters: {
//           cabinRestrictions: [
//             {
//               cabin: "ECONOMY",
//               coverage: "MOST_SEGMENTS",
//               originDestinationIds: ["1"]
//             }
//           ]
//         }
//       },
//       additionalInformation: {
//         brandedFares: true
//       }
//     };

//     try {
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer YOUR_API_TOKEN`, // Replace with your actual token
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       localStorage.setItem("confirmPriceToken", data.accessToken);

//       console.log('the data is', data.accessToken)

//       console.log("data isdjsd", data.data);

//       // const flightData: FlightData[] = data.map((offer: any) => mapFlightData(offer));

//       navigate("/search", {
//         state: {
//           searchResults: data.data ,
//           searchParams: {
//             departureCity,
//             arrivalCity,
//             departureDate,
//             adultCount,
//             childCount,
//             infantCount,
//             selectedClass,
//           },
//         },
//       });
//       // console.log('Flight Search Results:', data);
//       // return data;

//     } catch (error) {
//       console.error('Error fetching flight data:', error);
//       showErrorMessage('Failed to fetch flight data.'); // Show a generic error message
//     } finally {
//       setFlightSearchLoading(false); // End loading
//     }
//   };



//   // Call the function
//   // searchFlight();




//   const handleDepartureDateChange = useCallback(
//     (date: Date | undefined) => setDepartureDate(date || new Date()),
//     []
//   );

//   const handleDepartureCityChange = (value: string, city: DataItem) => {
//     setDepartureCity(city.city.iata); // Update with the airport name
//     setDepartureCityInput(city.city.iata); // Display city and airport code in the input
//     console.log("Value:", value);
//     console.log("City:", city);
//   };

//   const handleArrivalCityChange = (value: string, city: DataItem) => {
//     setArrivalCity(city.city.iata); // Update with the airport name
//     setArrivalCityInput(city.city.iata); // Display city and airport code in the input
//     console.log("Value:", value);
//     console.log("City:", city);
//   };

//   return (
//     <div className="flex flex-col gap-5 w-full items-center">
//       <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between">
//         <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
//           <CityInput
//             value={departureCityInput}
//             data={departureCityOptions}
//             label="From where?"
//             placeholder="City"
//             onSearch={setDepartureCityInput}
//             loading={departureLoading}
//             onChange={handleDepartureCityChange} // Use updated handler
//           />

//           <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
//             <TransactionIcon size="10" stroke="#E5302f" />
//           </div>

//           <CityInput
//             value={arrivalCityInput}
//             data={arrivalCityOptions}
//             label="To where?"
//             placeholder="City"
//             onSearch={setArrivalCityInput}
//             loading={arrivalLoading}
//             onChange={handleArrivalCityChange} // Use updated handler
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

//         <Dropdown
//           label="Add Passengers"
//           btnText={`${adultCount} Adults, ${childCount} Children, ${infantCount} Infants`}
//         >
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

// export default BookFlightPage;




import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/components/navbar/Navbar";

// Utility to format numbers as currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

const BookFlightPage: React.FC = () => {
    // State for passenger forms data
    const [passengerForms, setPassengerForms] = useState<
        {
            id: string;
            dateOfBirth: any;
            name: {
                firstName: any;
                lastName: any;
            };
            gender: any;
            contact: {
                emailAddress: any;
                phones: [{
                    deviceType: any;
                    countryCallingCode: any;
                    number: any;
                }];
            };
            documents: [
                {
                    documentType: any;
                    birthPlace: any;
                    issuanceLocation: any;
                    issuanceDate: any;
                    number: any;
                    expiryDate: any;
                    issuanceCountry: any;
                    validityCountry: any;
                    nationality: any;
                    holder: any;
                }
            ]

        }[]
    >([]);

    // State for flight details
    const [flightPrice, setFlightPrice] = useState(0);
    const [departureDate, setDepartureDate] = useState("");
    const [departureAirline, setDepartureAirline] = useState("");
    const [arrivalAirline, setArrivalAirline] = useState("");
    const [airlineName, setAirlineName] = useState("");
    const [total, setTotal] = useState(0);

    // Traveler counts
    const [adultCount, setAdultCount] = useState<number>(0);
    const [childCount, setChildCount] = useState<number>(0);
    const [infantCount, setInfantCount] = useState<number>(0);
    const [travelerCount, setTravelerCount] = useState<number>(0);

    // Traveler prices
    const [adultPrice, setAdultPrice] = useState(0);
    const [childPrice, setChildPrice] = useState(0);
    const [infantPrice, setInfantPrice] = useState(0);
    const [flightDetails, setFlightDetails] = useState(null);


    // State to handle loading
    const [loading, setLoading] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const setDeepValue = (obj: any, path: string, value: any): any => {
        const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean); // Split by dot or bracket notation
        const updatedObj = { ...obj }; // Create a shallow copy of the object
        let current = updatedObj;

        keys.forEach((key, idx) => {
            if (idx === keys.length - 1) {
                current[key] = value; // Set the value at the final key
            } else {
                const nextKey = isNaN(Number(keys[idx + 1])) ? {} : []; // Decide if the next key is an object or array
                current[key] = current[key] ? { ...current[key] } : nextKey; // Ensure the key exists and is a copy
                current = current[key];
            }
        });

        return updatedObj;
    };

    const handlePassengerChange = (
        index: number,
        field: any,
        value: any
    ) => {
        const updatedForms = [...passengerForms];
        updatedForms[index] = setDeepValue(updatedForms[index], field, value);
        setPassengerForms(updatedForms);
    };



    // console.log('handlePassengerChange', handlePassengerChange)

    useEffect(() => {
        const storedFlightData = localStorage.getItem("selectedFlight");

        // console.log('storedflightdata', storedFlightData)

        if (storedFlightData) {
            const parsedFlightDetails = JSON.parse(storedFlightData);
            setFlightDetails(parsedFlightDetails);

            console.log('parsedFlightDetails', parsedFlightDetails)

            // Set other state variables based on parsedFlightDetails...
        }
        setLoading(false);
    }, []);

    const initiatePayment = async () => {
        if (!flightDetails) {
            console.error("Flight details not loaded");
            return;
        }

        try {
            // Make an API call to initiate the payment
            const apiUrl = `https://test.ffsdtravels.com/api/generate/payment?paid_by_email=${encodeURIComponent(
                passengerForms[0]?.contact.emailAddress
            )}&amount=${total}&flight_order_am_id=${flightDetails.id}`;

            const response = await fetch(apiUrl, {
                method: "POST", // Use the appropriate method (POST/GET) based on the API documentation
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log('initiate response', response)

            if (!response.ok) {
                throw new Error("Failed to initiate payment with the API");
            }

            const data = await response.json();
            // console.log("API payment initiation successful:", data);

            setIsLoading(false);


            // new paystack starts here
            var access_code = data.access_code; // Example access code (ensure it's a string)

            const popup = new (window as any).PaystackPop();

            // Define callback functions
            function onSuccess(response) {
                handleBooking()
                alert('Transaction successful! Reference: ' + response.reference);
                // Implement server-side to validate payment status
            }

            function onCancel() {
                alert('Transaction was canceled.');
            }

            function onLoad() {
                console.log('Transaction loading...');
            }

            function onError(error) {
                alert('An error occurred: ' + error.message);
            }

            // Register the resumeTransaction method with appropriate callbacks
            popup.resumeTransaction(access_code, {
                onSuccess: onSuccess, // Call onSuccess when transaction is successful
                onCancel: onCancel,   // Call onCancel when transaction is canceled
                onLoad: onLoad,       // Call onLoad during transaction loading
                onError: onError      // Call onError if an error occurs
            });
            // new paystack endss here

            // paystackHandler.openIframe();
        } catch (error) {
            console.error("Error initiating payment:", error);
        }
    };


    const handleBooking = async () => {
        try {
            if (!flightDetails || !passengerForms.length) {
                console.error("Missing flight or passenger details");
                return;
            }

            const bookingData = {
                data: {
                    type: "flight-order",
                    flightOffers: [flightDetails],
                    // travelers: [passengerForms],
                    travelers: [
                        {
                            id: "1",
                            dateOfBirth: "1982-01-16",
                            name: {
                                firstName: "testing",
                                lastName: "today"
                            },
                            gender: "MALE",
                            contact: {
                                emailAddress: "ay.gonzales833@telefonica.ES",
                                phones: [
                                    {
                                        deviceType: "MOBILE",
                                        countryCallingCode: "34",
                                        number: "1234"
                                    }
                                ]
                            },
                            documents: [
                                {
                                    documentType: "PASSPORT",
                                    birthPlace: "Madrid",
                                    issuanceLocation: "Madrid",
                                    issuanceDate: "2015-04-14",
                                    number: "00000000",
                                    expiryDate: "2025-04-14",
                                    issuanceCountry: "ES",
                                    validityCountry: "ES",
                                    nationality: "ES",
                                    holder: true
                                }
                            ]
                        }
                    ],
                    remarks: {
                        general: [
                            {
                                subType: "GENERAL_MISCELLANEOUS",
                                text: "FFSD ONLINE BOOKING.",
                            },
                        ],
                    },
                    ticketingAgreement: {
                        option: "DELAY_TO_CANCEL",
                        delay: "6D",
                    },
                    contacts: [
                        {
                            addresseeName: {
                                firstName: "KINGSLEY",
                                lastName: "UCHE",
                            },
                            companyName: "FFSD TRAVELS",
                            purpose: "STANDARD",
                            phones: [
                                {
                                    deviceType: "LANDLINE",
                                    countryCallingCode: "34",
                                    number: "480080071",
                                },
                                {
                                    deviceType: "MOBILE",
                                    countryCallingCode: "33",
                                    number: "480080072",
                                },
                            ],
                            emailAddress: "support@ffsdtravels.com",
                            address: {
                                lines: ["Calle Prado, 16"],
                                postalCode: "28014",
                                cityName: "Madrid",
                                countryCode: "ES",
                            },
                        },
                    ],
                },
                // paymentReference, // Pass the Paystack reference
            };

            console.log('bookingDatadfdsfg', bookingData)

            const confirmPriceToken = localStorage.getItem("confirmPriceToken");
            // const payToken = localStorage.getItem("payToken");
            // console.log('payToken', payToken)

            const response = await fetch(
                "https://test.ffsdtravels.com/api/flight/book",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${confirmPriceToken}`
                    },
                    body: JSON.stringify(bookingData),
                }
            );

            if (response.ok) {
                console.log("Flight booked successfully:", response);
                // const result = await response.json();
                alert("Flight booked successfully!");
                const totalTravelers = flightDetails.travelerPricings.length;
                setPassengerForms(
                    Array.from({ length: totalTravelers }, (_, index) => ({
                        id: (index + 1).toString(), // Assigns a unique ID starting from "1"
                        dateOfBirth: "",
                        name: {
                            firstName: "",
                            lastName: "",
                        },
                        gender: "",
                        contact: {
                            emailAddress: "",
                            phones: [{
                                deviceType: "MOBILE", // or "home", "work"
                                countryCallingCode: "34",
                                number: "12345678",
                            }],
                        },
                        documents: [
                            {
                                documentType: "",
                                birthPlace: "",
                                issuanceLocation: "",
                                issuanceDate: "",
                                number: "",
                                expiryDate: "",
                                issuanceCountry: "",
                                validityCountry: "",
                                nationality: "",
                                holder: true,
                            }
                        ]
                    }))
                );
            } else {
                console.error("Error booking flight:", response.statusText);
                alert("Failed to book flight. Please contact support.");
            }
        } catch (error) {
            console.error("Error booking flight:", error);
            alert("An error occurred while booking the flight. Please try again.");
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Save the passenger information to localStorage
        localStorage.setItem("passengerInfo", JSON.stringify(passengerForms));

        // Initiate the payment
        initiatePayment();


        setIsLoading(false); // Optionally stop the loading state if applicable
    };


    // Load flight data from localStorage on component mount
    useEffect(() => {
        const storedFlightData = localStorage.getItem("selectedFlight");

        if (storedFlightData) {
            const flightDetails = JSON.parse(storedFlightData);
            // console.log('flightDetails', flightDetails);
            setFlightPrice(flightDetails.price.ffsd_total || 0);
            setDepartureDate(flightDetails.lastTicketingDate || "");
            setDepartureAirline(flightDetails.itineraries[0].segments[0].departure_airport || "");
            setArrivalAirline(flightDetails.itineraries[0].segments[1].arrival_airport || "");
            setAirlineName(flightDetails.itineraries[0].segments[0].airlineName || "");

            const getTravelerCountByType = (type: string) => {
                return flightDetails.travelerPricings.filter(
                    (traveler: { travelerType: string }) =>
                        traveler.travelerType === type
                ).length;
            };

            const getTravelerPrices = () => {
                const travelerTypes = ["ADULT", "CHILD", "HELD_INFANT"];

                const travelerPrices = travelerTypes.reduce((prices, type) => {
                    const totalPrice = flightDetails.travelerPricings
                        .filter(
                            (traveler: { travelerType: string }) =>
                                traveler.travelerType === type
                        )
                        .reduce(
                            (
                                total: number,
                                traveler: { price: { total_charge: string } }
                            ) => total + parseFloat(traveler.price.total_charge),
                            0
                        );

                    prices[type] = totalPrice;
                    return prices;
                }, {} as Record<string, number>);

                return travelerPrices;
            };

            setAdultCount(getTravelerCountByType("ADULT"));
            setChildCount(getTravelerCountByType("CHILD"));
            setInfantCount(getTravelerCountByType("HELD_INFANT"));
            setTravelerCount(flightDetails.travelerPricings.length);

            const travelerPrices = getTravelerPrices();
            setAdultPrice(travelerPrices.ADULT);
            setChildPrice(travelerPrices.CHILD);
            setInfantPrice(travelerPrices.HELD_INFANT);

            // Initialize passenger forms
            const totalTravelers = flightDetails.travelerPricings.length;
            setPassengerForms(
                Array.from({ length: totalTravelers }, (_, index) => ({
                    id: (index + 1).toString(), // Assigns a unique ID starting from "1"
                    dateOfBirth: "",
                    name: {
                        firstName: "",
                        lastName: "",
                    },
                    gender: "",
                    contact: {
                        emailAddress: "",
                        phones: [
                            {
                                deviceType: "MOBILE", // or "home", "work"
                                countryCallingCode: "34",
                                number: "1234",
                            }
                        ],
                    },
                    documents: [
                        {
                            documentType: "",
                            birthPlace: "",
                            issuanceLocation: "",
                            issuanceDate: "",
                            number: "",
                            expiryDate: "",
                            issuanceCountry: "",
                            validityCountry: "",
                            nationality: "",
                            holder: true,
                        }
                    ]
                }))
            );

        }
        setLoading(false); // Set loading to false after data fetch
    }, []);

    useEffect(() => {
        const calculatedTotal =
            adultPrice + childPrice + infantPrice;
        setTotal(calculatedTotal);
    }, [adultPrice, childPrice, infantPrice]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading flight details...</p>
            </div>
        );
    }


    return (
        <>
            <Navbar />
            <div className="w-full overflow-hidden pt-4 section-width">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Passenger Information Section */}
                    <div className="flex-1 w-full md:w-[60%] px-4 my-3">

                        {/* Flight details card */}
                        <Card className="bg-white shadow-md p-4 rounded-sm">
                            <CardContent className="p-0">
                                <div className="p-2 border-b-2 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <b className="text-base">
                                                {airlineName || "Airline Name"}
                                            </b>
                                        </div>
                                    </div>

                                    <div className="flex gap-5 items-center">
                                        <div className="text-end">
                                            <p className="text-sm font-medium">Full pay</p>
                                            <p className="text-sm font-semibold text-gray-600">
                                                {formatCurrency(flightPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <div className="flex items-center justify-between space-x-1">
                                        <p className="text-base text-gray-600">
                                            <span className="font-bold text-black">Departure Date</span>{" "}
                                            <span className="font-medium">{departureDate}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between space-x-1 p-3 rounded-xs mt-2">
                                        <div className="flex flex-col items-start w-[35%]">
                                            <p className="font-semibold text-gray-500 capitalize">
                                                {departureAirline || "Departure Airport"}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end w-[35%]">
                                            <p className="font-semibold text-gray-500 capitalize">
                                                {arrivalAirline || "Arrival airport"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white shadow-md p-6 mt-4">
                            <CardHeader className="text-lg font-semibold">
                                Passenger Information
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    {passengerForms.map((form, index) => (
                                        <div key={index} className="p-4 border rounded mb-4">
                                            <h3 className="font-bold mb-2">
                                                Passenger {index + 1}
                                            </h3>
                                            <div>
                                                <label htmlFor={`firstName-${index}`} className="block font-medium">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`firstName-${index}`}
                                                    value={form.name.firstName}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "name.firstName", e.target.value)
                                                    }
                                                    required
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`lastName-${index}`} className="block font-medium">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`lastName-${index}`}
                                                    value={form.name.lastName}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "name.lastName", e.target.value)
                                                    }
                                                    required
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`emailAddress-${index}`} className="block font-medium">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id={`emailAddress-${index}`}
                                                    value={form.contact.emailAddress}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "contact.emailAddress", e.target.value)
                                                    }
                                                    required
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`Pnumber-${index}`} className="block font-medium">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    id={`Pnumber-${index}`}
                                                    value={form.contact.phones[0].number}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "contact.phones[0].number", e.target.value)
                                                    }
                                                    required
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>


                                            <div>
                                                <label htmlFor={`dateOfBirth-${index}`} className="block font-medium">
                                                    Date Of Birth
                                                </label>
                                                <input
                                                    type="date"
                                                    id={`dateOfBirth-${index}`}
                                                    value={form.dateOfBirth}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "dateOfBirth", e.target.value)
                                                    }
                                                    required
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor={`gender-${index}`} className="block font-medium">
                                                    Gender
                                                </label>
                                                <select
                                                    id={`gender-${index}`}
                                                    value={form.gender}
                                                    onChange={(e) =>
                                                        handlePassengerChange(index, "gender", e.target.value)
                                                    }
                                                    required
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>



                                        </div>
                                    ))}
                                    <Button type="submit" className="bg-primaryRed text-white mt-4">
                                        {isLoading ? "Submitting..." : "Submit"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payment Breakdown Section */}
                    <div className="w-full md:w-[30%] px-4 my-3">
                        <Card className="bg-white shadow-md p-6">
                            <CardHeader className="text-lg font-semibold">
                                Payment Details
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <span>Adult (X{adultCount}):</span>
                                        <span>{formatCurrency(adultPrice)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Children (X{childCount}):</span>
                                        <span>{formatCurrency(childPrice)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Infant (X{infantCount}):</span>
                                        <span>{formatCurrency(infantPrice)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Total ({travelerCount} Travelers):</span>
                                        <span>{formatCurrency(total)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookFlightPage;