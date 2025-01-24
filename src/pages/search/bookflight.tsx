// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { toast } from "react-toastify";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Navbar from "@/components/components/navbar/Navbar";
// import Loading from "@/components/components/withStatus/loading/Loading";
// import { useNavigate } from "react-router-dom";

// // Utility to format numbers as currency
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// const BookFlightPage: React.FC = () => {
//   const navigate = useNavigate();

//   // State for passenger forms data
//   const [passengerForms, setPassengerForms] = useState<
//     {
//       id: any;
//       dateOfBirth: any;
//       name: {
//         firstName: any;
//         lastName: any;
//       };
//       gender: any;
//       contact: {
//         emailAddress: any;
//         phones: [{
//           deviceType: any;
//           countryCallingCode: any;
//           number: any;
//         }];
//       };
      
//     }[]
//   >([]);

//   // State for flight details
//   const [flightPrice, setFlightPrice] = useState(0);
//   const [departureDate, setDepartureDate] = useState("");
//   const [departureAirline, setDepartureAirline] = useState("");
//   const [arrivalAirline, setArrivalAirline] = useState("");
//   const [airlineName, setAirlineName] = useState("");
//   const [total, setTotal] = useState(0);

//   // Traveler counts
//   const [adultCount, setAdultCount] = useState<number>(0);
//   const [childCount, setChildCount] = useState<number>(0);
//   const [infantCount, setInfantCount] = useState<number>(0);
//   const [travelerCount, setTravelerCount] = useState<number>(0);

//   // Traveler prices
//   const [adultPrice, setAdultPrice] = useState(0);
//   const [childPrice, setChildPrice] = useState(0);
//   const [infantPrice, setInfantPrice] = useState(0);
//   const [flightDetails, setFlightDetails] = useState(null);


//   // State to handle loading
//   const [loading, setLoading] = useState(true);

//   const [isLoading, setIsLoading] = useState(false);

//   const setDeepValue = (obj: any, path: string, value: any): any => {
//     const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean); // Split by dot or bracket notation
//     const updatedObj = { ...obj }; // Create a shallow copy of the object
//     let current = updatedObj;
  
//     keys.forEach((key, idx) => {
//       if (idx === keys.length - 1) {
//         current[key] = value; // Set the value at the final key
//       } else {
//         const nextKey = isNaN(Number(keys[idx + 1])) ? {} : []; // Decide if the next key is an object or array
//         current[key] = current[key] ? { ...current[key] } : nextKey; // Ensure the key exists and is a copy
//         current = current[key];
//       }
//     });
  
//     return updatedObj;
//   };
  
//   const handlePassengerChange = (
//     index: number,
//     field: any,
//     value: any
//   ) => {
//     const updatedForms = [...passengerForms];
//     updatedForms[index] = setDeepValue(updatedForms[index], field, value);
//     setPassengerForms(updatedForms);
//   };
  
  

//   // console.log('handlePassengerChange', handlePassengerChange)

//   useEffect(() => {
//     const storedFlightData = localStorage.getItem("selectedFlight");

//     // console.log('storedflightdata', storedFlightData)
  
//     if (storedFlightData) {
//       const parsedFlightDetails = JSON.parse(storedFlightData);
//       setFlightDetails(parsedFlightDetails);

//       console.log('parsedFlightDetails', parsedFlightDetails)
  
//       // Set other state variables based on parsedFlightDetails...
//     }
//     setLoading(false);
//   }, []);

//   const initiatePayment = async () => {
//     if (!flightDetails) {
//       console.error("Flight details not loaded");
//       return;
//     }
  
//     try {
//       // Make an API call to initiate the payment
//       const apiUrl = `https://test.ffsdtravels.com/api/generate/payment?paid_by_email=${encodeURIComponent(
//         passengerForms[0]?.contact.emailAddress
//       )}&amount=${total}&flight_order_am_id=${flightDetails.id}`;
  
//       const response = await fetch(apiUrl, {
//         method: "POST", // Use the appropriate method (POST/GET) based on the API documentation
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log('initiate response', response)
  
//       if (!response.ok) {
//         throw new Error("Failed to initiate payment with the API");
//       }
  
//       const data = await response.json();
//       console.log("API payment initiation successful:", data);

//       setIsLoading(false);


//       // new paystack starts here
//     var access_code = data.access_code; // Example access code (ensure it's a string)

//     const popup = new (window as any).PaystackPop();

//     const onSuccess = (response) => {
//       // Extract the dynamic reference and amount from the response
//       const reference = data.reference;
//       const amount = data.payment.amount;

//       console.log("Transaction successful:", response);
//       toast("Transaction Successful, wait for your booking confirmation");
//       handlePaymentSuccess(reference, amount); // Pass these values to your success handler
//       handleBooking();
//     };

//     function onCancel() {
//       toast("Transaction was canceled.")
//     }

//     function onLoad() {
//       console.log('Transaction loading...');
//     }

//     function onError(error) {
//       toast.error('An error occurred: ' + error.message);
//     }

//     // Register the resumeTransaction method with appropriate callbacks
//     popup.resumeTransaction(access_code, {
//         onSuccess: onSuccess, 
//         onCancel: onCancel,   
//         onLoad: onLoad,      
//         onError: onError      
//     });
//     // new paystack endss here
  
//       // paystackHandler.openIframe();
//     } catch (error) {
//       toast.error("Error initiating payment:", error);
//     }
//   };

//   const handlePaymentSuccess = async (reference, amount) => {
//     const apiUrl = `https://test.ffsdtravels.com/api/verify/payment`;
  
