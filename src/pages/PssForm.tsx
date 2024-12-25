// import React, { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";

// const PssForm: React.FC = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [location, setLocation] = useState("");
//   const [destination, setDestination] = useState("");
//   const [amount, setAmount] = useState("");
//   const [title, setTitle] = useState("");
//   const [captchaVerified, setCaptchaVerified] = useState(false);

//   const handleCaptchaChange = (value: string | null) => {
//     setCaptchaVerified(!!value);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!captchaVerified) {
//       alert("Please complete the CAPTCHA.");
//       return;
//     }

//     const formData = {
//         fullName,
//       email,
//       phone,
//       location,
//       destination,
//       amount,
//       title
//     };

//     try {
//       const response = await fetch("https://test.ffsdtravels.com/api/advert/submit", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Form submitted successfully!");
//         setFullName("");
//         setEmail("");
//         setPhone("");
//         setLocation("");
//         setDestination("");
//         setAmount("");
//         setTitle("");
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.message || "Failed to submit the form"}`);
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("An error occurred while submitting the form.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
//       {/* Input Fields */}
//       {/* Full Name */}
//       <div className="mb-5">
//         <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//           Full Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           placeholder="Full Name"
//           required
//         />
//       </div>

//       {/* Email */}
//       <div className="mb-5">
//         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           placeholder="name@email.com"
//           required
//         />
//       </div>

//       {/* Phone Number */}
//       <div className="mb-5">
//         <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//           Phone Number
//         </label>
//         <input
//           type="text"
//           id="number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           required
//         />
//       </div>

//       {/* Departure */}
//       {/* Departure and Arrival on the same line */}
//       <div className="flex gap-4 mb-5">
//         <div className="flex-1">
//           <label htmlFor="departure" className="block mb-2 text-sm font-medium text-gray-900">
//             Location
//           </label>
//           <input
//             type="text"
//             id="departure"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//             required
//           />
//         </div>
//         <div className="flex-1">
//           <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-gray-900">
//             Destination
//           </label>
//           <input
//             type="text"
//             id="arrival"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//             required
//           />
//         </div>
//       </div>

//       {/* Departure */}
//       {/* Departure and Arrival on the same line */}
//       <div className="flex gap-4 mb-5">
//         <div className="flex-1">
//         <label htmlFor="deposit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//           How much are you willing to deposit
//         </label>
//         <input
//           type="number"
//           id="deposit"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           required
//         />
//         </div>
//         <div className="flex-1">
//         <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//           What service are you going for
//         </label>
//         <select
//           id="service"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//           required
//         >
//           <option value="">Select a service</option>
//           <option>Pay Small Small</option>
//           <option>Full Payment (With Discount)</option>
//         </select>
//         </div>
//       </div>
//       {/* CAPTCHA */}
//       <div className="mb-5">
//         <ReCAPTCHA
//           sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
//           // sitekey="6Lf2zo0qAAAAAHsX7zXFTU0bLECjZ9SNmWRwixUG"
//           onChange={handleCaptchaChange}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={!captchaVerified}
//         className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default PssForm;


import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const PssForm: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    setIsLoading(true); // Start loading

    const formData = {
      fullName,
      email,
      phone,
      location,
      destination,
      amount,
      title,
    };

    try {
      const response = await fetch("https://test.ffsdtravels.com/api/advert/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFullName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setDestination("");
        setAmount("");
        setTitle("");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to submit the form"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      {/* Input Fields */}
      {/* Full Name */}
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Full Name"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@email.com"
          required
        />
      </div>

      {/* Phone Number */}
      <div className="mb-5">
        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phone Number
        </label>
        <input
          type="text"
          id="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      {/* Departure */}
      {/* Departure and Arrival on the same line */}
      <div className="flex gap-4 mb-5">
        <div className="flex-1">
          <label htmlFor="departure" className="block mb-2 text-sm font-medium text-gray-900">
            Location
          </label>
          <input
            type="text"
            id="departure"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="arrival" className="block mb-2 text-sm font-medium text-gray-900">
            Destination
          </label>
          <input
            type="text"
            id="arrival"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
      </div>

      {/* Departure */}
      {/* Departure and Arrival on the same line */}
      <div className="flex gap-4 mb-5">
        <div className="flex-1">
        <label htmlFor="deposit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          How much are you willing to deposit
        </label>
        <input
          type="number"
          id="deposit"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        </div>
        <div className="flex-1">
        <label htmlFor="service" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          What service are you going for
        </label>
        <select
          id="service"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        >
          <option value="">Select a service</option>
          <option>Pay Small Small</option>
          <option>Full Payment (With Discount)</option>
        </select>
        </div>
      </div>

      {/* CAPTCHA */}
      <div className="mb-5">
        <ReCAPTCHA
          // sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          sitekey="6Lf2zo0qAAAAAHsX7zXFTU0bLECjZ9SNmWRwixUG"
          onChange={handleCaptchaChange}
        />
      </div>

      <button
        type="submit"
        disabled={!captchaVerified || isLoading}
        className="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default PssForm;
