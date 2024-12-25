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
  // State for passenger form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    passportNumber: "",
    passportExpiryDate: "",
    passportIssuanceCountry: "",
    nationality: "",
  });

  // State for flight details
  const [flightPrice, setFlightPrice] = useState(0);
  const [departureDate, setDepartureDate] = useState("");
  const [departureAirline, setDepartureAirline] = useState("");
  const [arrivalAirline, setArrivalAirline] = useState("");
  const [airlineName, setAirlineName] = useState("");
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);

  // State to handle loading
  const [loading, setLoading] = useState(true);

  // Handle input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to initiate Paystack payment
  // const initiatePayment = () => {
  //   const paystackHandler = (window as any).PaystackPop.setup({
  //     key: "pk_test_974d7130e8c147763327503821103c1914899b4e", // Replace with your Paystack public key
  //     email: formData.email,
  //     amount: total * 100, // Amount is in kobo (100 kobo = 1 NGN)
  //     currency: "NGN",
  //     callback: (response: any) => {
  //       console.log("Payment successful:", response);
  //       // You can add your logic here to handle successful payment
  //     },
  //     onClose: () => {
  //       console.log("Payment closed");
  //     },
  //   });
  //   paystackHandler.openIframe();
  // };


  const initiatePayment = async () => {
    try {
        // Prepare data for the POST request
        const paymentData = {
            paid_by_email: formData.email,
            amount: total, // Total amount (in NGN)
            flight_order_am_id: 34, // Replace with the appropriate flight order ID
        };

        // Call your API to generate the payment
        const response = await fetch("https://test.ffsdtravels.com/api/generate/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData), // Send data as JSON
        });

        if (!response.ok) {
            throw new Error("Failed to generate payment link");
        }

        // const responseData = await response.json();

        // Now initiate Paystack payment using the payment link (if required)
        const paystackHandler = (window as any).PaystackPop.setup({
            key: "pk_live_fa599bf2875fb5f381c34b20f7dc1f1f20258efa", // Replace with your Paystack public key
            email: formData.email,
            amount: total * 100, // Amount is in kobo (100 kobo = 1 NGN)
            currency: "NGN",
            callback: (response: any) => {
                console.log("Payment successful:", response);
                // Add logic here to handle successful payment
            },
            onClose: () => {
                console.log("Payment closed");
            },
        });

        paystackHandler.openIframe();
    } catch (error) {
        console.error("Error initiating payment:", error);
    }
};


  // Handle form submission and store passenger data in localStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("passengerInfo", JSON.stringify(formData));
    console.log("Form Data:", formData);
    
    // Initiate the payment
    initiatePayment();
  };

  // Load flight data from localStorage on component mount
  useEffect(() => {
    const storedFlightData = localStorage.getItem("selectedFlight");

    if (storedFlightData) {
      const flightDetails = JSON.parse(storedFlightData);
      console.log(flightDetails);
      // setFlightPrice(flightDetails.price.ffsd_total || 0);
      setFlightPrice(flightDetails.price.test_total || 0);
      setDepartureDate(flightDetails.lastTicketingDate || "");
      setDepartureAirline(flightDetails.DepartureAirport || "");
      setArrivalAirline(flightDetails.arrivalAirport || "");
      setAirlineName(flightDetails.itineraries.airlineName || "");
      setTaxes(flightDetails.taxes || 0);
    }
    setLoading(false); // Set loading to false after data fetch
  }, []);

  // Update total whenever flightPrice or taxes change
  useEffect(() => {
    setTotal(flightPrice + taxes);
  }, [flightPrice, taxes]);

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
          {/* Form Section */}
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
                        {arrivalAirline || "Arrival Airport"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Passenger Information Form */}
            <Card className="bg-white shadow-md p-6 mt-4">
              <CardHeader className="text-lg font-semibold">
                Passenger Information
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-medium">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateOfBirth"
                      className="block font-medium"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="passportNumber"
                      className="block font-medium"
                    >
                      Passport Number
                    </label>
                    <input
                      type="text"
                      id="passportNumber"
                      name="passportNumber"
                      value={formData.passportNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="passportExpiryDate"
                      className="block font-medium"
                    >
                      Passport Expiry Date
                    </label>
                    <input
                      type="date"
                      id="passportExpiryDate"
                      name="passportExpiryDate"
                      value={formData.passportExpiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="passportIssuanceCountry"
                      className="block font-medium"
                    >
                      Passport Issuance Country
                    </label>
                    <input
                      type="country"
                      id="passportIssuanceCountry"
                      name="passportIssuanceCountry"
                      value={formData.passportIssuanceCountry}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="nationality"
                      className="block font-medium"
                    >
                      Nationality
                    </label>
                    <input
                      type="country"
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-primaryRed text-white mt-4"
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Payment Breakdown Section */}
          <div className="w-full md:w-[30%] px-4 my-3">
            <Card className="bg-white shadow-md p-6">
              <CardHeader className="text-lg font-semibold">
                Payment Breakdown
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>Flight Price:</span>
                    <span>{formatCurrency(flightPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes:</span>
                    <span>{formatCurrency(taxes)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
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








// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Navbar from "@/components/components/navbar/Navbar";

// // Utility to format numbers as currency
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// // Modal component
// const Modal = ({ isOpen, onClose, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-4 rounded shadow-lg">
//         <h2 className="text-lg font-semibold">Payment Successful</h2>
//         <p>{message}</p>
//         <button onClick={onClose} className="mt-4 bg-primaryRed text-white p-2 rounded">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// const BookFlightPage: React.FC = () => {
//   // State for passenger form data
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     dateOfBirth: "",
//   });

//   // State for flight details
//   const [flightPrice, setFlightPrice] = useState(0);
//   const [departureDate, setDepartureDate] = useState("");
//   const [departureAirline, setDepartureAirline] = useState("");
//   const [arrivalAirline, setArrivalAirline] = useState("");
//   const [airlineName, setAirlineName] = useState("");
//   const [travelerType, setTravelerType] = useState("")
//   const [travelerCount, setTravelerCount] = useState("")
//   const [taxes, setTaxes] = useState(0);
//   const [total, setTotal] = useState(0);

//   // State for loading
//   const [loading, setLoading] = useState(true);

//   // State for modal visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   // Handle input changes in the form
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     localStorage.setItem("passengerInfo", JSON.stringify(formData));
//     console.log("Form Data:", formData);

//     // Initiate payment after form submission
//     await initiatePayment();
//   };

//   // Load flight data from localStorage on component mount
//   useEffect(() => {
//     const storedFlightData = localStorage.getItem("selectedFlight");

//     if (storedFlightData) {
//       const flightDetails = JSON.parse(storedFlightData);
//       console.log(flightDetails);
//       setFlightPrice(flightDetails.price.ffsd_total || 0);
//       setDepartureDate(flightDetails.lastTicketingDate || "");
//       setDepartureAirline(flightDetails.DepartureAirport || "");
//       setArrivalAirline(flightDetails.arrivalAirport || "");
//       setAirlineName(flightDetails.airlineName || "");
//       setTravelerType(flightDetails.travelerPricings[0].travelerType || "");
//       setTravelerCount(flightDetails.travelerPricings.length)
//       setTaxes(flightDetails.taxes || 0);

//       const getTravelerCountByType = (travelerType: string) => {
//         return flightDetails.travelerPricings.filter((traveler: { travelerType: string; }) => traveler.travelerType === travelerType).length;
//       };
      
//       // Usage
//       const adultCount = getTravelerCountByType('ADULT');
//       const childCount = getTravelerCountByType('CHILD');
//       const infantCount = getTravelerCountByType('INFANT');

//       // Display the results
// console.log(`Number of adults: ${adultCount}`);
// console.log(`Number of children: ${childCount}`);
// console.log(`Number of infants: ${infantCount}`);                   
//     }
//     setLoading(false); // Set loading to false after data fetch
//   }, []);

  

//   // Update total whenever flightPrice or taxes change
//   useEffect(() => {
//     setTotal(flightPrice + taxes);
//   }, [flightPrice, taxes]);

//   // Function to initiate payment
//   const initiatePayment = async () => {
//     try {
//       const paymentData = {
//         paid_by_email: formData.email,
//         amount: total, // Total amount (in NGN)
//         flight_order_am_id: 34, // Replace with the appropriate flight order ID
//       };

//       const response = await fetch("https://test.ffsdtravels.com/api/generate/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to generate payment link");
//       }

//       const responseData = await response.json();

//       // Assuming responseData contains necessary info for Paystack
//       const paystackHandler = (window as any).PaystackPop.setup({
//         key: "pk_test_974d7130e8c147763327503821103c1914899b4e",
//         email: formData.email,
//         amount: total * 100, // Amount in kobo
//         currency: "NGN",
//         callback: (response: any) => {
//           console.log("Payment successful:", response);
//           // Show success modal
//           setModalMessage("Your payment was successful! Necessary information will be sent to your email.");
//           setIsModalOpen(true);
//         },
//         onClose: () => {
//           console.log("Payment closed");
//         },
//       });

//       paystackHandler.openIframe();
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//     }
//   };

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
//           {/* Form Section */}
//           <div className="flex-1 w-full md:w-[60%] px-4 my-3">
//             {/* Flight details card */}
//             <Card className="bg-white shadow-md p-4 rounded-sm">
//               <CardContent className="p-0">
//                 <div className="p-2 border-b-2 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div>
//                       <b className="text-base">{airlineName || "Airline Name"}</b>
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
//                         {arrivalAirline || "Arrival Airport"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Passenger Information Form */}
//             <Card className="bg-white shadow-md p-6 mt-4">
//               <CardHeader className="text-lg font-semibold">Passenger Information</CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                   <div>
//                     <label htmlFor="name" className="block font-medium">Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block font-medium">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block font-medium">Phone</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="dateOfBirth" className="block font-medium">Date of Birth</label>
//                     <input
//                       type="date"
//                       id="dateOfBirth"
//                       name="dateOfBirth"
//                       value={formData.dateOfBirth}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <Button type="submit" className="bg-primaryRed text-white mt-4">
//                     Book Flight
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Payment Breakdown Section */}
//           <div className="w-full md:w-[30%] px-4 my-3">
//             <Card className="bg-white shadow-md p-6">
//               <CardHeader className="text-lg font-semibold">
//                 Fair Breakdown
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-2">
//                   <div className="flex justify-between">
//                     {/* <span>Flight Price:</span> */}
//                     {/* <span>{travelerType} (X{travelerCount}):</span> */}
//                     <span>Adult (X{adultCount}):</span>
//                     <span>{formatCurrency(flightPrice)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     {/* <span>Flight Price:</span> */}
//                     {/* <span>{travelerType} (X{travelerCount}):</span> */}
//                     <span>Children (X{childCount}):</span>
//                     <span>{formatCurrency(flightPrice)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     {/* <span>Flight Price:</span> */}
//                     {/* <span>{travelerType} (X{travelerCount}):</span> */}
//                     <span>Infant (X{infantCount}):</span>
//                     <span>{formatCurrency(flightPrice)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Taxes:</span>
//                     <span>{formatCurrency(taxes)}</span>
//                   </div>
//                   <div className="flex justify-between font-semibold">
//                     <span>Total:</span>
//                     <span>{formatCurrency(total)}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Modal for payment success */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} />
//     </>
//   );
// };

// export default BookFlightPage;









// BookFlightPage.tsx

// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import Navbar from "@/components/components/navbar/Navbar";

// // Utility to format numbers as currency
// const formatCurrency = (amount: number) => {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// // Modal component
// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   message: string;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="modal-title"
//     >
//       <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
//         <h2 id="modal-title" className="text-lg font-semibold mb-4">Payment Status</h2>
//         <p className="mb-6">{message}</p>
//         <Button onClick={onClose} className="bg-primaryRed text-white w-full">
//           Close
//         </Button>
//       </div>
//     </div>
//   );
// };

// // Extend the Window interface to include PaystackPop
// declare global {
//   interface Window {
//     PaystackPop: any;
//   }
// }

// const BookFlightPage: React.FC = () => {
//   // State for passenger form data
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     dateOfBirth: "",
//   });

//   // State for flight details
//   const [flightPrice, setFlightPrice] = useState<number>(0);
//   const [departureDate, setDepartureDate] = useState<string>("");
//   const [departureAirline, setDepartureAirline] = useState<string>("");
//   const [arrivalAirline, setArrivalAirline] = useState<string>("");
//   const [airlineName, setAirlineName] = useState<string>("");
//   const [taxes, setTaxes] = useState<number>(0);
//   const [total, setTotal] = useState<number>(0);

//   // Traveler counts
//   const [adultCount, setAdultCount] = useState<number>(0);
//   const [childCount, setChildCount] = useState<number>(0);
//   const [infantCount, setInfantCount] = useState<number>(0);
//   const [travelerCount, setTravelerCount] = useState<number>(0);

//   console.log(travelerCount)

//   // Assuming you have different prices
// const [adultPrice, setAdultPrice] = useState(0);
// const [childPrice, setChildPrice] = useState(0);
// const [infantPrice, setInfantPrice] = useState(0);

//   // State for loading
//   const [loading, setLoading] = useState<boolean>(true);

//   // State for modal visibility
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [modalMessage, setModalMessage] = useState<string>("");

//   // State for payment processing
//   const [isProcessing, setIsProcessing] = useState<boolean>(false);

//   // Handle input changes in the form
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     localStorage.setItem("passengerInfo", JSON.stringify(formData));
//     console.log("Form Data:", formData);

//     // Initiate payment after form submission
//     await initiatePayment();
//     setIsProcessing(false);
//   };

//   // Load flight data from localStorage on component mount
//   useEffect(() => {
//     const storedFlightData = localStorage.getItem("selectedFlight");

//     if (storedFlightData) {
//       const flightDetails = JSON.parse(storedFlightData);
//       console.log("Flight Details:", flightDetails);
//       setFlightPrice(flightDetails.price.ffsd_total || 0);
//       setDepartureDate(flightDetails.lastTicketingDate || "");
//       setDepartureAirline(flightDetails.DepartureAirport || "");
//       setArrivalAirline(flightDetails.arrivalAirport || "");
//       setAirlineName(flightDetails.airlineName || "");
//       setTaxes(flightDetails.taxes || 0);

//       const getTravelerCountByType = (type: string) => {
//         return flightDetails.travelerPricings.filter(
//           (traveler: { travelerType: string }) => traveler.travelerType === type
//         ).length;
//       };

//       const getTravelerPrices = () => {
//         const travelerTypes = ['ADULT', 'CHILD', 'INFANT'];
      
//         const travelerPrices = travelerTypes.reduce((prices, type) => {
//           const totalPrice = flightDetails.travelerPricings
//             .filter((traveler: { travelerType: string }) => traveler.travelerType === type)
//             .reduce((total: number, traveler: { price: { total: string } }) => {
//               return total + parseFloat(traveler.price.total);
//             }, 0);
      
//           prices[type] = totalPrice;
//           return prices;
//         }, {} as Record<string, number>);
      
//         return travelerPrices;
//       };
      

//       setAdultCount(getTravelerCountByType("ADULT"));
//       setChildCount(getTravelerCountByType("CHILD"));
//       setInfantCount(getTravelerCountByType("INFANT"));
//       setTravelerCount(flightDetails.travelerPricings.length);

//       const travelerPrices = getTravelerPrices();

//       setAdultPrice(travelerPrices.ADULT);
//       setChildPrice(travelerPrices.CHILD);
//       setInfantPrice(travelerPrices.INFANT);
//       // setTravelerCount(flightDetails.travelerPricings.length);

//       // Inside useEffect after fetching flightDetails
// // setAdultPrice(flightDetails.price.ffsd_total || 0);
// // setChildPrice(flightDetails.price.child || 0);
// // setInfantPrice(flightDetails.price.infant || 0);
//     }
//     setLoading(false);
//   }, []);

//   // Update total whenever flightPrice or taxes change
//   useEffect(() => {
//     const calculatedTotal = (adultPrice * adultCount) + (childPrice * childCount) + (infantPrice * infantCount) + taxes;
//     setTotal(calculatedTotal);
//   }, [adultPrice, adultCount, childPrice, childCount, infantPrice, infantCount, taxes]);
  

//   // Load Paystack script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://js.paystack.co/v1/inline.js";
//     script.async = true;
//     script.onload = () => console.log("Paystack script loaded");
//     script.onerror = () => console.error("Failed to load Paystack script");
//     document.body.appendChild(script);
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   // Function to initiate payment
//   const initiatePayment = async () => {
//     try {
//       const paymentData = {
//         paid_by_email: formData.email,
//         amount: total, // Total amount (in NGN)
//         flight_order_am_id: 34, // Replace with the appropriate flight order ID
//       };

//       const response = await fetch("https://test.ffsdtravels.com/api/generate/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(paymentData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to generate payment link");
//       }

//       const responseData = await response.json();
//       console.log("Payment Data:", responseData);

//       if (!window.PaystackPop) {
//         throw new Error("Paystack SDK not loaded");
//       }

//       const PAYSTACK_PUBLIC_KEY = NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

//       const paystackHandler = window.PaystackPop.setup({
//         key: PAYSTACK_PUBLIC_KEY,
//         email: formData.email,
//         amount: total * 100, // Amount in kobo
//         currency: "NGN",
//         callback: (response: any) => {
//           console.log("Payment successful:", response);
//           // Show success modal
//           setModalMessage("Your payment was successful! Necessary information will be sent to your email.");
//           setIsModalOpen(true);
//         },
//         onClose: () => {
//           console.log("Payment closed");
//           setModalMessage("Payment was canceled or failed. Please try again.");
//           setIsModalOpen(true);
//         },
//       });

//       paystackHandler.openIframe();
//     } catch (error: any) {
//       console.error("Error initiating payment:", error);
//       setModalMessage("An error occurred while initiating payment. Please try again.");
//       setIsModalOpen(true);
//     }
//   };

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
//           {/* Form Section */}
//           <div className="flex-1 w-full md:w-[60%] px-4 my-3">
//             {/* Flight details card */}
//             <Card className="bg-white shadow-md p-4 rounded-sm">
//               <CardContent className="p-0">
//                 <div className="p-2 border-b-2 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div>
//                       <b className="text-base">{airlineName || "Airline Name"}</b>
//                     </div>
//                   </div>

//                   <div className="flex gap-5 items-center">
//                     <div className="text-end">
//                       <p className="text-sm font-medium">Full pay</p>
//                       <p className="text-sm font-semibold text-black">
//                         {formatCurrency(flightPrice)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-3">
//                   <div className="flex items-center justify-between space-x-1">
//                     <p className="text-base text-gray-600">
//                       <span className="font-bold text-black">Departure Date:</span>{" "}
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
//                         {arrivalAirline || "Arrival Airport"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Passenger Information Form */}
//             <Card className="bg-white shadow-md p-6 mt-4">
//               <CardHeader className="text-lg font-semibold">Passenger Information</CardHeader>
//               <CardContent>
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                   <div>
//                     <label htmlFor="name" className="block font-medium">Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block font-medium">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block font-medium">Phone</label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="dateOfBirth" className="block font-medium">Date of Birth</label>
//                     <input
//                       type="date"
//                       id="dateOfBirth"
//                       name="dateOfBirth"
//                       value={formData.dateOfBirth}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full p-2 border border-gray-300 rounded"
//                     />
//                   </div>
//                   <Button
//                     type="submit"
//                     className="bg-primaryRed text-white mt-4"
//                     disabled={isProcessing}
//                   >
//                     {isProcessing ? "Processing..." : "Book Flight"}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Payment Breakdown Section */}
//           <div className="w-full md:w-[30%] px-4 my-3">
//             <Card className="bg-white shadow-md p-6">
//               <CardHeader className="text-lg font-semibold">
//                 Fare Breakdown
//               </CardHeader>
//               <CardContent>
//                 <div className="flex flex-col gap-2">
//                 <div className="flex justify-between">
//   <span>Adult (X{adultCount}):</span>
//   <span>{formatCurrency(adultPrice * adultCount)}</span>
// </div>
// <div className="flex justify-between">
//   <span>Children (X{childCount}):</span>
//   <span>{formatCurrency(childPrice * childCount)}</span>
// </div>
// <div className="flex justify-between">
//   <span>Infant (X{infantCount}):</span>
//   <span>{formatCurrency(infantPrice * infantCount)}</span>
// </div>

//                   <div className="flex justify-between">
//                     <span>Taxes:</span>
//                     <span>{formatCurrency(taxes)}</span>
//                   </div>
//                   <div className="flex justify-between font-semibold">
//                     <span>Total:</span>
//                     <span>{formatCurrency(total)}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Modal for payment status */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         message={modalMessage}
//       />
//     </>
//   );
// };

// export default BookFlightPage;