//     try {
//       const response = await fetch(`${apiUrl}?reference=${reference}&amount=${amount}`, {
//         method: "GET", // Change to POST if the API requires it
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       console.log("Payment verification response:", data);
  
//       if (data.success) {
//         // Handle successful payment verification
//         alert("Payment verified successfully!");
//       } else {
//         // Handle unsuccessful payment verification
//         alert("Payment verification failed.");
//       }
//     } catch (error) {
//       console.error("Payment verification error:", error);
//       alert("An error occurred while verifying the payment.");
//     }
//   };
  
  

//   const handleBooking = async () => {
//     try {
//       if (!flightDetails || !passengerForms.length) {
//         console.error("Missing flight or passenger details");
//         return;
//       }

//       const bookingData = {
//         data: {
//           type: "flight-order",
//           flightOffers: [flightDetails],
//           travelers: passengerForms,
//           remarks: {
//             general: [
//               {
//                 subType: "GENERAL_MISCELLANEOUS",
//                 text: "FFSD ONLINE BOOKING.",
//               },
//             ],
//           },
//           ticketingAgreement: {
//             option: "DELAY_TO_CANCEL",
//             delay: "6D",
//           },
//           contacts: [
//             {
//               addresseeName: {
//                 firstName: "KINGSLEY",
//                 lastName: "UCHE",
//               },
//               companyName: "FFSD TRAVELS",
//               purpose: "STANDARD",
//               phones: [
//                 {
//                   deviceType: "LANDLINE",
//                   countryCallingCode: "34",
//                   number: "480080071",
//                 },
//                 {
//                   deviceType: "MOBILE",
//                   countryCallingCode: "33",
//                   number: "480080072",
//                 },
//               ],
//               emailAddress: "support@ffsdtravels.com",
//               address: {
//                 lines: ["Calle Prado, 16"],
//                 postalCode: "28014",
//                 cityName: "Madrid",
//                 countryCode: "ES",
//               },
//             },
//           ],
//         },
//       };

//       console.log('bookingDatadfdsfg', bookingData)

//       const confirmPriceToken = localStorage.getItem("confirmPriceToken");
//       // const payToken = localStorage.getItem("payToken");
//       // console.log('payToken', payToken)

//       const response = await fetch(
//         "https://test.ffsdtravels.com/api/flight/book",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${confirmPriceToken}`
//           },
//           body: JSON.stringify(bookingData),
//         }
//       );

//       if (response.ok) {
//         toast("Flight booked successfully")
//         navigate("/")
//       } else {
//         console.error("Error booking flight:", response.statusText);
//         alert("Failed to book flight. Please contact support.");
//       }
//     } catch (error) {
//       console.error("Error booking flight:", error);
//       alert("An error occurred while booking the flight. Please try again.");
//     }
//   };


//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
  
//     // Save the passenger information to localStorage
//     localStorage.setItem("passengerInfo", JSON.stringify(passengerForms));
  
//     // Initiate the payment
//     initiatePayment();
  
//   };
  

//   // Load flight data from localStorage on component mount
//   useEffect(() => {
//     const storedFlightData = localStorage.getItem("selectedFlight");

//     if (storedFlightData) {
//       const flightDetails = JSON.parse(storedFlightData);
//       // console.log('flightDetails', flightDetails);
//       setFlightPrice(flightDetails.price.ffsd_total || 0);
//       setDepartureDate(flightDetails.lastTicketingDate || "");
//       setDepartureAirline(flightDetails.itineraries[0].segments[0].departure_airport || "");
//       setArrivalAirline(flightDetails.itineraries[0].segments[1].arrival_airport || "");
//       setAirlineName(flightDetails.itineraries[0].segments[0].airlineName || "");

//       const getTravelerCountByType = (type: string) => {
//         return flightDetails.travelerPricings.filter(
//           (traveler: { travelerType: string }) =>
//             traveler.travelerType === type
//         ).length;
//       };

//       const getTravelerPrices = () => {
//         const travelerTypes = ["ADULT", "CHILD", "HELD_INFANT"];

//         const travelerPrices = travelerTypes.reduce((prices, type) => {
//           const totalPrice = flightDetails.travelerPricings
//             .filter(
//               (traveler: { travelerType: string }) =>
//                 traveler.travelerType === type
//             )
//             .reduce(
//               (
//                 total: number,
//                 traveler: { price: { total_charge: string } }
//               ) => total + parseFloat(traveler.price.total_charge),
//               0
//             );

//           prices[type] = totalPrice;
//           return prices;
//         }, {} as Record<string, number>);

//         return travelerPrices;
//       };

//       setAdultCount(getTravelerCountByType("ADULT"));
//       setChildCount(getTravelerCountByType("CHILD"));
//       setInfantCount(getTravelerCountByType("HELD_INFANT"));
//       setTravelerCount(flightDetails.travelerPricings.length);

//       const travelerPrices = getTravelerPrices();
//       setAdultPrice(travelerPrices.ADULT);
//       setChildPrice(travelerPrices.CHILD);
//       setInfantPrice(travelerPrices.HELD_INFANT);

//       // Initialize passenger forms
//       const totalTravelers = flightDetails.travelerPricings.length;
//       setPassengerForms(
//         Array.from({ length: totalTravelers }, (_, index) => ({
//           id: (index + 1).toString(), // Assigns a unique ID starting from "1"
//           dateOfBirth: "",
//           name: { 
//             firstName: "",
//             lastName: "",
//           },
//           gender: "",
//           contact: {
//             emailAddress: "",
//             phones: [
//               {
//               deviceType: "MOBILE", // or "home", "work"
//               countryCallingCode: "34",
//               number: "",
//             }
//           ],
//           }
//         }))
//       );
      
