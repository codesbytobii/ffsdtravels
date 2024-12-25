// import logo from '../../../assets/img/ffsdTravelLogo.png'
// // import Modal from "../modal/Modal";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   // const [navOpen, setNavOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   // const toggleNav = () => setNavOpen(!navOpen);
//   const toggleModal = () => setModalOpen(!modalOpen);

//   return (
//     <div className="sticky top-0 bg-white z-50 h-16 w-full px-4 shadow-md border-b-[1px] text-black">
//       <div className="section-width flex justify-between items-center h-16">
//         <button
//           onClick={() => navigate("/")}
//           className="font-semibold cursor-pointer"
//         >
//           <img src={logo} alt="" className='w-[100px]' />
//           {/* <p>Logo</p> */}
//         </button>

//         <ul className="flex items-center gap-3 font-medium text-gray-800">
//           <li>
//             <Button
//               onClick={toggleModal}
//               className="bg-primaryRed duration-300"
//             >
//               Manage Bookings
//             </Button>
//           </li>
//           <li>
//             <Button
//               onClick={() => navigate("/authentication")}
//               variant="outline"
//               className="border-primaryRed border-2 text-primaryRed hover:text-black hover:bg-white hover:border-black duration-300 font-semibold"
//             >
//               Login
//             </Button>
//           </li>
//         </ul>
//       </div>

//       {/* <Modal isOpen={modalOpen} onClose={toggleModal} /> */}
//     </div>
//   );
// };

// export default Navbar;




import logo from '../../../assets/img/ffsdTravelLogo.png';
import Modal from "../modal/Modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [pnrNumber, setPnrNumber] = useState(""); // State to manage PNR number
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState(""); // State to track errors

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pnrNumber.trim()) {
      setLoading(true);
      setError(""); // Clear previous errors
      try {
        // API URL with the PNR number
        const apiUrl = `https://test.ffsdtravels.com/api/flight/get/flight/details?flightOrderId=${encodeURIComponent(pnrNumber)}`;
        
        const response = await fetch(apiUrl);
        
        // If response is successful
        if (response.ok) {
          // const data = await response.json();
          // console.log("PNR Details:", data);
          setModalOpen(false); // Close the modal after successful submission
          // Optionally, handle the data here (e.g., show a success message, navigate, etc.)
        } else {
          throw new Error("Failed to fetch flight details");
        }
      } catch (error) {
        setError("Error fetching PNR details. Please try again later.");
        console.error("Error fetching PNR details:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a valid PNR number.");
    }
  };

  return (
    <div className="sticky top-0 bg-white z-50 h-16 w-full px-4 shadow-md border-b-[1px] text-black">
      <div className="section-width flex justify-between items-center h-16">
        <button
          onClick={() => navigate("/")}
          className="font-semibold cursor-pointer"
        >
          <img src={logo} alt="Logo" className="w-[100px]" />
        </button>

        <ul className="flex items-center gap-3 font-medium text-gray-800">
          <li>
            <Button
              onClick={toggleModal}
              className="bg-primaryRed duration-300"
            >
              Manage Bookings
            </Button>
          </li>
          <li>
            <Button
              onClick={() => navigate("/authentication")}
              variant="outline"
              className="border-primaryRed border-2 text-primaryRed hover:text-black hover:bg-white hover:border-black duration-300 font-semibold"
            >
              Login
            </Button>
          </li>
        </ul>
      </div>

      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <div className="flex flex-col lg:p-10 md:p-8 sm:p-6 p-4">
          <h2 className="text-lg font-semibold mb-4">Enter Your PNR Number</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={pnrNumber}
              onChange={(e) => setPnrNumber(e.target.value)}
              placeholder="Enter PNR Number"
              className="border border-gray-300 w-full sm:w-[500px] rounded-md p-2 focus:outline-none focus:border-primaryRed"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
            <Button type="submit" className="bg-primaryRed text-white" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
            {/* <Button
              type="button"
              variant="outline"
              onClick={toggleModal}
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button> */}
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;