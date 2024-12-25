// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import React, { useState } from "react";
// // import { Button, Input } from "@/components/ui"; // Assuming you are using custom components

// const BookFlightForm: React.FC<{ selectedFlight: FlightData }> = ({ selectedFlight }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Store user info locally
//     localStorage.setItem("userBookingInfo", JSON.stringify(formData));
//     localStorage.setItem("selectedFlight", JSON.stringify(selectedFlight));

//     // Construct the payment URL (replace with dynamic values as needed)
//     const paymentUrl = `https://test.ffsdtravels.com/api/generate/payment?paid_by_email=${formData.email}&amount=${selectedFlight.price.total}&flight_order_am_id=${selectedFlight.id}`;

//     try {
//       setIsSubmitting(true);
//       const response = await fetch(paymentUrl, {
//         method: "GET", // Assuming the API requires a GET request
//       });

//       if (!response.ok) {
//         throw new Error("Payment request failed.");
//       }

//       const paymentData = await response.json();

//       // Redirect to the payment page (if the API provides a redirect URL)
//       if (paymentData?.payment_url) {
//         window.location.href = paymentData.payment_url; // Redirect to the payment platform
//       } else {
//         console.error("No payment URL received.");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <Input
//         label="Full Name"
//         name="fullName"
//         value={formData.fullName}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         label="Email"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <Input
//         label="Phone Number"
//         name="phoneNumber"
//         type="tel"
//         value={formData.phoneNumber}
//         onChange={handleChange}
//         required
//       />
//       <Button
//         type="submit"
//         className="bg-primaryRed text-white hover:bg-black"
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? "Processing..." : "Proceed to Payment"}
//       </Button>
//     </form>
//   );
// };

// export default BookFlightForm;