//     }
//     setLoading(false); // Set loading to false after data fetch
//   }, []);

//   useEffect(() => {
//     const calculatedTotal =
//       adultPrice + childPrice + infantPrice;
//     setTotal(calculatedTotal);
//   }, [adultPrice, childPrice, infantPrice]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Loading flight details...</p>
//       </div>
//     );
//   }


//   return (
//     <>
//       <Navbar />
//       <div className="w-full overflow-hidden pt-4 section-width">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Passenger Information Section */}
//           <div className="flex-1 w-full md:w-[60%] px-4 my-3">

//             {/* Flight details card */}
//             <Card className="bg-white shadow-md p-4 rounded-sm">
//               <CardContent className="p-0">
//                 <div className="p-2 border-b-2 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div>
//                       <b className="text-base">
//                         {airlineName || "Airline Name"}
//                       </b>
//                     </div>
//                   </div>

//                   <div className="flex gap-5 items-center">
//                     <div className="text-end">
//                       <p className="text-sm font-medium">Full pay</p>
//                       <p className="text-sm font-semibold text-gray-600">
//                         {formatCurrency(flightPrice)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-3">
//                   <div className="flex items-center justify-between space-x-1">
//                     <p className="text-base text-gray-600">
//                       <span className="font-bold text-black">Departure Date</span>{" "}
//                       <span className="font-medium">{departureDate}</span>
//                     </p>
//                   </div>

//                   <div className="flex items-center justify-between space-x-1 p-3 rounded-xs mt-2">
//                     <div className="flex flex-col items-start w-[35%]">
//                       <p className="font-semibold text-gray-500 capitalize">
//                         {departureAirline || "Departure Airport"}
//                       </p>
//                     </div>

//                     <div className="flex flex-col items-end w-[35%]">
//                       <p className="font-semibold text-gray-500 capitalize">
//                         {arrivalAirline || "Arrival airport"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white shadow-md p-6 mt-4">
//               <CardHeader className="text-lg font-semibold">
//                 Passenger Information
//               </CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                   {passengerForms.map((form, index) => (
//                     <div key={index} className="p-4 border rounded mb-4">
//                       <h3 className="font-bold mb-2">
//                         Passenger {index + 1}
//                       </h3>
//                       <div>
//                         <label htmlFor={`firstName-${index}`} className="block font-medium">
//                            First Name
//                         </label>
//                         <input
//                           type="text"
//                           id={`firstName-${index}`}
//                           value={form.name.firstName}
//                           onChange={(e) =>
//                             handlePassengerChange(index, "name.firstName", e.target.value)
//                           }
//                           required
//                           className="w-full p-2 border border-gray-300 rounded"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor={`lastName-${index}`} className="block font-medium">
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           id={`lastName-${index}`}
//                           value={form.name.lastName}
//                           onChange={(e) =>
//                             handlePassengerChange(index, "name.lastName", e.target.value)
//                           }
//                           required
//                           className="w-full p-2 border border-gray-300 rounded"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor={`emailAddress-${index}`} className="block font-medium">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           id={`emailAddress-${index}`}
//                           value={form.contact.emailAddress}
//                           onChange={(e) =>
//                             handlePassengerChange(index, "contact.emailAddress", e.target.value)
//                           }
//                           required
//                           className="w-full p-2 border border-gray-300 rounded"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor={`Pnumber-${index}`} className="block font-medium">
//                           Phone
//                         </label>
//                         <input
//                           type="tel"
//                           id={`Pnumber-${index}`}
//                           value={form.contact.phones[0].number}
//                           onChange={(e) =>
//                             handlePassengerChange(index, "contact.phones[0].number", e.target.value)
//                           }
//                           required
//                           className="w-full p-2 border border-gray-300 rounded"
//                         />
//                       </div>

                      
//                       <div>
//                         <label htmlFor={`dateOfBirth-${index}`} className="block font-medium">
//                           Date Of Birth
//                         </label>
//                         <input
//                           type="date"
//                           id={`dateOfBirth-${index}`}
//                           value={form.dateOfBirth}
//                           onChange={(e) =>
//                             handlePassengerChange(index, "dateOfBirth", e.target.value)
//                           }
//                           required
//                           className="w-full p-2 border border-gray-300 rounded"
//                         />
//                       </div>

//                       <div>
//                         <label htmlFor={`gender-${index}`} className="block font-medium">
//                           Gender
//                         </label>
//                         <select
//                           id={`gender-${index}`}
//                           value={form.gender}
//                           onChange={(e) =>
//                             handlePassengerChange(index, "gender", e.target.value)
//                           }
//                           required
//                           className="w-full p-2 border border-gray-300 rounded"
//                         >
//                           <option value="">Select Gender</option>
//                           <option value="MALE">Male</option>
//                           <option value="FEMALE">Female</option>
//                         </select>
//                       </div>
                      
//                     </div>
//                   ))}
//                   <Button type="submit" className="bg-primaryRed text-white mt-4">
//                     {/* {isLoading ? "Submitting..." : "Submit"} */}
//                     {isLoading ? <Loading color="#FFFFFF" size="20" /> : "Submit"}
//                   </Button>

                  
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Payment Breakdown Section */}
//           <div className="w-full md:w-[30%] px-4 my-3">
//             <Card className="bg-white shadow-md p-6">
//               <CardHeader className="text-lg font-semibold">
//                 Payment Details
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-2">
//                   <div className="flex justify-between">
//                     <span>Adult (X{adultCount}):</span>
//                     <span>{formatCurrency(adultPrice)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Children (X{childCount}):</span>
//                     <span>{formatCurrency(childPrice)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Infant (X{infantCount}):</span>
//                     <span>{formatCurrency(infantPrice)}</span>
//                   </div>
//                   <div className="flex justify-between font-semibold">
//                     <span>Total ({travelerCount} Travelers):</span>
//                     <span>{formatCurrency(total)}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookFlightPage;











// // import React, { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { toast } from "react-toastify";
// // import { Card, CardContent, CardHeader } from "@/components/ui/card";
// // import Navbar from "@/components/components/navbar/Navbar";
// // import Loading from "@/components/components/withStatus/loading/Loading";
// // import { useNavigate } from "react-router-dom";

// // // Utility to format numbers as currency
// // const formatCurrency = (amount: number) => {
// //   return new Intl.NumberFormat("en-NG", {
// //     style: "currency",
// //     currency: "NGN",
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   }).format(amount);
// // };

// // const BookFlightPage: React.FC = () => {
// //   const navigate = useNavigate();

// //   // State for passenger forms data
// //   const [passengerForms, setPassengerForms] = useState<
// //     {
// //       id: any;
// //       dateOfBirth: any;
// //       name: {
// //         firstName: any;
// //         lastName: any;
// //       };
// //       gender: any;
// //       contact: {
// //         emailAddress: any;
// //         phones: [{
// //           deviceType: any;
// //           countryCallingCode: any;
// //           number: any;
// //         }];
// //       };
// //     }[]
// //   >([]);

// //   // State for flight details
// //   const [flightPrice, setFlightPrice] = useState(0);
// //   const [departureDate, setDepartureDate] = useState("");
// //   const [departureAirline, setDepartureAirline] = useState("");
// //   const [arrivalAirline, setArrivalAirline] = useState("");
// //   const [airlineName, setAirlineName] = useState("");
// //   const [total, setTotal] = useState(0);

// //   // Traveler counts
// //   const [adultCount, setAdultCount] = useState<number>(0);
// //   const [childCount, setChildCount] = useState<number>(0);
// //   const [infantCount, setInfantCount] = useState<number>(0);
// //   const [travelerCount, setTravelerCount] = useState<number>(0);

// //   // Traveler prices
// //   const [adultPrice, setAdultPrice] = useState(0);
// //   const [childPrice, setChildPrice] = useState(0);
// //   const [infantPrice, setInfantPrice] = useState(0);
// //   const [flightDetails, setFlightDetails] = useState(null);

// //   // State to handle loading
// //   const [loading, setLoading] = useState(true);

// //   const [isLoading, setIsLoading] = useState(false);

// //   const [showModal, setShowModal] = useState(false); // State to control modal visibility

// //   const setDeepValue = (obj: any, path: string, value: any): any => {
// //     const keys = path.split(/\.|\[(\d+)\]/).filter(Boolean); // Split by dot or bracket notation
// //     const updatedObj = { ...obj }; // Create a shallow copy of the object
// //     let current = updatedObj;
  
// //     keys.forEach((key, idx) => {
// //       if (idx === keys.length - 1) {
// //         current[key] = value; // Set the value at the final key
// //       } else {
// //         const nextKey = isNaN(Number(keys[idx + 1])) ? {} : []; // Decide if the next key is an object or array
// //         current[key] = current[key] ? { ...current[key] } : nextKey; // Ensure the key exists and is a copy
// //         current = current[key];
// //       }
// //     });
  
// //     return updatedObj;
// //   };

// //   const handlePassengerChange = (
// //     index: number,
// //     field: any,
// //     value: any
// //   ) => {
// //     const updatedForms = [...passengerForms];
// //     updatedForms[index] = setDeepValue(updatedForms[index], field, value);
// //     setPassengerForms(updatedForms);
// //   };

// //   useEffect(() => {
// //     const storedFlightData = localStorage.getItem("selectedFlight");

// //     if (storedFlightData) {
// //       const parsedFlightDetails = JSON.parse(storedFlightData);
// //       setFlightDetails(parsedFlightDetails);
// //       setLoading(false);
// //     }
// //   }, []);

// //   const initiatePayment = async () => {
// //     if (!flightDetails) {
// //       console.error("Flight details not loaded");
// //       return;
// //     }

// //     try {
// //       const apiUrl = `https://test.ffsdtravels.com/api/generate/payment?paid_by_email=${encodeURIComponent(
// //         passengerForms[0]?.contact.emailAddress
// //       )}&amount=${total}&flight_order_am_id=${flightDetails.id}`;

// //       const response = await fetch(apiUrl, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to initiate payment with the API");
// //       }

// //       const data = await response.json();

// //       var access_code = data.access_code;

// //       const popup = new (window as any).PaystackPop();

// //       const onSuccess = () => {
// //         const reference = data.reference;
// //         const amount = data.payment.amount;

// //         toast("Transaction Successful, wait for your booking confirmation");
// //         handlePaymentSuccess(reference, amount); // Pass these values to your success handler
// //       };

// //       function onCancel() {
// //         toast("Transaction was canceled.");
// //       }

// //       function onLoad() {
// //         console.log("Transaction loading...");
// //       }

// //       function onError(error) {
// //         toast.error("An error occurred: " + error.message);
// //       }

// //       popup.resumeTransaction(access_code, {
// //         onSuccess: onSuccess,
// //         onCancel: onCancel,
// //         onLoad: onLoad,
// //         onError: onError,
// //       });
// //     } catch (error) {
// //       toast.error("Error initiating payment:", error);
// //     }
// //   };

// //   const handlePaymentSuccess = async (reference, amount) => {
// //     const apiUrl = `https://test.ffsdtravels.com/api/verify/payment`;

// //     try {
// //       const response = await fetch(`${apiUrl}?reference=${reference}&amount=${amount}`, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error(`Error: ${response.statusText}`);
// //       }

// //       const data = await response.json();

// //       if (data.success) {
// //         // Show the modal after payment success
// //         setShowModal(true);
// //         handleBooking();
// //       } else {
// //         alert("Payment verification failed.");
// //       }
// //     } catch (error) {
// //       console.error("Payment verification error:", error);
// //       alert("An error occurred while verifying the payment.");
// //     }
// //   };

// //   const handleBooking = async () => {
// //     try {
// //       if (!flightDetails || !passengerForms.length) {
// //         console.error("Missing flight or passenger details");
// //         return;
// //       }

// //       const bookingData = {
// //         data: {
// //           type: "flight-order",
// //           flightOffers: [flightDetails],
// //           travelers: passengerForms,
// //           remarks: {
// //             general: [
// //               {
// //                 subType: "GENERAL_MISCELLANEOUS",
// //                 text: "FFSD ONLINE BOOKING.",
// //               },
// //             ],
// //           },
// //           ticketingAgreement: {
// //             option: "DELAY_TO_CANCEL",
// //             delay: "6D",
// //           },
// //           contacts: [
// //             {
// //               addresseeName: {
// //                 firstName: "KINGSLEY",
// //                 lastName: "UCHE",
// //               },
// //               companyName: "FFSD TRAVELS",
// //               purpose: "STANDARD",
// //               phones: [
// //                 {
// //                   deviceType: "LANDLINE",
// //                   countryCallingCode: "34",
// //                   number: "480080071",
// //                 },
// //                 {
// //                   deviceType: "MOBILE",
// //                   countryCallingCode: "33",
// //                   number: "480080072",
// //                 },
// //               ],
// //               emailAddress: "support@ffsdtravels.com",
// //               address: {
// //                 lines: ["Calle Prado, 16"],
// //                 postalCode: "28014",
// //                 cityName: "Madrid",
// //                 countryCode: "ES",
// //               },
// //             },
// //           ],
// //         },
// //       };

// //       console.log('bookingDatadfdsfg', bookingData)

// //       const confirmPriceToken = localStorage.getItem("confirmPriceToken");
// //       // const payToken = localStorage.getItem("payToken");
// //       // console.log('payToken', payToken)

// //       const response = await fetch(
// //         "https://test.ffsdtravels.com/api/flight/book",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${confirmPriceToken}`
// //           },
// //           body: JSON.stringify(bookingData),
// //         }
// //       );

// //       if (response.ok) {
// //         toast("Flight booked successfully")
// //         navigate("/")
// //       } else {
// //         console.error("Error booking flight:", response.statusText);
// //         alert("Failed to book flight. Please contact support.");
// //       }
// //     } catch (error) {
// //       console.error("Error booking flight:", error);
// //       alert("An error occurred while booking the flight. Please try again.");
// //     }
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     localStorage.setItem("passengerInfo", JSON.stringify(passengerForms));
// //     initiatePayment();
// //   };

// //   // Load flight data from localStorage on component mount
// //   useEffect(() => {
// //     const storedFlightData = localStorage.getItem("selectedFlight");

// //     if (storedFlightData) {
// //       const flightDetails = JSON.parse(storedFlightData);
// //       setFlightPrice(flightDetails.price.ffsd_total || 0);
// //       setDepartureDate(flightDetails.lastTicketingDate || "");
// //       setDepartureAirline(flightDetails.itineraries[0].segments[0].departure_airport || "");
// //       setArrivalAirline(flightDetails.itineraries[0].segments[1].arrival_airport || "");
// //       setAirlineName(flightDetails.itineraries[0].segments[0].airlineName || "");

// //       const getTravelerCountByType = (type: string) => {
// //         return flightDetails.travelerPricings.filter(
// //           (traveler: { travelerType: string }) =>
// //             traveler.travelerType === type
// //         ).length;
// //       };

// //       const getTravelerPrices = () => {
// //         const travelerTypes = ["ADULT", "CHILD", "HELD_INFANT"];

// //         const travelerPrices = travelerTypes.reduce((prices, type) => {
// //           const totalPrice = flightDetails.travelerPricings
// //             .filter(
// //               (traveler: { travelerType: string }) =>
// //                 traveler.travelerType === type
// //             )
// //             .reduce(
// //               (
// //                 total: number,
// //                 traveler: { price: { total_charge: string } }
// //               ) => total + parseFloat(traveler.price.total_charge),
// //               0
// //             );

// //           prices[type] = totalPrice;
// //           return prices;
// //         }, {} as Record<string, number>);

// //         return travelerPrices;
// //       };

// //       setAdultCount(getTravelerCountByType("ADULT"));
// //       setChildCount(getTravelerCountByType("CHILD"));
// //       setInfantCount(getTravelerCountByType("HELD_INFANT"));
// //       setTravelerCount(flightDetails.travelerPricings.length);

// //       const travelerPrices = getTravelerPrices();
// //       setAdultPrice(travelerPrices.ADULT);
// //       setChildPrice(travelerPrices.CHILD);
// //       setInfantPrice(travelerPrices.HELD_INFANT);

// //       const totalTravelers = flightDetails.travelerPricings.length;
// //       setPassengerForms(
// //         Array.from({ length: totalTravelers }, (_, index) => ({
// //           id: (index + 1).toString(),
// //           dateOfBirth: "",
// //           name: { 
// //             firstName: "",
// //             lastName: "",
// //           },
// //           gender: "",
// //           contact: {
// //             emailAddress: "",
// //             phones: [
// //               {
// //                 deviceType: "MOBILE",
// //                 countryCallingCode: "34",
// //                 number: "",
// //               }
// //             ],
// //           }
// //         }))
// //       );
// //     }
// //     setLoading(false); // Set loading to false after data fetch
// //   }, []);

// //   useEffect(() => {
// //     const calculatedTotal =
// //       adultPrice + childPrice + infantPrice;
// //     setTotal(calculatedTotal);
// //   }, [adultPrice, childPrice, infantPrice]);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen">
// //         <p>Loading flight details...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="w-full overflow-hidden pt-4 section-width">
// //       <div className="w-full overflow-hidden pt-4 section-width">
// //         <div className="flex flex-col md:flex-row gap-6">
// //           {/* Passenger Information Section */}
// //           <div className="flex-1 w-full md:w-[60%] px-4 my-3">

// //             {/* Flight details card */}
// //             <Card className="bg-white shadow-md p-4 rounded-sm">
// //               <CardContent className="p-0">
// //                 <div className="p-2 border-b-2 flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div>
// //                       <b className="text-base">
// //                         {airlineName || "Airline Name"}
// //                       </b>
// //                     </div>
// //                   </div>

// //                   <div className="flex gap-5 items-center">
// //                     <div className="text-end">
// //                       <p className="text-sm font-medium">Full pay</p>
// //                       <p className="text-sm font-semibold text-gray-600">
// //                         {formatCurrency(flightPrice)}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="mt-3">
// //                   <div className="flex items-center justify-between space-x-1">
// //                     <p className="text-base text-gray-600">
// //                       <span className="font-bold text-black">Departure Date</span>{" "}
// //                       <span className="font-medium">{departureDate}</span>
// //                     </p>
// //                   </div>

// //                   <div className="flex items-center justify-between space-x-1 p-3 rounded-xs mt-2">
// //                     <div className="flex flex-col items-start w-[35%]">
// //                       <p className="font-semibold text-gray-500 capitalize">
// //                         {departureAirline || "Departure Airport"}
// //                       </p>
// //                     </div>

// //                     <div className="flex flex-col items-end w-[35%]">
// //                       <p className="font-semibold text-gray-500 capitalize">
// //                         {arrivalAirline || "Arrival airport"}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             <Card className="bg-white shadow-md p-6 mt-4">
// //               <CardHeader className="text-lg font-semibold">
// //                 Passenger Information
// //               </CardHeader>
// //               <CardContent>
// //                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
// //                   {passengerForms.map((form, index) => (
// //                     <div key={index} className="p-4 border rounded mb-4">
// //                       <h3 className="font-bold mb-2">
// //                         Passenger {index + 1}
// //                       </h3>
// //                       <div>
// //                         <label htmlFor={`firstName-${index}`} className="block font-medium">
// //                            First Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           id={`firstName-${index}`}
// //                           value={form.name.firstName}
// //                           onChange={(e) =>
// //                             handlePassengerChange(index, "name.firstName", e.target.value)
// //                           }
// //                           required
// //                           className="w-full p-2 border border-gray-300 rounded"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label htmlFor={`lastName-${index}`} className="block font-medium">
// //                           Last Name
// //                         </label>
// //                         <input
// //                           type="text"
// //                           id={`lastName-${index}`}
// //                           value={form.name.lastName}
// //                           onChange={(e) =>
// //                             handlePassengerChange(index, "name.lastName", e.target.value)
// //                           }
// //                           required
// //                           className="w-full p-2 border border-gray-300 rounded"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label htmlFor={`emailAddress-${index}`} className="block font-medium">
// //                           Email
// //                         </label>
// //                         <input
// //                           type="email"
// //                           id={`emailAddress-${index}`}
// //                           value={form.contact.emailAddress}
// //                           onChange={(e) =>
// //                             handlePassengerChange(index, "contact.emailAddress", e.target.value)
// //                           }
// //                           required
// //                           className="w-full p-2 border border-gray-300 rounded"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label htmlFor={`Pnumber-${index}`} className="block font-medium">
// //                           Phone
// //                         </label>
// //                         <input
// //                           type="tel"
// //                           id={`Pnumber-${index}`}
// //                           value={form.contact.phones[0].number}
// //                           onChange={(e) =>
// //                             handlePassengerChange(index, "contact.phones[0].number", e.target.value)
// //                           }
// //                           required
// //                           className="w-full p-2 border border-gray-300 rounded"
// //                         />
// //                       </div>

                      
// //                       <div>
// //                         <label htmlFor={`dateOfBirth-${index}`} className="block font-medium">
// //                           Date Of Birth
// //                         </label>
// //                         <input
// //                           type="date"
// //                           id={`dateOfBirth-${index}`}
// //                           value={form.dateOfBirth}
// //                           onChange={(e) =>
// //                             handlePassengerChange(index, "dateOfBirth", e.target.value)
// //                           }
// //                           required
// //                           className="w-full p-2 border border-gray-300 rounded"
// //                         />
// //                       </div>

// //                       <div>
// //                         <label htmlFor={`gender-${index}`} className="block font-medium">
// //                           Gender
// //                         </label>
// //                         <select
// //                           id={`gender-${index}`}
// //                           value={form.gender}
// //                           onChange={(e) =>
// //                             handlePassengerChange(index, "gender", e.target.value)
// //                           }
// //                           required
// //                           className="w-full p-2 border border-gray-300 rounded"
// //                         >
// //                           <option value="">Select Gender</option>
// //                           <option value="MALE">Male</option>
// //                           <option value="FEMALE">Female</option>
// //                         </select>
// //                       </div>
                      
// //                     </div>
// //                   ))}
// //                   <Button type="submit" className="bg-primaryRed text-white mt-4">
// //                     {/* {isLoading ? "Submitting..." : "Submit"} */}
// //                     {isLoading ? <Loading color="#FFFFFF" size="20" /> : "Submit"}
// //                   </Button>

                  
// //                 </form>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Payment Breakdown Section */}
// //           <div className="w-full md:w-[30%] px-4 my-3">
// //             <Card className="bg-white shadow-md p-6">
// //               <CardHeader className="text-lg font-semibold">
// //                 Payment Details
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="flex flex-col gap-2">
// //                   <div className="flex justify-between">
// //                     <span>Adult (X{adultCount}):</span>
// //                     <span>{formatCurrency(adultPrice)}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Children (X{childCount}):</span>
// //                     <span>{formatCurrency(childPrice)}</span>
// //                   </div>
// //                   <div className="flex justify-between">
// //                     <span>Infant (X{infantCount}):</span>
// //                     <span>{formatCurrency(infantPrice)}</span>
// //                   </div>
// //                   <div className="flex justify-between font-semibold">
// //                     <span>Total ({travelerCount} Travelers):</span>
// //                     <span>{formatCurrency(total)}</span>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>

// //         {/* Success Modal */}
// //         {showModal && (
// //           <div className="modal">
// //             <div className="modal-content">
// //               <h2>Payment Successful!</h2>
// //               <p>Your payment was successfully processed. You will receive a confirmation email shortly.</p>
// //               <Button onClick={async () => {
// //                   await handleBooking();
// //                   // navigate("/");
// //                 }}>Go to Dashboard</Button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default BookFlightPage;













import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import nationalities from "../../data/countries.json";
import Modal from "@/components/components/modal/Modal";
import { toast } from "react-toastify";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const navigate = useNavigate();

  // State for passenger forms data
  const [passengerForms, setPassengerForms] = useState<
    {
      id: any;
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
          holder: boolean;
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

      // console.log('parsedFlightDetails', parsedFlightDetails)
  
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

      // console.log('initiate response', response)
  
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
    async function onSuccess(response) {
      const reference = data.reference;
      const amount = data.payment.amount;

      await handlePaymentSuccess(reference, amount);
      
      await toast('Transaction successful! Reference: ' + response.reference);
      
      await handleBooking()
        setIsPaymentModalVisible(false);
        // Implement server-side to validate payment status
    }

    function onCancel() {
        toast('Transaction was canceled.');
    }

    function onLoad() {
        console.log('Transaction loading...');
    }

    function onError(error) {
      toast('An error occurred: ' + error.message);
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

  const handlePaymentSuccess = async (reference, amount) => {
    const apiUrl = `https://test.ffsdtravels.com/api/verify/payment`;
    setIsPaymentModalVisible(true);
  
    try {
      const response = await fetch(`${apiUrl}?reference=${reference}&amount=${amount}`, {
        method: "GET", // Change to POST if the API requires it
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      // console.log("Payment verification response:", data);
  
      if (data.success) {
        // Handle successful payment verification
        toast("Payment verified successfully! Hold on a moment");
      } else {
        // Handle unsuccessful payment verification
        toast("Payment verification failed.");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast("An error occurred while verifying the payment.");
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
          travelers: passengerForms,
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
        console.log("Flight booked successfully:", response );
        // const result = await response.json();
        toast("Flight booked successfully!");
        setIsModalVisible(true);
        // navigate("/")
      } else {
        console.error("Error booking flight:", response.statusText);
        toast("Failed to book flight. Please contact support.");
      }
    } catch (error) {
      console.error("Error booking flight:", error);
      toast("An error occurred while booking the flight. Please try again.");
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
  
    // Save the passenger information to localStorage
    localStorage.setItem("passengerInfo", JSON.stringify(passengerForms));
  
    // Initiate the payment
    initiatePayment();
  
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
              number: "",
            }
          ],
          },
          documents: [
            {
              documentType: "PASSPORT",
                  birthPlace: "Nil",
                  issuanceLocation: "Nil",
                  issuanceDate: "2015-03-04",
                  number: "00000",
                  expiryDate: "2025-03-04",
                  issuanceCountry: "NG",
                  validityCountry: "NG",
                  nationality: "NG",
                  holder: true
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
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>
                      </div>

                      <div className="hidden">
                        <label htmlFor={`documentType-${index}`} className="block font-medium">
                          Document Type
                        </label>
                        <select
                          id={`documentType-${index}`}
                          value={form.documents[0].documentType}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].documentType", e.target.value)
                          }
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select Document Type</option>
                          <option value="PASSPORT">PASSPORT</option>
                          <option value="NATIONAL ID">NATIONAL ID</option>
                        </select>
                      </div>

                      <div className="hidden">
                        <label htmlFor={`birthPlace-${index}`} className="block font-medium">
                          Birth Place
                        </label>
                        <input
                        type="text"
                          id={`birthPlace-${index}`}
                          value={form.documents[0].birthPlace}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].birthPlace", e.target.value)
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <div className="hidden">
                        <label htmlFor={`issuanceLocation-${index}`} className="block font-medium">
                          Issuance Location
                        </label>
                        <input
                        type="text"
                          id={`issuanceLocation-${index}`}
                          value={form.documents[0].issuanceLocation}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].issuanceLocation", e.target.value)
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <div className="hidden">
                        <label htmlFor={`issuanceDate-${index}`} className="block font-medium">
                         Issuance Date
                        </label>
                        <input
                        type="date"
                          id={`issuanceDate-${index}`}
                          value={form.documents[0].issuanceDate}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].issuanceDate", e.target.value)
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <div className="hidden">
                        <label htmlFor={`number-${index}`} className="block font-medium">
                         Document Number
                        </label>
                        <input
                        type="tel"
                          id={`number-${index}`}
                          value={form.documents[0].number}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].number", e.target.value)
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <div className="hidden">
                        <label htmlFor={`expiryDate-${index}`} className="block font-medium">
                         Expiry Date
                        </label>
                        <input
                        type="date"
                          id={`expiryDate-${index}`}
                          value={form.documents[0].expiryDate}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].expiryDate", e.target.value)
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <div className="hidden">
                        <label htmlFor={`issuanceCountry-${index}`} className="block font-medium">
                          Issuance Country
                        </label>
                        <select
                          id={`issuanceCountry-${index}`}
                          value={form.documents[0].issuanceCountry}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].issuanceCountry", e.target.value)
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select Holder</option>
                          {nationalities.map((issuanceCountry, i) => (
                          <option key={i} value={issuanceCountry.abbreviation}>
                            {issuanceCountry.country}
                          </option>
                          ))}
                        </select>
                      </div>

                      <div className="hidden">
                        <label htmlFor={`validityCountry-${index}`} className="block font-medium">
                          Validity Country
                        </label>
                        <select
                          id={`validityCountry-${index}`}
                          value={form.documents[0].validityCountry}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].validityCountry", e.target.value)
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select Holder</option>
                          {nationalities.map((validityCountry, i) => (
                          <option key={i} value={validityCountry.abbreviation}>
                            {validityCountry.country}
                          </option>
                          ))}
                        </select>
                      </div>

                      <div className="hidden">
                        <label htmlFor={`nationality-${index}`} className="block font-medium">
                          Nationality
                        </label>
                        <select
                          id={`nationality-${index}`}
                          value={form.documents[0].nationality}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].nationality", e.target.value)
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select Holder</option>
                          {nationalities.map((nationality, i) => (
                          <option key={i} value={nationality.abbreviation}>
                            {nationality.country}
                          </option>
                          ))}
                        </select>
                      </div>

                      <div className="hidden">
                        <label htmlFor={`holder-${index}`} className="block font-medium">
                          Holder
                        </label>
                        <select
                          id={`holder-${index}`}
                          value={form.documents[0].holder ? "true" : "false"}
                          onChange={(e) =>
                            handlePassengerChange(index, "documents[0].holder", e.target.value === "true")
                          }
                          
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select Holder</option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                      
                    </div>
                  ))}
                  <Button type="submit" className="bg-primaryRed text-white mt-4" disabled={isLoading}>
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

          {isModalVisible && (
            <Modal isOpen={isModalVisible} onClose={() => navigate("/")} >

              <div className="modal flex flex-col">
              <div className="modal-content">
                <h2>Booking Successful!</h2>
                <p className="mb-4">Thank you for choosing FFSDTRAVELS. A copy of your E-Ticket will be sent to your email shortly.</p>
                <button onClick={() => navigate("/")}  className="bg-primaryRed text-white w-full rounded py-2">OK</button>
              </div>
            </div>
            </Modal>
            
          )}

          {/* {isPaymentModalVisible && (
            <Modal isOpen={isPaymentModalVisible} onClose={() => (navigate(""))} >

              <div className="modal flex flex-col">
                <div className="modal-content">
                  <h2>Confirm Payment</h2>
                  <p className="mb-4">Your Payment have been confirmed by organization. Hold on while we Reserve a space for you.</p>
                  <button onClick={() => {handleBooking(); setIsPaymentModalVisible(false); }}  className="bg-primaryRed text-white w-full rounded py-2">OK</button>
                </div>
              </div>
            </Modal>
            
          )} */}

{isPaymentModalVisible && (
  <Modal isOpen={isPaymentModalVisible} onClose={() => navigate("")}>
    <div className="modal flex flex-col items-center justify-center">
      <div className="modal-content flex flex-col items-center">
        {/* Spinner */}
        <div className="loader border-t-4 border-primaryRed border-solid rounded-full w-12 h-12 animate-spin"></div>
        {/* Optional text below spinner */}
        <p className="mt-4 text-gray-500">Processing your payment...</p>
        {/* <button
          onClick={() => {
            handleBooking();
            setIsPaymentModalVisible(false);
          }}
          className="bg-primaryRed text-white w-full rounded py-2 mt-6"
        >
          OK
        </button> */}
      </div>
    </div>
  </Modal>
)}

        </div>
      </div>
    </>
  );
};

export default BookFlightPage;

