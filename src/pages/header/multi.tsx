

// // // // // // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // // // // import SelectInput from "@/components/components/input/SelectInput";
// // // // // // // import { Button } from "@/components/ui/button";
// // // // // // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // // // // // import SubtractIcon from "@/assets/svg/SubtractIcon";
// // // // // // // import PlusIcon from "@/assets/svg/PlusIcon";
// // // // // // // import { useState } from "react";
// // // // // // // import { toast } from "react-toastify";
// // // // // // // import DateInput from "@/components/components/input/DateInput";
// // // // // // // import { Plus, Trash } from "lucide-react";
// // // // // // // import { ticketClasses } from "../../data/data.json";
// // // // // // // import CityInput from "@/components/components/input/CityInput";
// // // // // // // import axiosInstance from "@/config/axios";

// // // // // // // type DataItem = {
// // // // // // //     value: string;
// // // // // // //     label: React.ReactNode;
// // // // // // //     city: {
// // // // // // //         address: {
// // // // // // //             cityCode: string;
// // // // // // //             cityName: string;
// // // // // // //             countryName: string;
// // // // // // //         };
// // // // // // //         name: string;
// // // // // // //     };
// // // // // // // };

// // // // // // // interface PassengerCounterProps {
// // // // // // //     label: string;
// // // // // // //     count: number;
// // // // // // //     increment: () => void;
// // // // // // //     decrement: () => void;
// // // // // // // }

// // // // // // // const PassengerCounter = ({
// // // // // // //     label,
// // // // // // //     count,
// // // // // // //     increment,
// // // // // // //     decrement,
// // // // // // // }: PassengerCounterProps) => (
// // // // // // //     <div className="flex justify-between items-center">
// // // // // // //         <p className="text-sm font-medium">{label}</p>
// // // // // // //         <div className="flex gap-3">
// // // // // // //             <button
// // // // // // //                 className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// // // // // // //                 onClick={decrement}
// // // // // // //             >
// // // // // // //                 <SubtractIcon stroke="#FFFFFF" />
// // // // // // //             </button>
// // // // // // //             <div className="w-[25px] h-[25px]">
// // // // // // //                 <p className="text-sm font-medium">{count}</p>
// // // // // // //             </div>
// // // // // // //             <button
// // // // // // //                 className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// // // // // // //                 onClick={increment}
// // // // // // //             >
// // // // // // //                 <PlusIcon stroke="#FFFFFF" />
// // // // // // //             </button>
// // // // // // //         </div>
// // // // // // //     </div>
// // // // // // // );

// // // // // // // interface Section {
// // // // // // //     adultCount: number;
// // // // // // //     childCount: number;
// // // // // // //     infantCount: number;
// // // // // // // }

// // // // // // // const MultiCityTab = () => {
// // // // // // //     const [cityOptions, setCityOptions] = useState<DataItem[]>([]);
// // // // // // //     const [loading, setLoading] = useState(false);
// // // // // // //     const [sections, setSections] = useState<Section[]>([
// // // // // // //         {
// // // // // // //             adultCount: 0,
// // // // // // //             childCount: 0,
// // // // // // //             infantCount: 0,
// // // // // // //         },
// // // // // // //     ]);

// // // // // // //     const totalPassengers = sections.reduce(
// // // // // // //         (total, section) =>
// // // // // // //             total + section.adultCount + section.childCount + section.infantCount,
// // // // // // //         0
// // // // // // //     );
// // // // // // //     const maxPassengers = 9;

// // // // // // //     const showErrorMessage = (message: string) => {
// // // // // // //         toast.error(message);
// // // // // // //     };

// // // // // // //     const handleIncrement = (index: number, field: keyof Section) => {
// // // // // // //         if (totalPassengers < maxPassengers) {
// // // // // // //             setSections((prevSections) =>
// // // // // // //                 prevSections.map((section, i) =>
// // // // // // //                     i === index ? { ...section, [field]: section[field] + 1 } : section
// // // // // // //                 )
// // // // // // //             );
// // // // // // //         } else {
// // // // // // //             showErrorMessage("Passenger limit is 9.");
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const handleDecrement = (index: number, field: keyof Section) => {
// // // // // // //         setSections((prevSections) =>
// // // // // // //             prevSections.map((section, i) =>
// // // // // // //                 i === index
// // // // // // //                     ? { ...section, [field]: Math.max(0, section[field] - 1) }
// // // // // // //                     : section
// // // // // // //             )
// // // // // // //         );
// // // // // // //     };

// // // // // // //     const addSection = () => {
// // // // // // //         setSections((prevSections) => [
// // // // // // //             ...prevSections,
// // // // // // //             {
// // // // // // //                 adultCount: 0,
// // // // // // //                 childCount: 0,
// // // // // // //                 infantCount: 0,
// // // // // // //             },
// // // // // // //         ]);
// // // // // // //     };

// // // // // // //     const removeSection = (index: number) => {
// // // // // // //         if (sections.length > 1) {
// // // // // // //             setSections((prevSections) => prevSections.filter((_, i) => i !== index));
// // // // // // //         }
// // // // // // //     };

// // // // // // //     const fetchCityData = async (keyword: string) => {
// // // // // // //         setLoading(true);
// // // // // // //         try {
// // // // // // //             const response = await axiosInstance.get(
// // // // // // //                 `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // // // // // //             );
// // // // // // //             const accessToken = response?.data?.accessToken;
// // // // // // //             if (accessToken) {
// // // // // // //                 localStorage.setItem("accessToken", JSON.stringify(accessToken));
// // // // // // //             }
// // // // // // //             const cityData = response?.data?.data?.map((item: any) => ({
// // // // // // //                 value: item?.iataCode,
// // // // // // //                 label: "",
// // // // // // //                 city: {
// // // // // // //                     address: {
// // // // // // //                         cityCode: item?.address?.cityCode,
// // // // // // //                         cityName: item?.address?.cityName,
// // // // // // //                         countryName: item?.address?.countryName,
// // // // // // //                     },
// // // // // // //                     name: item?.name,
// // // // // // //                 },
// // // // // // //             }));
// // // // // // //             setCityOptions(cityData);
// // // // // // //         } catch (error) {
// // // // // // //             showErrorMessage("No city found.");
// // // // // // //         } finally {
// // // // // // //             setLoading(false);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div className="flex flex-col gap-4 lg:mt-4 mt-2 items-center w-full">
// // // // // // //             {sections.map((section, index) => (
// // // // // // //                 <div
// // // // // // //                     key={index}
// // // // // // //                     className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // // // // // //                 >
// // // // // // //                     <div className="flex lg:flex-row flex-col items-center gap-2">
// // // // // // //                         <CityInput
// // // // // // //                             data={cityOptions}
// // // // // // //                             label="From where?"
// // // // // // //                             placeholder="City"
// // // // // // //                             onSearch={fetchCityData}
// // // // // // //                             loading={loading}
// // // // // // //                         />
// // // // // // //                         <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // // // // // //                             <TransactionIcon size="10" stroke="#E5302f" />
// // // // // // //                         </div>
// // // // // // //                         <CityInput
// // // // // // //                             data={cityOptions}
// // // // // // //                             label="From where?"
// // // // // // //                             placeholder="City"
// // // // // // //                             onSearch={fetchCityData}
// // // // // // //                             loading={loading}
// // // // // // //                         />
// // // // // // //                     </div>

// // // // // // //                     <DateInput labelText="Departure" />

// // // // // // //                     {/* <SelectInput data={ticketClasses} label="Class" placeholder="Class" /> */}

// // // // // // //                     <SelectInput
// // // // // // //                         data={ticketClasses}
// // // // // // //                         label="Class"
// // // // // // //                         placeholder="Class"
// // // // // // //                         value={selectedClass}
// // // // // // //                         onChange={setSelectedClass}
// // // // // // //                     />

// // // // // // //                     <Dropdown
// // // // // // //                         label="Passengers"
// // // // // // //                         body={
// // // // // // //                             <div className="flex flex-col gap-3 py-2">
// // // // // // //                                 <PassengerCounter
// // // // // // //                                     label="Adults (< 12 years)"
// // // // // // //                                     count={section.adultCount}
// // // // // // //                                     increment={() => handleIncrement(index, "adultCount")}
// // // // // // //                                     decrement={() => handleDecrement(index, "adultCount")}
// // // // // // //                                 />
// // // // // // //                                 <PassengerCounter
// // // // // // //                                     label="Children (2 - 12 years)"
// // // // // // //                                     count={section.childCount}
// // // // // // //                                     increment={() => handleIncrement(index, "childCount")}
// // // // // // //                                     decrement={() => handleDecrement(index, "childCount")}
// // // // // // //                                 />
// // // // // // //                                 <PassengerCounter
// // // // // // //                                     label="Infants (< 2 years)"
// // // // // // //                                     count={section.infantCount}
// // // // // // //                                     increment={() => handleIncrement(index, "infantCount")}
// // // // // // //                                     decrement={() => handleDecrement(index, "infantCount")}
// // // // // // //                                 />
// // // // // // //                             </div>
// // // // // // //                         }
// // // // // // //                     />
// // // // // // //                     <div className="flex gap-4">
// // // // // // //                         <Button
// // // // // // //                             className="bg-primaryRed duration-300 h-12 w-12"
// // // // // // //                             onClick={addSection}
// // // // // // //                         >
// // // // // // //                             <Plus />
// // // // // // //                         </Button>
// // // // // // //                         {sections.length > 1 && index > 0 && (
// // // // // // //                             <>
// // // // // // //                                 <Button
// // // // // // //                                     className="bg-primaryRed duration-300 h-12 w-12"
// // // // // // //                                     onClick={() => removeSection(index)}
// // // // // // //                                 >
// // // // // // //                                     <Trash />
// // // // // // //                                 </Button>
// // // // // // //                             </>
// // // // // // //                         )}
// // // // // // //                     </div>
// // // // // // //                 </div>
// // // // // // //             ))}

// // // // // // //             <Button className="bg-primaryRed duration-300">Search</Button>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default MultiCityTab;




// // // // // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // // // import SelectInput from "@/components/components/input/SelectInput";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // // // // import SubtractIcon from "@/assets/svg/SubtractIcon";
// // // // // // import PlusIcon from "@/assets/svg/PlusIcon";
// // // // // // import { useState } from "react";
// // // // // // import { toast } from "react-toastify";
// // // // // // import DateInput from "@/components/components/input/DateInput";
// // // // // // import { Plus, Trash } from "lucide-react";
// // // // // // import { ticketClasses } from "../../data/data.json";
// // // // // // import CityInput from "@/components/components/input/CityInput";
// // // // // // import axiosInstance from "@/config/axios";

// // // // // // type DataItem = {
// // // // // //     value: string;
// // // // // //     label: React.ReactNode;
// // // // // //     city: {
// // // // // //         address: {
// // // // // //             cityCode: string;
// // // // // //             cityName: string;
// // // // // //             countryName: string;
// // // // // //         };
// // // // // //         name: string;
// // // // // //     };
// // // // // // };

// // // // // // interface PassengerCounterProps {
// // // // // //     label: string;
// // // // // //     count: number;
// // // // // //     increment: () => void;
// // // // // //     decrement: () => void;
// // // // // // }

// // // // // // const PassengerCounter = ({
// // // // // //     label,
// // // // // //     count,
// // // // // //     increment,
// // // // // //     decrement,
// // // // // // }: PassengerCounterProps) => (
// // // // // //     <div className="flex justify-between items-center">
// // // // // //         <p className="text-sm font-medium">{label}</p>
// // // // // //         <div className="flex gap-3">
// // // // // //             <button
// // // // // //                 className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// // // // // //                 onClick={decrement}
// // // // // //             >
// // // // // //                 <SubtractIcon stroke="#FFFFFF" />
// // // // // //             </button>
// // // // // //             <div className="w-[25px] h-[25px]">
// // // // // //                 <p className="text-sm font-medium">{count}</p>
// // // // // //             </div>
// // // // // //             <button
// // // // // //                 className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// // // // // //                 onClick={increment}
// // // // // //             >
// // // // // //                 <PlusIcon stroke="#FFFFFF" />
// // // // // //             </button>
// // // // // //         </div>
// // // // // //     </div>
// // // // // // );

// // // // // // interface Section {
// // // // // //     adultCount: number;
// // // // // //     childCount: number;
// // // // // //     infantCount: number;
// // // // // // }

// // // // // // const MultiCityTab = () => {
// // // // // //     const [cityOptions, setCityOptions] = useState<DataItem[]>([]);
// // // // // //     const [loading, setLoading] = useState(false);
// // // // // //     const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);
// // // // // //     const [sections, setSections] = useState<Section[]>([
// // // // // //         {
// // // // // //             adultCount: 0,
// // // // // //             childCount: 0,
// // // // // //             infantCount: 0,
// // // // // //         },
// // // // // //     ]);

// // // // // //     const totalPassengers = sections.reduce(
// // // // // //         (total, section) =>
// // // // // //             total + section.adultCount + section.childCount + section.infantCount,
// // // // // //         0
// // // // // //     );
// // // // // //     const maxPassengers = 9;

// // // // // //     const showErrorMessage = (message: string) => {
// // // // // //         toast.error(message);
// // // // // //     };

// // // // // //     const handleIncrement = (index: number, field: keyof Section) => {
// // // // // //         if (totalPassengers < maxPassengers) {
// // // // // //             setSections((prevSections) =>
// // // // // //                 prevSections.map((section, i) =>
// // // // // //                     i === index ? { ...section, [field]: section[field] + 1 } : section
// // // // // //                 )
// // // // // //             );
// // // // // //         } else {
// // // // // //             showErrorMessage("Passenger limit is 9.");
// // // // // //         }
// // // // // //     };

// // // // // //     const handleDecrement = (index: number, field: keyof Section) => {
// // // // // //         setSections((prevSections) =>
// // // // // //             prevSections.map((section, i) =>
// // // // // //                 i === index
// // // // // //                     ? { ...section, [field]: Math.max(0, section[field] - 1) }
// // // // // //                     : section
// // // // // //             )
// // // // // //         );
// // // // // //     };

// // // // // //     const addSection = () => {
// // // // // //         setSections((prevSections) => [
// // // // // //             ...prevSections,
// // // // // //             {
// // // // // //                 adultCount: 0,
// // // // // //                 childCount: 0,
// // // // // //                 infantCount: 0,
// // // // // //             },
// // // // // //         ]);
// // // // // //     };

// // // // // //     const removeSection = (index: number) => {
// // // // // //         if (sections.length > 1) {
// // // // // //             setSections((prevSections) => prevSections.filter((_, i) => i !== index));
// // // // // //         }
// // // // // //     };

// // // // // //     const fetchCityData = async (keyword: string) => {
// // // // // //         setLoading(true);
// // // // // //         try {
// // // // // //             const response = await axiosInstance.get(
// // // // // //                 `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // // // // //             );
// // // // // //             const accessToken = response?.data?.accessToken;
// // // // // //             if (accessToken) {
// // // // // //                 localStorage.setItem("accessToken", JSON.stringify(accessToken));
// // // // // //             }
// // // // // //             const cityData = response?.data?.data?.map((item: any) => ({
// // // // // //                 value: item?.iataCode,
// // // // // //                 label: "",
// // // // // //                 city: {
// // // // // //                     address: {
// // // // // //                         cityCode: item?.address?.cityCode,
// // // // // //                         cityName: item?.address?.cityName,
// // // // // //                         countryName: item?.address?.countryName,
// // // // // //                     },
// // // // // //                     name: item?.name,
// // // // // //                 },
// // // // // //             }));
// // // // // //             setCityOptions(cityData);
// // // // // //         } catch (error) {
// // // // // //             showErrorMessage("No city found.");
// // // // // //         } finally {
// // // // // //             setLoading(false);
// // // // // //         }
// // // // // //     };




// // // // // //     return (
// // // // // //         <div className="flex flex-col gap-4 lg:mt-4 mt-2 items-center w-full">
// // // // // //             {sections.map((section, index) => (
// // // // // //                 <div
// // // // // //                     key={index}
// // // // // //                     className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // // // // //                 >
// // // // // //                     <div className="flex lg:flex-row flex-col items-center gap-2">
// // // // // //                         <CityInput
// // // // // //                             data={cityOptions}
// // // // // //                             label="From where?"
// // // // // //                             placeholder="City"
// // // // // //                             onSearch={fetchCityData}
// // // // // //                             loading={loading}
// // // // // //                         />
// // // // // //                         <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // // // // //                             <TransactionIcon size="10" stroke="#E5302f" />
// // // // // //                         </div>
// // // // // //                         <CityInput
// // // // // //                             data={cityOptions}
// // // // // //                             label="From where?"
// // // // // //                             placeholder="City"
// // // // // //                             onSearch={fetchCityData}
// // // // // //                             loading={loading}
// // // // // //                         />
// // // // // //                     </div>

// // // // // //                     <DateInput labelText="Departure" />

// // // // // //                     {/* <SelectInput data={ticketClasses} label="Class" placeholder="Class" /> */}


// // // // // //                     <SelectInput
// // // // // //           data={ticketClasses}
// // // // // //           label="Class"
// // // // // //           placeholder="Class"
// // // // // //           value={selectedClass}
// // // // // //           onChange={setSelectedClass}
// // // // // //         />

// // // // // //                     {/* <Dropdown
// // // // // //                         label="Passengers"
// // // // // //                         body={
// // // // // //                             <div className="flex flex-col gap-3 py-2">
// // // // // //                                 <PassengerCounter
// // // // // //                                     label="Adults (< 12 years)"
// // // // // //                                     count={section.adultCount}
// // // // // //                                     increment={() => handleIncrement(index, "adultCount")}
// // // // // //                                     decrement={() => handleDecrement(index, "adultCount")}
// // // // // //                                 />
// // // // // //                                 <PassengerCounter
// // // // // //                                     label="Children (2 - 12 years)"
// // // // // //                                     count={section.childCount}
// // // // // //                                     increment={() => handleIncrement(index, "childCount")}
// // // // // //                                     decrement={() => handleDecrement(index, "childCount")}
// // // // // //                                 />
// // // // // //                                 <PassengerCounter
// // // // // //                                     label="Infants (< 2 years)"
// // // // // //                                     count={section.infantCount}
// // // // // //                                     increment={() => handleIncrement(index, "infantCount")}
// // // // // //                                     decrement={() => handleDecrement(index, "infantCount")}
// // // // // //                                 />
// // // // // //                             </div>
// // // // // //                         }
// // // // // //                     /> */}


// // // // // //                     <Dropdown label="Passengers" btnText="Add passengers">
// // // // // //                         <div className="flex flex-col gap-3 py-2">
// // // // // //                             <PassengerCounter
// // // // // //                                 label="Adults ( ≥ 12 years)"
// // // // // //                                 count={section.adultCount}
// // // // // //                                 increment={() => handleIncrement(index, "adultCount")}
// // // // // //                                 decrement={() => handleDecrement(index, "adultCount")}
// // // // // //                             />
// // // // // //                             <PassengerCounter
// // // // // //                                 label="Children ( 2 - 12 years)"
// // // // // //                                 count={section.childCount}
// // // // // //                                 increment={() => handleIncrement(index, "childCount")}
// // // // // //                                 decrement={() => handleDecrement(index, "childCount")}
// // // // // //                             />
// // // // // //                             <PassengerCounter
// // // // // //                                 label="Infants ( < 2 years)"
// // // // // //                                 count={section.infantCount}
// // // // // //                                 increment={() => handleIncrement(index, "infantCount")}
// // // // // //                                 decrement={() => handleDecrement(index, "infantCount")}
// // // // // //                             />
// // // // // //                         </div>
// // // // // //                     </Dropdown>
// // // // // //                     <div className="flex gap-4">
// // // // // //                         <Button
// // // // // //                             className="bg-primaryRed duration-300 h-12 w-12"
// // // // // //                             onClick={addSection}
// // // // // //                         >
// // // // // //                             <Plus />
// // // // // //                         </Button>
// // // // // //                         {sections.length > 1 && index > 0 && (
// // // // // //                             <>
// // // // // //                                 <Button
// // // // // //                                     className="bg-primaryRed duration-300 h-12 w-12"
// // // // // //                                     onClick={() => removeSection(index)}
// // // // // //                                 >
// // // // // //                                     <Trash />
// // // // // //                                 </Button>
// // // // // //                             </>
// // // // // //                         )}
// // // // // //                     </div>
// // // // // //                 </div>
// // // // // //             ))}

// // // // // //             <Button className="bg-primaryRed duration-300">Search</Button>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default MultiCityTab;






// // // // // // MultiCityTab.tsx

// // // // // import React, { useState, useCallback, useEffect, MouseEvent } from "react";
// // // // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // // import { format } from "date-fns";
// // // // // import SelectInput from "@/components/components/input/SelectInput";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // // // import { toast } from "react-toastify";
// // // // // import axiosInstance from "@/config/axios";
// // // // // import { ticketClasses } from "../../data/data.json";
// // // // // import CityInput from "@/components/components/input/CityInput";
// // // // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // // // import { useNavigate } from "react-router-dom";
// // // // // import {
// // // // //     PASSENGER_LIMIT,
// // // // //     NO_CITY_MESSAGE,
// // // // //     NO_FLIGHT_MESSAGE,
// // // // //     PASSENGER_LIMIT_MESSAGE,
// // // // //     INFANT_EXCEED_ADULT_MESSAGE,
// // // // // } from "@/config/api";
// // // // // import DateInput from "@/components/components/input/DateInput";
// // // // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // // // import { Plus } from "lucide-react";

// // // // // // Type Definitions
// // // // // type DataItem = {
// // // // //     value: string;
// // // // //     label: React.ReactNode;
// // // // //     city: {
// // // // //         address: {
// // // // //             cityCode?: string;
// // // // //             cityName?: string;
// // // // //             countryName?: string;
// // // // //         };
// // // // //         name: string;
// // // // //         iata: string;
// // // // //         city: string;
// // // // //         country: string;
// // // // //     };
// // // // // };

// // // // // type FlightSegment = {
// // // // //     id: number;
// // // // //     departureCityInput: string;
// // // // //     departureCity: string;
// // // // //     departureCityOptions: DataItem[];
// // // // //     departureLoading: boolean;

// // // // //     arrivalCityInput: string;
// // // // //     arrivalCity: string;
// // // // //     arrivalCityOptions: DataItem[];
// // // // //     arrivalLoading: boolean;

// // // // //     departureDate: Date;
// // // // // };

// // // // // // FlightSegmentComponent Props
// // // // // type FlightSegmentProps = {
// // // // //     segment: FlightSegment;
// // // // //     onChange: (id: number, updatedSegment: Partial<FlightSegment>) => void;
// // // // //     onRemove: (id: number) => void;
// // // // //     showErrorMessage: (message: string) => void;
// // // // // };

// // // // // // Debounce Hook
// // // // // const useDebounce = <T,>(value: T, delay: number): T => {
// // // // //     const [debouncedValue, setDebouncedValue] = useState(value);

// // // // //     useEffect(() => {
// // // // //         const handler = setTimeout(() => {
// // // // //             setDebouncedValue(value);
// // // // //         }, delay);

// // // // //         return () => {
// // // // //             clearTimeout(handler);
// // // // //         };
// // // // //     }, [value, delay]);

// // // // //     return debouncedValue;
// // // // // };

// // // // // // FlightSegmentComponent
// // // // // const FlightSegmentComponent: React.FC<FlightSegmentProps> = ({
// // // // //     segment,
// // // // //     onChange,
// // // // //     onRemove,
// // // // //     showErrorMessage,
// // // // // }) => {
// // // // //     const debouncedDepartureCity = useDebounce(segment.departureCityInput, 300);
// // // // //     const debouncedArrivalCity = useDebounce(segment.arrivalCityInput, 300);

// // // // //     // Fetch City Data Function
// // // // //     const fetchCityData = async (
// // // // //         keyword: string,
// // // // //         setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // // // //         setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // // // //     ) => {
// // // // //         if (keyword.length < 2) return;

// // // // //         setLoading(true);
// // // // //         try {
// // // // //             const response = await axiosInstance.get(
// // // // //                 `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // // // //             );

// // // // //             const cityData = response.data?.map((item: any) => ({
// // // // //                 value: item?.iataCode,
// // // // //                 label: `${item?.name}`,
// // // // //                 city: {
// // // // //                     address: {
// // // // //                         cityCode: item?.address?.cityCode,
// // // // //                         cityName: item?.address?.cityName,
// // // // //                         countryName: item?.address?.countryName,
// // // // //                     },
// // // // //                     name: item?.name,
// // // // //                     iata: item?.iata,
// // // // //                     city: item?.city,
// // // // //                     country: item?.country,
// // // // //                 },
// // // // //             }));

// // // // //             if (cityData && cityData.length > 0) {
// // // // //                 setCityOptions(cityData);
// // // // //             } else {
// // // // //                 showErrorMessage(NO_CITY_MESSAGE);
// // // // //             }
// // // // //         } catch (error) {
// // // // //             showErrorMessage(NO_CITY_MESSAGE);
// // // // //         } finally {
// // // // //             setLoading(false);
// // // // //         }
// // // // //     };

// // // // //     // Fetch departure cities
// // // // //     useEffect(() => {
// // // // //         if (debouncedDepartureCity) {
// // // // //             fetchCityData(
// // // // //                 debouncedDepartureCity,
// // // // //                 setDepartureCityOptions,
// // // // //                 setDepartureLoading
// // // // //             );
// // // // //         }
// // // // //         // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //     }, [debouncedDepartureCity]);

// // // // //     // Fetch arrival cities
// // // // //     useEffect(() => {
// // // // //         if (debouncedArrivalCity) {
// // // // //             fetchCityData(
// // // // //                 debouncedArrivalCity,
// // // // //                 setArrivalCityOptions,
// // // // //                 setArrivalLoading
// // // // //             );
// // // // //         }
// // // // //         // eslint-disable-next-line react-hooks/exhaustive-deps
// // // // //     }, [debouncedArrivalCity]);

// // // // //     // Handlers for fetching city data
// // // // //     const setDepartureCityOptions = (options: DataItem[]) => {
// // // // //         onChange(segment.id, { departureCityOptions: options });
// // // // //     };

// // // // //     const setArrivalCityOptions = (options: DataItem[]) => {
// // // // //         onChange(segment.id, { arrivalCityOptions: options });
// // // // //     };

// // // // //     const setDepartureLoading = (loading: boolean) => {
// // // // //         onChange(segment.id, { departureLoading: loading });
// // // // //     };

// // // // //     const setArrivalLoading = (loading: boolean) => {
// // // // //         onChange(segment.id, { arrivalLoading: loading });
// // // // //     };

// // // // //     // Handle Departure City Change
// // // // //     const handleDepartureCityChange = (value: string, city: DataItem) => {
// // // // //         onChange(segment.id, {
// // // // //             departureCity: city.city.iata,
// // // // //             departureCityInput: city.city.iata,
// // // // //         });
// // // // //     };

// // // // //     // Handle Arrival City Change
// // // // //     const handleArrivalCityChange = (value: string, city: DataItem) => {
// // // // //         onChange(segment.id, {
// // // // //             arrivalCity: city.city.iata,
// // // // //             arrivalCityInput: city.city.iata,
// // // // //         });
// // // // //     };

// // // // //     // Handle Date Change
// // // // //     const handleDateChange = (date: Date | undefined) => {
// // // // //         onChange(segment.id, { departureDate: date || new Date() });
// // // // //     };

// // // // //     return (
// // // // //         <div className="flex flex-col gap-5 w-full items-center border p-4 rounded-md">
// // // // //             <div className="flex lg:flex-row flex-col lg:gap-6 gap-3 w-full justify-between">
// // // // //                 <CityInput
// // // // //                     value={segment.departureCityInput}
// // // // //                     data={segment.departureCityOptions}
// // // // //                     label="From where?"
// // // // //                     placeholder="City"
// // // // //                     onSearch={(value) =>
// // // // //                         onChange(segment.id, { departureCityInput: value })
// // // // //                     }
// // // // //                     loading={segment.departureLoading}
// // // // //                     onChange={handleDepartureCityChange}
// // // // //                 />

// // // // //                 <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%] flex items-center justify-center">
// // // // //                     <TransactionIcon size="10" stroke="#E5302f" />
// // // // //                 </div>

// // // // //                 <CityInput
// // // // //                     value={segment.arrivalCityInput}
// // // // //                     data={segment.arrivalCityOptions}
// // // // //                     label="To where?"
// // // // //                     placeholder="City"
// // // // //                     onSearch={(value) =>
// // // // //                         onChange(segment.id, { arrivalCityInput: value })
// // // // //                     }
// // // // //                     loading={segment.arrivalLoading}
// // // // //                     onChange={handleArrivalCityChange}
// // // // //                 />

// // // // //                 <DateInput
// // // // //                     labelText="Departure"
// // // // //                     onChange={handleDateChange}
// // // // //                     value={segment.departureDate}
// // // // //                 />

// // // // //                 {/* Remove Section Button */}
// // // // //                 <div className="flex items-center">
// // // // //                     <Button
// // // // //                         className="bg-red-500 text-white"
// // // // //                         onClick={() => onRemove(segment.id)}
// // // // //                         disabled={false} // You can add conditions if needed
// // // // //                     >
// // // // //                         Remove
// // // // //                     </Button>
// // // // //                 </div>
// // // // //             </div>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // // Main MultiCityTab Component
// // // // // const MultiCityTab: React.FC = () => {
// // // // //     const navigate = useNavigate();

// // // // //     // Passenger Counts
// // // // //     const [adultCount, setAdultCount] = useState(1); // At least one adult is required
// // // // //     const [childCount, setChildCount] = useState(0);
// // // // //     const [infantCount, setInfantCount] = useState(0);

// // // // //     // Flight Segments State
// // // // //     const [flightSegments, setFlightSegments] = useState<FlightSegment[]>([
// // // // //         {
// // // // //             id: 1,
// // // // //             departureCityInput: "",
// // // // //             departureCity: "",
// // // // //             departureCityOptions: [],
// // // // //             departureLoading: false,

// // // // //             arrivalCityInput: "",
// // // // //             arrivalCity: "",
// // // // //             arrivalCityOptions: [],
// // // // //             arrivalLoading: false,

// // // // //             departureDate: new Date(),
// // // // //         },
// // // // //     ]);

// // // // //     // Class Selection
// // // // //     const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // // // //     // Flight Search Loading
// // // // //     const [flightSearchLoading, setFlightSearchLoading] = useState(false);

// // // // //     // Error Message Handler
// // // // //     const showErrorMessage = useCallback((message: string) => {
// // // // //         toast.error(message);
// // // // //     }, []);

// // // // //     // Total Passengers
// // // // //     const totalPassengers = adultCount + childCount + infantCount;

// // // // //     // Passenger Handlers
// // // // //     const handleIncrement = (
// // // // //         setter: React.Dispatch<React.SetStateAction<number>>
// // // // //     ) => {
// // // // //         if (totalPassengers < PASSENGER_LIMIT) {
// // // // //             setter((prev) => prev + 1);
// // // // //         } else {
// // // // //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // // //         }
// // // // //     };

// // // // //     const handleDecrement = (
// // // // //         setter: React.Dispatch<React.SetStateAction<number>>
// // // // //     ) => {
// // // // //         setter((prev) => (prev > 0 ? prev - 1 : 0));
// // // // //     };

// // // // //     const handleAdultIncrement = useCallback(() => {
// // // // //         if (totalPassengers < PASSENGER_LIMIT) {
// // // // //             const newCount = adultCount + 1;
// // // // //             if (newCount < infantCount) {
// // // // //                 showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // // // //             } else {
// // // // //                 setAdultCount(newCount);
// // // // //             }
// // // // //         } else {
// // // // //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // // //         }
// // // // //     }, [totalPassengers, adultCount, infantCount, showErrorMessage]);

// // // // //     const handleAdultDecrement = useCallback(() => {
// // // // //         if (adultCount > 0) {
// // // // //             const newCount = adultCount - 1;
// // // // //             if (newCount < infantCount) {
// // // // //                 showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // // // //                 setInfantCount(newCount);
// // // // //             }
// // // // //             setAdultCount(newCount);
// // // // //         }
// // // // //     }, [adultCount, infantCount, showErrorMessage]);

// // // // //     const handleChildIncrement = useCallback(
// // // // //         () => handleIncrement(setChildCount),
// // // // //         [handleIncrement]
// // // // //     );
// // // // //     const handleChildDecrement = useCallback(
// // // // //         () => handleDecrement(setChildCount),
// // // // //         []
// // // // //     );

// // // // //     const handleInfantIncrement = useCallback(() => {
// // // // //         if (adultCount === 0 || infantCount >= adultCount) {
// // // // //             showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // // // //         } else if (totalPassengers < PASSENGER_LIMIT) {
// // // // //             setInfantCount((prev) => prev + 1);
// // // // //         } else {
// // // // //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // // //         }
// // // // //     }, [adultCount, infantCount, totalPassengers, showErrorMessage]);

// // // // //     const handleInfantDecrement = useCallback(
// // // // //         () => handleDecrement(setInfantCount),
// // // // //         []
// // // // //     );

// // // // //     // Add Section Function
// // // // //     const addSection = (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
// // // // //         event.preventDefault();
// // // // //         const newId =
// // // // //             flightSegments.length > 0
// // // // //                 ? flightSegments[flightSegments.length - 1].id + 1
// // // // //                 : 1;
// // // // //         setFlightSegments([
// // // // //             ...flightSegments,
// // // // //             {
// // // // //                 id: newId,
// // // // //                 departureCityInput: "",
// // // // //                 departureCity: "",
// // // // //                 departureCityOptions: [],
// // // // //                 departureLoading: false,

// // // // //                 arrivalCityInput: "",
// // // // //                 arrivalCity: "",
// // // // //                 arrivalCityOptions: [],
// // // // //                 arrivalLoading: false,

// // // // //                 departureDate: new Date(),
// // // // //             },
// // // // //         ]);
// // // // //     };

// // // // //     // Remove Section Function
// // // // //     const removeSection = (id: number) => {
// // // // //         if (flightSegments.length === 1) {
// // // // //             showErrorMessage("At least one flight segment is required.");
// // // // //             return;
// // // // //         }
// // // // //         setFlightSegments(flightSegments.filter((segment) => segment.id !== id));
// // // // //     };

// // // // //     // Handle Flight Segment Change
// // // // //     const handleSegmentChange = (
// // // // //         id: number,
// // // // //         updatedSegment: Partial<FlightSegment>
// // // // //     ) => {
// // // // //         setFlightSegments((prev) =>
// // // // //             prev.map((seg) => (seg.id === id ? { ...seg, ...updatedSegment } : seg))
// // // // //         );
// // // // //     };

// // // // //     // Search Flight Function
// // // // //     const searchFlight = useCallback(async () => {
// // // // //         // Validation before searching
// // // // //         for (const segment of flightSegments) {
// // // // //             if (!segment.departureCity || !segment.arrivalCity) {
// // // // //                 showErrorMessage("Please select both departure and arrival cities for all segments.");
// // // // //                 return;
// // // // //             }
// // // // //             if (!segment.departureDate) {
// // // // //                 showErrorMessage("Please select departure dates for all segments.");
// // // // //                 return;
// // // // //             }
// // // // //         }

// // // // //         setFlightSearchLoading(true);
// // // // //         try {
// // // // //             // Construct segments for API
// // // // //             const searchSegments = flightSegments.map((segment) => ({
// // // // //                 originLocationCode: segment.departureCity,
// // // // //                 destinationLocationCode: segment.arrivalCity,
// // // // //                 departureDate: format(segment.departureDate, "yyyy-MM-dd"),
// // // // //             }));

// // // // //             // Make API Request
// // // // //             const response = await axiosInstance.post(
// // // // //                 `/api/flight/search/multi-offer`, // Adjust the endpoint as per your backend
// // // // //                 {
// // // // //                     segments: searchSegments,
// // // // //                     adults: adultCount,
// // // // //                     children: childCount,
// // // // //                     infants: infantCount,
// // // // //                     currencyCode: "NGN",
// // // // //                     travelClass: selectedClass,
// // // // //                     includedAirlineCodes: ["TK"], // Adjust or make dynamic if needed
// // // // //                     max: 50,
// // // // //                 }
// // // // //             );

// // // // //             // Navigate to Search Results with State
// // // // //             navigate("/search", {
// // // // //                 state: {
// // // // //                     searchResults: response?.data,
// // // // //                     searchParams: {
// // // // //                         flightSegments,
// // // // //                         adultCount,
// // // // //                         childCount,
// // // // //                         infantCount,
// // // // //                         selectedClass,
// // // // //                     },
// // // // //                 },
// // // // //             });
// // // // //         } catch (error: any) {
// // // // //             if (error.response && error.response.data && error.response.data.errors) {
// // // // //                 const { adults, infants, children } = error.response.data.errors;

// // // // //                 if (adults) {
// // // // //                     showErrorMessage(`${adults.join(", ")}`);
// // // // //                 }
// // // // //                 if (infants) {
// // // // //                     showErrorMessage(`${infants.join(", ")}`);
// // // // //                 }
// // // // //                 if (children) {
// // // // //                     showErrorMessage(`${children.join(", ")}`);
// // // // //                 }
// // // // //             } else {
// // // // //                 showErrorMessage(NO_FLIGHT_MESSAGE);
// // // // //             }
// // // // //         } finally {
// // // // //             setFlightSearchLoading(false);
// // // // //         }
// // // // //     }, [
// // // // //         flightSegments,
// // // // //         adultCount,
// // // // //         childCount,
// // // // //         infantCount,
// // // // //         selectedClass,
// // // // //         showErrorMessage,
// // // // //         navigate,
// // // // //     ]);

// // // // //     return (
// // // // //         <div className="flex flex-col gap-5 w-full items-center">
// // // // //             {/* Render Flight Segments */}
// // // // //             {flightSegments.map((segment, index) => (
// // // // //                 <FlightSegmentComponent
// // // // //                     key={segment.id}
// // // // //                     segment={segment}
// // // // //                     onChange={handleSegmentChange}
// // // // //                     onRemove={removeSection}
// // // // //                     showErrorMessage={showErrorMessage}
// // // // //                 />
// // // // //             ))}

// // // // //             {/* Add Another Flight Button */}
// // // // //             <Button
// // // // //                 className="bg-primaryRed duration-300 capitalize flex items-center gap-2"
// // // // //                 onClick={addSection}
// // // // //             >
// // // // //                 <Plus size={16} /> Add Another Flight
// // // // //             </Button>

// // // // //             {/* Passenger Dropdown */}
// // // // //             <Dropdown label="Passengers" btnText="Add passengers">
// // // // //                 <div className="flex flex-col gap-3 py-2">
// // // // //                     <PassengerCounter
// // // // //                         label="Adults ( ≥ 12 years)"
// // // // //                         count={adultCount}
// // // // //                         increment={handleAdultIncrement}
// // // // //                         decrement={handleAdultDecrement}
// // // // //                     />
// // // // //                     <PassengerCounter
// // // // //                         label="Children ( 2 - 12 years)"
// // // // //                         count={childCount}
// // // // //                         increment={handleChildIncrement}
// // // // //                         decrement={handleChildDecrement}
// // // // //                     />
// // // // //                     <PassengerCounter
// // // // //                         label="Infants ( < 2 years)"
// // // // //                         count={infantCount}
// // // // //                         increment={handleInfantIncrement}
// // // // //                         decrement={handleInfantDecrement}
// // // // //                     />
// // // // //                 </div>
// // // // //             </Dropdown>

// // // // //             {/* Class Selection */}
// // // // //             <SelectInput
// // // // //                 data={ticketClasses}
// // // // //                 label="Class"
// // // // //                 placeholder="Class"
// // // // //                 value={selectedClass}
// // // // //                 onChange={setSelectedClass}
// // // // //             />

// // // // //             {/* Search Button */}
// // // // //             <Button
// // // // //                 className="col-span-2 bg-primaryRed duration-300 capitalize"
// // // // //                 onClick={searchFlight}
// // // // //                 disabled={flightSearchLoading}
// // // // //             >
// // // // //                 {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // // // //             </Button>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default MultiCityTab;




// // // // import React, { useState, useCallback, useEffect } from "react";
// // // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // import { format } from "date-fns";
// // // // import SelectInput from "@/components/components/input/SelectInput";
// // // // import { Button } from "@/components/ui/button";
// // // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // // import { toast } from "react-toastify";
// // // // import axiosInstance from "@/config/axios";
// // // // import { ticketClasses } from "../../data/data.json";
// // // // import CityInput from "@/components/components/input/CityInput";
// // // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // // //   PASSENGER_LIMIT,
// // // //   NO_CITY_MESSAGE,
// // // //   NO_FLIGHT_MESSAGE,
// // // // //   PASSENGER_LIMIT_MESSAGE,
// // // //   INFANT_EXCEED_ADULT_MESSAGE,
// // // // } from "@/config/api";
// // // // import DateInput from "@/components/components/input/DateInput";
// // // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // // import { Plus } from "lucide-react";

// // // // type DataItem = {
// // // //   value: string;
// // // //   label: React.ReactNode;
// // // //   city: {
// // // //     address: {
// // // //       cityCode?: string;
// // // //       cityName?: string;
// // // //       countryName?: string;
// // // //     };
// // // //     name: string;
// // // //     iata: string;
// // // //     city: string;
// // // //     country: string;
// // // //   };
// // // // };

// // // // interface Section {
// // // //     adultCount: number;
// // // //     childCount: number;
// // // //     infantCount: number;
// // // // }

// // // // const MultiCityTab = () => {
// // // //   const navigate = useNavigate();

// // // //   const [adultCount, setAdultCount] = useState(0);
// // // //   const [childCount, setChildCount] = useState(0);
// // // //   const [infantCount, setInfantCount] = useState(0);


// // // //   const [sections, setSections] = useState<Section[]>([
// // // //     {
// // // //         adultCount: 0,
// // // //         childCount: 0,
// // // //         infantCount: 0,
// // // //     },
// // // // ]);

// // // //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
// // // //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // // //   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // // //   const [departureLoading, setDepartureLoading] = useState(false);
// // // //   const [arrivalLoading, setArrivalLoading] = useState(false);

// // // //   const [departureCityInput, setDepartureCityInput] = useState('');
// // // //   const [arrivalCityInput, setArrivalCityInput] = useState('');
// // // //   const [departureCity, setDepartureCity] = useState("");
// // // //   const [arrivalCity, setArrivalCity] = useState("");
// // // //   const [departureDate, setDepartureDate] = useState(new Date());
// // // //   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // // //   const showErrorMessage = useCallback((message: string) => {
// // // //     toast.error(message);
// // // //   }, []);

// // // //   const totalPassengers = adultCount + childCount + infantCount;

// // // // //   const handleIncrement = (
// // // // //     setter: React.Dispatch<React.SetStateAction<number>>
// // // // //   ) => {
// // // // //     if (totalPassengers < PASSENGER_LIMIT) {
// // // // //       setter((prev) => prev + 1);
// // // // //     } else {
// // // // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // // //     }
// // // // //   };

// // // // //   const handleDecrement = (
// // // // //     setter: React.Dispatch<React.SetStateAction<number>>
// // // // //   ) => {
// // // // //     setter((prev) => (prev > 0 ? prev - 1 : 0));
// // // // //   };

// // // // //   const handleAdultIncrement = useCallback(() => {
// // // // //     if (totalPassengers < PASSENGER_LIMIT) {
// // // // //       const newCount = adultCount + 1;
// // // // //       if (newCount < infantCount) {
// // // // //         showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // // // //       } else {
// // // // //         setAdultCount(newCount);
// // // // //       }
// // // // //     } else {
// // // // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // // //     }
// // // // //   }, [totalPassengers, adultCount, infantCount, showErrorMessage]);

// // // //   const handleAdultDecrement = useCallback(() => {
// // // //     if (adultCount > 0) {
// // // //       const newCount = adultCount - 1;
// // // //       if (newCount < infantCount) {
// // // //         showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // // //         setInfantCount(newCount);
// // // //       }
// // // //       setAdultCount(newCount);
// // // //     }
// // // //   }, [adultCount, infantCount, showErrorMessage]);

// // // // //   const handleChildIncrement = useCallback(
// // // // //     () => handleIncrement(setChildCount),
// // // // //     [totalPassengers, showErrorMessage]
// // // // //   );
// // // // //   const handleChildDecrement = useCallback(
// // // // //     () => handleDecrement(setChildCount),
// // // // //     []
// // // // //   );

// // // //   const maxPassengers = 9;

// // // //   const handleIncrement = (index: number, field: keyof Section) => {
// // // //     if (totalPassengers < maxPassengers) {
// // // //         setSections((prevSections) =>
// // // //             prevSections.map((section, i) =>
// // // //                 i === index ? { ...section, [field]: section[field] + 1 } : section
// // // //             )
// // // //         );
// // // //     } else {
// // // //         showErrorMessage("Passenger limit is 9.");
// // // //     }
// // // // };

// // // // const handleDecrement = (index: number, field: keyof Section) => {
// // // //     setSections((prevSections) =>
// // // //         prevSections.map((section, i) =>
// // // //             i === index
// // // //                 ? { ...section, [field]: Math.max(0, section[field] - 1) }
// // // //                 : section
// // // //         )
// // // //     );
// // // // };

// // // // //   const handleInfantIncrement = useCallback(() => {
// // // // //     if (adultCount === 0 || infantCount >= adultCount) {
// // // // //       showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // // // //     } else if (totalPassengers < PASSENGER_LIMIT) {
// // // // //       setInfantCount((prev) => prev + 1);
// // // // //     } else {
// // // // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // // //     }
// // // // //   }, [adultCount, infantCount, totalPassengers, showErrorMessage]);

// // // // //   const handleInfantDecrement = useCallback(
// // // // //     () => handleDecrement(setInfantCount),
// // // // //     []
// // // // //   );

// // // //   const useDebounce = <T,>(value: T, delay: number): T => {
// // // //     const [debouncedValue, setDebouncedValue] = useState(value);

// // // //     useEffect(() => {
// // // //       const handler = setTimeout(() => {
// // // //         setDebouncedValue(value);
// // // //       }, delay);

// // // //       return () => {
// // // //         clearTimeout(handler);
// // // //       };
// // // //     }, [value, delay]);

// // // //     return debouncedValue;
// // // //   };

// // // //   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // // //   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);




// // // //   const addSection = () => {
// // // //     setSections((prevSections) => [
// // // //         ...prevSections,
// // // //         {
// // // //             adultCount: 0,
// // // //             childCount: 0,
// // // //             infantCount: 0,
// // // //         },
// // // //     ]);
// // // // };

// // // //   const fetchCityData = async (
// // // //     keyword: string,
// // // //     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // // //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // // //   ) => {
// // // //     if (keyword.length < 2) return;

// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axiosInstance.get(
// // // //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // // //       );

// // // //       const cityData = response.data?.map((item: any) => ({
// // // //         value: item?.iataCode,
// // // //         label: `${item?.name}`,
// // // //         city: {
// // // //           address: {
// // // //             cityCode: item?.address?.cityCode,
// // // //             cityName: item?.address?.cityName,
// // // //             countryName: item?.address?.countryName,
// // // //           },
// // // //           name: item?.name,
// // // //           iata: item?.iata,
// // // //           city: item?.city,
// // // //           country: item?.country,
// // // //         },
// // // //       }));

// // // //       console.log(cityData)

// // // //       if (cityData && cityData.length > 0) {
// // // //         setCityOptions(cityData);
// // // //       } else {
// // // //         showErrorMessage(NO_CITY_MESSAGE);
// // // //       }
// // // //     } catch (error) {
// // // //       showErrorMessage(NO_CITY_MESSAGE);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (debouncedDepartureCity) {
// // // //       fetchCityData(debouncedDepartureCity, setDepartureCityOptions, setDepartureLoading);
// // // //     }
// // // //   }, [debouncedDepartureCity]);

// // // //   useEffect(() => {
// // // //     if (debouncedArrivalCity) {
// // // //       fetchCityData(debouncedArrivalCity, setArrivalCityOptions, setArrivalLoading);
// // // //     }
// // // //   }, [debouncedArrivalCity]);


// // // //   const searchFlight = useCallback(async () => {
// // // //     setFlightSearchLoading(true);
// // // //     try {
// // // //       const response = await axiosInstance.get(
// // // //         `https://test.ffsdtravels.com/api/flight/search/offer?originLocationCode=${departureCity}&destinationLocationCode=${arrivalCity}&departureDate=${format(
// // // //           departureDate,
// // // //           "yyyy-MM-dd"
// // // //         )}&adults=${adultCount}&max=50&infants=${infantCount}&children=${childCount}&currencyCode=NGN&travelClass=${selectedClass}&includedAirlineCodes=TK`
// // // //       );

// // // //       const searchParams = {
// // // //         departureCity,
// // // //         arrivalCity,
// // // //         departureDate,
// // // //         adultCount,
// // // //         childCount,
// // // //         infantCount,
// // // //         selectedClass,
// // // //       };

// // // //       navigate("/search", {
// // // //         state: {
// // // //           searchResults: response?.data,
// // // //           searchParams,
// // // //         },
// // // //       });
// // // //     } catch (error: any) {
// // // //       if (error.response && error.response.data && error.response.data.errors) {
// // // //         const { adults, infants, children } = error.response.data.errors;

// // // //         if (adults) {
// // // //           showErrorMessage(`${adults.join(", ")}`);
// // // //         }
// // // //         if (infants) {
// // // //           showErrorMessage(`${infants.join(", ")}`);
// // // //         }
// // // //         if (children) {
// // // //           showErrorMessage(`${children.join(", ")}`);
// // // //         }
// // // //       } else {
// // // //         showErrorMessage(NO_FLIGHT_MESSAGE);
// // // //       }
// // // //     } finally {
// // // //       setFlightSearchLoading(false);
// // // //     }
// // // //   }, [
// // // //     departureCity,
// // // //     arrivalCity,
// // // //     departureDate,
// // // //     adultCount,
// // // //     infantCount,
// // // //     childCount,
// // // //     selectedClass,
// // // //     showErrorMessage,
// // // //     navigate,
// // // //   ]);


// // // //   const handleDepartureDateChange = useCallback(
// // // //     (date: Date | undefined) => setDepartureDate(date || new Date()),
// // // //     []
// // // //   );

// // // //   const handleDepartureCityChange = (value: string, city: DataItem) => {
// // // //     setDepartureCity(city.city.iata); // Update with the airport name
// // // //     setDepartureCityInput(city.city.iata); // Display city and airport code in the input
// // // //     console.log("Value:", value);
// // // //     console.log("City:", city);
// // // //   };

// // // //   const handleArrivalCityChange = (value: string, city: DataItem) => {
// // // //     setArrivalCity(city.city.iata); // Update with the airport name
// // // //     setArrivalCityInput(city.city.iata); // Display city and airport code in the input
// // // //     console.log("Value:", value);
// // // //     console.log("City:", city);
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col gap-5 w-full items-center">
// // // //         {sections.map((section, index) => (
// // // //       <div key={index} className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between">
// // // //         <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // // //           <CityInput
// // // //             value={departureCityInput}
// // // //             data={departureCityOptions}
// // // //             label="From where?"
// // // //             placeholder="City"
// // // //             onSearch={setDepartureCityInput}
// // // //             loading={departureLoading}
// // // //             onChange={handleDepartureCityChange} // Use updated handler
// // // //           />

// // // //           <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // // //             <TransactionIcon size="10" stroke="#E5302f" />
// // // //           </div>

// // // //           <CityInput
// // // //             value={arrivalCityInput}
// // // //             data={arrivalCityOptions}
// // // //             label="To where?"
// // // //             placeholder="City"
// // // //             onSearch={setArrivalCityInput}
// // // //             loading={arrivalLoading}
// // // //             onChange={handleArrivalCityChange} // Use updated handler
// // // //           />
// // // //         </div>

// // // //         <DateInput labelText="Departure" onChange={handleDepartureDateChange} />

// // // //         <SelectInput
// // // //           data={ticketClasses}
// // // //           label="Class"
// // // //           placeholder="Class"
// // // //           value={selectedClass}
// // // //           onChange={setSelectedClass}
// // // //         />

// // // //         <Dropdown label="Passengers" btnText="Add passengers">
// // // //           <div className="flex flex-col gap-3 py-2">
// // // //             <PassengerCounter
// // // //               label="Adults ( ≥ 12 years)"
// // // //               count={section.adultCount}
// // // //               increment={() => handleIncrement(index, "adultCount")}
// // // //               decrement={() => handleDecrement(index, "adultCount")}
// // // //             />
// // // //             <PassengerCounter
// // // //               label="Children ( 2 - 12 years)"
// // // //               count={section.childCount}
// // // //               increment={() => handleIncrement(index, "childCount")}
// // // //               decrement={() => handleDecrement(index, "childCount")}
// // // //             />
// // // //             <PassengerCounter
// // // //               label="Infants ( < 2 years)"
// // // //               count={section.infantCount}
// // // //               increment={() => handleIncrement(index, "infantCount")}
// // // //               decrement={() => handleDecrement(index, "infantCount")}
// // // //             />
// // // //           </div>
// // // //         </Dropdown>

// // // //         <Button
// // // //                             className="bg-primaryRed duration-300 h-12 w-12"
// // // //                             onClick={addSection}
// // // //                         >
// // // //                             <Plus />
// // // //                         </Button>
// // // //       </div>
// // // //       ))}

// // // //       <Button
// // // //         className="col-span-2 bg-primaryRed duration-300 capitalize"
// // // //         onClick={searchFlight}
// // // //         disabled={flightSearchLoading}
// // // //       >
// // // //         {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // // //       </Button>


// // // //     </div>
// // // //   );
// // // // };

// // // // export default MultiCityTab;



// // // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // import SelectInput from "@/components/components/input/SelectInput";
// // // // import { Button } from "@/components/ui/button";
// // // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // // import SubtractIcon from "@/assets/svg/SubtractIcon";
// // // // import PlusIcon from "@/assets/svg/PlusIcon";
// // // // import { useState } from "react";
// // // // import { toast } from "react-toastify";
// // // // import DateInput from "@/components/components/input/DateInput";
// // // // import { Plus, Trash } from "lucide-react";
// // // // import { ticketClasses } from "../../data/data.json";
// // // // import CityInput from "@/components/components/input/CityInput"; // Ensure CityInput supports multiple selections
// // // // import axiosInstance from "@/config/axios";

// // // // type DataItem = {
// // // //   value: string;
// // // //   label: React.ReactNode;
// // // //   city: {
// // // //     address: {
// // // //       cityCode: string;
// // // //       cityName: string;
// // // //       countryName: string;
// // // //     };
// // // //     name: string;
// // // //     iata: string;
// // // //     city: string;
// // // //     country: string;
// // // //   };
// // // // };

// // // // interface PassengerCounterProps {
// // // //   label: string;
// // // //   count: number;
// // // //   increment: () => void;
// // // //   decrement: () => void;
// // // // }

// // // // const PassengerCounter = ({
// // // //   label,
// // // //   count,
// // // //   increment,
// // // //   decrement,
// // // // }: PassengerCounterProps) => (
// // // //   <div className="flex justify-between items-center">
// // // //     <p className="text-sm font-medium">{label}</p>
// // // //     <div className="flex gap-3">
// // // //       <button
// // // //         className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// // // //         onClick={decrement}
// // // //       >
// // // //         <SubtractIcon stroke="#FFFFFF" />
// // // //       </button>
// // // //       <div className="w-[25px] h-[25px]">
// // // //         <p className="text-sm font-medium">{count}</p>
// // // //       </div>
// // // //       <button
// // // //         className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// // // //         onClick={increment}
// // // //       >
// // // //         <PlusIcon stroke="#FFFFFF" />
// // // //       </button>
// // // //     </div>
// // // //   </div>
// // // // );

// // // // interface Section {
// // // //   adultCount: number;
// // // //   childCount: number;
// // // //   infantCount: number;
// // // //   selectedCities: DataItem[]; // Added to hold selected cities
// // // // }

// // // // const MultiCityTab = () => {
// // // //   const [cityOptions, setCityOptions] = useState<DataItem[]>([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [sections, setSections] = useState<Section[]>([
// // // //     {
// // // //       adultCount: 0,
// // // //       childCount: 0,
// // // //       infantCount: 0,
// // // //       selectedCities: [],
// // // //     },
// // // //   ]);

// // // //   const totalPassengers = sections.reduce(
// // // //     (total, section) =>
// // // //       total + section.adultCount + section.childCount + section.infantCount,
// // // //     0
// // // //   );
// // // //   const maxPassengers = 9;

// // // //   const showErrorMessage = (message: string) => {
// // // //     toast.error(message);
// // // //   };

// // // //   const handleIncrement = (index: number, field: keyof Section) => {
// // // //     if (totalPassengers < maxPassengers) {
// // // //       setSections((prevSections) =>
// // // //         prevSections.map((section, i) =>
// // // //           i === index ? { ...section, [field]: section[field] + 1 } : section
// // // //         )
// // // //       );
// // // //     } else {
// // // //       showErrorMessage("Passenger limit is 9.");
// // // //     }
// // // //   };

// // // //   const handleDecrement = (index: number, field: keyof Section) => {
// // // //     setSections((prevSections) =>
// // // //       prevSections.map((section, i) =>
// // // //         i === index
// // // //           ? { ...section, [field]: Math.max(0, section[field] - 1) }
// // // //           : section
// // // //       )
// // // //     );
// // // //   };

// // // //   const addSection = () => {
// // // //     setSections((prevSections) => [
// // // //       ...prevSections,
// // // //       {
// // // //         adultCount: 0,
// // // //         childCount: 0,
// // // //         infantCount: 0,
// // // //         selectedCities: [], // Initialize selected cities for the new section
// // // //       },
// // // //     ]);
// // // //   };

// // // //   const removeSection = (index: number) => {
// // // //     if (sections.length > 1) {
// // // //       setSections((prevSections) => prevSections.filter((_, i) => i !== index));
// // // //     }
// // // //   };

// // // //   const fetchCityData = async (keyword: string) => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axiosInstance.get(
// // // //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // // //       );
// // // //       const accessToken = response?.data?.accessToken;
// // // //       if (accessToken) {
// // // //         localStorage.setItem("accessToken", JSON.stringify(accessToken));
// // // //       }
// // // //       const cityData = response?.data?.data?.map((item: any) => ({
// // // //         value: item?.iataCode,
// // // //         label: item?.address?.cityName || item?.name, // Display city name
// // // //         city: {
// // // //           address: {
// // // //             cityCode: item?.address?.cityCode,
// // // //             cityName: item?.address?.cityName,
// // // //             countryName: item?.address?.countryName,
// // // //           },
// // // //           name: item?.name,
// // // //         },
// // // //       }));
// // // //       setCityOptions(cityData);
// // // //     } catch (error) {
// // // //       showErrorMessage("No city found.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Handle city selection
// // // //   const handleCitySelect = (index: number, selectedCities: DataItem[]) => {
// // // //     setSections((prevSections) =>
// // // //       prevSections.map((section, i) =>
// // // //         i === index ? { ...section, selectedCities } : section
// // // //       )
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="flex flex-col gap-4 lg:mt-4 mt-2 items-center w-full">
// // // //       {sections.map((section, index) => (
// // // //         <div
// // // //           key={index}
// // // //           className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // // //         >
// // // //           <div className="flex lg:flex-row flex-col items-center gap-2">
// // // //             {/* Updated to handle multiple city selections */}
// // // //             <CityInput
// // // //               data={cityOptions}
// // // //               label="From where?"
// // // //               placeholder="Select Cities"
// // // //               onSearch={fetchCityData}
// // // //               loading={loading}
// // // //               onChange={(cities) => handleCitySelect(index, cities)} // Pass selected cities to handleCitySelect
// // // //               isMulti // Ensure CityInput supports multiple selections
// // // //             />
// // // //             <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // // //               <TransactionIcon size="10" stroke="#E5302f" />
// // // //             </div>
// // // //             <CityInput
// // // //               data={cityOptions}
// // // //               label="To where?"
// // // //               placeholder="Select Cities"
// // // //               onSearch={fetchCityData}
// // // //               loading={loading}
// // // //               onChange={(cities) => handleCitySelect(index, cities)} // Pass selected cities to handleCitySelect
// // // //               isMulti // Ensure CityInput supports multiple selections
// // // //             />
// // // //           </div>

// // // //           <DateInput labelText="Departure" />

// // // //           <SelectInput data={ticketClasses} label="Class" placeholder="Class" />

// // // //           <Dropdown
// // // //             label="Passengers"
// // // //             body={
// // // //               <div className="flex flex-col gap-3 py-2">
// // // //                 <PassengerCounter
// // // //                   label="Adults (< 12 years)"
// // // //                   count={section.adultCount}
// // // //                   increment={() => handleIncrement(index, "adultCount")}
// // // //                   decrement={() => handleDecrement(index, "adultCount")}
// // // //                 />
// // // //                 <PassengerCounter
// // // //                   label="Children (2 - 12 years)"
// // // //                   count={section.childCount}
// // // //                   increment={() => handleIncrement(index, "childCount")}
// // // //                   decrement={() => handleDecrement(index, "childCount")}
// // // //                 />
// // // //                 <PassengerCounter
// // // //                   label="Infants (< 2 years)"
// // // //                   count={section.infantCount}
// // // //                   increment={() => handleIncrement(index, "infantCount")}
// // // //                   decrement={() => handleDecrement(index, "infantCount")}
// // // //                 />
// // // //               </div>
// // // //             }
// // // //           />
// // // //           <div className="flex flex-col gap-2">
// // // //             <h4>ADD</h4>
// // // //             <Button
// // // //               className="bg-primaryRed duration-300 h-12 w-12"
// // // //               onClick={addSection}
// // // //             >
// // // //               <Plus />
// // // //             </Button>
// // // //             {/* {sections.length > 1 && index > 0 && (
// // // //               <Button
// // // //                 className="bg-primaryRed duration-300 h-12 w-12"
// // // //                 onClick={() => removeSection(index)}
// // // //               >
// // // //                 <Trash />
// // // //               </Button>
// // // //             )} */}
// // // //           </div>
// // // //         </div>
// // // //       ))}

// // // //       <Button className="bg-primaryRed duration-300">Search</Button>

// // // //     </div>
// // // //   );
// // // // };

// // // // export default MultiCityTab;






// // // // import React, { useState, useCallback, useEffect } from "react";
// // // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // import { format } from "date-fns";
// // // // import SelectInput from "@/components/components/input/SelectInput";
// // // // import { Button } from "@/components/ui/button";
// // // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // // import { toast } from "react-toastify";
// // // // import axiosInstance from "@/config/axios";
// // // // import { ticketClasses } from "../../data/data.json";
// // // // import CityInput from "@/components/components/input/CityInput";
// // // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //     PASSENGER_LIMIT,
// // // //     NO_CITY_MESSAGE,
// // // //     // NO_FLIGHT_MESSAGE,
// // // //     PASSENGER_LIMIT_MESSAGE,
// // // //     //   INFANT_EXCEED_ADULT_MESSAGE,
// // // // } from "@/config/api";
// // // // import DateInput from "@/components/components/input/DateInput";
// // // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // // import { Plus } from "lucide-react";

// // // // type DataItem = {
// // // //     value: string;
// // // //     label: React.ReactNode;
// // // //     city: {
// // // //         address: {
// // // //             cityCode?: string;
// // // //             cityName?: string;
// // // //             countryName?: string;
// // // //         };
// // // //         name: string;
// // // //         iata: string;
// // // //         city: string;
// // // //         country: string;
// // // //     };
// // // // };

// // // // interface Section {
// // // //     adultCount: number;
// // // //     childCount: number;
// // // //     infantCount: number;
// // // // }

// // // // const MultiCityTab = () => {
// // // //     const navigate = useNavigate();

// // // //     // Initialize sections with at least one adult
// // // //     const [sections, setSections] = useState<Section[]>([
// // // //         {
// // // //             adultCount: 1,
// // // //             childCount: 0,
// // // //             infantCount: 0,
// // // //         },
// // // //     ]);

// // // //     const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
// // // //     const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // // //     const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // // //     const [departureLoading, setDepartureLoading] = useState(false);
// // // //     const [arrivalLoading, setArrivalLoading] = useState(false);

// // // //     const [departureCityInput, setDepartureCityInput] = useState('');
// // // //     const [arrivalCityInput, setArrivalCityInput] = useState('');
// // // //     const [departureCity, setDepartureCity] = useState("");
// // // //     const [arrivalCity, setArrivalCity] = useState("");
// // // //     const [departureDate, setDepartureDate] = useState(new Date());
// // // //     const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // // //     const showErrorMessage = useCallback((message: string) => {
// // // //         toast.error(message);
// // // //     }, []);

// // // //     // Calculate total passengers across all sections
// // // //     const totalPassengers = sections.reduce(
// // // //         (sum, section) => sum + section.adultCount + section.childCount + section.infantCount,
// // // //         0
// // // //     );

// // // //     const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // // //     const handleIncrement = (index: number, field: keyof Section) => {
// // // //         if (totalPassengers < maxPassengers) {
// // // //             setSections((prevSections) =>
// // // //                 prevSections.map((section, i) =>
// // // //                     i === index
// // // //                         ? { ...section, [field]: section[field] + 1 }
// // // //                         : section
// // // //                 )
// // // //             );
// // // //         } else {
// // // //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // //         }
// // // //     };

// // // //     const handleDecrement = (index: number, field: keyof Section) => {
// // // //         setSections((prevSections) =>
// // // //             prevSections.map((section, i) =>
// // // //                 i === index
// // // //                     ? { ...section, [field]: Math.max(0, section[field] - 1) }
// // // //                     : section
// // // //             )
// // // //         );
// // // //     };

// // // //     // Ensure infants do not exceed adults in each section
// // // //     useEffect(() => {
// // // //         setSections((prevSections) =>
// // // //             prevSections.map((section) => {
// // // //                 if (section.infantCount > section.adultCount) {
// // // //                     return { ...section, infantCount: section.adultCount };
// // // //                 }
// // // //                 return section;
// // // //             })
// // // //         );
// // // //     }, [sections]);

// // // //     const useDebounce = <T,>(value: T, delay: number): T => {
// // // //         const [debouncedValue, setDebouncedValue] = useState(value);

// // // //         useEffect(() => {
// // // //             const handler = setTimeout(() => {
// // // //                 setDebouncedValue(value);
// // // //             }, delay);

// // // //             return () => {
// // // //                 clearTimeout(handler);
// // // //             };
// // // //         }, [value, delay]);

// // // //         return debouncedValue;
// // // //     };

// // // //     const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // // //     const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // // //     const addSection = () => {
// // // //         setSections((prevSections) => [
// // // //             ...prevSections,
// // // //             {
// // // //                 adultCount: 1, // Start with at least 1 adult
// // // //                 childCount: 0,
// // // //                 infantCount: 0,
// // // //             },
// // // //         ]);
// // // //     };

// // // //     const fetchCityData = async (
// // // //         keyword: string,
// // // //         setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // // //         setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // // //     ) => {
// // // //         if (keyword.length < 2) return;

// // // //         setLoading(true);
// // // //         try {
// // // //             const response = await axiosInstance.get(
// // // //                 `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // // //             );

// // // //             const cityData = response.data?.map((item: any) => ({
// // // //                 value: item?.iataCode,
// // // //                 label: `${item?.name}`,
// // // //                 city: {
// // // //                     address: {
// // // //                         cityCode: item?.address?.cityCode,
// // // //                         cityName: item?.address?.cityName,
// // // //                         countryName: item?.address?.countryName,
// // // //                     },
// // // //                     name: item?.name,
// // // //                     iata: item?.iata,
// // // //                     city: item?.city,
// // // //                     country: item?.country,
// // // //                 },
// // // //             }));

// // // //             if (cityData && cityData.length > 0) {
// // // //                 setCityOptions(cityData);
// // // //             } else {
// // // //                 showErrorMessage(NO_CITY_MESSAGE);
// // // //             }
// // // //         } catch (error) {
// // // //             showErrorMessage(NO_CITY_MESSAGE);
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     useEffect(() => {
// // // //         if (debouncedDepartureCity) {
// // // //             fetchCityData(debouncedDepartureCity, setDepartureCityOptions, setDepartureLoading);
// // // //         }
// // // //     }, [debouncedDepartureCity]);

// // // //     useEffect(() => {
// // // //         if (debouncedArrivalCity) {
// // // //             fetchCityData(debouncedArrivalCity, setArrivalCityOptions, setArrivalLoading);
// // // //         }
// // // //     }, [debouncedArrivalCity]);

// // // //     const searchFlight = useCallback(async () => {
// // // //         setFlightSearchLoading(true); // Start loading
// // // //         const apiUrl = 'https://test.ffsdtravels.com/api/flight/search/offer';

// // // //         // Aggregate passenger counts across all sections
// // // //         const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // // //         const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // // //         const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // // //         // Map through sections to build originDestinations
// // // //         const originDestinations = sections.map((section, index) => ({
// // // //             id: `${index + 1}`,
// // // //             originLocationCode: departureCity,
// // // //             destinationLocationCode: arrivalCity,
// // // //             departureDateTimeRange: {
// // // //                 date: format(departureDate, "yyyy-MM-dd"),  // Adjust for each section if needed
// // // //                 time: "10:00:00"  // Static for now, make dynamic if required
// // // //             }
// // // //         }));

// // // //         // Ensure last segment access (for example: displaying it or processing further)
// // // //         // const lastSegment = originDestinations[originDestinations.length - 1];

// // // //         const payload = {
// // // //             currencyCode: "NGN",
// // // //             originDestinations,  // Use the generated originDestinations array
// // // //             travelers: [
// // // //                 ...Array.from({ length: totalAdults }, (_, i) => ({
// // // //                     id: `${i + 1}`,
// // // //                     travelerType: "ADULT",
// // // //                     fareOptions: ["STANDARD"]
// // // //                 })),
// // // //                 ...Array.from({ length: totalChildren }, (_, i) => ({
// // // //                     id: `${totalAdults + i + 1}`,
// // // //                     travelerType: "CHILD",
// // // //                     fareOptions: ["STANDARD"]
// // // //                 })),
// // // //                 ...Array.from({ length: totalInfants }, (_, i) => ({
// // // //                     id: `${totalAdults + totalChildren + i + 1}`,
// // // //                     travelerType: "HELD_INFANT",
// // // //                     associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // // //                     fareOptions: ["STANDARD"]
// // // //                 }))
// // // //             ],
// // // //             sources: ["GDS"],
// // // //             searchCriteria: {
// // // //                 maxFlightOffers: 50,  // Adjust as needed
// // // //                 pricingOptions: {
// // // //                     fareType: ["PUBLISHED"]
// // // //                 },
// // // //                 flightFilters: {
// // // //                     cabinRestrictions: [
// // // //                         {
// // // //                             cabin: selectedClass.toUpperCase(),
// // // //                             coverage: "MOST_SEGMENTS",
// // // //                             originDestinationIds: originDestinations.map(dest => dest.id) // Use IDs from all sections
// // // //                         }
// // // //                     ]
// // // //                 }
// // // //             },
// // // //             additionalInformation: {
// // // //                 brandedFares: true
// // // //             }
// // // //         };

// // // //         try {
// // // //             const response = await fetch(apiUrl, {
// // // //                 method: 'POST',
// // // //                 headers: {
// // // //                     'Content-Type': 'application/json',
// // // //                     'Authorization': `Bearer YOUR_API_TOKEN`,  // Replace with your actual token
// // // //                 },
// // // //                 body: JSON.stringify(payload)
// // // //             });

// // // //             if (!response.ok) {
// // // //                 throw new Error('Network response was not ok');
// // // //             }

// // // //             const data = await response.json();
// // // //             console.log("Flight data", data.data);

// // // //             navigate("/MultiCitySearch", {
// // // //                 state: {
// // // //                     searchResults: data.data,
// // // //                     searchParams: {
// // // //                         departureCity,
// // // //                         arrivalCity,
// // // //                         departureDate,
// // // //                         adultCount: totalAdults,
// // // //                         childCount: totalChildren,
// // // //                         infantCount: totalInfants,
// // // //                         selectedClass,
// // // //                     },
// // // //                 }
// // // //             });

// // // //         } catch (error) {
// // // //             console.error('Error fetching flight data:', error);
// // // //             showErrorMessage('Failed to fetch flight data.');  // Show a generic error message
// // // //         } finally {
// // // //             setFlightSearchLoading(false);  // End loading
// // // //         }
// // // //     }, [
// // // //         departureCity,
// // // //         arrivalCity,
// // // //         departureDate,
// // // //         sections,
// // // //         selectedClass,
// // // //         showErrorMessage,
// // // //         navigate
// // // //     ]);

// // // //     const handleDepartureDateChange = useCallback(
// // // //         (date: Date | undefined) => setDepartureDate(date || new Date()),
// // // //         []
// // // //     );

// // // //     const handleDepartureCityChange = (value: string, city: DataItem) => {
// // // //         setDepartureCity(city.city.iata); // Update with the airport code
// // // //         setDepartureCityInput(city.city.iata); // Display city and airport code in the input
// // // //         console.log(value)
// // // //     };

// // // //     const handleArrivalCityChange = (value: string, city: DataItem) => {
// // // //         setArrivalCity(city.city.iata); // Update with the airport code
// // // //         setArrivalCityInput(city.city.iata); // Display city and airport code in the input
// // // //         console.log(value)
// // // //     };

// // // //     return (
// // // //         <div className="flex flex-col gap-5 w-full items-center">
// // // //             {sections.map((section, index) => (
// // // //                 <div
// // // //                     key={index}
// // // //                     className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // // //                 >
// // // //                     <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // // //                         <CityInput
// // // //                             value={departureCityInput}
// // // //                             data={departureCityOptions}
// // // //                             label="From where?"
// // // //                             placeholder="City"
// // // //                             onSearch={setDepartureCityInput}
// // // //                             loading={departureLoading}
// // // //                             onChange={handleDepartureCityChange}
// // // //                         />

// // // //                         <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // // //                             <TransactionIcon size="10" stroke="#E5302f" />
// // // //                         </div>

// // // //                         <CityInput
// // // //                             value={arrivalCityInput}
// // // //                             data={arrivalCityOptions}
// // // //                             label="To where?"
// // // //                             placeholder="City"
// // // //                             onSearch={setArrivalCityInput}
// // // //                             loading={arrivalLoading}
// // // //                             onChange={handleArrivalCityChange}
// // // //                         />
// // // //                     </div>

// // // //                     <DateInput labelText="Departure" onChange={handleDepartureDateChange} />

// // // //                     <SelectInput
// // // //                         data={ticketClasses}
// // // //                         label="Class"
// // // //                         placeholder="Class"
// // // //                         value={selectedClass}
// // // //                         onChange={setSelectedClass}
// // // //                     />

// // // //                     <Dropdown label="Passengers" btnText="Add passengers">
// // // //                         <div className="flex flex-col gap-3 py-2">
// // // //                             <PassengerCounter
// // // //                                 label="Adults ( ≥ 12 years)"
// // // //                                 count={section.adultCount}
// // // //                                 increment={() => handleIncrement(index, "adultCount")}
// // // //                                 decrement={() => handleDecrement(index, "adultCount")}
// // // //                             />
// // // //                             <PassengerCounter
// // // //                                 label="Children ( 2 - 12 years)"
// // // //                                 count={section.childCount}
// // // //                                 increment={() => handleIncrement(index, "childCount")}
// // // //                                 decrement={() => handleDecrement(index, "childCount")}
// // // //                             />
// // // //                             <PassengerCounter
// // // //                                 label="Infants ( < 2 years)"
// // // //                                 count={section.infantCount}
// // // //                                 increment={() => handleIncrement(index, "infantCount")}
// // // //                                 decrement={() => handleDecrement(index, "infantCount")}
// // // //                             />
// // // //                         </div>
// // // //                     </Dropdown>

// // // //                     {index === sections.length - 1 && ( // Show add button only on the last section
// // // //                         <Button
// // // //                             className="bg-primaryRed duration-300 h-12 w-12"
// // // //                             onClick={addSection}
// // // //                         >
// // // //                             <Plus />
// // // //                         </Button>
// // // //                     )}
// // // //                 </div>
// // // //             ))}

// // // //             <Button
// // // //                 className="col-span-2 bg-primaryRed duration-300 capitalize"
// // // //                 onClick={searchFlight}
// // // //                 disabled={flightSearchLoading}
// // // //             >
// // // //                 {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // // //             </Button>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default MultiCityTab;



// // // // import React, { useState, useCallback, useEffect } from "react";
// // // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // import { format } from "date-fns";
// // // // import SelectInput from "@/components/components/input/SelectInput";
// // // // import { Button } from "@/components/ui/button";
// // // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // // import { toast } from "react-toastify";
// // // // import axiosInstance from "@/config/axios";
// // // // import { ticketClasses } from "../../data/data.json";
// // // // import CityInput from "@/components/components/input/CityInput";
// // // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //     PASSENGER_LIMIT,
// // // //     NO_CITY_MESSAGE,
// // // //     // NO_FLIGHT_MESSAGE,
// // // //     PASSENGER_LIMIT_MESSAGE,
// // // //     //   INFANT_EXCEED_ADULT_MESSAGE,
// // // // } from "@/config/api";
// // // // import DateInput from "@/components/components/input/DateInput";
// // // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // // import { Plus } from "lucide-react";

// // // // type DataItem = {
// // // //     value: string;
// // // //     label: React.ReactNode;
// // // //     city: {
// // // //         address: {
// // // //             cityCode?: string;
// // // //             cityName?: string;
// // // //             countryName?: string;
// // // //         };
// // // //         name: string;
// // // //         iata: string;
// // // //         city: string;
// // // //         country: string;
// // // //     };
// // // // };

// // // // interface Section {
// // // //     adultCount: number;
// // // //     childCount: number;
// // // //     infantCount: number;
// // // // }

// // // // const MultiCityTab = () => {
// // // //     const navigate = useNavigate();

// // // //     // Initialize sections with at least one adult
// // // //     const [sections, setSections] = useState<Section[]>([
// // // //         {
// // // //             adultCount: 1,
// // // //             childCount: 0,
// // // //             infantCount: 0,
// // // //         },
// // // //     ]);

// // // //     const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
// // // //     const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // // //     const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // // //     const [departureLoading, setDepartureLoading] = useState(false);
// // // //     const [arrivalLoading, setArrivalLoading] = useState(false);

// // // //     const [departureCityInput, setDepartureCityInput] = useState('');
// // // //     const [arrivalCityInput, setArrivalCityInput] = useState('');
// // // //     const [departureCity, setDepartureCity] = useState("");
// // // //     const [arrivalCity, setArrivalCity] = useState("");
// // // //     const [departureDate, setDepartureDate] = useState(new Date());
// // // //     const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // // //     const showErrorMessage = useCallback((message: string) => {
// // // //         toast.error(message);
// // // //     }, []);

// // // //     // Calculate total passengers across all sections
// // // //     const totalPassengers = sections.reduce(
// // // //         (sum, section) => sum + section.adultCount + section.childCount + section.infantCount,
// // // //         0
// // // //     );

// // // //     const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // // //     const handleIncrement = (index: number, field: keyof Section) => {
// // // //         if (totalPassengers < maxPassengers) {
// // // //             setSections((prevSections) =>
// // // //                 prevSections.map((section, i) =>
// // // //                     i === index
// // // //                         ? { ...section, [field]: section[field] + 1 }
// // // //                         : section
// // // //                 )
// // // //             );
// // // //         } else {
// // // //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // //         }
// // // //     };

// // // //     const handleDecrement = (index: number, field: keyof Section) => {
// // // //         setSections((prevSections) =>
// // // //             prevSections.map((section, i) =>
// // // //                 i === index
// // // //                     ? { ...section, [field]: Math.max(0, section[field] - 1) }
// // // //                     : section
// // // //             )
// // // //         );
// // // //     };

// // // //     // Ensure infants do not exceed adults in each section
// // // //     useEffect(() => {
// // // //         setSections((prevSections) =>
// // // //             prevSections.map((section) => {
// // // //                 if (section.infantCount > section.adultCount) {
// // // //                     return { ...section, infantCount: section.adultCount };
// // // //                 }
// // // //                 return section;
// // // //             })
// // // //         );
// // // //     }, [sections]);

// // // //     const useDebounce = <T,>(value: T, delay: number): T => {
// // // //         const [debouncedValue, setDebouncedValue] = useState(value);

// // // //         useEffect(() => {
// // // //             const handler = setTimeout(() => {
// // // //                 setDebouncedValue(value);
// // // //             }, delay);

// // // //             return () => {
// // // //                 clearTimeout(handler);
// // // //             };
// // // //         }, [value, delay]);

// // // //         return debouncedValue;
// // // //     };

// // // //     const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // // //     const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // // //     const addSection = () => {
// // // //         setSections((prevSections) => [
// // // //             ...prevSections,
// // // //             {
// // // //                 adultCount: 1, // Start with at least 1 adult
// // // //                 childCount: 0,
// // // //                 infantCount: 0,
// // // //             },
// // // //         ]);
// // // //     };

// // // //     const fetchCityData = async (
// // // //         keyword: string,
// // // //         setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // // //         setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // // //     ) => {
// // // //         if (keyword.length < 2) return;

// // // //         setLoading(true);
// // // //         try {
// // // //             const response = await axiosInstance.get(
// // // //                 `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // // //             );

// // // //             const cityData = response.data?.map((item: any) => ({
// // // //                 value: item?.iataCode,
// // // //                 label: `${item?.name}`,
// // // //                 city: {
// // // //                     address: {
// // // //                         cityCode: item?.address?.cityCode,
// // // //                         cityName: item?.address?.cityName,
// // // //                         countryName: item?.address?.countryName,
// // // //                     },
// // // //                     name: item?.name,
// // // //                     iata: item?.iata,
// // // //                     city: item?.city,
// // // //                     country: item?.country,
// // // //                 },
// // // //             }));

// // // //             if (cityData && cityData.length > 0) {
// // // //                 setCityOptions(cityData);
// // // //             } else {
// // // //                 showErrorMessage(NO_CITY_MESSAGE);
// // // //             }
// // // //         } catch (error) {
// // // //             showErrorMessage(NO_CITY_MESSAGE);
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     useEffect(() => {
// // // //         if (debouncedDepartureCity) {
// // // //             fetchCityData(debouncedDepartureCity, setDepartureCityOptions, setDepartureLoading);
// // // //         }
// // // //     }, [debouncedDepartureCity]);

// // // //     useEffect(() => {
// // // //         if (debouncedArrivalCity) {
// // // //             fetchCityData(debouncedArrivalCity, setArrivalCityOptions, setArrivalLoading);
// // // //         }
// // // //     }, [debouncedArrivalCity]);

// // // //     const searchFlight = useCallback(async () => {
// // // //         setFlightSearchLoading(true); // Start loading
// // // //         const apiUrl = 'https://test.ffsdtravels.com/api/flight/search/offer';

// // // //         // Aggregate passenger counts across all sections
// // // //         const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // // //         const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // // //         const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // // //         // Map through sections to build originDestinations
// // // //         const originDestinations = sections.map((section, index) => ({
// // // //             id: `${index + 1}`,
// // // //             originLocationCode: departureCity,
// // // //             destinationLocationCode: arrivalCity,
// // // //             departureDateTimeRange: {
// // // //                 date: format(departureDate, "yyyy-MM-dd"),  // Adjust for each section if needed
// // // //                 time: "10:00:00"  // Static for now, make dynamic if required
// // // //             }
// // // //         }));

// // // //         // Ensure last segment access (for example: displaying it or processing further)
// // // //         // const lastSegment = originDestinations[originDestinations.length - 1];

// // // //         const payload = {
// // // //             currencyCode: "NGN",
// // // //             originDestinations,  // Use the generated originDestinations array
// // // //             travelers: [
// // // //                 ...Array.from({ length: totalAdults }, (_, i) => ({
// // // //                     id: `${i + 1}`,
// // // //                     travelerType: "ADULT",
// // // //                     fareOptions: ["STANDARD"]
// // // //                 })),
// // // //                 ...Array.from({ length: totalChildren }, (_, i) => ({
// // // //                     id: `${totalAdults + i + 1}`,
// // // //                     travelerType: "CHILD",
// // // //                     fareOptions: ["STANDARD"]
// // // //                 })),
// // // //                 ...Array.from({ length: totalInfants }, (_, i) => ({
// // // //                     id: `${totalAdults + totalChildren + i + 1}`,
// // // //                     travelerType: "HELD_INFANT",
// // // //                     associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // // //                     fareOptions: ["STANDARD"]
// // // //                 }))
// // // //             ],
// // // //             sources: ["GDS"],
// // // //             searchCriteria: {
// // // //                 maxFlightOffers: 50,  // Adjust as needed
// // // //                 pricingOptions: {
// // // //                     fareType: ["PUBLISHED"]
// // // //                 },
// // // //                 flightFilters: {
// // // //                     cabinRestrictions: [
// // // //                         {
// // // //                             cabin: selectedClass.toUpperCase(),
// // // //                             coverage: "MOST_SEGMENTS",
// // // //                             originDestinationIds: originDestinations.map(dest => dest.id) // Use IDs from all sections
// // // //                         }
// // // //                     ]
// // // //                 }
// // // //             },
// // // //             additionalInformation: {
// // // //                 brandedFares: true
// // // //             }
// // // //         };

// // // //         try {
// // // //             const response = await fetch(apiUrl, {
// // // //                 method: 'POST',
// // // //                 headers: {
// // // //                     'Content-Type': 'application/json',
// // // //                     'Authorization': `Bearer YOUR_API_TOKEN`,  // Replace with your actual token
// // // //                 },
// // // //                 body: JSON.stringify(payload)
// // // //             });

// // // //             if (!response.ok) {
// // // //                 throw new Error('Network response was not ok');
// // // //             }

// // // //             const data = await response.json();
// // // //             console.log("Flight data", data.data);

// // // //             navigate("/MultiCitySearch", {
// // // //                 state: {
// // // //                     searchResults: data.data,
// // // //                     searchParams: {
// // // //                         departureCity,
// // // //                         arrivalCity,
// // // //                         departureDate,
// // // //                         adultCount: totalAdults,
// // // //                         childCount: totalChildren,
// // // //                         infantCount: totalInfants,
// // // //                         selectedClass,
// // // //                     },
// // // //                 }
// // // //             });

// // // //         } catch (error) {
// // // //             console.error('Error fetching flight data:', error);
// // // //             showErrorMessage('Failed to fetch flight data.');  // Show a generic error message
// // // //         } finally {
// // // //             setFlightSearchLoading(false);  // End loading
// // // //         }
// // // //     }, [
// // // //         departureCity,
// // // //         arrivalCity,
// // // //         departureDate,
// // // //         sections,
// // // //         selectedClass,
// // // //         showErrorMessage,
// // // //         navigate
// // // //     ]);

// // // //     const handleDepartureDateChange = useCallback(
// // // //         (date: Date | undefined) => setDepartureDate(date || new Date()),
// // // //         []
// // // //     );

// // // //     const handleDepartureCityChange = (value: string, city: DataItem) => {
// // // //         setDepartureCity(city.city.iata); // Update with the airport code
// // // //         setDepartureCityInput(city.city.iata); // Display city and airport code in the input
// // // //         console.log(value)
// // // //     };

// // // //     const handleArrivalCityChange = (value: string, city: DataItem) => {
// // // //         setArrivalCity(city.city.iata); // Update with the airport code
// // // //         setArrivalCityInput(city.city.iata); // Display city and airport code in the input
// // // //         console.log(value)
// // // //     };

// // // //     return (
// // // //         <div className="flex flex-col gap-5 w-full items-center">
// // // //             {sections.map((section, index) => (
// // // //                 <div
// // // //                     key={index}
// // // //                     className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // // //                 >
// // // //                     <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // // //                         <CityInput
// // // //                             value={departureCityInput}
// // // //                             data={departureCityOptions}
// // // //                             label="From where?"
// // // //                             placeholder="City"
// // // //                             onSearch={setDepartureCityInput}
// // // //                             loading={departureLoading}
// // // //                             onChange={handleDepartureCityChange}
// // // //                         />

// // // //                         <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // // //                             <TransactionIcon size="10" stroke="#E5302f" />
// // // //                         </div>

// // // //                         <CityInput
// // // //                             value={arrivalCityInput}
// // // //                             data={arrivalCityOptions}
// // // //                             label="To where?"
// // // //                             placeholder="City"
// // // //                             onSearch={setArrivalCityInput}
// // // //                             loading={arrivalLoading}
// // // //                             onChange={handleArrivalCityChange}
// // // //                         />
// // // //                     </div>

// // // //                     <DateInput labelText="Departure" onChange={handleDepartureDateChange} />

// // // //                     <SelectInput
// // // //                         data={ticketClasses}
// // // //                         label="Class"
// // // //                         placeholder="Class"
// // // //                         value={selectedClass}
// // // //                         onChange={setSelectedClass}
// // // //                     />

// // // //                     <Dropdown label="Passengers" btnText="Add passengers">
// // // //                         <div className="flex flex-col gap-3 py-2">
// // // //                             <PassengerCounter
// // // //                                 label="Adults ( ≥ 12 years)"
// // // //                                 count={section.adultCount}
// // // //                                 increment={() => handleIncrement(index, "adultCount")}
// // // //                                 decrement={() => handleDecrement(index, "adultCount")}
// // // //                             />
// // // //                             <PassengerCounter
// // // //                                 label="Children ( 2 - 12 years)"
// // // //                                 count={section.childCount}
// // // //                                 increment={() => handleIncrement(index, "childCount")}
// // // //                                 decrement={() => handleDecrement(index, "childCount")}
// // // //                             />
// // // //                             <PassengerCounter
// // // //                                 label="Infants ( < 2 years)"
// // // //                                 count={section.infantCount}
// // // //                                 increment={() => handleIncrement(index, "infantCount")}
// // // //                                 decrement={() => handleDecrement(index, "infantCount")}
// // // //                             />
// // // //                         </div>
// // // //                     </Dropdown>



// // // //                     {index === sections.length - 1 && ( // Show add button only on the last section
// // // //                         <Button
// // // //                             className="bg-primaryRed duration-300 h-12 w-12"
// // // //                             onClick={addSection}
// // // //                         >
// // // //                             <Plus />
// // // //                         </Button>
// // // //                     )}
// // // //                 </div>
// // // //             ))}

// // // //             <Button
// // // //                 className="col-span-2 bg-primaryRed duration-300 capitalize"
// // // //                 onClick={searchFlight}
// // // //                 disabled={flightSearchLoading}
// // // //             >
// // // //                 {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // // //             </Button>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default MultiCityTab;




// // // // {index === sections.length - 1 && (
// // // //   <Button
// // // //       className="bg-primaryRed duration-300 h-12"
// // // //       onClick={addSection}
// // // //   >
// // // //     Add Section
// // // //       {/* <Plus /> */}
// // // //   </Button>
// // // // )}





// // // // import React, { useState, useCallback, useEffect } from "react";
// // // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // import { format } from "date-fns";
// // // // import SelectInput from "@/components/components/input/SelectInput";
// // // // import { Button } from "@/components/ui/button";
// // // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // // import { toast } from "react-toastify";
// // // // import axiosInstance from "@/config/axios";
// // // // import { ticketClasses } from "../../data/data.json";
// // // // import CityInput from "@/components/components/input/CityInput";
// // // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // // import { useNavigate } from "react-router-dom";
// // // // import {
// // // //   PASSENGER_LIMIT,
// // // //   NO_CITY_MESSAGE,
// // // //   PASSENGER_LIMIT_MESSAGE,
// // // // } from "@/config/api";
// // // // import DateInput from "@/components/components/input/DateInput";
// // // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // // import { Trash2 } from "lucide-react"; // Import Trash icon

// // // // type DataItem = {
// // // //   value: string;
// // // //   label: React.ReactNode;
// // // //   city: {
// // // //     address: {
// // // //       cityCode?: string;
// // // //       cityName?: string;
// // // //       countryName?: string;
// // // //     };
// // // //     name: string;
// // // //     iata: string;
// // // //     city: string;
// // // //     country: string;
// // // //   };
// // // // };

// // // // interface Section {
// // // //   departureCityInput: string;
// // // //   departureCity: string;
// // // //   arrivalCityInput: string;
// // // //   arrivalCity: string;
// // // //   departureDate: Date;
// // // //   adultCount: number;
// // // //   childCount: number;
// // // //   infantCount: number;
// // // //   selectedClass: string;
// // // // }

// // // // const MultiCityTab = () => {
// // // //   const navigate = useNavigate();

// // // //   // Initialize sections with at least one adult and flight details
// // // //   const [sections, setSections] = useState<Section[]>([
// // // //     {
// // // //       departureCityInput: "",
// // // //       departureCity: "",
// // // //       arrivalCityInput: "",
// // // //       arrivalCity: "",
// // // //       departureDate: new Date(),
// // // //       adultCount: 1,
// // // //       childCount: 0,
// // // //       infantCount: 0,
// // // //       selectedClass: ticketClasses[0].value,
// // // //     },
// // // //   ]);

// // // //   // Initialize options and loading states for each section
// // // //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[][]>([[]]);
// // // //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[][]>([[]]);
// // // //   const [departureLoading, setDepartureLoading] = useState<boolean[]>([false]);
// // // //   const [arrivalLoading, setArrivalLoading] = useState<boolean[]>([false]);

// // // //   const [flightSearchLoading, setFlightSearchLoading] = useState(false);

// // // //   const showErrorMessage = useCallback((message: string) => {
// // // //     toast.error(message);
// // // //   }, []);

// // // //   // Calculate total passengers across all sections
// // // //   const totalPassengers = sections.reduce(
// // // //     (sum, section) =>
// // // //       sum + section.adultCount + section.childCount + section.infantCount,
// // // //     0
// // // //   );

// // // //   const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // // //   const handleIncrement = (index: number, field: keyof Section) => {
// // // //     if (totalPassengers < maxPassengers) {
// // // //       setSections((prevSections) =>
// // // //         prevSections.map((section, i) =>
// // // //           i === index ? { ...section, [field]: section[field] + 1 } : section
// // // //         )
// // // //       );
// // // //     } else {
// // // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // // //     }
// // // //   };

// // // //   const handleDecrement = (index: number, field: keyof Section) => {
// // // //     setSections((prevSections) =>
// // // //       prevSections.map((section, i) =>
// // // //         i === index
// // // //           ? { ...section, [field]: Math.max(0, section[field] - 1) }
// // // //           : section
// // // //       )
// // // //     );
// // // //   };

// // // //   // Ensure infants do not exceed adults in each section
// // // //   useEffect(() => {
// // // //     setSections((prevSections) =>
// // // //       prevSections.map((section) => {
// // // //         if (section.infantCount > section.adultCount) {
// // // //           return { ...section, infantCount: section.adultCount };
// // // //         }
// // // //         return section;
// // // //       })
// // // //     );
// // // //   }, [sections]);

// // // //   // Debounce Hook
// // // //   const useDebounce = <T,>(value: T, delay: number): T => {
// // // //     const [debouncedValue, setDebouncedValue] = useState(value);

// // // //     useEffect(() => {
// // // //       const handler = setTimeout(() => {
// // // //         setDebouncedValue(value);
// // // //       }, delay);

// // // //       return () => {
// // // //         clearTimeout(handler);
// // // //       };
// // // //     }, [value, delay]);

// // // //     return debouncedValue;
// // // //   };

// // // //   // Debounce inputs for each section
// // // //   const debouncedDepartureCity = sections.map((section) =>
// // // //     useDebounce(section.departureCityInput, 300)
// // // //   );
// // // //   const debouncedArrivalCity = sections.map((section) =>
// // // //     useDebounce(section.arrivalCityInput, 300)
// // // //   );

// // // //   const handleCitySearch = (index: number, type: "departure" | "arrival", value: string) => {
// // // //     if (type === "departure") {
// // // //       const newSections = [...sections];
// // // //       newSections[index].departureCityInput = value;
// // // //       setSections(newSections);
// // // //     } else {
// // // //       const newSections = [...sections];
// // // //       newSections[index].arrivalCityInput = value;
// // // //       setSections(newSections);
// // // //     }
// // // //   };

// // // //   const handleCityChange = (index: number, type: "departure" | "arrival", value: string, city: DataItem) => {
// // // //     const newSections = [...sections];
// // // //     if (type === "departure") {
// // // //       newSections[index].departureCity = city.city.iata;
// // // //       newSections[index].departureCityInput = city.city.iata;
// // // //     } else {
// // // //       newSections[index].arrivalCity = city.city.iata;
// // // //       newSections[index].arrivalCityInput = city.city.iata;
// // // //     }
// // // //     setSections(newSections);
// // // //   };

// // // //   const handleDateChange = (index: number, date: Date | undefined) => {
// // // //     const newSections = [...sections];
// // // //     newSections[index].departureDate = date || new Date();
// // // //     setSections(newSections);
// // // //   };

// // // //   const handleClassChange = (index: number, value: string) => {
// // // //     const newSections = [...sections];
// // // //     newSections[index].selectedClass = value;
// // // //     setSections(newSections);
// // // //   };

// // // //   const addSection = () => {
// // // //     setSections((prevSections) => [
// // // //       ...prevSections,
// // // //       {
// // // //         departureCityInput: "",
// // // //         departureCity: "",
// // // //         arrivalCityInput: "",
// // // //         arrivalCity: "",
// // // //         departureDate: new Date(),
// // // //         adultCount: 1,
// // // //         childCount: 0,
// // // //         infantCount: 0,
// // // //         selectedClass: ticketClasses[0].value,
// // // //       },
// // // //     ]);
// // // //     setDepartureCityOptions([...departureCityOptions, []]);
// // // //     setArrivalCityOptions([...arrivalCityOptions, []]);
// // // //     setDepartureLoading([...departureLoading, false]);
// // // //     setArrivalLoading([...arrivalLoading, false]);
// // // //   };

// // // //   const deleteSection = (index: number) => {
// // // //     setSections((prevSections) => {
// // // //       if (prevSections.length === 1) {
// // // //         showErrorMessage("At least one section is required.");
// // // //         return prevSections;
// // // //       }
// // // //       const newSections = prevSections.filter((_, i) => i !== index);
// // // //       setDepartureCityOptions(departureCityOptions.filter((_, i) => i !== index));
// // // //       setArrivalCityOptions(arrivalCityOptions.filter((_, i) => i !== index));
// // // //       setDepartureLoading(departureLoading.filter((_, i) => i !== index));
// // // //       setArrivalLoading(arrivalLoading.filter((_, i) => i !== index));
// // // //       return newSections;
// // // //     });
// // // //   };

// // // //   const fetchCityData = async (
// // // //     keyword: string,
// // // //     setCityOptions: (data: DataItem[]) => void,
// // // //     setLoading: (loading: boolean) => void
// // // //   ) => {
// // // //     if (keyword.length < 2) return;

// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axiosInstance.get(
// // // //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // // //       );

// // // //       const cityData = response.data?.map((item: any) => ({
// // // //         value: item?.iataCode,
// // // //         label: `${item?.name}`,
// // // //         city: {
// // // //           address: {
// // // //             cityCode: item?.address?.cityCode,
// // // //             cityName: item?.address?.cityName,
// // // //             countryName: item?.address?.countryName,
// // // //           },
// // // //           name: item?.name,
// // // //           iata: item?.iata,
// // // //           city: item?.city,
// // // //           country: item?.country,
// // // //         },
// // // //       }));

// // // //       if (cityData && cityData.length > 0) {
// // // //         setCityOptions(cityData);
// // // //       } else {
// // // //         showErrorMessage(NO_CITY_MESSAGE);
// // // //       }
// // // //     } catch (error) {
// // // //       showErrorMessage(NO_CITY_MESSAGE);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     sections.forEach((section, index) => {
// // // //       if (debouncedDepartureCity[index]) {
// // // //         fetchCityData(
// // // //           debouncedDepartureCity[index],
// // // //           setDepartureCityOptionsForSection(index),
// // // //           setDepartureLoadingForSection(index)
// // // //         );
// // // //       }
// // // //     });
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [debouncedDepartureCity]);

// // // //   useEffect(() => {
// // // //     sections.forEach((section, index) => {
// // // //       if (debouncedArrivalCity[index]) {
// // // //         fetchCityData(
// // // //           debouncedArrivalCity[index],
// // // //           setArrivalCityOptionsForSection(index),
// // // //           setArrivalLoadingForSection(index)
// // // //         );
// // // //       }
// // // //     });
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [debouncedArrivalCity]);

// // // //   const setDepartureCityOptionsForSection = (index: number) => (data: DataItem[]) => {
// // // //     setDepartureCityOptions((prev) => {
// // // //       const newOptions = [...prev];
// // // //       newOptions[index] = data;
// // // //       return newOptions;
// // // //     });
// // // //   };

// // // //   const setArrivalCityOptionsForSection = (index: number) => (data: DataItem[]) => {
// // // //     setArrivalCityOptions((prev) => {
// // // //       const newOptions = [...prev];
// // // //       newOptions[index] = data;
// // // //       return newOptions;
// // // //     });
// // // //   };

// // // //   const setDepartureLoadingForSection = (index: number) => (loading: boolean) => {
// // // //     setDepartureLoading((prev) => {
// // // //       const newLoading = [...prev];
// // // //       newLoading[index] = loading;
// // // //       return newLoading;
// // // //     });
// // // //   };

// // // //   const setArrivalLoadingForSection = (index: number) => (loading: boolean) => {
// // // //     setArrivalLoading((prev) => {
// // // //       const newLoading = [...prev];
// // // //       newLoading[index] = loading;
// // // //       return newLoading;
// // // //     });
// // // //   };

// // // //   // Validate itinerary continuity
// // // //   useEffect(() => {
// // // //     for (let i = 0; i < sections.length - 1; i++) {
// // // //       if (sections[i].arrivalCity && sections[i + 1].departureCity) {
// // // //         if (sections[i].arrivalCity !== sections[i + 1].departureCity) {
// // // //           showErrorMessage(
// // // //             `Arrival city of section ${i + 1} should match departure city of section ${
// // // //               i + 2
// // // //             }.`
// // // //           );
// // // //           break;
// // // //         }
// // // //       }
// // // //     }
// // // //   }, [sections, showErrorMessage]);

// // // //   const searchFlight = useCallback(async () => {
// // // //     setFlightSearchLoading(true); // Start loading
// // // //     const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";

// // // //     // Aggregate passenger counts across all sections
// // // //     const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // // //     const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // // //     const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // // //     // Validate sections
// // // //     for (let i = 0; i < sections.length; i++) {
// // // //       const section = sections[i];
// // // //       if (!section.departureCity || !section.arrivalCity) {
// // // //         showErrorMessage("Please select both departure and arrival cities for all sections.");
// // // //         setFlightSearchLoading(false);
// // // //         return;
// // // //       }
// // // //       if (!section.departureDate) {
// // // //         showErrorMessage("Please select departure dates for all sections.");
// // // //         setFlightSearchLoading(false);
// // // //         return;
// // // //       }
// // // //     }

// // // //     // Build originDestinations
// // // //     const originDestinations = sections.map((section, index) => ({
// // // //       id: `${index + 1}`,
// // // //       originLocationCode: section.departureCity,
// // // //       destinationLocationCode: section.arrivalCity,
// // // //       departureDateTimeRange: {
// // // //         date: format(section.departureDate, "yyyy-MM-dd"),
// // // //         time: "10:00:00", // You can modify this to be dynamic if needed
// // // //       },
// // // //     }));

// // // //     const payload = {
// // // //       currencyCode: "NGN",
// // // //       originDestinations,
// // // //       travelers: [
// // // //         ...Array.from({ length: totalAdults }, (_, i) => ({
// // // //           id: `${i + 1}`,
// // // //           travelerType: "ADULT",
// // // //           fareOptions: ["STANDARD"],
// // // //         })),
// // // //         ...Array.from({ length: totalChildren }, (_, i) => ({
// // // //           id: `${totalAdults + i + 1}`,
// // // //           travelerType: "CHILD",
// // // //           fareOptions: ["STANDARD"],
// // // //         })),
// // // //         ...Array.from({ length: totalInfants }, (_, i) => ({
// // // //           id: `${totalAdults + totalChildren + i + 1}`,
// // // //           travelerType: "HELD_INFANT",
// // // //           associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // // //           fareOptions: ["STANDARD"],
// // // //         })),
// // // //       ],
// // // //       sources: ["GDS"],
// // // //       searchCriteria: {
// // // //         maxFlightOffers: 50, // Adjust as needed
// // // //         pricingOptions: {
// // // //           fareType: ["PUBLISHED"],
// // // //         },
// // // //         flightFilters: {
// // // //           cabinRestrictions: [
// // // //             {
// // // //               cabin: sections[0].selectedClass.toUpperCase(),
// // // //               coverage: "MOST_SEGMENTS",
// // // //               originDestinationIds: originDestinations.map((dest) => dest.id),
// // // //             },
// // // //           ],
// // // //         },
// // // //       },
// // // //       additionalInformation: {
// // // //         brandedFares: true,
// // // //       },
// // // //     };

// // // //     try {
// // // //       const response = await fetch(apiUrl, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           Authorization: `Bearer YOUR_API_TOKEN`, // Replace with your actual token
// // // //         },
// // // //         body: JSON.stringify(payload),
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error("Network response was not ok");
// // // //       }

// // // //       const data = await response.json();
// // // //       console.log("Flight data", data.data);

// // // //       navigate("/MultiCitySearch", {
// // // //         state: {
// // // //           searchResults: data.data,
// // // //           searchParams: {
// // // //             sections: sections.map((section) => ({
// // // //               departureCity: section.departureCity,
// // // //               arrivalCity: section.arrivalCity,
// // // //               departureDate: section.departureDate,
// // // //               selectedClass: section.selectedClass,
// // // //             })),
// // // //             adultCount: totalAdults,
// // // //             childCount: totalChildren,
// // // //             infantCount: totalInfants,
// // // //           },
// // // //         },
// // // //       });
// // // //     } catch (error) {
// // // //       console.error("Error fetching flight data:", error);
// // // //       showErrorMessage("Failed to fetch flight data."); // Show a generic error message
// // // //     } finally {
// // // //       setFlightSearchLoading(false); // End loading
// // // //     }
// // // //   }, [sections, showErrorMessage, navigate]);

// // // //   return (
// // // //     <div className="flex flex-col gap-5 w-full items-center">
// // // //       {sections.map((section, index) => (
// // // //         <div
// // // //           key={index}
// // // //           className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // // //         >
// // // //           <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // // //             <CityInput
// // // //               value={section.departureCityInput}
// // // //               data={departureCityOptions[index] || []}
// // // //               label="From where?"
// // // //               placeholder="City"
// // // //               onSearch={(value) => handleCitySearch(index, "departure", value)}
// // // //               loading={departureLoading[index] || false}
// // // //               onChange={(value, city) => handleCityChange(index, "departure", value, city)}
// // // //             />

// // // //             <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // // //               <TransactionIcon size="10" stroke="#E5302f" />
// // // //             </div>

// // // //             <CityInput
// // // //               value={section.arrivalCityInput}
// // // //               data={arrivalCityOptions[index] || []}
// // // //               label="To where?"
// // // //               placeholder="City"
// // // //               onSearch={(value) => handleCitySearch(index, "arrival", value)}
// // // //               loading={arrivalLoading[index] || false}
// // // //               onChange={(value, city) => handleCityChange(index, "arrival", value, city)}
// // // //             />
// // // //           </div>

// // // //           <DateInput
// // // //             labelText="Departure"
// // // //             value={section.departureDate}
// // // //             onChange={(date) => handleDateChange(index, date)}
// // // //           />

// // // //           <SelectInput
// // // //             data={ticketClasses}
// // // //             label="Class"
// // // //             placeholder="Class"
// // // //             value={section.selectedClass}
// // // //             onChange={(value) => handleClassChange(index, value)}
// // // //           />

// // // //           <Dropdown label="Passengers" btnText="Add passengers">
// // // //             <div className="flex flex-col gap-3 py-2">
// // // //               <PassengerCounter
// // // //                 label="Adults ( ≥ 12 years)"
// // // //                 count={section.adultCount}
// // // //                 increment={() => handleIncrement(index, "adultCount")}
// // // //                 decrement={() => handleDecrement(index, "adultCount")}
// // // //               />
// // // //               <PassengerCounter
// // // //                 label="Children ( 2 - 12 years)"
// // // //                 count={section.childCount}
// // // //                 increment={() => handleIncrement(index, "childCount")}
// // // //                 decrement={() => handleDecrement(index, "childCount")}
// // // //               />
// // // //               <PassengerCounter
// // // //                 label="Infants ( < 2 years)"
// // // //                 count={section.infantCount}
// // // //                 increment={() => handleIncrement(index, "infantCount")}
// // // //                 decrement={() => handleDecrement(index, "infantCount")}
// // // //               />
// // // //             </div>
// // // //           </Dropdown>

// // // //           {/* Delete Button */}
// // // //           {sections.length > 1 && (
// // // //             <Button
// // // //               variant="destructive"
// // // //               className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
// // // //               onClick={() => deleteSection(index)}
// // // //               aria-label="Delete section"
// // // //             >
// // // //               <Trash2 size={16} color="#FFFFFF" />
// // // //             </Button>
// // // //           )}
// // // //         </div>
// // // //       ))}

// // // //       <div className="flex gap-5">
// // // //         <Button className="bg-primaryRed duration-300 h-12" onClick={addSection}>
// // // //           Add Section
// // // //           {/* <Plus /> */}
// // // //         </Button>

// // // //         <Button
// // // //           className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
// // // //           onClick={searchFlight}
// // // //           disabled={flightSearchLoading}
// // // //         >
// // // //           {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // // //         </Button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MultiCityTab;





// // // import React, { useState, useCallback, useEffect } from "react";
// // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // import { format } from "date-fns";
// // // import SelectInput from "@/components/components/input/SelectInput";
// // // import { Button } from "@/components/ui/button";
// // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // import { toast } from "react-toastify";
// // // import axiosInstance from "@/config/axios";
// // // import { ticketClasses } from "../../data/data.json";
// // // import CityInput from "@/components/components/input/CityInput";
// // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //     PASSENGER_LIMIT,
// // //     NO_CITY_MESSAGE,
// // //     // NO_FLIGHT_MESSAGE,
// // //     PASSENGER_LIMIT_MESSAGE,
// // //     //   INFANT_EXCEED_ADULT_MESSAGE,
// // // } from "@/config/api";
// // // import DateInput from "@/components/components/input/DateInput";
// // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // import { Trash2 } from "lucide-react"; // Import Trash icon

// // // type DataItem = {
// // //     value: string;
// // //     label: React.ReactNode;
// // //     city: {
// // //         address: {
// // //             cityCode?: string;
// // //             cityName?: string;
// // //             countryName?: string;
// // //         };
// // //         name: string;
// // //         iata: string;
// // //         city: string;
// // //         country: string;
// // //     };
// // // };

// // // interface Section {
// // //     id: string; // Add a unique ID field
// // //     departureCityInput: string;
// // //     departureCity: string;
// // //     arrivalCityInput: string;
// // //     arrivalCity: string;
// // //     departureDate: Date;
// // //     adultCount: number;
// // //     childCount: number;
// // //     infantCount: number;
// // //     selectedClass: string;
// // // }

// // // const MultiCityTab = () => {
// // //     const navigate = useNavigate();

// // //     // Initialize sections with at least one adult
// // //     const [sections, setSections] = useState<Section[]>([
// // //         {
// // //             id: uuidv4(), // Assign a unique ID
// // //             departureCityInput: "",
// // //             departureCity: "",
// // //             arrivalCityInput: "",
// // //             arrivalCity: "",
// // //             departureDate: new Date(),
// // //             adultCount: 1,
// // //             childCount: 0,
// // //             infantCount: 0,
// // //             selectedClass: ticketClasses[0].value,
// // //         },
// // //     ]);

// // //     const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
// // //         []
// // //     );
// // //     const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // //     const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // //     const [departureLoading, setDepartureLoading] = useState(false);
// // //     const [arrivalLoading, setArrivalLoading] = useState(false);

// // //     const [departureCityInput, setDepartureCityInput] = useState("");
// // //     const [arrivalCityInput, setArrivalCityInput] = useState("");
// // //     const [departureCity, setDepartureCity] = useState("");
// // //     const [arrivalCity, setArrivalCity] = useState("");
// // //     const [departureDate, setDepartureDate] = useState(new Date());
// // //     const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // //     const showErrorMessage = useCallback((message: string) => {
// // //         toast.error(message);
// // //     }, []);

// // //     // Calculate total passengers across all sections
// // //     const totalPassengers = sections.reduce(
// // //         (sum, section) =>
// // //             sum + section.adultCount + section.childCount + section.infantCount,
// // //         0
// // //     );

// // //     const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // //     const handleIncrement = (index: number, field: keyof Section) => {
// // //         if (totalPassengers < maxPassengers) {
// // //             setSections((prevSections) =>
// // //                 prevSections.map((section, i) =>
// // //                     i === index
// // //                         ? {
// // //                             ...section,
// // //                             [field]:
// // //                                 typeof section[field] === "number"
// // //                                     ? section[field] + 1
// // //                                     : section[field], // Leave it unchanged if it's not a number
// // //                         }
// // //                         : section
// // //                 )
// // //             );
// // //         } else {
// // //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //         }
// // //     };


// // //     const handleDecrement = (index: number, field: keyof Section) => {
// // //         setSections((prevSections) =>
// // //             prevSections.map((section, i) =>
// // //                 i === index
// // //                     ? {
// // //                         ...section,
// // //                         [field]:
// // //                             typeof section[field] === "number"
// // //                                 ? Math.max(0, section[field] - 1)
// // //                                 : section[field], // Leave it unchanged if it's not a number
// // //                     }
// // //                     : section
// // //             )
// // //         );
// // //     };

// // //     // Ensure infants do not exceed adults in each section
// // //     useEffect(() => {
// // //         setSections((prevSections) =>
// // //             prevSections.map((section) => {
// // //                 if (section.infantCount > section.adultCount) {
// // //                     return { ...section, infantCount: section.adultCount };
// // //                 }
// // //                 return section;
// // //             })
// // //         );
// // //     }, [sections]);

// // //     const useDebounce = <T,>(value: T, delay: number): T => {
// // //         const [debouncedValue, setDebouncedValue] = useState(value);

// // //         useEffect(() => {
// // //             const handler = setTimeout(() => {
// // //                 setDebouncedValue(value);
// // //             }, delay);

// // //             return () => {
// // //                 clearTimeout(handler);
// // //             };
// // //         }, [value, delay]);

// // //         return debouncedValue;
// // //     };

// // //     // Debounce inputs for each section
// // //     // const debouncedDepartureCity = sections.map((section) =>
// // //     //   useDebounce(section.departureCityInput, 300)
// // //     // );
// // //     // const debouncedArrivalCity = sections.map((section) =>
// // //     //   useDebounce(section.arrivalCityInput, 300)
// // //     // );

// // //     const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // //     const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // //     const addSection = () => {
// // //         setSections((prevSections) => [
// // //             ...prevSections,
// // //             {
// // //                 id: uuidv4(), // Assign a unique ID
// // //                 departureCityInput: "",
// // //                 departureCity: "",
// // //                 arrivalCityInput: "",
// // //                 arrivalCity: "",
// // //                 departureDate: new Date(),
// // //                 adultCount: 1,
// // //                 childCount: 0,
// // //                 infantCount: 0,
// // //                 selectedClass: ticketClasses[0].value,
// // //             },
// // //         ]);
// // //     };

// // //     const deleteSection = (index: number) => {
// // //         setSections((prevSections) => {
// // //             if (prevSections.length === 1) {
// // //                 // Prevent deleting the last remaining section
// // //                 showErrorMessage("At least one section is required.");
// // //                 return prevSections;
// // //             }
// // //             return prevSections.filter((_, i) => i !== index);
// // //         });
// // //     };

// // //     const fetchCityData = async (
// // //         keyword: string,
// // //         setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // //         setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // //     ) => {
// // //         if (keyword.length < 2) return;

// // //         setLoading(true);
// // //         try {
// // //             const response = await axiosInstance.get(
// // //                 `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // //             );

// // //             const cityData = response.data?.map((item: any) => ({
// // //                 value: item?.iataCode,
// // //                 label: `${item?.name}`,
// // //                 city: {
// // //                     address: {
// // //                         cityCode: item?.address?.cityCode,
// // //                         cityName: item?.address?.cityName,
// // //                         countryName: item?.address?.countryName,
// // //                     },
// // //                     name: item?.name,
// // //                     iata: item?.iata,
// // //                     city: item?.city,
// // //                     country: item?.country,
// // //                 },
// // //             }));

// // //             if (cityData && cityData.length > 0) {
// // //                 setCityOptions(cityData);
// // //             } else {
// // //                 showErrorMessage(NO_CITY_MESSAGE);
// // //             }
// // //         } catch (error) {
// // //             showErrorMessage(NO_CITY_MESSAGE);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         if (debouncedDepartureCity) {
// // //             fetchCityData(
// // //                 debouncedDepartureCity,
// // //                 setDepartureCityOptions,
// // //                 setDepartureLoading
// // //             );
// // //         }
// // //     }, [debouncedDepartureCity]);

// // //     useEffect(() => {
// // //         if (debouncedArrivalCity) {
// // //             fetchCityData(
// // //                 debouncedArrivalCity,
// // //                 setArrivalCityOptions,
// // //                 setArrivalLoading
// // //             );
// // //         }
// // //     }, [debouncedArrivalCity]);

// // //     const searchFlight = useCallback(async () => {
// // //         for (const section of sections) {
// // //             if (!section.departureCity || !section.arrivalCity) {
// // //                 // Show error message if the cities are missing
// // //                 showErrorMessage("Please provide valid departure and arrival cities.");
// // //                 return; // Stop execution if validation fails
// // //             }
// // //         }
// // //         setFlightSearchLoading(true);
// // //         const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";

// // //         const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // //         const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // //         const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // //         const originDestinations = sections.map((section) => ({
// // //             id: section.id, // Use the unique ID
// // //             originLocationCode: section.departureCity,
// // //             destinationLocationCode: section.arrivalCity,
// // //             departureDateTimeRange: {
// // //                 date: format(section.departureDate, "yyyy-MM-dd"), // Ensure each section uses its own date
// // //                 time: "10:00:00", // You might want to make this dynamic
// // //             },
// // //         }));

// // //         const payload = {
// // //             currencyCode: "NGN",
// // //             originDestinations,
// // //             travelers: [
// // //                 ...Array.from({ length: totalAdults }, (_, i) => ({
// // //                     id: `${i + 1}`,
// // //                     travelerType: "ADULT",
// // //                     fareOptions: ["STANDARD"],
// // //                 })),
// // //                 ...Array.from({ length: totalChildren }, (_, i) => ({
// // //                     id: `${totalAdults + i + 1}`,
// // //                     travelerType: "CHILD",
// // //                     fareOptions: ["STANDARD"],
// // //                 })),
// // //                 ...Array.from({ length: totalInfants }, (_, i) => ({
// // //                     id: `${totalAdults + totalChildren + i + 1}`,
// // //                     travelerType: "HELD_INFANT",
// // //                     associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // //                     fareOptions: ["STANDARD"],
// // //                 })),
// // //             ],
// // //             sources: ["GDS"],
// // //             searchCriteria: {
// // //                 maxFlightOffers: 50,
// // //                 pricingOptions: {
// // //                     fareType: ["PUBLISHED"],
// // //                 },
// // //                 flightFilters: {
// // //                     cabinRestrictions: [
// // //                         {
// // //                             cabin: selectedClass.toUpperCase(),
// // //                             coverage: "MOST_SEGMENTS",
// // //                             originDestinationIds: originDestinations.map((dest) => dest.id), // Use unique IDs
// // //                         },
// // //                     ],
// // //                 },
// // //             },
// // //             additionalInformation: {
// // //                 brandedFares: true,
// // //             },
// // //         };

// // //         try {
// // //             const response = await fetch(apiUrl, {
// // //                 method: "POST",
// // //                 headers: {
// // //                     "Content-Type": "application/json",
// // //                     Authorization: `Bearer YOUR_API_TOKEN`,
// // //                 },
// // //                 body: JSON.stringify(payload),
// // //             });

// // //             if (!response.ok) {
// // //                 throw new Error("Network response was not ok");
// // //             }

// // //             const data = await response.json();
// // //             console.log("Flight data", data.data);

// // //             navigate("/MultiCitySearch", {
// // //                 state: {
// // //                     searchResults: data.data,
// // //                     searchParams: {
// // //                         departureCity,
// // //                         arrivalCity,
// // //                         departureDate,
// // //                         adultCount: totalAdults,
// // //                         childCount: totalChildren,
// // //                         infantCount: totalInfants,
// // //                         selectedClass,
// // //                     },
// // //                 },
// // //             });
// // //         } catch (error) {
// // //             console.error("Error fetching flight data:", error);
// // //             showErrorMessage("Failed to fetch flight data.");
// // //         } finally {
// // //             setFlightSearchLoading(false);
// // //         }
// // //     }, [
// // //         sections,
// // //         selectedClass,
// // //         showErrorMessage,
// // //         navigate,
// // //     ]);


// // //     const handleDepartureDateChange = useCallback(
// // //         (date: Date | undefined) => setDepartureDate(date || new Date()),
// // //         []
// // //     );

// // //     const handleDepartureCityChange = (value: string, city: DataItem) => {
// // //         setDepartureCity(city.city.iata); // Update with the airport code
// // //         setDepartureCityInput(city.city.iata); // Display city and airport code in the input
// // //         console.log(value);
// // //     };

// // //     const handleArrivalCityChange = (value: string, city: DataItem) => {
// // //         setArrivalCity(city.city.iata); // Update with the airport code
// // //         setArrivalCityInput(city.city.iata); // Display city and airport code in the input
// // //         console.log(value);
// // //     };

// // //     return (
// // //         <div className="flex flex-col gap-5 w-full items-center">
// // //             {sections.map((section, index) => (
// // //                 <div
// // //                     key={section.id}
// // //                     className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // //                 >
// // //                     <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // //                         <CityInput
// // //                             value={departureCityInput}
// // //                             data={departureCityOptions}
// // //                             label="From where?"
// // //                             placeholder="City"
// // //                             onSearch={setDepartureCityInput}
// // //                             loading={departureLoading}
// // //                             onChange={handleDepartureCityChange}
// // //                         />

// // //                         <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // //                             <TransactionIcon size="10" stroke="#E5302f" />
// // //                         </div>

// // //                         <CityInput
// // //                             value={arrivalCityInput}
// // //                             data={arrivalCityOptions}
// // //                             label="To where?"
// // //                             placeholder="City"
// // //                             onSearch={setArrivalCityInput}
// // //                             loading={arrivalLoading}
// // //                             onChange={handleArrivalCityChange}
// // //                         />
// // //                     </div>

// // //                     <DateInput
// // //                         labelText="Departure"
// // //                         onChange={handleDepartureDateChange}
// // //                     />

// // //                     <SelectInput
// // //                         data={ticketClasses}
// // //                         label="Class"
// // //                         placeholder="Class"
// // //                         value={selectedClass}
// // //                         onChange={setSelectedClass}
// // //                     />

// // //                     <Dropdown label="Passengers" btnText="Add passengers">
// // //                         <div className="flex flex-col gap-3 py-2">
// // //                             <PassengerCounter
// // //                                 label="Adults ( ≥ 12 years)"
// // //                                 count={section.adultCount}
// // //                                 increment={() => handleIncrement(index, "adultCount")}
// // //                                 decrement={() => handleDecrement(index, "adultCount")}
// // //                             />
// // //                             <PassengerCounter
// // //                                 label="Children ( 2 - 12 years)"
// // //                                 count={section.childCount}
// // //                                 increment={() => handleIncrement(index, "childCount")}
// // //                                 decrement={() => handleDecrement(index, "childCount")}
// // //                             />
// // //                             <PassengerCounter
// // //                                 label="Infants ( < 2 years)"
// // //                                 count={section.infantCount}
// // //                                 increment={() => handleIncrement(index, "infantCount")}
// // //                                 decrement={() => handleDecrement(index, "infantCount")}
// // //                             />
// // //                         </div>
// // //                     </Dropdown>

// // //                     {/* Delete Button */}
// // //                     {sections.length > 1 && (
// // //                         <Button
// // //                             variant="destructive"
// // //                             className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
// // //                             onClick={() => deleteSection(index)}
// // //                             aria-label="Delete section"
// // //                         >
// // //                             <Trash2 size={16} color="#FFFFFF" />
// // //                         </Button>
// // //                     )}
// // //                 </div>
// // //             ))}

// // //             <div className="flex gap-5">
// // //                 <Button className="bg-primaryRed duration-300 h-12" onClick={addSection}>
// // //                     Add Another Flight
// // //                     {/* <Plus /> */}
// // //                 </Button>

// // //                 <Button
// // //                     className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
// // //                     onClick={searchFlight}
// // //                     disabled={flightSearchLoading}
// // //                 >
// // //                     {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // //                 </Button>
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default MultiCityTab;





// // // latest set
// // // import React, { useState, useCallback, useEffect } from "react";
// // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // import { format } from "date-fns";
// // // import SelectInput from "@/components/components/input/SelectInput";
// // // import { Button } from "@/components/ui/button";
// // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // import { toast } from "react-toastify";
// // // import axiosInstance from "@/config/axios";
// // // import { ticketClasses } from "../../data/data.json";
// // // import CityInput from "@/components/components/input/CityInput";
// // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // // import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   PASSENGER_LIMIT,
// // //   NO_CITY_MESSAGE,
// // //   // NO_FLIGHT_MESSAGE,
// // //   PASSENGER_LIMIT_MESSAGE,
// // //   //   INFANT_EXCEED_ADULT_MESSAGE,
// // // } from "@/config/api";
// // // import DateInput from "@/components/components/input/DateInput";
// // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // import { Trash2 } from "lucide-react"; // Import Trash icon

// // // type DataItem = {
// // //   value: string;
// // //   label: React.ReactNode;
// // //   city: {
// // //     address: {
// // //       cityCode?: string;
// // //       cityName?: string;
// // //       countryName?: string;
// // //     };
// // //     name: string;
// // // iata: string;
// // // city: string;
// // // country: string;
// // //   };
// // // };

// // // interface Section {
// // //   id: number; // Add a unique ID field
// // //   departureCityInput: string;
// // //   departureCity: string;
// // //   arrivalCityInput: string;
// // //   arrivalCity: string;
// // //   departureDate: Date;
// // //   adultCount: number;
// // //   childCount: number;
// // //   infantCount: number;
// // //   selectedClass: string;
// // // }

// // // const MultiCityTab = () => {
// // //   const navigate = useNavigate();

// // //   // Initialize sections with at least one adult
// // //   const [sections, setSections] = useState<Section[]>([
// // //     {
// // //       id: 1, // Assign a unique ID
// // //       departureCityInput: "",
// // //       departureCity: "",
// // //       arrivalCityInput: "",
// // //       arrivalCity: "",
// // //       departureDate: new Date(),
// // //       adultCount: 1,
// // //       childCount: 0,
// // //       infantCount: 0,
// // //       selectedClass: ticketClasses[0].value,
// // //     },
// // //   ]);

// // // const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
// // //   []
// // // );
// // // const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // //   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // //   const [departureLoading, setDepartureLoading] = useState(false);
// // //   const [arrivalLoading, setArrivalLoading] = useState(false);

// // // const [departureCityInput, setDepartureCityInput] = useState("");
// // // const [arrivalCityInput, setArrivalCityInput] = useState("");
// // //   const [departureCity, setDepartureCity] = useState<string[]>([]);
// // //   const [arrivalCity, setArrivalCity] = useState<string[]>([]);
// // // const [departureDate, setDepartureDate] = useState(new Date());
// // // const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // //   const showErrorMessage = useCallback((message: string) => {
// // //     toast.error(message);
// // //   }, []);

// // //   // Calculate total passengers across all sections
// // //   const totalPassengers = sections.reduce(
// // //     (sum, section) =>
// // //       sum + section.adultCount + section.childCount + section.infantCount,
// // //     0
// // //   );

// // //   const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // //   const handleIncrement = (index: number, field: keyof Section) => {
// // //     if (totalPassengers < maxPassengers) {
// // //       setSections((prevSections) =>
// // //         prevSections.map((section, i) =>
// // //           i === index
// // //             ? {
// // //                 ...section,
// // //                 [field]:
// // //                   typeof section[field] === "number"
// // //                     ? section[field] + 1
// // //                     : section[field], // Leave it unchanged if it's not a number
// // //               }
// // //             : section
// // //         )
// // //       );
// // //     } else {
// // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //     }
// // //   };

// // //   const handleDecrement = (index: number, field: keyof Section) => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section, i) =>
// // //         i === index
// // //           ? {
// // //               ...section,
// // //               [field]:
// // //                 typeof section[field] === "number"
// // //                   ? Math.max(0, section[field] - 1)
// // //                   : section[field], // Leave it unchanged if it's not a number
// // //             }
// // //           : section
// // //       )
// // //     );
// // //   };

// // //   // Ensure infants do not exceed adults in each section
// // //   useEffect(() => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section) => {
// // //         if (section.infantCount > section.adultCount) {
// // //           return { ...section, infantCount: section.adultCount };
// // //         }
// // //         return section;
// // //       })
// // //     );
// // //   }, [sections]);

// // // const useDebounce = <T,>(value: T, delay: number): T => {
// // //   const [debouncedValue, setDebouncedValue] = useState(value);

// // //   useEffect(() => {
// // //     const handler = setTimeout(() => {
// // //       setDebouncedValue(value);
// // //     }, delay);

// // //     return () => {
// // //       clearTimeout(handler);
// // //     };
// // //   }, [value, delay]);

// // //   return debouncedValue;
// // // };

// // //   // Debounce inputs for each section
// // //   // const debouncedDepartureCity = sections.map((section) =>
// // //   //   useDebounce(section.departureCityInput, 300)
// // //   // );
// // //   // const debouncedArrivalCity = sections.map((section) =>
// // //   //   useDebounce(section.arrivalCityInput, 300)
// // //   // );

// // // const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // // const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // //   const addSection = () => {
// // //     setSections((prevSections) => [
// // //       ...prevSections,
// // //       {
// // //         id:  prevSections.length + 1, // Assign a unique ID
// // //         departureCityInput: "",
// // //         departureCity: "",
// // //         arrivalCityInput: "",
// // //         arrivalCity: "",
// // //         departureDate: new Date(),
// // //         adultCount: 1,
// // //         childCount: 0,
// // //         infantCount: 0,
// // //         selectedClass: ticketClasses[0].value,
// // //       },
// // //     ]);
// // //   };

// // //   const deleteSection = (index: number) => {
// // //     setSections((prevSections) => {
// // //       if (prevSections.length === 1) {
// // //         // Prevent deleting the last remaining section
// // //         showErrorMessage("At least one section is required.");
// // //         return prevSections;
// // //       }
// // //       return prevSections.filter((_, i) => i !== index);
// // //     });
// // //   };

// // // const fetchCityData = async (
// // //   keyword: string,
// // //   setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // //   setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // // ) => {
// // //   if (keyword.length < 2) return;

// // //   setLoading(true);
// // //   try {
// // //     const response = await axiosInstance.get(
// // //       `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // //     );

// // //     console.log("testing testing testing", response['data'])

// // //     const cityData = response.data?.map((item: any) => ({
// // //       value: item?.iata,
// // //       label: `${item?.name}`,
// // //       city: {
// // //         address: {
// // //           cityCode: item?.address?.cityCode,
// // //           cityName: item?.address?.cityName,
// // //           countryName: item?.address?.countryName,
// // //         },
// // //         name: item?.name,
// // //         iata: item?.iata,
// // //         city: item?.city,
// // //         country: item?.country,
// // //       },
// // //     }));

// // //     console.log("another test", cityData)

// // //     if (cityData && cityData.length > 0) {
// // //       setCityOptions(cityData);
// // //     } else {
// // //       showErrorMessage(NO_CITY_MESSAGE);
// // //     }
// // //   } catch (error) {
// // //     showErrorMessage(NO_CITY_MESSAGE);
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };

// // // useEffect(() => {
// // //   if (debouncedDepartureCity) {
// // //     fetchCityData(
// // //       debouncedDepartureCity,
// // //       setDepartureCityOptions,
// // //       setDepartureLoading
// // //     );
// // //   }
// // // }, [debouncedDepartureCity]);

// // // useEffect(() => {
// // //   if (debouncedArrivalCity) {
// // //     fetchCityData(
// // //       debouncedArrivalCity,
// // //       setArrivalCityOptions,
// // //       setArrivalLoading
// // //     );
// // //   }
// // // }, [debouncedArrivalCity]);

// // //   const searchFlight = useCallback(async () => {
// // //     for (const section of sections) {
// // //       if (!section.departureCity || !section.arrivalCity) {
// // //         // Show error message if the cities are missing
// // //         showErrorMessage("Please provide valid departure and arrival cities.");
// // //         return; // Stop execution if validation fails
// // //       }
// // //     }

// // //     setFlightSearchLoading(true);
// // //     const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";

// // //     const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // //     const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // //     const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // //     const originDestinations = sections.map((section) => ({
// // //       id: section.id, // Use the unique ID
// // //       originLocationCode: section.departureCity,
// // //       destinationLocationCode: section.arrivalCity,
// // //       departureDateTimeRange: {
// // //         date: format(section.departureDate, "yyyy-MM-dd"), // Ensure each section uses its own date
// // //         time: "10:00:00", // You might want to make this dynamic
// // //       },
// // //     }));

// // //     const payload = {
// // //       currencyCode: "NGN",
// // //       originDestinations,
// // //       travelers: [
// // //         ...Array.from({ length: totalAdults }, (_, i) => ({
// // //           id: `${i + 1}`,
// // //           travelerType: "ADULT",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //         ...Array.from({ length: totalChildren }, (_, i) => ({
// // //           id: `${totalAdults + i + 1}`,
// // //           travelerType: "CHILD",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //         ...Array.from({ length: totalInfants }, (_, i) => ({
// // //           id: `${totalAdults + totalChildren + i + 1}`,
// // //           travelerType: "HELD_INFANT",
// // //           associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //       ],
// // //       sources: ["GDS"],
// // //       searchCriteria: {
// // //         maxFlightOffers: 50,
// // //         pricingOptions: {
// // //           fareType: ["PUBLISHED"],
// // //         },
// // //         flightFilters: {
// // //           cabinRestrictions: [
// // //             {
// // //               cabin: selectedClass.toUpperCase(),
// // //               coverage: "MOST_SEGMENTS",
// // //               originDestinationIds: originDestinations.map((dest) => dest.id), // Use unique IDs
// // //             },
// // //           ],
// // //         },
// // //       },
// // //       additionalInformation: {
// // //         brandedFares: true,
// // //       },
// // //     };

// // //     try {
// // //       const response = await fetch(apiUrl, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer YOUR_API_TOKEN`,
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Network response was not ok");
// // //       }

// // //       const data = await response.json();
// // //       console.log("Flight data", data.data);

// // //       navigate("/MultiCitySearch", {
// // //         state: {
// // //           searchResults: data.data,
// // //           searchParams: {
// // //             departureCity,
// // //             arrivalCity,
// // //             departureDate,
// // //             adultCount: totalAdults,
// // //             childCount: totalChildren,
// // //             infantCount: totalInfants,
// // //             selectedClass,
// // //           },
// // //         },
// // //       });
// // //     } catch (error) {
// // //       console.error("Error fetching flight data:", error);
// // //       showErrorMessage("Failed to fetch flight data.");
// // //     } finally {
// // //       setFlightSearchLoading(false);
// // //     }
// // //   }, [
// // //     sections,
// // //     selectedClass,
// // //     showErrorMessage,
// // //     navigate,
// // //   ]);

// // //   const handleDepartureDateChange = useCallback(
// // //     (date: Date | undefined) => setDepartureDate(date || new Date()),
// // //     []
// // //   );

// // //   const handleDepartureCityChange = (value: string, city: DataItem) => {
// // //     // If you want to push multiple city codes, you can add to an array
// // //     setDepartureCity([city.city.iata]); // Adds the new city to the array
// // //     setDepartureCityInput(`${city.city.iata}`); // Display city name and airport code in the input
// // //     console.log(value);
// // //     console.log("departureCity is", departureCity);
// // // };

// // //   const handleArrivalCityChange = (value: string, city: DataItem) => {
// // //     setArrivalCity([city.city.iata]); // Update with the airport code
// // //     setArrivalCityInput(`${city.city.iata}`); // Display city and airport code in the input
// // //     console.log(value);
// // //     console.log("arrivalcity is", arrivalCity);
// // //   };

// // //   useEffect(() => {
// // //     console.log("Updated departureCity:", departureCity);
// // //     console.log("Updated departureCityInput:", departureCityOptions);
// // //   }, [departureCity]);

// // //   useEffect(() => {
// // //     console.log("Updated arrivalCity:", arrivalCity);
// // //     console.log("Updated arrivalCityInput:", arrivalCityInput);
// // //   }, [arrivalCity]);

// // //   return (
// // //     <div className="flex flex-col gap-5 w-full items-center">
// // //       {sections.map((section, index) => (
// // //         <div
// // //           key={section.id}
// // //           className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // //         >
// // //           <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // // <CityInput
// // //   value={section.departureCityInput}
// // //   data={departureCityOptions}
// // //   label="From where?"
// // //   placeholder="City"
// // //   onSearch={setDepartureCityInput}
// // //   loading={departureLoading}
// // //   onChange={handleDepartureCityChange}
// // // />

// // //             <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // //               <TransactionIcon size="10" stroke="#E5302f" />
// // //             </div>

// // // <CityInput
// // //   value={section.arrivalCityInput}
// // //   data={arrivalCityOptions}
// // //   label="To where?"
// // //   placeholder="City"
// // //   onSearch={setArrivalCityInput}
// // //   loading={arrivalLoading}
// // //   onChange={handleArrivalCityChange}
// // // />
// // //           </div>

// // //           <DateInput
// // //             labelText="Departure"
// // //             onChange={handleDepartureDateChange}
// // //           />

// // //           <SelectInput
// // //             data={ticketClasses}
// // //             label="Class"
// // //             placeholder="Class"
// // // value={selectedClass}
// // // onChange={setSelectedClass}
// // //           />

// // // <Dropdown label="Passengers" btnText="Add passengers">
// // //   <div className="flex flex-col gap-3 py-2">
// // //     <PassengerCounter
// // //       label="Adults ( ≥ 12 years)"
// // //       count={section.adultCount}
// // //       increment={() => handleIncrement(index, "adultCount")}
// // //       decrement={() => handleDecrement(index, "adultCount")}
// // //     />
// // //     <PassengerCounter
// // //       label="Children ( 2 - 12 years)"
// // //       count={section.childCount}
// // //       increment={() => handleIncrement(index, "childCount")}
// // //       decrement={() => handleDecrement(index, "childCount")}
// // //     />
// // //     <PassengerCounter
// // //       label="Infants ( < 2 years)"
// // //       count={section.infantCount}
// // //       increment={() => handleIncrement(index, "infantCount")}
// // //       decrement={() => handleDecrement(index, "infantCount")}
// // //     />
// // //   </div>
// // // </Dropdown>

// // //           {/* Delete Button */}
// // //           {sections.length > 1 && (
// // //             <Button
// // //               variant="destructive"
// // //               className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
// // //               onClick={() => deleteSection(index)}
// // //               aria-label="Delete section"
// // //             >
// // //               <Trash2 size={16} color="#FFFFFF" />
// // //             </Button>
// // //           )}
// // //         </div>
// // //       ))}

// // //       <div className="flex gap-5">
// // //         <Button className="bg-primaryRed duration-300 h-12" onClick={addSection}>
// // //           Add Another Flight
// // //           {/* <Plus /> */}
// // //         </Button>

// // //         <Button
// // //           className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
// // //           onClick={searchFlight}
// // //           disabled={flightSearchLoading}
// // //         >
// // //           {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MultiCityTab;



// // import { useState, useEffect } from "react";
// // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // import SelectInput from "@/components/components/input/SelectInput";
// // import { Button } from "@/components/ui/button";
// // import Dropdown from "@/components/components/dropdown/Dropdown";
// // import SubtractIcon from "@/assets/svg/SubtractIcon";
// // import PlusIcon from "@/assets/svg/PlusIcon";
// // import { toast } from "react-toastify";
// // import DateInput from "@/components/components/input/DateInput";
// // import { Plus, Trash } from "lucide-react";
// // import { ticketClasses } from "../../data/data.json";
// // import CityInput from "@/components/components/input/CityInput";
// // import axiosInstance from "@/config/axios";
// // import {
// //   // PASSENGER_LIMIT,
// //   NO_CITY_MESSAGE,
// //   // NO_FLIGHT_MESSAGE,
// //   PASSENGER_LIMIT_MESSAGE,
// //   //   INFANT_EXCEED_ADULT_MESSAGE,
// // } from "@/config/api";
// // // import { Console } from "console";

// // type DataItem = {
// //   value: string;
// //   label: React.ReactNode;
// //   city: {
// //     address: {
// //       cityCode: string;
// //       cityName: string;
// //       countryName: string;
// //     };
// //     name: string;
// //     iata: string;
// //     city: string;
// //     country: string;
// //   };
// // };

// // interface PassengerCounterProps {
// //   label: string;
// //   count: number;
// //   increment: () => void;
// //   decrement: () => void;
// // }

// // const PassengerCounter = ({
// //   label,
// //   count,
// //   increment,
// //   decrement,
// // }: PassengerCounterProps) => (
// //   <div className="flex justify-between items-center">
// //     <p className="text-sm font-medium">{label}</p>
// //     <div className="flex gap-3">
// //       <button
// //         className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// //         onClick={decrement}
// //       >
// //         <SubtractIcon stroke="#FFFFFF" />
// //       </button>
// //       <div className="w-[25px] h-[25px]">
// //         <p className="text-sm font-medium">{count}</p>
// //       </div>
// //       <button
// //         className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// //         onClick={increment}
// //       >
// //         <PlusIcon stroke="#FFFFFF" />
// //       </button>
// //     </div>
// //   </div>
// // );

// // interface Section {
// //   adultCount: number;
// //   childCount: number;
// //   infantCount: number;
// //   departureCity: string;
// //   arrivalCity: string;
// // }

// // const MultiCityTab = () => {
// //   // const [cityOptions, setCityOptions] = useState<DataItem[]>([]);
// //   // const [loading, setLoading] = useState(false);
// //   const [sections, setSections] = useState<Section[]>([
// //     {
// //       adultCount: 0,
// //       childCount: 0,
// //       infantCount: 0,
// //       departureCity: "",
// //       arrivalCity: "",
// //     },
// //   ]);

// //   const [departureCityInput, setDepartureCityInput] = useState("");
// //   const [arrivalCityInput, setArrivalCityInput] = useState("");
// //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
// //     []
// //   );
// //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// //   const [departureLoading, setDepartureLoading] = useState(false);
// //   const [arrivalLoading, setArrivalLoading] = useState(false);
// //   const [departureCity, setDepartureCity] = useState<string[]>([]);
// //   const [arrivalCity, setArrivalCity] = useState<string[]>([]);
// //   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// //   // const [citySearchTerm, setCitySearchTerm] = useState(""); // New state for search term

// //   const totalPassengers = sections.reduce(
// //     (total, section) =>
// //       total + section.adultCount + section.childCount + section.infantCount,
// //     0
// //   );
// //   const maxPassengers = 9;

// //   const showErrorMessage = (message: string) => {
// //     toast.error(message);
// //   };

// //   const handleIncrement = (index: number, field: keyof Section) => {
// //     if (totalPassengers < maxPassengers) {
// //       setSections((prevSections) =>
// //         prevSections.map((section, i) =>
// //           i === index
// //             ? {
// //                 ...section,
// //                 [field]:
// //                   typeof section[field] === "number"
// //                     ? section[field] + 1
// //                     : section[field], // Leave it unchanged if it's not a number
// //               }
// //             : section
// //         )
// //       );
// //     } else {
// //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// //     }
// //   };

// //   const handleDecrement = (index: number, field: keyof Section) => {
// //     setSections((prevSections) =>
// //       prevSections.map((section, i) =>
// //         i === index
// //           ? {
// //               ...section,
// //               [field]:
// //                 typeof section[field] === "number"
// //                   ? Math.max(0, section[field] - 1)
// //                   : section[field], // Leave it unchanged if it's not a number
// //             }
// //           : section
// //       )
// //     );
// //   };

// //   const useDebounce = <T,>(value: T, delay: number): T => {
// //     const [debouncedValue, setDebouncedValue] = useState(value);

// //     useEffect(() => {
// //       const handler = setTimeout(() => {
// //         setDebouncedValue(value);
// //       }, delay);

// //       return () => {
// //         clearTimeout(handler);
// //       };
// //     }, [value, delay]);

// //     return debouncedValue;
// //   };

// //   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// //   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// //   const addSection = () => {
// //     setSections((prevSections) => [
// //       ...prevSections,
// //       {
// //         adultCount: 0,
// //         childCount: 0,
// //         infantCount: 0,
// //         departureCity: "",
// //         arrivalCity: "",
// //       },
// //     ]);
// //   };

// //   const removeSection = (index: number) => {
// //     if (sections.length > 1) {
// //       setSections((prevSections) => prevSections.filter((_, i) => i !== index));
// //     }
// //   };

// //   const fetchCityData = async (
// //     keyword: string,
// //     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
// //   ) => {
// //     if (keyword.length < 2) return;

// //     setLoading(true);
// //     try {
// //       const response = await axiosInstance.get(
// //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// //       );

// //       // console.log("testing testing testing", response["data"]);

// //       const cityData = response.data?.map((item: any) => ({
// //         value: item?.iata,
// //         label: `${item?.name}`,
// //         city: {
// //           address: {
// //             cityCode: item?.address?.cityCode,
// //             cityName: item?.address?.cityName,
// //             countryName: item?.address?.countryName,
// //           },
// //           name: item?.name,
// //           iata: item?.iata,
// //           city: item?.city,
// //           country: item?.country,
// //         },
// //       }));

// //       // console.log("another test", cityData);

// //       if (cityData && cityData.length > 0) {
// //         setCityOptions(cityData);
// //       } else {
// //         showErrorMessage(NO_CITY_MESSAGE);
// //       }
// //     } catch (error) {
// //       showErrorMessage(NO_CITY_MESSAGE);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Debounce with useEffect for handling the city search input
// //   useEffect(() => {
// //     if (debouncedDepartureCity) {
// //       fetchCityData(
// //         debouncedDepartureCity,
// //         setDepartureCityOptions,
// //         setDepartureLoading
// //       );
// //     }
// //   }, [debouncedDepartureCity]);

// //   useEffect(() => {
// //     if (debouncedArrivalCity) {
// //       fetchCityData(
// //         debouncedArrivalCity,
// //         setArrivalCityOptions,
// //         setArrivalLoading
// //       );
// //     }
// //   }, [debouncedArrivalCity]);

// //   const handleDepartureCityChange = (value: string, city: DataItem) => {
// //     // If you want to push multiple city codes, you can add to an array
// //     setDepartureCity([city.city.iata]); // Adds the new city to the array
// //     setDepartureCityInput(`${city.city.iata}`); // Display city name and airport code in the input
// //     console.log(value);
// //     console.log("departureCity is", departureCityInput);
// // };

// //   const handleArrivalCityChange = (value: string, city: DataItem) => {
// //     setArrivalCity([city.city.iata]); // Update with the airport code
// //     setArrivalCityInput(`${city.city.iata}`); // Display city and airport code in the input
// //     console.log(value);
// //     console.log("arrivalcity is", arrivalCityInput);
// //   };

// //   // useEffect(() => {
// //   //   console.log("Updated departureCity:", departureCity);
// //   //   console.log("Updated departureCityInput:", departureCityOptions);
// //   // }, [departureCity]);

// //   // useEffect(() => {
// //   //   console.log("Updated arrivalCity:", arrivalCity);
// //   //   console.log("Updated arrivalCityInput:", arrivalCityInput);
// //   // }, [arrivalCity]);

// //   return (
// //     <div className="flex flex-col gap-4 lg:mt-4 mt-2 items-center w-full">
// //       {sections.map((section, index) => (
// //         <div
// //           key={index}
// //           className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// //         >
// //           <div className="flex lg:flex-row flex-col items-center gap-2">
// //             <CityInput
// //               value={departureCityInput}
// //               data={departureCityOptions}
// //               label="From where?"
// //               placeholder="City"
// //               onSearch={setDepartureCityInput}
// //               loading={departureLoading}
// //               onChange={handleDepartureCityChange}
// //             />
// //             <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// //               <TransactionIcon size="10" stroke="#E5302f" />
// //             </div>
// //             <CityInput
// //               value={arrivalCityInput}
// //               data={arrivalCityOptions}
// //               label="To where?"
// //               placeholder="City"
// //               onSearch={setArrivalCityInput}
// //               loading={arrivalLoading}
// //               onChange={handleArrivalCityChange}
// //             />
// //           </div>

// //           <DateInput labelText="Departure" />

// //           <SelectInput
// //             data={ticketClasses}
// //             label="Class"
// //             placeholder="Class"
// //             value={selectedClass}
// //             onChange={setSelectedClass}
// //           />

// //           <Dropdown label="Passengers" btnText="Add passengers">
// //             <div className="flex flex-col gap-3 py-2">
// //               <PassengerCounter
// //                 label="Adults ( ≥ 12 years)"
// //                 count={section.adultCount}
// //                 increment={() => handleIncrement(index, "adultCount")}
// //                 decrement={() => handleDecrement(index, "adultCount")}
// //               />
// //               <PassengerCounter
// //                 label="Children ( 2 - 12 years)"
// //                 count={section.childCount}
// //                 increment={() => handleIncrement(index, "childCount")}
// //                 decrement={() => handleDecrement(index, "childCount")}
// //               />
// //               <PassengerCounter
// //                 label="Infants ( < 2 years)"
// //                 count={section.infantCount}
// //                 increment={() => handleIncrement(index, "infantCount")}
// //                 decrement={() => handleDecrement(index, "infantCount")}
// //               />
// //             </div>
// //           </Dropdown>
// //           <div className="flex gap-4">
// //             <Button
// //               className="bg-primaryRed duration-300 h-12 w-12"
// //               onClick={addSection}
// //             >
// //               <Plus />
// //             </Button>
// //             {sections.length > 1 && index > 0 && (
// //               <>
// //                 <Button
// //                   className="bg-primaryRed duration-300 h-12 w-12"
// //                   onClick={() => removeSection(index)}
// //                 >
// //                   <Trash />
// //                 </Button>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       ))}

// //       <Button className="bg-primaryRed duration-300">Search</Button>
// //     </div>
// //   );
// // };

// // export default MultiCityTab;

// // // working well
// // // import { useState, useEffect } from "react";
// // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // import SelectInput from "@/components/components/input/SelectInput";
// // // import { Button } from "@/components/ui/button";
// // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // import SubtractIcon from "@/assets/svg/SubtractIcon";
// // // import PlusIcon from "@/assets/svg/PlusIcon";
// // // import { toast } from "react-toastify";
// // // import DateInput from "@/components/components/input/DateInput";
// // // import { Plus, Trash } from "lucide-react";
// // // import { ticketClasses } from "../../data/data.json";
// // // import CityInput from "@/components/components/input/CityInput";
// // // import axiosInstance from "@/config/axios";
// // // import {
// // //   // PASSENGER_LIMIT,
// // //   NO_CITY_MESSAGE,
// // //   // NO_FLIGHT_MESSAGE,
// // //   PASSENGER_LIMIT_MESSAGE,
// // //   //   INFANT_EXCEED_ADULT_MESSAGE,
// // // } from "@/config/api";
// // // // import { Console } from "console";

// // // type DataItem = {
// // //   value: string;
// // //   label: React.ReactNode;
// // //   city: {
// // //     address: {
// // //       cityCode: string;
// // //       cityName: string;
// // //       countryName: string;
// // //     };
// // //     name: string;
// // //     iata: string;
// // //     city: string;
// // //     country: string;
// // //   };
// // // };

// // // interface PassengerCounterProps {
// // //   label: string;
// // //   count: number;
// // //   increment: () => void;
// // //   decrement: () => void;
// // // }

// // // const PassengerCounter = ({
// // //   label,
// // //   count,
// // //   increment,
// // //   decrement,
// // // }: PassengerCounterProps) => (
// // //   <div className="flex justify-between items-center">
// // //     <p className="text-sm font-medium">{label}</p>
// // //     <div className="flex gap-3">
// // //       <button
// // //         className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// // //         onClick={decrement}
// // //       >
// // //         <SubtractIcon stroke="#FFFFFF" />
// // //       </button>
// // //       <div className="w-[25px] h-[25px]">
// // //         <p className="text-sm font-medium">{count}</p>
// // //       </div>
// // //       <button
// // //         className="w-[25px] h-[25px] bg-primaryRed flex items-center rounded-full"
// // //         onClick={increment}
// // //       >
// // //         <PlusIcon stroke="#FFFFFF" />
// // //       </button>
// // //     </div>
// // //   </div>
// // // );

// // // interface Section {
// // //   adultCount: number;
// // //   childCount: number;
// // //   infantCount: number;
// // //   departureCity: string;
// // //   arrivalCity: string;
// // // }

// // // const MultiCityTab = () => {
// // //   // const [cityOptions, setCityOptions] = useState<DataItem[]>([]);
// // //   // const [loading, setLoading] = useState(false);
// // //   const [sections, setSections] = useState<Section[]>([
// // //     {
// // //       adultCount: 0,
// // //       childCount: 0,
// // //       infantCount: 0,
// // //       departureCity: "",
// // //       arrivalCity: "",
// // //     },
// // //   ]);

// // //   const [departureCityInput, setDepartureCityInput] = useState("");
// // //   const [arrivalCityInput, setArrivalCityInput] = useState("");
// // //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
// // //     []
// // //   );
// // //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // //   const [departureLoading, setDepartureLoading] = useState(false);
// // //   const [arrivalLoading, setArrivalLoading] = useState(false);
// // //   const [departureCity, setDepartureCity] = useState<string[]>([]);
// // //   const [arrivalCity, setArrivalCity] = useState<string[]>([]);
// // //   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // //   // const [citySearchTerm, setCitySearchTerm] = useState(""); // New state for search term

// // //   const totalPassengers = sections.reduce(
// // //     (total, section) =>
// // //       total + section.adultCount + section.childCount + section.infantCount,
// // //     0
// // //   );
// // //   const maxPassengers = 9;

// // //   const showErrorMessage = (message: string) => {
// // //     toast.error(message);
// // //   };

// // //   const handleIncrement = (index: number, field: keyof Section) => {
// // //     if (totalPassengers < maxPassengers) {
// // //       setSections((prevSections) =>
// // //         prevSections.map((section, i) =>
// // //           i === index
// // //             ? {
// // //                 ...section,
// // //                 [field]:
// // //                   typeof section[field] === "number"
// // //                     ? section[field] + 1
// // //                     : section[field], // Leave it unchanged if it's not a number
// // //               }
// // //             : section
// // //         )
// // //       );
// // //     } else {
// // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //     }
// // //   };

// // //   const handleDecrement = (index: number, field: keyof Section) => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section, i) =>
// // //         i === index
// // //           ? {
// // //               ...section,
// // //               [field]:
// // //                 typeof section[field] === "number"
// // //                   ? Math.max(0, section[field] - 1)
// // //                   : section[field], // Leave it unchanged if it's not a number
// // //             }
// // //           : section
// // //       )
// // //     );
// // //   };

// // //   const useDebounce = <T,>(value: T, delay: number): T => {
// // //     const [debouncedValue, setDebouncedValue] = useState(value);

// // //     useEffect(() => {
// // //       const handler = setTimeout(() => {
// // //         setDebouncedValue(value);
// // //       }, delay);

// // //       return () => {
// // //         clearTimeout(handler);
// // //       };
// // //     }, [value, delay]);

// // //     return debouncedValue;
// // //   };

// // //   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // //   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // //   const addSection = () => {
// // //     setSections((prevSections) => [
// // //       ...prevSections,
// // //       {
// // //         adultCount: 0,
// // //         childCount: 0,
// // //         infantCount: 0,
// // //         departureCity: "",
// // //         arrivalCity: "",
// // //       },
// // //     ]);
// // //   };

// // //   const removeSection = (index: number) => {
// // //     if (sections.length > 1) {
// // //       setSections((prevSections) => prevSections.filter((_, i) => i !== index));
// // //     }
// // //   };

// // //   const fetchCityData = async (
// // //     keyword: string,
// // //     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // //   ) => {
// // //     if (keyword.length < 2) return;

// // //     setLoading(true);
// // //     try {
// // //       const response = await axiosInstance.get(
// // //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // //       );

// // //       // console.log("testing testing testing", response["data"]);

// // //       const cityData = response.data?.map((item: any) => ({
// // //         value: item?.iata,
// // //         label: `${item?.name}`,
// // //         city: {
// // //           address: {
// // //             cityCode: item?.address?.cityCode,
// // //             cityName: item?.address?.cityName,
// // //             countryName: item?.address?.countryName,
// // //           },
// // //           name: item?.name,
// // //           iata: item?.iata,
// // //           city: item?.city,
// // //           country: item?.country,
// // //         },
// // //       }));

// // //       // console.log("another test", cityData);

// // //       if (cityData && cityData.length > 0) {
// // //         setCityOptions(cityData);
// // //       } else {
// // //         showErrorMessage(NO_CITY_MESSAGE);
// // //       }
// // //     } catch (error) {
// // //       showErrorMessage(NO_CITY_MESSAGE);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Debounce with useEffect for handling the city search input
// // //   useEffect(() => {
// // //     if (debouncedDepartureCity) {
// // //       fetchCityData(
// // //         debouncedDepartureCity,
// // //         setDepartureCityOptions,
// // //         setDepartureLoading
// // //       );
// // //     }
// // //   }, [debouncedDepartureCity]);

// // //   useEffect(() => {
// // //     if (debouncedArrivalCity) {
// // //       fetchCityData(
// // //         debouncedArrivalCity,
// // //         setArrivalCityOptions,
// // //         setArrivalLoading
// // //       );
// // //     }
// // //   }, [debouncedArrivalCity]);

// // //   const handleDepartureCityChange = (value: string, city: DataItem) => {
// // //     // If you want to push multiple city codes, you can add to an array
// // //     setDepartureCity([city.city.iata]); // Adds the new city to the array
// // //     setDepartureCityInput(`${city.city.iata}`); // Display city name and airport code in the input
// // //     console.log(value);
// // //     console.log("departureCity is", departureCity);
// // // };

// // //   const handleArrivalCityChange = (value: string, city: DataItem) => {
// // //     setArrivalCity([city.city.iata]); // Update with the airport code
// // //     setArrivalCityInput(`${city.city.iata}`); // Display city and airport code in the input
// // //     console.log(value);
// // //     console.log("arrivalcity is", arrivalCity);
// // //   };

// // //   // useEffect(() => {
// // //   //   console.log("Updated departureCity:", departureCity);
// // //   //   console.log("Updated departureCityInput:", departureCityOptions);
// // //   // }, [departureCity]);

// // //   // useEffect(() => {
// // //   //   console.log("Updated arrivalCity:", arrivalCity);
// // //   //   console.log("Updated arrivalCityInput:", arrivalCityInput);
// // //   // }, [arrivalCity]);

// // //   return (
// // //     <div className="flex flex-col gap-4 lg:mt-4 mt-2 items-center w-full">
// // //       {sections.map((section, index) => (
// // //         <div
// // //           key={index}
// // //           className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // //         >
// // //           <div className="flex lg:flex-row flex-col items-center gap-2">
// // //             <CityInput
// // //               value={departureCityInput}
// // //               data={departureCityOptions}
// // //               label="From where?"
// // //               placeholder="City"
// // //               onSearch={setDepartureCityInput}
// // //               loading={departureLoading}
// // //               onChange={handleDepartureCityChange}
// // //             />
// // //             <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // //               <TransactionIcon size="10" stroke="#E5302f" />
// // //             </div>
// // //             <CityInput
// // //               value={arrivalCityInput}
// // //               data={arrivalCityOptions}
// // //               label="To where?"
// // //               placeholder="City"
// // //               onSearch={setArrivalCityInput}
// // //               loading={arrivalLoading}
// // //               onChange={handleArrivalCityChange}
// // //             />
// // //           </div>

// // //           <DateInput labelText="Departure" />

// // //           <SelectInput
// // //             data={ticketClasses}
// // //             label="Class"
// // //             placeholder="Class"
// // //             value={selectedClass}
// // //             onChange={setSelectedClass}
// // //           />

// // //           <Dropdown label="Passengers" btnText="Add passengers">
// // //             <div className="flex flex-col gap-3 py-2">
// // //               <PassengerCounter
// // //                 label="Adults ( ≥ 12 years)"
// // //                 count={section.adultCount}
// // //                 increment={() => handleIncrement(index, "adultCount")}
// // //                 decrement={() => handleDecrement(index, "adultCount")}
// // //               />
// // //               <PassengerCounter
// // //                 label="Children ( 2 - 12 years)"
// // //                 count={section.childCount}
// // //                 increment={() => handleIncrement(index, "childCount")}
// // //                 decrement={() => handleDecrement(index, "childCount")}
// // //               />
// // //               <PassengerCounter
// // //                 label="Infants ( < 2 years)"
// // //                 count={section.infantCount}
// // //                 increment={() => handleIncrement(index, "infantCount")}
// // //                 decrement={() => handleDecrement(index, "infantCount")}
// // //               />
// // //             </div>
// // //           </Dropdown>
// // //           <div className="flex gap-4">
// // //             <Button
// // //               className="bg-primaryRed duration-300 h-12 w-12"
// // //               onClick={addSection}
// // //             >
// // //               <Plus />
// // //             </Button>
// // //             {sections.length > 1 && index > 0 && (
// // //               <>
// // //                 <Button
// // //                   className="bg-primaryRed duration-300 h-12 w-12"
// // //                   onClick={() => removeSection(index)}
// // //                 >
// // //                   <Trash />
// // //                 </Button>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>
// // //       ))}

// // //       <Button className="bg-primaryRed duration-300">Search</Button>
// // //     </div>
// // //   );
// // // };

// // // export default MultiCityTab;




// // // import React, { useState, useCallback, useEffect } from "react";
// // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // import { format } from "date-fns";
// // // import SelectInput from "@/components/components/input/SelectInput";
// // // import { Button } from "@/components/ui/button";
// // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // import { toast } from "react-toastify";
// // // import axiosInstance from "@/config/axios";
// // // import { ticketClasses } from "../../data/data.json";
// // // import CityInput from "@/components/components/input/CityInput";
// // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   PASSENGER_LIMIT,
// // //   NO_CITY_MESSAGE,
// // //   // NO_FLIGHT_MESSAGE,
// // //   PASSENGER_LIMIT_MESSAGE,
// // //   //   INFANT_EXCEED_ADULT_MESSAGE,
// // // } from "@/config/api";
// // // import DateInput from "@/components/components/input/DateInput";
// // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // import { Trash2 } from "lucide-react"; // Import Trash icon

// // // type DataItem = {
// // //   value: string;
// // //   label: React.ReactNode;
// // //   city: {
// // //     address: {
// // //       cityCode?: string;
// // //       cityName?: string;
// // //       countryName?: string;
// // //     };
// // //     name: string;
// // //     iata: string;
// // //     city: string;
// // //     country: string;
// // //   };
// // // };

// // // interface Section {
// // //   id: string; // Add a unique ID field
// // //   departureCityInput: string;
// // //   departureCity: string;
// // //   arrivalCityInput: string;
// // //   arrivalCity: string;
// // //   departureDate: Date;
// // //   adultCount: number;
// // //   childCount: number;
// // //   infantCount: number;
// // //   selectedClass: string;
// // // }

// // // const MultiCityTab = () => {
// // //   const navigate = useNavigate();

// // //   // Initialize sections with at least one adult
// // //   const [sections, setSections] = useState<Section[]>([
// // //     {
// // //       id: uuidv4(), // Assign a unique ID
// // //       departureCityInput: "",
// // //       departureCity: "",
// // //       arrivalCityInput: "",
// // //       arrivalCity: "",
// // //       departureDate: new Date(),
// // //       adultCount: 1,
// // //       childCount: 0,
// // //       infantCount: 0,
// // //       selectedClass: ticketClasses[0].value,
// // //     },
// // //   ]);

// // //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
// // //     []
// // //   );
// // //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // //   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // //   const [departureLoading, setDepartureLoading] = useState(false);
// // //   const [arrivalLoading, setArrivalLoading] = useState(false);

// // //   const [departureCityInput, setDepartureCityInput] = useState("");
// // //   const [arrivalCityInput, setArrivalCityInput] = useState("");
// // //   const [departureCity, setDepartureCity] = useState<string[]>([]);
// // //   const [arrivalCity, setArrivalCity] = useState<string[]>([]);
// // //   const [departureDate, setDepartureDate] = useState(new Date());
// // //   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // //   const showErrorMessage = useCallback((message: string) => {
// // //     toast.error(message);
// // //   }, []);

// // //   // Calculate total passengers across all sections
// // //   const totalPassengers = sections.reduce(
// // //     (sum, section) =>
// // //       sum + section.adultCount + section.childCount + section.infantCount,
// // //     0
// // //   );

// // //   const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // //   const handleIncrement = (index: number, field: keyof Section) => {
// // //     if (totalPassengers < maxPassengers) {
// // //       setSections((prevSections) =>
// // //         prevSections.map((section, i) =>
// // //           i === index
// // //             ? {
// // //                 ...section,
// // //                 [field]:
// // //                   typeof section[field] === "number"
// // //                     ? section[field] + 1
// // //                     : section[field], // Leave it unchanged if it's not a number
// // //               }
// // //             : section
// // //         )
// // //       );
// // //     } else {
// // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //     }
// // //   };

// // //   const handleDecrement = (index: number, field: keyof Section) => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section, i) =>
// // //         i === index
// // //           ? {
// // //               ...section,
// // //               [field]:
// // //                 typeof section[field] === "number"
// // //                   ? Math.max(0, section[field] - 1)
// // //                   : section[field], // Leave it unchanged if it's not a number
// // //             }
// // //           : section
// // //       )
// // //     );
// // //   };

// // //   // Ensure infants do not exceed adults in each section
// // //   useEffect(() => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section) => {
// // //         if (section.infantCount > section.adultCount) {
// // //           return { ...section, infantCount: section.adultCount };
// // //         }
// // //         return section;
// // //       })
// // //     );
// // //   }, [sections]);

// // //   const useDebounce = <T,>(value: T, delay: number): T => {
// // //     const [debouncedValue, setDebouncedValue] = useState(value);

// // //     useEffect(() => {
// // //       const handler = setTimeout(() => {
// // //         setDebouncedValue(value);
// // //       }, delay);

// // //       return () => {
// // //         clearTimeout(handler);
// // //       };
// // //     }, [value, delay]);

// // //     return debouncedValue;
// // //   };

// // //   // Debounce inputs for each section
// // //   // const debouncedDepartureCity = sections.map((section) =>
// // //   //   useDebounce(section.departureCityInput, 300)
// // //   // );
// // //   // const debouncedArrivalCity = sections.map((section) =>
// // //   //   useDebounce(section.arrivalCityInput, 300)
// // //   // );

// // //   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // //   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // //   const addSection = () => {
// // //     setSections((prevSections) => [
// // //       ...prevSections,
// // //       {
// // //         id: uuidv4(), // Assign a unique ID
// // //         departureCityInput: "",
// // //         departureCity: "",
// // //         arrivalCityInput: "",
// // //         arrivalCity: "",
// // //         departureDate: new Date(),
// // //         adultCount: 1,
// // //         childCount: 0,
// // //         infantCount: 0,
// // //         selectedClass: ticketClasses[0].value,
// // //       },
// // //     ]);
// // //   };

// // //   const deleteSection = (index: number) => {
// // //     setSections((prevSections) => {
// // //       if (prevSections.length === 1) {
// // //         // Prevent deleting the last remaining section
// // //         showErrorMessage("At least one section is required.");
// // //         return prevSections;
// // //       }
// // //       return prevSections.filter((_, i) => i !== index);
// // //     });
// // //   };

// // //   const fetchCityData = async (
// // //     keyword: string,
// // //     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // //   ) => {
// // //     if (keyword.length < 2) return;

// // //     setLoading(true);
// // //     try {
// // //       const response = await axiosInstance.get(
// // //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // //       );

// // //       console.log("testing testing testing", response['data'])

// // //       const cityData = response.data?.map((item: any) => ({
// // //         value: item?.iata,
// // //         label: `${item?.name}`,
// // //         city: {
// // //           address: {
// // //             cityCode: item?.address?.cityCode,
// // //             cityName: item?.address?.cityName,
// // //             countryName: item?.address?.countryName,
// // //           },
// // //           name: item?.name,
// // //           iata: item?.iata,
// // //           city: item?.city,
// // //           country: item?.country,
// // //         },
// // //       }));

// // //       console.log("another test", cityData)

// // //       if (cityData && cityData.length > 0) {
// // //         setCityOptions(cityData);
// // //       } else {
// // //         showErrorMessage(NO_CITY_MESSAGE);
// // //       }
// // //     } catch (error) {
// // //       showErrorMessage(NO_CITY_MESSAGE);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (debouncedDepartureCity) {
// // //       fetchCityData(
// // //         debouncedDepartureCity,
// // //         setDepartureCityOptions,
// // //         setDepartureLoading
// // //       );
// // //     }
// // //   }, [debouncedDepartureCity]);

// // //   useEffect(() => {
// // //     if (debouncedArrivalCity) {
// // //       fetchCityData(
// // //         debouncedArrivalCity,
// // //         setArrivalCityOptions,
// // //         setArrivalLoading
// // //       );
// // //     }
// // //   }, [debouncedArrivalCity]);

// // //   const searchFlight = useCallback(async () => {
// // //     for (const section of sections) {
// // //       if (!section.departureCity || !section.arrivalCity) {
// // //         // Show error message if the cities are missing
// // //         showErrorMessage("Please provide valid departure and arrival cities.");
// // //         return; // Stop execution if validation fails
// // //       }
// // //     }

// // //     setFlightSearchLoading(true);
// // //     const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";

// // //     const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // //     const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // //     const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // //     const originDestinations = sections.map((section) => ({
// // //       id: section.id, // Use the unique ID
// // //       originLocationCode: section.departureCity,
// // //       destinationLocationCode: section.arrivalCity,
// // //       departureDateTimeRange: {
// // //         date: format(section.departureDate, "yyyy-MM-dd"), // Ensure each section uses its own date
// // //         time: "10:00:00", // You might want to make this dynamic
// // //       },
// // //     }));

// // //     const payload = {
// // //       currencyCode: "NGN",
// // //       originDestinations,
// // //       travelers: [
// // //         ...Array.from({ length: totalAdults }, (_, i) => ({
// // //           id: `${i + 1}`,
// // //           travelerType: "ADULT",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //         ...Array.from({ length: totalChildren }, (_, i) => ({
// // //           id: `${totalAdults + i + 1}`,
// // //           travelerType: "CHILD",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //         ...Array.from({ length: totalInfants }, (_, i) => ({
// // //           id: `${totalAdults + totalChildren + i + 1}`,
// // //           travelerType: "HELD_INFANT",
// // //           associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //       ],
// // //       sources: ["GDS"],
// // //       searchCriteria: {
// // //         maxFlightOffers: 50,
// // //         pricingOptions: {
// // //           fareType: ["PUBLISHED"],
// // //         },
// // //         flightFilters: {
// // //           cabinRestrictions: [
// // //             {
// // //               cabin: selectedClass.toUpperCase(),
// // //               coverage: "MOST_SEGMENTS",
// // //               originDestinationIds: originDestinations.map((dest) => dest.id), // Use unique IDs
// // //             },
// // //           ],
// // //         },
// // //       },
// // //       additionalInformation: {
// // //         brandedFares: true,
// // //       },
// // //     };

// // //     try {
// // //       const response = await fetch(apiUrl, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer YOUR_API_TOKEN`,
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Network response was not ok");
// // //       }

// // //       const data = await response.json();
// // //       console.log("Flight data", data.data);

// // //       navigate("/MultiCitySearch", {
// // //         state: {
// // //           searchResults: data.data,
// // //           searchParams: {
// // //             departureCity,
// // //             arrivalCity,
// // //             departureDate,
// // //             adultCount: totalAdults,
// // //             childCount: totalChildren,
// // //             infantCount: totalInfants,
// // //             selectedClass,
// // //           },
// // //         },
// // //       });
// // //     } catch (error) {
// // //       console.error("Error fetching flight data:", error);
// // //       showErrorMessage("Failed to fetch flight data.");
// // //     } finally {
// // //       setFlightSearchLoading(false);
// // //     }
// // //   }, [
// // //     sections,
// // //     selectedClass,
// // //     showErrorMessage,
// // //     navigate,
// // //   ]);

// // //   const handleDepartureDateChange = useCallback(
// // //     (date: Date | undefined) => setDepartureDate(date || new Date()),
// // //     []
// // //   );

// // //   const handleDepartureCityChange = (value: string, city: DataItem) => {
// // //     // If you want to push multiple city codes, you can add to an array
// // //     setDepartureCity(prevCities => [...prevCities, city.city.iata]); // Adds the new city to the array
// // //     setDepartureCityInput(`${city.city.iata}`); // Display city name and airport code in the input
// // //     console.log(value);
// // //     console.log("departureCity is", departureCity);
// // // };

// // //   const handleArrivalCityChange = (value: string, city: DataItem) => {
// // //     setArrivalCity(prevCities => [...prevCities, city.city.iata]); // Update with the airport code
// // //     setArrivalCityInput(`${city.city.iata}`); // Display city and airport code in the input
// // //     console.log(value);
// // //     console.log("arrivalcity is", arrivalCity);
// // //   };

// // //   useEffect(() => {
// // //     console.log("Updated departureCity:", departureCity);
// // //     console.log("Updated departureCityInput:", departureCityOptions);
// // //   }, [departureCity]);

// // //   useEffect(() => {
// // //     console.log("Updated arrivalCity:", arrivalCity);
// // //     console.log("Updated arrivalCityInput:", arrivalCityInput);
// // //   }, [arrivalCity]);

// // //   return (
// // //     <div className="flex flex-col gap-5 w-full items-center">
// // //       {sections.map((section, index) => (
// // //         <div
// // //           key={section.id}
// // //           className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // //         >
// // //           <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // //             <CityInput
// // //               value={section.departureCityInput}
// // //               data={departureCityOptions}
// // //               label="From where?"
// // //               placeholder="City"
// // //               onSearch={setDepartureCityInput}
// // //               loading={departureLoading}
// // //               onChange={handleDepartureCityChange}
// // //             />

// // //             <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // //               <TransactionIcon size="10" stroke="#E5302f" />
// // //             </div>

// // //             <CityInput
// // //               value={section.arrivalCityInput}
// // //               data={arrivalCityOptions}
// // //               label="To where?"
// // //               placeholder="City"
// // //               onSearch={setArrivalCityInput}
// // //               loading={arrivalLoading}
// // //               onChange={handleArrivalCityChange}
// // //             />
// // //           </div>

// // //           <DateInput
// // //             labelText="Departure"
// // //             onChange={handleDepartureDateChange}
// // //           />

// // //           <SelectInput
// // //             data={ticketClasses}
// // //             label="Class"
// // //             placeholder="Class"
// // //             value={selectedClass}
// // //             onChange={setSelectedClass}
// // //           />

// // //           <Dropdown label="Passengers" btnText="Add passengers">
// // //             <div className="flex flex-col gap-3 py-2">
// // //               <PassengerCounter
// // //                 label="Adults ( ≥ 12 years)"
// // //                 count={section.adultCount}
// // //                 increment={() => handleIncrement(index, "adultCount")}
// // //                 decrement={() => handleDecrement(index, "adultCount")}
// // //               />
// // //               <PassengerCounter
// // //                 label="Children ( 2 - 12 years)"
// // //                 count={section.childCount}
// // //                 increment={() => handleIncrement(index, "childCount")}
// // //                 decrement={() => handleDecrement(index, "childCount")}
// // //               />
// // //               <PassengerCounter
// // //                 label="Infants ( < 2 years)"
// // //                 count={section.infantCount}
// // //                 increment={() => handleIncrement(index, "infantCount")}
// // //                 decrement={() => handleDecrement(index, "infantCount")}
// // //               />
// // //             </div>
// // //           </Dropdown>

// // //           {/* Delete Button */}
// // //           {sections.length > 1 && (
// // //             <Button
// // //               variant="destructive"
// // //               className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
// // //               onClick={() => deleteSection(index)}
// // //               aria-label="Delete section"
// // //             >
// // //               <Trash2 size={16} color="#FFFFFF" />
// // //             </Button>
// // //           )}
// // //         </div>
// // //       ))}

// // //       <div className="flex gap-5">
// // //         <Button className="bg-primaryRed duration-300 h-12" onClick={addSection}>
// // //           Add Another Flight
// // //           {/* <Plus /> */}
// // //         </Button>

// // //         <Button
// // //           className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
// // //           onClick={searchFlight}
// // //           disabled={flightSearchLoading}
// // //         >
// // //           {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MultiCityTab;

// // // import React, { useState, useCallback, useEffect } from "react";
// // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // import { format } from "date-fns";
// // // import SelectInput from "@/components/components/input/SelectInput";
// // // import { Button } from "@/components/ui/button";
// // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // import { toast } from "react-toastify";
// // // import axiosInstance from "@/config/axios";
// // // import { ticketClasses } from "../../data/data.json";
// // // import CityInput from "@/components/components/input/CityInput";
// // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   PASSENGER_LIMIT,
// // //   NO_CITY_MESSAGE,
// // //   PASSENGER_LIMIT_MESSAGE,
// // // } from "@/config/api";
// // // import DateInput from "@/components/components/input/DateInput";
// // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // import { Trash2 } from "lucide-react"; // Import Trash icon

// // // type DataItem = {
// // //   value: string;
// // //   label: React.ReactNode;
// // //   city: {
// // //     address: {
// // //       cityCode?: string;
// // //       cityName?: string;
// // //       countryName?: string;
// // //     };
// // //     name: string;
// // //     iata: string;
// // //     city: string;
// // //     country: string;
// // //   };
// // // };

// // // interface Section {
// // //   id: string; // Add a unique ID field
// // //   departureCityInput: string;
// // //   departureCity: string;
// // //   arrivalCityInput: string;
// // //   arrivalCity: string;
// // //   departureDate: Date;
// // //   adultCount: number;
// // //   childCount: number;
// // //   infantCount: number;
// // //   selectedClass: string;
// // // }

// // // const MultiCityTab = () => {
// // //   const navigate = useNavigate();

// // //   // Initialize sections with at least one adult
// // //   const [sections, setSections] = useState<Section[]>([
// // //     {
// // //       id: uuidv4(), // Assign a unique ID
// // //       departureCityInput: "",
// // //       departureCity: "",
// // //       arrivalCityInput: "",
// // //       arrivalCity: "",
// // //       departureDate: new Date(),
// // //       adultCount: 1,
// // //       childCount: 0,
// // //       infantCount: 0,
// // //       selectedClass: ticketClasses[0].value,
// // //     },
// // //   ]);

// // //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
// // //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // //   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // //   const [departureLoading, setDepartureLoading] = useState(false);
// // //   const [arrivalLoading, setArrivalLoading] = useState(false);

// // //   const [departureCityInput, setDepartureCityInput] = useState("");
// // //   const [arrivalCityInput, setArrivalCityInput] = useState("");
// // //   const [departureCity, setDepartureCity] = useState<string[]>([]);
// // //   const [arrivalCity, setArrivalCity] = useState<string[]>([]);
// // //   const [departureDate, setDepartureDate] = useState(new Date());
// // //   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // //   const showErrorMessage = useCallback((message: string) => {
// // //     toast.error(message);
// // //   }, []);

// // //   // Calculate total passengers across all sections
// // //   const totalPassengers = sections.reduce(
// // //     (sum, section) =>
// // //       sum + section.adultCount + section.childCount + section.infantCount,
// // //     0
// // //   );

// // //   const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // //   const handleIncrement = (index: number, field: keyof Section) => {
// // //     if (totalPassengers < maxPassengers) {
// // //       setSections((prevSections) =>
// // //         prevSections.map((section, i) =>
// // //           i === index
// // //             ? {
// // //                 ...section,
// // //                 [field]:
// // //                   typeof section[field] === "number"
// // //                     ? section[field] + 1
// // //                     : section[field], // Leave it unchanged if it's not a number
// // //               }
// // //             : section
// // //         )
// // //       );
// // //     } else {
// // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //     }
// // //   };

// // //   const handleDecrement = (index: number, field: keyof Section) => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section, i) =>
// // //         i === index
// // //           ? {
// // //               ...section,
// // //               [field]:
// // //                 typeof section[field] === "number"
// // //                   ? Math.max(0, section[field] - 1)
// // //                   : section[field], // Leave it unchanged if it's not a number
// // //             }
// // //           : section
// // //       )
// // //     );
// // //   };

// // //   // Ensure infants do not exceed adults in each section
// // //   useEffect(() => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section) => {
// // //         if (section.infantCount > section.adultCount) {
// // //           return { ...section, infantCount: section.adultCount };
// // //         }
// // //         return section;
// // //       })
// // //     );
// // //   }, [sections]);

// // //   const useDebounce = <T,>(value: T, delay: number): T => {
// // //     const [debouncedValue, setDebouncedValue] = useState(value);

// // //     useEffect(() => {
// // //       const handler = setTimeout(() => {
// // //         setDebouncedValue(value);
// // //       }, delay);

// // //       return () => {
// // //         clearTimeout(handler);
// // //       };
// // //     }, [value, delay]);

// // //     return debouncedValue;
// // //   };

// // //   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // //   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // //   const addSection = () => {
// // //     setSections((prevSections) => [
// // //       ...prevSections,
// // //       {
// // //         id: uuidv4(), // Assign a unique ID
// // //         departureCityInput: "",
// // //         departureCity: "",
// // //         arrivalCityInput: "",
// // //         arrivalCity: "",
// // //         departureDate: new Date(),
// // //         adultCount: 1,
// // //         childCount: 0,
// // //         infantCount: 0,
// // //         selectedClass: ticketClasses[0].value,
// // //       },
// // //     ]);
// // //   };

// // //   const deleteSection = (index: number) => {
// // //     setSections((prevSections) => {
// // //       if (prevSections.length === 1) {
// // //         // Prevent deleting the last remaining section
// // //         showErrorMessage("At least one section is required.");
// // //         return prevSections;
// // //       }
// // //       return prevSections.filter((_, i) => i !== index);
// // //     });
// // //   };

// // //   const fetchCityData = async (
// // //     keyword: string,
// // //     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // //   ) => {
// // //     if (keyword.length < 2) return;

// // //     setLoading(true);
// // //     try {
// // //       const response = await axiosInstance.get(
// // //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // //       );

// // //       const cityData = response.data?.map((item: any) => ({
// // //         value: item?.iata,
// // //         label: `${item?.name}`,
// // //         city: {
// // //           address: {
// // //             cityCode: item?.address?.cityCode,
// // //             cityName: item?.address?.cityName,
// // //             countryName: item?.address?.countryName,
// // //           },
// // //           name: item?.name,
// // //           iata: item?.iata,
// // //           city: item?.city,
// // //           country: item?.country,
// // //         },
// // //       }));

// // //       if (cityData && cityData.length > 0) {
// // //         setCityOptions(cityData);
// // //       } else {
// // //         showErrorMessage(NO_CITY_MESSAGE);
// // //       }
// // //     } catch (error) {
// // //       showErrorMessage(NO_CITY_MESSAGE);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (debouncedDepartureCity) {
// // //       fetchCityData(
// // //         debouncedDepartureCity,
// // //         setDepartureCityOptions,
// // //         setDepartureLoading
// // //       );
// // //     }
// // //   }, [debouncedDepartureCity]);

// // //   useEffect(() => {
// // //     if (debouncedArrivalCity) {
// // //       fetchCityData(
// // //         debouncedArrivalCity,
// // //         setArrivalCityOptions,
// // //         setArrivalLoading
// // //       );
// // //     }
// // //   }, [debouncedArrivalCity]);

// // //   const searchFlight = useCallback(async () => {
// // //     for (const section of sections) {
// // //       if (!section.departureCity || !section.arrivalCity) {
// // //         showErrorMessage("Please provide valid departure and arrival cities.");
// // //         return;
// // //       }
// // //     }

// // //     setFlightSearchLoading(true);
// // //     const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";

// // //     const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // //     const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // //     const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // //     const originDestinations = sections.map((section) => ({
// // //       id: section.id, // Use the unique ID
// // //       originLocationCode: section.departureCity,
// // //       destinationLocationCode: section.arrivalCity,
// // //       departureDateTimeRange: {
// // //         date: format(section.departureDate, "yyyy-MM-dd"),
// // //         time: "10:00:00",
// // //       },
// // //     }));

// // //     const payload = {
// // //       currencyCode: "NGN",
// // //       originDestinations,
// // //       travelers: [
// // //         ...Array.from({ length: totalAdults }, (_, i) => ({
// // //           id: `${i + 1}`,
// // //           travelerType: "ADULT",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //         ...Array.from({ length: totalChildren }, (_, i) => ({
// // //           id: `${totalAdults + i + 1}`,
// // //           travelerType: "CHILD",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //         ...Array.from({ length: totalInfants }, (_, i) => ({
// // //           id: `${totalAdults + totalChildren + i + 1}`,
// // //           travelerType: "INFANT",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //       ],
// // //       sources: ["ATP"],
// // //       searchCriteria: {
// // //         maxResults: 50,
// // //         cabinClasses: sections.map((section) => section.selectedClass),
// // //       },
// // //     };

// // //     try {
// // //       const response = await axiosInstance.post(apiUrl, payload);
// // //       const searchResults = response.data;

// // //       // Redirect to results page with searchResults
// // //       navigate("/flights/results", { state: { searchResults } });
// // //     } catch (error) {
// // //       showErrorMessage("An error occurred while searching for flights.");
// // //     } finally {
// // //       setFlightSearchLoading(false);
// // //     }
// // //   }, [sections, navigate, showErrorMessage]);

// // //   return (
// // //     <div className="flex flex-col">
// // //       {sections.map((section, index) => (
// // //         <div key={section.id} className="mb-6">
// // //           <div className="flex items-center mb-4">
// // //             <h3 className="font-semibold text-lg mr-auto">
// // //               Flight {index + 1}
// // //             </h3>
// // //             {sections.length > 1 && (
// // //               <Button
// // //                 variant="outline"
// // //                 onClick={() => deleteSection(index)}
// // //                 className="ml-2 text-red-500"
// // //               >
// // //                 <Trash2 className="w-5 h-5" />
// // //               </Button>
// // //             )}
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// // //             <CityInput
// // //               label="Departure City"
// // //               value={section.departureCityInput}
// // //               options={departureCityOptions}
// // //               onChange={(value) =>
// // //                 setSections((prevSections) =>
// // //                   prevSections.map((s, i) =>
// // //                     i === index
// // //                       ? { ...s, departureCityInput: value }
// // //                       : s
// // //                   )
// // //                 )
// // //               }
// // //               onSelect={(value) =>
// // //                 setSections((prevSections) =>
// // //                   prevSections.map((s, i) =>
// // //                     i === index
// // //                       ? { ...s, departureCity: value }
// // //                       : s
// // //                   )
// // //                 )
// // //               }
// // //               placeholder="Enter departure city"
// // //               loading={departureLoading}
// // //             />
// // //             <CityInput
// // //               label="Arrival City"
// // //               value={section.arrivalCityInput}
// // //               options={arrivalCityOptions}
// // //               onChange={(value) =>
// // //                 setSections((prevSections) =>
// // //                   prevSections.map((s, i) =>
// // //                     i === index
// // //                       ? { ...s, arrivalCityInput: value }
// // //                       : s
// // //                   )
// // //                 )
// // //               }
// // //               onSelect={(value) =>
// // //                 setSections((prevSections) =>
// // //                   prevSections.map((s, i) =>
// // //                     i === index
// // //                       ? { ...s, arrivalCity: value }
// // //                       : s
// // //                   )
// // //                 )
// // //               }
// // //               placeholder="Enter arrival city"
// // //               loading={arrivalLoading}
// // //             />
// // //             <DateInput
// // //               label="Departure Date"
// // //               value={section.departureDate}
// // //               onChange={(date) =>
// // //                 setSections((prevSections) =>
// // //                   prevSections.map((s, i) =>
// // //                     i === index ? { ...s, departureDate: date } : s
// // //                   )
// // //                 )
// // //               }
// // //             />
// // //           </div>
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
// // //             <PassengerCounter
// // //               label="Adults"
// // //               value={section.adultCount}
// // //               onIncrement={() => handleIncrement(index, "adultCount")}
// // //               onDecrement={() => handleDecrement(index, "adultCount")}
// // //             />
// // //             <PassengerCounter
// // //               label="Children"
// // //               value={section.childCount}
// // //               onIncrement={() => handleIncrement(index, "childCount")}
// // //               onDecrement={() => handleDecrement(index, "childCount")}
// // //             />
// // //             <PassengerCounter
// // //               label="Infants"
// // //               value={section.infantCount}
// // //               onIncrement={() => handleIncrement(index, "infantCount")}
// // //               onDecrement={() => handleDecrement(index, "infantCount")}
// // //             />
// // //             <Dropdown
// // //               label="Class"
// // //               value={section.selectedClass}
// // //               onChange={(value) =>
// // //                 setSections((prevSections) =>
// // //                   prevSections.map((s, i) =>
// // //                     i === index ? { ...s, selectedClass: value } : s
// // //                   )
// // //                 )
// // //               }
// // //               options={ticketClasses}
// // //             />
// // //           </div>
// // //         </div>
// // //       ))}
// // //       <div className="flex justify-between">
// // //         <Button variant="outline" onClick={addSection} className="mr-4">
// // //           Add another flight
// // //         </Button>
// // //         <Button
// // //           variant="primary"
// // //           onClick={searchFlight}
// // //           disabled={flightSearchLoading}
// // //         >
// // //           {flightSearchLoading ? (
// // //             <Loading message="Searching for flights..." />
// // //           ) : (
// // //             "Search Flights"
// // //           )}
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MultiCityTab;

// // // import React, { useState, useCallback, useEffect } from "react";
// // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // import { format } from "date-fns";
// // // import SelectInput from "@/components/components/input/SelectInput";
// // // import { Button } from "@/components/ui/button";
// // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // import { toast } from "react-toastify";
// // // import axiosInstance from "@/config/axios";
// // // import { ticketClasses } from "../../data/data.json";
// // // import CityInput from "@/components/components/input/CityInput";
// // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   PASSENGER_LIMIT,
// // //   NO_CITY_MESSAGE,
// // //   // NO_FLIGHT_MESSAGE,
// // //   PASSENGER_LIMIT_MESSAGE,
// // //   //   INFANT_EXCEED_ADULT_MESSAGE,
// // // } from "@/config/api";
// // // import DateInput from "@/components/components/input/DateInput";
// // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // import { Trash2 } from "lucide-react"; // Import Trash icon

// // // type DataItem = {
// // //   value: string;
// // //   label: React.ReactNode;
// // //   city: {
// // //     address: {
// // //       cityCode?: string;
// // //       cityName?: string;
// // //       countryName?: string;
// // //     };
// // //     name: string;
// // //     iata: string;
// // //     city: string;
// // //     country: string;
// // //   };
// // // };

// // // interface Section {
// // //   id: string; // Add a unique ID field
// // //   departureCityInput: string;
// // //   departureCity: string;
// // //   arrivalCityInput: string;
// // //   arrivalCity: string;
// // //   departureDate: Date;
// // //   adultCount: number;
// // //   childCount: number;
// // //   infantCount: number;
// // //   selectedClass: string;
// // // }

// // // const MultiCityTab = () => {
// // //   const navigate = useNavigate();

// // //   // Initialize sections with at least one adult
// // //   const [sections, setSections] = useState<Section[]>([
// // //     {
// // //       id: uuidv4(), // Assign a unique ID
// // //       departureCityInput: "",
// // //       departureCity: "",
// // //       arrivalCityInput: "",
// // //       arrivalCity: "",
// // //       departureDate: new Date(),
// // //       adultCount: 1,
// // //       childCount: 0,
// // //       infantCount: 0,
// // //       selectedClass: ticketClasses[0].value,
// // //     },
// // //   ]);

// // //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>(
// // //     []
// // //   );
// // //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // //   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // //   const [departureLoading, setDepartureLoading] = useState(false);
// // //   const [arrivalLoading, setArrivalLoading] = useState(false);

// // //   const [departureCityInput, setDepartureCityInput] = useState("");
// // //   const [arrivalCityInput, setArrivalCityInput] = useState("");
// // //   const [departureCity, setDepartureCity] = useState<string[]>([]);
// // //   const [arrivalCity, setArrivalCity] = useState<string[]>([]);
// // //   const [departureDate, setDepartureDate] = useState(new Date());
// // //   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // //   const showErrorMessage = useCallback((message: string) => {
// // //     toast.error(message);
// // //   }, []);

// // //   // Calculate total passengers across all sections
// // //   const totalPassengers = sections.reduce(
// // //     (sum, section) =>
// // //       sum + section.adultCount + section.childCount + section.infantCount,
// // //     0
// // //   );

// // //   const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // //   const handleIncrement = (index: number, field: keyof Section) => {
// // //     if (totalPassengers < maxPassengers) {
// // //       setSections((prevSections) =>
// // //         prevSections.map((section, i) =>
// // //           i === index
// // //             ? {
// // //                 ...section,
// // //                 [field]:
// // //                   typeof section[field] === "number"
// // //                     ? section[field] + 1
// // //                     : section[field], // Leave it unchanged if it's not a number
// // //               }
// // //             : section
// // //         )
// // //       );
// // //     } else {
// // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //     }
// // //   };

// // //   const handleDecrement = (index: number, field: keyof Section) => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section, i) =>
// // //         i === index
// // //           ? {
// // //               ...section,
// // //               [field]:
// // //                 typeof section[field] === "number"
// // //                   ? Math.max(0, section[field] - 1)
// // //                   : section[field], // Leave it unchanged if it's not a number
// // //             }
// // //           : section
// // //       )
// // //     );
// // //   };

// // //   // Ensure infants do not exceed adults in each section
// // //   useEffect(() => {
// // //     setSections((prevSections) =>
// // //       prevSections.map((section) => {
// // //         if (section.infantCount > section.adultCount) {
// // //           return { ...section, infantCount: section.adultCount };
// // //         }
// // //         return section;
// // //       })
// // //     );
// // //   }, [sections]);

// // //   const useDebounce = <T,>(value: T, delay: number): T => {
// // //     const [debouncedValue, setDebouncedValue] = useState(value);

// // //     useEffect(() => {
// // //       const handler = setTimeout(() => {
// // //         setDebouncedValue(value);
// // //       }, delay);

// // //       return () => {
// // //         clearTimeout(handler);
// // //       };
// // //     }, [value, delay]);

// // //     return debouncedValue;
// // //   };

// // //   // Debounce inputs for each section
// // //   // const debouncedDepartureCity = sections.map((section) =>
// // //   //   useDebounce(section.departureCityInput, 300)
// // //   // );
// // //   // const debouncedArrivalCity = sections.map((section) =>
// // //   //   useDebounce(section.arrivalCityInput, 300)
// // //   // );

// // //   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // //   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // //   const addSection = () => {
// // //     setSections((prevSections) => [
// // //       ...prevSections,
// // //       {
// // //         id: uuidv4(), // Assign a unique ID
// // //         departureCityInput: "",
// // //         departureCity: "",
// // //         arrivalCityInput: "",
// // //         arrivalCity: "",
// // //         departureDate: new Date(),
// // //         adultCount: 1,
// // //         childCount: 0,
// // //         infantCount: 0,
// // //         selectedClass: ticketClasses[0].value,
// // //       },
// // //     ]);
// // //   };

// // //   const deleteSection = (index: number) => {
// // //     setSections((prevSections) => {
// // //       if (prevSections.length === 1) {
// // //         // Prevent deleting the last remaining section
// // //         showErrorMessage("At least one section is required.");
// // //         return prevSections;
// // //       }
// // //       return prevSections.filter((_, i) => i !== index);
// // //     });
// // //   };

// // //   const fetchCityData = async (
// // //     keyword: string,
// // //     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // //   ) => {
// // //     if (keyword.length < 2) return;

// // //     setLoading(true);
// // //     try {
// // //       const response = await axiosInstance.get(
// // //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // //       );

// // //       console.log("testing testing testing", response['data'])

// // //       const cityData = response.data?.map((item: any) => ({
// // //         value: item?.iata,
// // //         label: `${item?.name}`,
// // //         city: {
// // //           address: {
// // //             cityCode: item?.address?.cityCode,
// // //             cityName: item?.address?.cityName,
// // //             countryName: item?.address?.countryName,
// // //           },
// // //           name: item?.name,
// // //           iata: item?.iata,
// // //           city: item?.city,
// // //           country: item?.country,
// // //         },
// // //       }));

// // //       console.log("another test", cityData)

// // //       if (cityData && cityData.length > 0) {
// // //         setCityOptions(cityData);
// // //       } else {
// // //         showErrorMessage(NO_CITY_MESSAGE);
// // //       }
// // //     } catch (error) {
// // //       showErrorMessage(NO_CITY_MESSAGE);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (debouncedDepartureCity) {
// // //       fetchCityData(
// // //         debouncedDepartureCity,
// // //         setDepartureCityOptions,
// // //         setDepartureLoading
// // //       );
// // //     }
// // //   }, [debouncedDepartureCity]);

// // //   useEffect(() => {
// // //     if (debouncedArrivalCity) {
// // //       fetchCityData(
// // //         debouncedArrivalCity,
// // //         setArrivalCityOptions,
// // //         setArrivalLoading
// // //       );
// // //     }
// // //   }, [debouncedArrivalCity]);

// // //   const searchFlight = useCallback(async () => {
// // //     for (const section of sections) {
// // //       if (!section.departureCity || !section.arrivalCity) {
// // //         // Show error message if the cities are missing
// // //         showErrorMessage("Please provide valid departure and arrival cities.");
// // //         return; // Stop execution if validation fails
// // //       }
// // //     }

// // //     setFlightSearchLoading(true);
// // //     const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";

// // //     const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // //     const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // //     const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // //     const originDestinations = sections.map((section) => ({
// // //       id: section.id, // Use the unique ID
// // //       originLocationCode: section.departureCity,
// // //       destinationLocationCode: section.arrivalCity,
// // //       departureDateTimeRange: {
// // //         date: format(section.departureDate, "yyyy-MM-dd"), // Ensure each section uses its own date
// // //         time: "10:00:00", // You might want to make this dynamic
// // //       },
// // //     }));

// // //     const payload = {
// // //       currencyCode: "NGN",
// // //       originDestinations,
// // //       travelers: [
// // //         ...Array.from({ length: totalAdults }, (_, i) => ({
// // //           id: `${i + 1}`,
// // //           travelerType: "ADULT",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //         ...Array.from({ length: totalChildren }, (_, i) => ({
// // //           id: `${totalAdults + i + 1}`,
// // //           travelerType: "CHILD",
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //         ...Array.from({ length: totalInfants }, (_, i) => ({
// // //           id: `${totalAdults + totalChildren + i + 1}`,
// // //           travelerType: "HELD_INFANT",
// // //           associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // //           fareOptions: ["STANDARD"],
// // //         })),
// // //       ],
// // //       sources: ["GDS"],
// // //       searchCriteria: {
// // //         maxFlightOffers: 50,
// // //         pricingOptions: {
// // //           fareType: ["PUBLISHED"],
// // //         },
// // //         flightFilters: {
// // //           cabinRestrictions: [
// // //             {
// // //               cabin: selectedClass.toUpperCase(),
// // //               coverage: "MOST_SEGMENTS",
// // //               originDestinationIds: originDestinations.map((dest) => dest.id), // Use unique IDs
// // //             },
// // //           ],
// // //         },
// // //       },
// // //       additionalInformation: {
// // //         brandedFares: true,
// // //       },
// // //     };

// // //     try {
// // //       const response = await fetch(apiUrl, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer YOUR_API_TOKEN`,
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error("Network response was not ok");
// // //       }

// // //       const data = await response.json();
// // //       console.log("Flight data", data.data);

// // //       navigate("/MultiCitySearch", {
// // //         state: {
// // //           searchResults: data.data,
// // //           searchParams: {
// // //             departureCity,
// // //             arrivalCity,
// // //             departureDate,
// // //             adultCount: totalAdults,
// // //             childCount: totalChildren,
// // //             infantCount: totalInfants,
// // //             selectedClass,
// // //           },
// // //         },
// // //       });
// // //     } catch (error) {
// // //       console.error("Error fetching flight data:", error);
// // //       showErrorMessage("Failed to fetch flight data.");
// // //     } finally {
// // //       setFlightSearchLoading(false);
// // //     }
// // //   }, [
// // //     sections,
// // //     selectedClass,
// // //     showErrorMessage,
// // //     navigate,
// // //   ]);

// // //   const handleDepartureDateChange = useCallback(
// // //     (date: Date | undefined) => setDepartureDate(date || new Date()),
// // //     []
// // //   );

// //   // const handleDepartureCityChange = (value: string, city: DataItem, index: number) => {
// //   //   setSections(prevSections => prevSections.map((section, i) =>
// //   //     i === index
// //   //       ? { ...section, departureCityInput: city.city.iata, departureCity: city.city.iata }
// //   //       : section
// //   //   ));
// //   //   setDepartureCityInput(city.city.iata);
// //   //   console.log(value);
// //   //   console.log(city.city.iata);
// //   // };

// //   // const handleArrivalCityChange = (value: string, city: DataItem, index: number) => {
// //   //   setSections(prevSections => prevSections.map((section, i) =>
// //   //     i === index
// //   //       ? { ...section, arrivalCityInput: city.city.iata, arrivalCity: city.city.iata }
// //   //       : section
// //   //   ));
// //   //   setArrivalCityInput(city.city.iata);
// //   //   console.log(value);
// //   //   console.log(city.city.iata);
// //   // };

// // //   // const handleArrivalCityChange = (value: string, city: DataItem) => {
// // //   //   setArrivalCity([city.city.iata]); // Update with the airport code
// // //   //   setArrivalCityInput(city.city.iata); // Display city and airport code in the input
// // //   //   console.log(value);
// // //   //   console.log(arrivalCity);
// // //   // };

// // //   return (
// // //     <div className="flex flex-col gap-5 w-full items-center">
// // //       {sections.map((section, index) => (
// // //         <div
// // //           key={section.id}
// // //           className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // //         >
// // //           <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // //           <CityInput
// // //   value={section.departureCityInput}
// // //   data={departureCityOptions}
// // //   label="From where?"
// // //   placeholder="City"
// // //   onSearch={(value) => {
// // //     setSections(prevSections => prevSections.map((s, i) =>
// // //       i === index ? { ...s, departureCityInput: value } : s
// // //     ));
// // //   }}
// // //   loading={departureLoading}
// // //   onChange={(value, city) => handleDepartureCityChange(value, city, index)}
// // // />

// // //             <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // //               <TransactionIcon size="10" stroke="#E5302f" />
// // //             </div>

// // //             <CityInput
// // //               value={section.arrivalCityInput}
// // //               data={arrivalCityOptions}
// // //               label="To where?"
// // //               placeholder="City"
// // //   onSearch={(value) => {
// // //     setSections(prevSections => prevSections.map((s, i) =>
// // //       i === index ? { ...s, arrivalCityInput: value } : s
// // //     ));
// // //   }}
// // //               // onSearch={setArrivalCityInput}
// // //               loading={arrivalLoading}
// // //               onChange={(value, city) => handleArrivalCityChange(value, city, index)}
// // //               // onChange={handleArrivalCityChange}
// // //             />
// // //           </div>

// // //           <DateInput
// // //             labelText="Departure"
// // //             onChange={handleDepartureDateChange}
// // //           />

// // //           <SelectInput
// // //             data={ticketClasses}
// // //             label="Class"
// // //             placeholder="Class"
// // //             value={selectedClass}
// // //             onChange={setSelectedClass}
// // //           />

// // //           <Dropdown label="Passengers" btnText="Add passengers">
// // //             <div className="flex flex-col gap-3 py-2">
// // //               <PassengerCounter
// // //                 label="Adults ( ≥ 12 years)"
// // //                 count={section.adultCount}
// // //                 increment={() => handleIncrement(index, "adultCount")}
// // //                 decrement={() => handleDecrement(index, "adultCount")}
// // //               />
// // //               <PassengerCounter
// // //                 label="Children ( 2 - 12 years)"
// // //                 count={section.childCount}
// // //                 increment={() => handleIncrement(index, "childCount")}
// // //                 decrement={() => handleDecrement(index, "childCount")}
// // //               />
// // //               <PassengerCounter
// // //                 label="Infants ( < 2 years)"
// // //                 count={section.infantCount}
// // //                 increment={() => handleIncrement(index, "infantCount")}
// // //                 decrement={() => handleDecrement(index, "infantCount")}
// // //               />
// // //             </div>
// // //           </Dropdown>

// // //           {/* Delete Button */}
// // //           {sections.length > 1 && (
// // //             <Button
// // //               variant="destructive"
// // //               className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
// // //               onClick={() => deleteSection(index)}
// // //               aria-label="Delete section"
// // //             >
// // //               <Trash2 size={16} color="#FFFFFF" />
// // //             </Button>
// // //           )}
// // //         </div>
// // //       ))}

// // //       <div className="flex gap-5">
// // //         <Button className="bg-primaryRed duration-300 h-12" onClick={addSection}>
// // //           Add Another Flight
// // //           {/* <Plus /> */}
// // //         </Button>

// // //         <Button
// // //           className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
// // //           onClick={searchFlight}
// // //           disabled={flightSearchLoading}
// // //         >
// // //           {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // //         </Button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MultiCityTab;

// // // import React, { useState, useCallback, useEffect } from "react";
// // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // // import { format } from "date-fns";
// // // import SelectInput from "@/components/components/input/SelectInput";
// // // import { Button } from "@/components/ui/button";
// // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // import { toast } from "react-toastify";
// // // import axiosInstance from "@/config/axios";
// // // import { ticketClasses } from "../../data/data.json";
// // // import CityInput from "@/components/components/input/CityInput";
// // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   PASSENGER_LIMIT,
// // //   NO_CITY_MESSAGE,
// // //   // NO_FLIGHT_MESSAGE,
// // //   PASSENGER_LIMIT_MESSAGE,
// // //   INFANT_EXCEED_ADULT_MESSAGE,
// // // } from "@/config/api";
// // // import DateInput from "@/components/components/input/DateInput";
// // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";

// // // type DataItem = {
// // //   value: string;
// // //   label: React.ReactNode;
// // //   city: {
// // //     address: {
// // //       cityCode?: string;
// // //       cityName?: string;
// // //       countryName?: string;
// // //     };
// // //     name: string;
// // //     iata: string;
// // //     city: string;
// // //     country: string;
// // //   };
// // // };

// // // interface Section {
// // //     // id: string; // Add a unique ID field
// // //     departureCityInput: string;
// // //     departureCity: string;
// // //     arrivalCityInput: string;
// // //     arrivalCity: string;
// // //     departureDate: Date;
// // //     adultCount: number;
// // //     childCount: number;
// // //     infantCount: number;
// // //     selectedClass: string;
// // // }

// // // const MultiCityTab = () => {
// // //   const navigate = useNavigate();

// // //   // Initialize sections with at least one adult
// // //   const [sections, setSections] = useState<Section[]>([
// // //     {
// // //         // id: uuidv4(), // Assign a unique ID
// // //         departureCityInput: "",
// // //         departureCity: "",
// // //         arrivalCityInput: "",
// // //         arrivalCity: "",
// // //         departureDate: new Date(),
// // //         adultCount: 1,
// // //         childCount: 0,
// // //         infantCount: 0,
// // //         selectedClass: ticketClasses[0].value,
// // //     },
// // // ]);

// // //   const [adultCount, setAdultCount] = useState(0);
// // //   const [childCount, setChildCount] = useState(0);
// // //   const [infantCount, setInfantCount] = useState(0);

// // //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
// // //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // //   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // //   const [departureLoading, setDepartureLoading] = useState(false);
// // //   const [arrivalLoading, setArrivalLoading] = useState(false);

// // //   const [departureCityInput, setDepartureCityInput] = useState('');
// // //   const [arrivalCityInput, setArrivalCityInput] = useState('');
// // //   const [departureCity, setDepartureCity] = useState("");
// // //   const [arrivalCity, setArrivalCity] = useState("");
// // //   const [departureDate, setDepartureDate] = useState(new Date());
// // //   // const [returnDate, setReturnDate] = useState(new Date());
// // //   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // //   // console.log(returnDate)

// // //   const showErrorMessage = useCallback((message: string) => {
// // //     toast.error(message);
// // //   }, []);

// // //   const totalPassengers = adultCount + childCount + infantCount;

// // //   const handleIncrement = (
// // //     setter: React.Dispatch<React.SetStateAction<number>>
// // //   ) => {
// // //     if (totalPassengers < PASSENGER_LIMIT) {
// // //       setter((prev) => prev + 1);
// // //     } else {
// // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //     }
// // //   };

// // //   const handleDecrement = (
// // //     setter: React.Dispatch<React.SetStateAction<number>>
// // //   ) => {
// // //     setter((prev) => (prev > 0 ? prev - 1 : 0));
// // //   };

// // //   const handleAdultIncrement = useCallback(() => {
// // //     if (totalPassengers < PASSENGER_LIMIT) {
// // //       const newCount = adultCount + 1;
// // //       if (newCount < infantCount) {
// // //         showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // //       } else {
// // //         setAdultCount(newCount);
// // //       }
// // //     } else {
// // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //     }
// // //   }, [totalPassengers, adultCount, infantCount, showErrorMessage]);

// // //   const handleAdultDecrement = useCallback(() => {
// // //     if (adultCount > 0) {
// // //       const newCount = adultCount - 1;
// // //       if (newCount < infantCount) {
// // //         showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // //         setInfantCount(newCount);
// // //       }
// // //       setAdultCount(newCount);
// // //     }
// // //   }, [adultCount, infantCount, showErrorMessage]);

// // //   const handleChildIncrement = useCallback(
// // //     () => handleIncrement(setChildCount),
// // //     [totalPassengers, showErrorMessage]
// // //   );
// // //   const handleChildDecrement = useCallback(
// // //     () => handleDecrement(setChildCount),
// // //     []
// // //   );

// // //   const handleInfantIncrement = useCallback(() => {
// // //     if (adultCount === 0 || infantCount >= adultCount) {
// // //       showErrorMessage(INFANT_EXCEED_ADULT_MESSAGE);
// // //     } else if (totalPassengers < PASSENGER_LIMIT) {
// // //       setInfantCount((prev) => prev + 1);
// // //     } else {
// // //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //     }
// // //   }, [adultCount, infantCount, totalPassengers, showErrorMessage]);

// // //   const handleInfantDecrement = useCallback(
// // //     () => handleDecrement(setInfantCount),
// // //     []
// // //   );

// // //   const useDebounce = <T,>(value: T, delay: number): T => {
// // //     const [debouncedValue, setDebouncedValue] = useState(value);

// // //     useEffect(() => {
// // //       const handler = setTimeout(() => {
// // //         setDebouncedValue(value);
// // //       }, delay);

// // //       return () => {
// // //         clearTimeout(handler);
// // //       };
// // //     }, [value, delay]);

// // //     return debouncedValue;
// // //   };

// // //   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // //   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // //   const addSection = () => {
// // //     setSections((prevSections) => [
// // //         ...prevSections,
// // //         {
// // //             // id: uuidv4(), // Assign a unique ID
// // //             departureCityInput: "",
// // //             departureCity: "",
// // //             arrivalCityInput: "",
// // //             arrivalCity: "",
// // //             departureDate: new Date(),
// // //             adultCount: 1,
// // //             childCount: 0,
// // //             infantCount: 0,
// // //             selectedClass: ticketClasses[0].value,
// // //         },
// // //     ]);
// // // };

// // // // const deleteSection = (index: number) => {
// // // //     setSections((prevSections) => {
// // // //         if (prevSections.length === 1) {
// // // //             // Prevent deleting the last remaining section
// // // //             showErrorMessage("At least one section is required.");
// // // //             return prevSections;
// // // //         }
// // // //         return prevSections.filter((_, i) => i !== index);
// // // //     });
// // // // };

// // //   const fetchCityData = async (
// // //     keyword: string,
// // //     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // //   ) => {
// // //     if (keyword.length < 2) return;

// // //     setLoading(true);
// // //     try {
// // //       const response = await axiosInstance.get(
// // //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // //       );

// // //       const cityData = response.data?.map((item: any) => ({
// // //         value: item?.iataCode,
// // //         label: `${item?.name}`,
// // //         city: {
// // //           address: {
// // //             cityCode: item?.address?.cityCode,
// // //             cityName: item?.address?.cityName,
// // //             countryName: item?.address?.countryName,
// // //           },
// // //           name: item?.name,
// // //           iata: item?.iata,
// // //           city: item?.city,
// // //           country: item?.country,
// // //         },
// // //       }));

// // //       console.log(cityData)

// // //       if (cityData && cityData.length > 0) {
// // //         setCityOptions(cityData);
// // //       } else {
// // //         showErrorMessage(NO_CITY_MESSAGE);
// // //       }
// // //     } catch (error) {
// // //       showErrorMessage(NO_CITY_MESSAGE);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (debouncedDepartureCity) {
// // //       fetchCityData(debouncedDepartureCity, setDepartureCityOptions, setDepartureLoading);
// // //     }
// // //   }, [debouncedDepartureCity]);

// // //   useEffect(() => {
// // //     if (debouncedArrivalCity) {
// // //       fetchCityData(debouncedArrivalCity, setArrivalCityOptions, setArrivalLoading);
// // //     }
// // //   }, [debouncedArrivalCity]);

// // //   const searchFlight = async () => {
// // //     setFlightSearchLoading(true); // Start loading
// // //     const apiUrl = 'https://test.ffsdtravels.com/api/flight/search/offer';

// // //     console.log("apiUrl", apiUrl)

// // //     // Format departure date to 'YYYY-MM-DD'
// // //   const formattedDepartureDate = departureDate.toISOString().split('T')[0];
// // //   // const formattedReturnDate = returnDate.toISOString().split('T')[0];

// // //     // ...existing payload logic...
// // //     const payload = {
// // //       currencyCode: "NGN",
// // //       originDestinations: [
// // //         {
// // //           id: "1",
// // //           originLocationCode: departureCity,
// // //           destinationLocationCode: arrivalCity,
// // //           departureDateTimeRange: {
// // //             date: formattedDepartureDate,
// // //             time: "10:00:00" // You can make this dynamic if needed
// // //           }
// // //         },
// // //         {
// // //           id: "2",
// // //           originLocationCode: arrivalCity, // Reverse for return trip
// // //           destinationLocationCode: departureCity,
// // //           departureDateTimeRange: {
// // //             // date: formattedReturnDate,
// // //             time: "10:00:00" // You can make this dynamic if needed
// // //           }
// // //         }
// // //       ],
// // //       travelers: [
// // //         ...Array.from({ length: adultCount }, (_, i) => ({
// // //           id: `${i + 1}`,
// // //           travelerType: "ADULT",
// // //           fareOptions: ["STANDARD"]
// // //         })),
// // //         ...Array.from({ length: childCount }, (_, i) => ({
// // //           id: `${adultCount + i + 1}`,
// // //           travelerType: "CHILD",
// // //           fareOptions: ["STANDARD"]
// // //         })),
// // //         ...Array.from({ length: infantCount }, (_, i) => ({
// // //           id: `${adultCount + childCount + i + 1}`,
// // //           travelerType: "HELD_INFANT",
// // //           associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // //           fareOptions: ["STANDARD"]
// // //         }))
// // //       ],
// // //       sources: ["GDS"],
// // //       searchCriteria: {
// // //         maxFlightOffers: 50, // Adjust as needed
// // //         pricingOptions: {
// // //           fareType: ["PUBLISHED"]
// // //         },
// // //         flightFilters: {
// // //           cabinRestrictions: [
// // //             {
// // //               cabin: "ECONOMY",
// // //               coverage: "MOST_SEGMENTS",
// // //               originDestinationIds: ["1","2"]
// // //             }
// // //           ]
// // //         }
// // //       },
// // //       additionalInformation: {
// // //         brandedFares: true
// // //       }
// // //     };

// // //     try {
// // //       const response = await fetch(apiUrl, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer YOUR_API_TOKEN`, // Replace with your actual token
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error('Network response was not ok');
// // //       }

// // //       const data = await response.json();

// // //       console.log("data isdjsd", data);

// // //       // const flightData: FlightData[] = data.map((offer: any) => mapFlightData(offer));

// // //       navigate("/roundtripsearch", {
// // //         state: {
// // //           searchResults: data.data ,
// // //           searchParams: {
// // //             departureCity,
// // //             arrivalCity,
// // //             departureDate,
// // //             // returnDate,
// // //             adultCount,
// // //             childCount,
// // //             infantCount,
// // //             selectedClass,
// // //           },
// // //         },
// // //       });
// // //       // console.log('Flight Search Results:', data);
// // //       // return data;

// // //     } catch (error) {
// // //       console.error('Error fetching flight data:', error);
// // //       showErrorMessage('Failed to fetch flight data.'); // Show a generic error message
// // //     } finally {
// // //       setFlightSearchLoading(false); // End loading
// // //     }
// // //   };

// // //   const handleDepartureDateChange = useCallback(
// // //     (date: Date | undefined) => setDepartureDate(date || new Date()),
// // //     []
// // //   );

// // //   // const handleReturnChange = useCallback(
// // //   //   (date: Date | undefined) => setReturnDate(date || new Date()),
// // //   //   []
// // //   // );

// // //   const handleDepartureCityChange = (value: string, city: DataItem) => {
// // //     setDepartureCity(city.city.iata); // Update with the airport name
// // //     setDepartureCityInput(city.city.iata); // Display city and airport code in the input
// // //     console.log("Value:", value);
// // //     console.log("City:", city);
// // //   };

// // //   const handleArrivalCityChange = (value: string, city: DataItem) => {
// // //     setArrivalCity(city.city.iata); // Update with the airport name
// // //     setArrivalCityInput(city.city.iata); // Display city and airport code in the input
// // //     console.log("Value:", value);
// // //     console.log("City:", city);
// // //   };

// // //   return (
// // //     <div className="flex flex-col gap-5 w-full items-center">
// // //       <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between">
// // //         <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // //           <CityInput
// // //             value={departureCityInput}
// // //             data={departureCityOptions}
// // //             label="From where?"
// // //             placeholder="City"
// // //             onSearch={setDepartureCityInput}
// // //             loading={departureLoading}
// // //             onChange={handleDepartureCityChange} // Use updated handler
// // //           />

// // //           <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // //             <TransactionIcon size="10" stroke="#E5302f" />
// // //           </div>

// // //           <CityInput
// // //             value={arrivalCityInput}
// // //             data={arrivalCityOptions}
// // //             label="To where?"
// // //             placeholder="City"
// // //             onSearch={setArrivalCityInput}
// // //             loading={arrivalLoading}
// // //             onChange={handleArrivalCityChange} // Use updated handler
// // //           />
// // //         </div>

// // //         <DateInput labelText="Departure" onChange={handleDepartureDateChange} />

// // //         {/* <DateInput labelText="Arrival" onChange={handleReturnChange} /> */}

// // //         <SelectInput
// // //           data={ticketClasses}
// // //           label="Class"
// // //           placeholder="Class"
// // //           value={selectedClass}
// // //           onChange={setSelectedClass}
// // //         />

// // //         <Dropdown label="Passengers" btnText="Add passengers">
// // //           <div className="flex flex-col gap-3 py-2">
// // //             <PassengerCounter
// // //               label="Adults ( ≥ 12 years)"
// // //               count={adultCount}
// // //               increment={handleAdultIncrement}
// // //               decrement={handleAdultDecrement}
// // //             />
// // //             <PassengerCounter
// // //               label="Children ( 2 - 12 years)"
// // //               count={childCount}
// // //               increment={handleChildIncrement}
// // //               decrement={handleChildDecrement}
// // //             />
// // //             <PassengerCounter
// // //               label="Infants ( < 2 years)"
// // //               count={infantCount}
// // //               increment={handleInfantIncrement}
// // //               decrement={handleInfantDecrement}
// // //             />
// // //           </div>
// // //         </Dropdown>
// // //          {/* Delete Button */}
// // //          {/* {sections.length > 1 && (
// // //                         <Button
// // //                             variant="destructive"
// // //                             className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
// // //                             onClick={() => deleteSection(index)}
// // //                             aria-label="Delete section"
// // //                         >
// // //                             <Trash2 size={16} color="#FFFFFF" />
// // //                         </Button>
// // //                     )} */}
// // //       </div>

// // //       <div className="flex gap-5">
// // //                 <Button className="bg-primaryRed duration-300 h-12" onClick={addSection}>
// // //                     Add Another Flight
// // //                     {/* <Plus /> */}
// // //                 </Button>

// // //                 <Button
// // //                     className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
// // //                     onClick={searchFlight}
// // //                     disabled={flightSearchLoading}
// // //                 >
// // //                     {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // //                 </Button>
// // //             </div>

// // //     </div>
// // //   );
// // // };

// // // export default MultiCityTab;

// // // import React, { useState, useCallback, useEffect } from "react";
// // // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // import { format } from "date-fns";
// // // import SelectInput from "@/components/components/input/SelectInput";
// // // import { Button } from "@/components/ui/button";
// // // import Dropdown from "@/components/components/dropdown/Dropdown";
// // // import { toast } from "react-toastify";
// // // import axiosInstance from "@/config/axios";
// // // import { ticketClasses } from "../../data/data.json";
// // // import CityInput from "@/components/components/input/CityInput";
// // // import Loading from "@/components/components/withStatus/loading/Loading";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //     PASSENGER_LIMIT,
// // //     NO_CITY_MESSAGE,
// // //     // NO_FLIGHT_MESSAGE,
// // //     PASSENGER_LIMIT_MESSAGE,
// // //     //   INFANT_EXCEED_ADULT_MESSAGE,
// // // } from "@/config/api";
// // // import DateInput from "@/components/components/input/DateInput";
// // // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // // import { Plus } from "lucide-react";

// // // type DataItem = {
// // //     value: string;
// // //     label: React.ReactNode;
// // //     city: {
// // //         address: {
// // //             cityCode?: string;
// // //             cityName?: string;
// // //             countryName?: string;
// // //         };
// // //         name: string;
// // //         iata: string;
// // //         city: string;
// // //         country: string;
// // //     };
// // // };

// // // interface Section {
// // //     adultCount: number;
// // //     childCount: number;
// // //     infantCount: number;
// // // }

// // // const MultiCityTab = () => {
// // //     const navigate = useNavigate();

// // //     // Initialize sections with at least one adult
// // //     const [sections, setSections] = useState<Section[]>([
// // //         {
// // //             adultCount: 1,
// // //             childCount: 0,
// // //             infantCount: 0,
// // //         },
// // //     ]);

// // //     const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
// // //     const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// // //     const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// // //     const [departureLoading, setDepartureLoading] = useState(false);
// // //     const [arrivalLoading, setArrivalLoading] = useState(false);

// // //     const [departureCityInput, setDepartureCityInput] = useState('');
// // //     const [arrivalCityInput, setArrivalCityInput] = useState('');
// // //     const [departureCity, setDepartureCity] = useState("");
// // //     const [arrivalCity, setArrivalCity] = useState("");
// // //     const [departureDate, setDepartureDate] = useState(new Date());
// // //     const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// // //     const showErrorMessage = useCallback((message: string) => {
// // //         toast.error(message);
// // //     }, []);

// // //     // Calculate total passengers across all sections
// // //     const totalPassengers = sections.reduce(
// // //         (sum, section) => sum + section.adultCount + section.childCount + section.infantCount,
// // //         0
// // //     );

// // //     const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

// // //     const handleIncrement = (index: number, field: keyof Section) => {
// // //         if (totalPassengers < maxPassengers) {
// // //             setSections((prevSections) =>
// // //                 prevSections.map((section, i) =>
// // //                     i === index
// // //                         ? { ...section, [field]: section[field] + 1 }
// // //                         : section
// // //                 )
// // //             );
// // //         } else {
// // //             showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// // //         }
// // //     };

// // //     const handleDecrement = (index: number, field: keyof Section) => {
// // //         setSections((prevSections) =>
// // //             prevSections.map((section, i) =>
// // //                 i === index
// // //                     ? { ...section, [field]: Math.max(0, section[field] - 1) }
// // //                     : section
// // //             )
// // //         );
// // //     };

// // //     // Ensure infants do not exceed adults in each section
// // //     useEffect(() => {
// // //         setSections((prevSections) =>
// // //             prevSections.map((section) => {
// // //                 if (section.infantCount > section.adultCount) {
// // //                     return { ...section, infantCount: section.adultCount };
// // //                 }
// // //                 return section;
// // //             })
// // //         );
// // //     }, [sections]);

// // //     const useDebounce = <T,>(value: T, delay: number): T => {
// // //         const [debouncedValue, setDebouncedValue] = useState(value);

// // //         useEffect(() => {
// // //             const handler = setTimeout(() => {
// // //                 setDebouncedValue(value);
// // //             }, delay);

// // //             return () => {
// // //                 clearTimeout(handler);
// // //             };
// // //         }, [value, delay]);

// // //         return debouncedValue;
// // //     };

// // //     const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// // //     const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// // //     const addSection = () => {
// // //         setSections((prevSections) => [
// // //             ...prevSections,
// // //             {
// // //                 adultCount: 1, // Start with at least 1 adult
// // //                 childCount: 0,
// // //                 infantCount: 0,
// // //             },
// // //         ]);
// // //     };

// // //     const fetchCityData = async (
// // //         keyword: string,
// // //         setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// // //         setLoading: React.Dispatch<React.SetStateAction<boolean>>
// // //     ) => {
// // //         if (keyword.length < 2) return;

// // //         setLoading(true);
// // //         try {
// // //             const response = await axiosInstance.get(
// // //                 `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// // //             );

// // //             const cityData = response.data?.map((item: any) => ({
// // //                 value: item?.iataCode,
// // //                 label: `${item?.name}`,
// // //                 city: {
// // //                     address: {
// // //                         cityCode: item?.address?.cityCode,
// // //                         cityName: item?.address?.cityName,
// // //                         countryName: item?.address?.countryName,
// // //                     },
// // //                     name: item?.name,
// // //                     iata: item?.iata,
// // //                     city: item?.city,
// // //                     country: item?.country,
// // //                 },
// // //             }));

// // //             if (cityData && cityData.length > 0) {
// // //                 setCityOptions(cityData);
// // //             } else {
// // //                 showErrorMessage(NO_CITY_MESSAGE);
// // //             }
// // //         } catch (error) {
// // //             showErrorMessage(NO_CITY_MESSAGE);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         if (debouncedDepartureCity) {
// // //             fetchCityData(debouncedDepartureCity, setDepartureCityOptions, setDepartureLoading);
// // //         }
// // //     }, [debouncedDepartureCity]);

// // //     useEffect(() => {
// // //         if (debouncedArrivalCity) {
// // //             fetchCityData(debouncedArrivalCity, setArrivalCityOptions, setArrivalLoading);
// // //         }
// // //     }, [debouncedArrivalCity]);

// // //     const searchFlight = useCallback(async () => {
// // //         setFlightSearchLoading(true); // Start loading
// // //         const apiUrl = 'https://test.ffsdtravels.com/api/flight/search/offer';

// // //         // Aggregate passenger counts across all sections
// // //         const totalAdults = sections.reduce((sum, section) => sum + section.adultCount, 0);
// // //         const totalChildren = sections.reduce((sum, section) => sum + section.childCount, 0);
// // //         const totalInfants = sections.reduce((sum, section) => sum + section.infantCount, 0);

// // //         // Map through sections to build originDestinations
// // //         const originDestinations = sections.map((section, index) => ({
// // //             id: `${index + 1}`,
// // //             originLocationCode: departureCity,
// // //             destinationLocationCode: arrivalCity,
// // //             departureDateTimeRange: {
// // //                 date: format(departureDate, "yyyy-MM-dd"),  // Adjust for each section if needed
// // //                 time: "10:00:00"  // Static for now, make dynamic if required
// // //             }
// // //         }));

// // //         // Ensure last segment access (for example: displaying it or processing further)
// // //         // const lastSegment = originDestinations[originDestinations.length - 1];

// // //         const payload = {
// // //             currencyCode: "NGN",
// // //             originDestinations,  // Use the generated originDestinations array
// // //             travelers: [
// // //                 ...Array.from({ length: totalAdults }, (_, i) => ({
// // //                     id: `${i + 1}`,
// // //                     travelerType: "ADULT",
// // //                     fareOptions: ["STANDARD"]
// // //                 })),
// // //                 ...Array.from({ length: totalChildren }, (_, i) => ({
// // //                     id: `${totalAdults + i + 1}`,
// // //                     travelerType: "CHILD",
// // //                     fareOptions: ["STANDARD"]
// // //                 })),
// // //                 ...Array.from({ length: totalInfants }, (_, i) => ({
// // //                     id: `${totalAdults + totalChildren + i + 1}`,
// // //                     travelerType: "HELD_INFANT",
// // //                     associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// // //                     fareOptions: ["STANDARD"]
// // //                 }))
// // //             ],
// // //             sources: ["GDS"],
// // //             searchCriteria: {
// // //                 maxFlightOffers: 50,  // Adjust as needed
// // //                 pricingOptions: {
// // //                     fareType: ["PUBLISHED"]
// // //                 },
// // //                 flightFilters: {
// // //                     cabinRestrictions: [
// // //                         {
// // //                             cabin: selectedClass.toUpperCase(),
// // //                             coverage: "MOST_SEGMENTS",
// // //                             originDestinationIds: originDestinations.map(dest => dest.id) // Use IDs from all sections
// // //                         }
// // //                     ]
// // //                 }
// // //             },
// // //             additionalInformation: {
// // //                 brandedFares: true
// // //             }
// // //         };

// // //         try {
// // //             const response = await fetch(apiUrl, {
// // //                 method: 'POST',
// // //                 headers: {
// // //                     'Content-Type': 'application/json',
// // //                     'Authorization': `Bearer YOUR_API_TOKEN`,  // Replace with your actual token
// // //                 },
// // //                 body: JSON.stringify(payload)
// // //             });

// // //             if (!response.ok) {
// // //                 throw new Error('Network response was not ok');
// // //             }

// // //             const data = await response.json();
// // //             console.log("Flight data", data.data);

// // //             navigate("/MultiCitySearch", {
// // //                 state: {
// // //                     searchResults: data.data,
// // //                     searchParams: {
// // //                         departureCity,
// // //                         arrivalCity,
// // //                         departureDate,
// // //                         adultCount: totalAdults,
// // //                         childCount: totalChildren,
// // //                         infantCount: totalInfants,
// // //                         selectedClass,
// // //                     },
// // //                 }
// // //             });

// // //         } catch (error) {
// // //             console.error('Error fetching flight data:', error);
// // //             showErrorMessage('Failed to fetch flight data.');  // Show a generic error message
// // //         } finally {
// // //             setFlightSearchLoading(false);  // End loading
// // //         }
// // //     }, [
// // //         departureCity,
// // //         arrivalCity,
// // //         departureDate,
// // //         sections,
// // //         selectedClass,
// // //         showErrorMessage,
// // //         navigate
// // //     ]);

// // //     const handleDepartureDateChange = useCallback(
// // //         (date: Date | undefined) => setDepartureDate(date || new Date()),
// // //         []
// // //     );

// // //     const handleDepartureCityChange = (value: string, city: DataItem) => {
// // //         setDepartureCity(city.city.iata); // Update with the airport code
// // //         setDepartureCityInput(city.city.iata); // Display city and airport code in the input
// // //         console.log(value)
// // //     };

// // //     const handleArrivalCityChange = (value: string, city: DataItem) => {
// // //         setArrivalCity(city.city.iata); // Update with the airport code
// // //         setArrivalCityInput(city.city.iata); // Display city and airport code in the input
// // //         console.log(value)
// // //     };

// // //     return (
// // //         <div className="flex flex-col gap-5 w-full items-center">
// // //             {sections.map((section, index) => (
// // //                 <div
// // //                     key={index}
// // //                     className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
// // //                 >
// // //                     <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// // //                         <CityInput
// // //                             value={departureCityInput}
// // //                             data={departureCityOptions}
// // //                             label="From where?"
// // //                             placeholder="City"
// // //                             onSearch={setDepartureCityInput}
// // //                             loading={departureLoading}
// // //                             onChange={handleDepartureCityChange}
// // //                         />

// // //                         <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// // //                             <TransactionIcon size="10" stroke="#E5302f" />
// // //                         </div>

// // //                         <CityInput
// // //                             value={arrivalCityInput}
// // //                             data={arrivalCityOptions}
// // //                             label="To where?"
// // //                             placeholder="City"
// // //                             onSearch={setArrivalCityInput}
// // //                             loading={arrivalLoading}
// // //                             onChange={handleArrivalCityChange}
// // //                         />
// // //                     </div>

// // //                     <DateInput labelText="Departure" onChange={handleDepartureDateChange} />

// // //                     <SelectInput
// // //                         data={ticketClasses}
// // //                         label="Class"
// // //                         placeholder="Class"
// // //                         value={selectedClass}
// // //                         onChange={setSelectedClass}
// // //                     />

// // //                     <Dropdown label="Passengers" btnText="Add passengers">
// // //                         <div className="flex flex-col gap-3 py-2">
// // //                             <PassengerCounter
// // //                                 label="Adults ( ≥ 12 years)"
// // //                                 count={section.adultCount}
// // //                                 increment={() => handleIncrement(index, "adultCount")}
// // //                                 decrement={() => handleDecrement(index, "adultCount")}
// // //                             />
// // //                             <PassengerCounter
// // //                                 label="Children ( 2 - 12 years)"
// // //                                 count={section.childCount}
// // //                                 increment={() => handleIncrement(index, "childCount")}
// // //                                 decrement={() => handleDecrement(index, "childCount")}
// // //                             />
// // //                             <PassengerCounter
// // //                                 label="Infants ( < 2 years)"
// // //                                 count={section.infantCount}
// // //                                 increment={() => handleIncrement(index, "infantCount")}
// // //                                 decrement={() => handleDecrement(index, "infantCount")}
// // //                             />
// // //                         </div>
// // //                     </Dropdown>

// // //                     {index === sections.length - 1 && ( // Show add button only on the last section
// // //                         <Button
// // //                             className="bg-primaryRed duration-300 h-12 w-12"
// // //                             onClick={addSection}
// // //                         >
// // //                             <Plus />
// // //                         </Button>
// // //                     )}
// // //                 </div>
// // //             ))}

// // //             <Button
// // //                 className="col-span-2 bg-primaryRed duration-300 capitalize"
// // //                 onClick={searchFlight}
// // //                 disabled={flightSearchLoading}
// // //             >
// // //                 {flightSearchLoading ? <Loading color="#FFFFFF" size="20" /> : "Search"}
// // //             </Button>
// // //         </div>
// // //     );
// // // };

// // // export default MultiCityTab;











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
// // import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
// import { useNavigate } from "react-router-dom";
// import {
//   PASSENGER_LIMIT,
//   NO_CITY_MESSAGE,
//   // NO_FLIGHT_MESSAGE,
//   PASSENGER_LIMIT_MESSAGE,
//   //   INFANT_EXCEED_ADULT_MESSAGE,
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

//   // Initialize sections with at least one adult
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
//   const [departureCity, setDepartureCity] = useState<any>([]);
//   const [arrivalCity, setArrivalCity] = useState<string[]>([]);
//   const [departureDate, setDepartureDate] = useState(new Date());
//   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

//   const showErrorMessage = useCallback((message: string) => {
//     toast.error(message);
//   }, []);

//   // Calculate total passengers across all sections
//   const totalPassengers = sections.reduce(
//     (sum, section) =>
//       sum + section.adultCount + section.childCount + section.infantCount,
//     0
//   );

//   const maxPassengers = PASSENGER_LIMIT; // Use the defined limit

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

//   // Debounce inputs for each section
//   // const debouncedDepartureCity = sections.map((section) =>
//   //   useDebounce(section.departureCityInput, 300)
//   // );
//   // const debouncedArrivalCity = sections.map((section) =>
//   //   useDebounce(section.arrivalCityInput, 300)
//   // );

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

//       // console.log("testing testing testing", response["data"]);

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

//       console.log("another test", cityData);

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

//   const searchFlight = useCallback(async () => {
//     console.log("sections", sections);
//     for (const section of sections) {
//       if (!section.departureCity || !section.arrivalCity) {
//         // Show error message if the cities are missing
//         showErrorMessage("Please provide valid departure and arrival cities.");
//         return; // Stop execution if validation fails
//       }
//     }

//     setFlightSearchLoading(true);
//     const apiUrl = "https://test.ffsdtravels.com/api/flight/search/offer";

//     console.log("apiUrl", apiUrl);

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

//     const originDestinations = sections.map((section) => ({
//       id: 1, // Use the unique ID
//       originLocationCode: section.departureCity,
//       destinationLocationCode: section.arrivalCity,
//       departureDateTimeRange: {
//         date: format(section.departureDate, "yyyy-MM-dd"), // Ensure each section uses its own date
//         time: "10:00:00", // You might want to make this dynamic
//       },
//     }));

//     const payload = {
//       currencyCode: "NGN",
//       originDestinations,
//       travelers: [
//         ...Array.from({ length: totalAdults }, (_, i) => ({
//           id: `${i + 1}`,
//           travelerType: "ADULT",
//           fareOptions: ["STANDARD"],
//         })),
//         ...Array.from({ length: totalChildren }, (_, i) => ({
//           id: `${totalAdults + i + 1}`,
//           travelerType: "CHILD",
//           fareOptions: ["STANDARD"],
//         })),
//         ...Array.from({ length: totalInfants }, (_, i) => ({
//           id: `${totalAdults + totalChildren + i + 1}`,
//           travelerType: "HELD_INFANT",
//           associatedAdultId: `${i + 1}`, // Assuming first adult is associated
//           fareOptions: ["STANDARD"],
//         })),
//       ],
//       sources: ["GDS"],
//       searchCriteria: {
//         maxFlightOffers: 50,
//         pricingOptions: {
//           fareType: ["PUBLISHED"],
//         },
//         flightFilters: {
//           cabinRestrictions: [
//             {
//               cabin: selectedClass.toUpperCase(),
//               coverage: "MOST_SEGMENTS",
//               // originDestinationIds: ["1","2"], // Use unique IDs
//               originDestinationIds: originDestinations.map((dest) => dest.id), // Use unique IDs
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
//         method: 'POST',
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer YOUR_API_TOKEN`,
//         },
//         body: JSON.stringify(payload),
//       });

//       console.log(response)

//       console.log(response.status, response.statusText);

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log("Flight data", data);

//       navigate("/MultiCitySearch", {
//         state: {
//           searchResults: data.data,
//           searchParams: {
//             sections: sections.map((section) => ({
//               departureCity: section.departureCity,
//               arrivalCity: section.arrivalCity,
//               departureDate: section.departureDate,
//             })),
//             adultCount: totalAdults,
//             childCount: totalChildren,
//             infantCount: totalInfants,
//             selectedClass,
//           },
//         },
//       });
//     } catch (error) {
//       console.error("Error fetching flight data:", error);
//       showErrorMessage("Failed to fetch flight data.");
//     } finally {
//       setFlightSearchLoading(false);
//     }
//   }, [sections, selectedClass, showErrorMessage, navigate]);

//   const handleDepartureDateChange = useCallback(
//     (date: Date | undefined, index: number) => {
//       setSections((prevSections) =>
//         prevSections.map((section, i) =>
//           i === index
//             ? { ...section, departureDate: date || new Date() }
//             : section
//         )
//       );
//     },
//     []
//   );

//   // const handleDepartureCityChange = (value: string, city: DataItem) => {
//   //   let cityArray = [...departureCity, city.city.iata];
//   //   setDepartureCity(cityArray);
//   //   setDepartureCityInput(city.city.iata);
//   //   setSections((prevSections) =>
//   //     prevSections.map((section, idx) =>
//   //       idx === index ? { ...section, departureCity: city.city.iata } : section
//   //     )
//   //   );

//   //   console.log("Updated Departure City:", cityArray);
//   //   console.log("Updated Departure City:", value);
//   // };

//   const handleDepartureCityChange = (value: string, city: DataItem) => {
//     let updatedCityArray = [...departureCity, city.city.iata]; // Ensure array is being updated correctly
//     setDepartureCity(updatedCityArray); // Update the state with the new city
//     setDepartureCityInput(city.city.iata); // Set the input field to the selected city

//     setSections((prevSections) =>
//       prevSections.map(
//         (section) => ({ ...section, departureCity: city.city.iata }) // Update every section's departure city
//       )
//     );

//     console.log("Updated Departure City Array:", updatedCityArray); // Log the updated city array
//     console.log("Selected City Value:", value); // Log the selected value
//   };

//   const handleArrivalCityChange = (value: string, city: DataItem) => {
//     let cityArray = [...arrivalCity, city.city.iata];
//     setArrivalCity(cityArray);
//     setArrivalCityInput(`${city.city.iata}`);
//     // setSections((prevSections) =>
//     //   prevSections.map((section, idx) =>
//     //     idx === index // Assuming you're updating the first section as an example
//     //       ? { ...section, arrivalCity: city.city.iata }
//     //       : section
//     //   )
//     setSections((prevSections) =>
//       prevSections.map(
//         (section) => ({ ...section, arrivalCity: city.city.iata }) // Update every section
//       )
//     );
//     console.log("Updated arrival City:", cityArray);
//     console.log("Updated arrival City:", value);
//   };

//   //   const handleDepartureCityChange = (value: string, city: DataItem) => {
//   //     // If you want to push multiple city codes, you can add to an array
//   //     console.log("iata test", city.city.iata)
//   //     let cityArray = [] as Array<any>;
//   //     // cityArray.push(city.city.iata)
//   //     cityArray = [...departureCity, city.city.iata];
//   //     setDepartureCity(cityArray);
//   //     // setSections(sections => {...sections, departureCity cityArray});
//   //     // setDepartureCity(prevCities => [...prevCities, ...cityArray]); // Adds the new city to the array
//   //     setDepartureCityInput(`${city.city.iata}`); // Display city name and airport code in the input
//   //     console.log("value is", value);
//   //     console.log(cityArray);
//   //     console.log("departure city test", city);
//   //     console.log("departureCity is", departureCity);
//   // };

//   // const handleArrivalCityChange = (value: string, city: DataItem) => {
//   //   setArrivalCity(prevCities => [...prevCities, city.city.iata]); // Update with the airport code
//   //   setArrivalCityInput(`${city.city.iata}`); // Display city and airport code in the input
//   //   console.log(value);
//   //   console.log("arrivalcity is", arrivalCity);
//   // };

//   useEffect(() => {
//     console.log("Updated departureCity:", departureCity);
//     console.log("Updated departureCityInput:", departureCityOptions);
//   }, [departureCity]);

//   useEffect(() => {
//     console.log("Updated arrivalCity:", arrivalCity);
//     console.log("Updated arrivalCityInput:", arrivalCityInput);
//   }, [arrivalCity]);

//   return (
//     <div className="flex flex-col gap-5 w-full items-center">
//       {sections.map((section, index) => (
//         <div
//           key={section.id}
//           className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between"
//         >
//           <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
//             <CityInput
//               key={index}
//               value={section.departureCityInput}
//               data={departureCityOptions}
//               label="From where?"
//               placeholder="City"
//               onSearch={setDepartureCityInput}
//               loading={departureLoading}
//               onChange={handleDepartureCityChange}
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
//               onChange={handleArrivalCityChange}
//             />
//           </div>

//           <DateInput
//             labelText="Departure"
//             onChange={(date) => handleDepartureDateChange(date, index)}
//           />

//           {/* <SelectInput
//             data={ticketClasses}
//             label="Class"
//             placeholder="Class"
//             value={selectedClass}
//             onChange={setSelectedClass}
//           /> */}
//           <SelectInput
//             data={ticketClasses}
//             label="Class"
//             placeholder="Class"
//             value={section.selectedClass} // Use section.selectedClass here
//             onChange={(value) => {
//               setSections((prevSections) =>
//                 prevSections.map(
//                   (sec, idx) =>
//                     idx === index ? { ...sec, selectedClass: value } : sec // Update selected class for the current section
//                 )
//               );
//             }}
//           />

//           <Dropdown label="Passengers" btnText="Add passengers">
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





// // import React, { useState, useCallback, useEffect } from "react";
// // import TransactionIcon from "@/assets/svg/TransactionIcon";
// // // import { format } from "date-fns";
// // import SelectInput from "@/components/components/input/SelectInput";
// // import { Button } from "@/components/ui/button";
// // import Dropdown from "@/components/components/dropdown/Dropdown";
// // import { toast } from "react-toastify";
// // import axiosInstance from "@/config/axios";
// // import { ticketClasses } from "../../data/data.json";
// // import CityInput from "@/components/components/input/CityInput";
// // import Loading from "@/components/components/withStatus/loading/Loading";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   PASSENGER_LIMIT,
// //   NO_CITY_MESSAGE,
// //   // NO_FLIGHT_MESSAGE,
// //   PASSENGER_LIMIT_MESSAGE,
// //   // INFANT_EXCEED_ADULT_MESSAGE,
// // } from "@/config/api";
// // import DateInput from "@/components/components/input/DateInput";
// // import PassengerCounter from "@/components/components/dropdown/PassengerCounter";
// // import { Trash2 } from "lucide-react"; // Import Trash icon

// // type DataItem = {
// //   value: string;
// //   label: React.ReactNode;
// //   city: {
// //     address: {
// //       cityCode?: string;
// //       cityName?: string;
// //       countryName?: string;
// //     };
// //     name: string;
// //     iata: string;
// //     city: string;
// //     country: string;
// //   };
// // };

// // interface Section {
// //   id: number; // Add a unique ID field
// //   departureCityInput: string;
// //   departureCity: string;
// //   arrivalCityInput: string;
// //   arrivalCity: string;
// //   departureDate: Date;
// //   adultCount: number;
// //   childCount: number;
// //   infantCount: number;
// //   selectedClass: string;
// // }


// // const MultiCityTab = () => {
// //   const navigate = useNavigate();

// //   const [sections, setSections] = useState<Section[]>([
// //     {
// //       id: 1, // Assign a unique ID
// //       departureCityInput: "",
// //       departureCity: "",
// //       arrivalCityInput: "",
// //       arrivalCity: "",
// //       departureDate: new Date(),
// //       adultCount: 1,
// //       childCount: 0,
// //       infantCount: 0,
// //       selectedClass: ticketClasses[0].value,
// //     },
// //   ]);

// //   const [departureCityOptions, setDepartureCityOptions] = useState<DataItem[]>([]);
// //   const [arrivalCityOptions, setArrivalCityOptions] = useState<DataItem[]>([]);
// //   const [flightSearchLoading, setFlightSearchLoading] = useState(false);
// //   const [departureLoading, setDepartureLoading] = useState(false);
// //   const [arrivalLoading, setArrivalLoading] = useState(false);

// //   const [departureCityInput, setDepartureCityInput] = useState('');
// //   const [arrivalCityInput, setArrivalCityInput] = useState('');
// //   const [departureCity, setDepartureCity] = useState("");
// //   const [arrivalCity, setArrivalCity] = useState("");
// //   const [departureDate, setDepartureDate] = useState(new Date());
// //   const [selectedClass, setSelectedClass] = useState(ticketClasses[0].value);

// //   const showErrorMessage = useCallback((message: string) => {
// //     toast.error(message);
// //   }, []);

// //   const totalPassengers = sections.reduce(
// //     (sum, section) =>
// //       sum + section.adultCount + section.childCount + section.infantCount,
// //     0
// //   );

// //   const maxPassengers = PASSENGER_LIMIT;

// //   const handleIncrement = (index: number, field: keyof Section) => {
// //     if (totalPassengers < maxPassengers) {
// //       setSections((prevSections) =>
// //         prevSections.map((section, i) =>
// //           i === index
// //             ? {
// //                 ...section,
// //                 [field]:
// //                   typeof section[field] === "number"
// //                     ? section[field] + 1
// //                     : section[field], // Leave it unchanged if it's not a number
// //               }
// //             : section
// //         )
// //       );
// //     } else {
// //       showErrorMessage(PASSENGER_LIMIT_MESSAGE);
// //     }
// //   };

// //   const handleDecrement = (index: number, field: keyof Section) => {
// //     setSections((prevSections) =>
// //       prevSections.map((section, i) =>
// //         i === index
// //           ? {
// //               ...section,
// //               [field]:
// //                 typeof section[field] === "number"
// //                   ? Math.max(0, section[field] - 1)
// //                   : section[field], // Leave it unchanged if it's not a number
// //             }
// //           : section
// //       )
// //     );
// //   };

// //   // Ensure infants do not exceed adults in each section
// //   useEffect(() => {
// //     setSections((prevSections) =>
// //       prevSections.map((section) => {
// //         if (section.infantCount > section.adultCount) {
// //           return { ...section, infantCount: section.adultCount };
// //         }
// //         return section;
// //       })
// //     );
// //   }, [sections]);

// //   const useDebounce = <T,>(value: T, delay: number): T => {
// //     const [debouncedValue, setDebouncedValue] = useState(value);

// //     useEffect(() => {
// //       const handler = setTimeout(() => {
// //         setDebouncedValue(value);
// //       }, delay);

// //       return () => {
// //         clearTimeout(handler);
// //       };
// //     }, [value, delay]);

// //     return debouncedValue;
// //   };

// //   const debouncedDepartureCity = useDebounce(departureCityInput, 300);
// //   const debouncedArrivalCity = useDebounce(arrivalCityInput, 300);

// //   const addSection = () => {
// //     setSections((prevSections) => [
// //       ...prevSections,
// //       {
// //         id: prevSections.length + 1, // Assign a unique ID
// //         departureCityInput: "",
// //         departureCity: "",
// //         arrivalCityInput: "",
// //         arrivalCity: "",
// //         departureDate: new Date(),
// //         adultCount: 1,
// //         childCount: 0,
// //         infantCount: 0,
// //         selectedClass: ticketClasses[0].value,
// //       },
// //     ]);
// //   };

// //   const deleteSection = (index: number) => {
// //     setSections((prevSections) => {
// //       if (prevSections.length === 1) {
// //         // Prevent deleting the last remaining section
// //         showErrorMessage("At least one section is required.");
// //         return prevSections;
// //       }
// //       return prevSections.filter((_, i) => i !== index);
// //     });
// //   };

// //   const fetchCityData = async (
// //     keyword: string,
// //     setCityOptions: React.Dispatch<React.SetStateAction<DataItem[]>>,
// //     setLoading: React.Dispatch<React.SetStateAction<boolean>>
// //   ) => {
// //     if (keyword.length < 2) return;
  
// //     setLoading(true);
// //     try {
// //       const response = await axiosInstance.get(
// //         `flight/search/city?subType=AIRPORT&keyword=${keyword}`
// //       );

// //       const cityData = response.data?.map((item: any) => ({
// //         value: item?.iata,
// //         label: `${item?.name}`,
// //         city: {
// //           address: {
// //             cityCode: item?.address?.cityCode,
// //             cityName: item?.address?.cityName,
// //             countryName: item?.address?.countryName,
// //           },
// //           name: item?.name,
// //           iata: item?.iata,
// //           city: item?.city,
// //           country: item?.country,
// //         },
// //       }));

// //       // console.log(cityData)

// //       if (cityData && cityData.length > 0) {
// //         setCityOptions(cityData);
// //       } else {
// //         showErrorMessage(NO_CITY_MESSAGE);
// //       }
// //     } catch (error) {
// //       showErrorMessage(NO_CITY_MESSAGE);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  
// //   useEffect(() => {
// //     if (debouncedDepartureCity) {
// //       fetchCityData(debouncedDepartureCity, setDepartureCityOptions, setDepartureLoading);
// //     }
// //   }, [debouncedDepartureCity]);

// //   useEffect(() => {
// //     if (debouncedArrivalCity) {
// //       fetchCityData(debouncedArrivalCity, setArrivalCityOptions, setArrivalLoading);
// //     }
// //   }, [debouncedArrivalCity]);
  

// //   const searchFlight = async () => {
// //     console.log("sections", sections);
// //     setFlightSearchLoading(true); // Start loading
// //     const apiUrl = 'https://test.ffsdtravels.com/api/flight/search/offer';

// //     const totalAdults = sections.reduce(
// //       (sum, section) => sum + section.adultCount,
// //       0
// //     );
// //     const totalChildren = sections.reduce(
// //       (sum, section) => sum + section.childCount,
// //       0
// //     );
// //     const totalInfants = sections.reduce(
// //       (sum, section) => sum + section.infantCount,
// //       0
// //     );

// //     // Format departure date to 'YYYY-MM-DD'
// //   const formattedDepartureDate = departureDate.toISOString().split('T')[0];
    
// //     // ...existing payload logic...
// //     const payload = {
// //       currencyCode: "NGN",
// //       originDestinations: [
// //         {
// //           id: "1",
// //           originLocationCode: departureCity,
// //           destinationLocationCode: arrivalCity,
// //           departureDateTimeRange: {
// //             date: formattedDepartureDate,
// //             time: "10:00:00" // You can make this dynamic if needed
// //           }
// //         }
// //       ],
// //       travelers: [
// //         ...Array.from({ length: totalAdults }, (_, i) => ({
// //           id: `${i + 1}`,
// //           travelerType: "ADULT",
// //           fareOptions: ["STANDARD"]
// //         })),
// //         ...Array.from({ length: totalChildren }, (_, i) => ({
// //           id: `${totalAdults + i + 1}`,
// //           travelerType: "CHILD",
// //           fareOptions: ["STANDARD"]
// //         })),
// //         ...Array.from({ length: totalInfants }, (_, i) => ({
// //           id: `${totalAdults + totalChildren + i + 1}`,
// //           travelerType: "HELD_INFANT",
// //           associatedAdultId: `${i + 1}`, // Assuming first adult is associated
// //           fareOptions: ["STANDARD"]
// //         }))
// //       ],
// //       sources: ["GDS"],
// //       searchCriteria: {
// //         maxFlightOffers: 50, // Adjust as needed
// //         pricingOptions: {
// //           fareType: ["PUBLISHED"]
// //         },
// //         flightFilters: {
// //           cabinRestrictions: [
// //             {
// //               cabin: selectedClass.toUpperCase(),
// //               coverage: "MOST_SEGMENTS",
// //               originDestinationIds: ["1"]
// //             }
// //           ]
// //         }
// //       },
// //       additionalInformation: {
// //         brandedFares: true
// //       }
// //     };
    
// //     console.log("payload is", payload);
  
// //     try {
// //       const response = await fetch(apiUrl, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer YOUR_API_TOKEN`, // Replace with your actual token
// //         },
// //         body: JSON.stringify(payload),
// //       });
  
// //       if (!response.ok) {
// //         throw new Error('Network response was not ok');
// //       }
  
// //       const data = await response.json();

// //       console.log("data isdjsd", data.data);

// //       // const flightData: FlightData[] = data.map((offer: any) => mapFlightData(offer));

// //       navigate("/search", {
// //         state: {
// //           searchResults: data.data ,
// //           searchParams: {
// //             departureCity,
// //             arrivalCity,
// //             departureDate,
// //             adultCount: totalAdults,
// //             childCount: totalChildren,
// //             infantCount: totalInfants,
// //             selectedClass,
// //           },
// //         },
// //       });
// //       // console.log('Flight Search Results:', data);
// //       // return data;
  
// //     } catch (error) {
// //       console.error('Error fetching flight data:', error);
// //       showErrorMessage('Failed to fetch flight data.'); // Show a generic error message
// //     } finally {
// //       setFlightSearchLoading(false); // End loading
// //     }
// //   };
  
  
// //   // Call the function
// //   // searchFlight();
  
  
  

// //   const handleDepartureDateChange = (date: Date | undefined, index: number) => {
// //     setSections((prevSections) =>
// //       prevSections.map((section, i) =>
// //         i === index ? { ...section, departureDate: date || new Date() } : section
// //       )
// //     );
// //   };
  

// //   const handleDepartureCityChange = (value: string, city: DataItem, index: number) => {
// //     setSections((prevSections) =>
// //       prevSections.map((section, i) =>
// //         i === index
// //           ? {
// //               ...section,
// //               departureCity: city.city.iata,
// //               departureCityInput: city.city.iata, // Update the input field as well
// //             }
// //           : section
// //       )
// //     );
// //   };
  
// //   const handleArrivalCityChange = (value: string, city: DataItem, index: number) => {
// //     setSections((prevSections) =>
// //       prevSections.map((section, i) =>
// //         i === index
// //           ? {
// //               ...section,
// //               arrivalCity: city.city.iata,
// //               arrivalCityInput: city.city.iata, // Update the input field as well
// //             }
// //           : section
// //       )
// //     );
// //   };
  

// //   return (
// //     <div className="flex flex-col gap-5 w-full items-center">
// //       {sections.map((section, index) => (
// //         <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 w-full justify-between">
// //         <div className="flex lg:flex-row flex-col items-center lg:gap-6 gap-3">
// //           <CityInput
// //             value={section.departureCityInput}
// //             data={departureCityOptions}
// //             label="From where?"
// //             placeholder="City"
// //             onSearch={setDepartureCityInput}
// //             loading={departureLoading}
// //             onChange={(value, city) => handleDepartureCityChange(value, city, index)} // Use updated handler
// //           />

// //           <div className="lg:w-[50px] lg:h-[50px] lg:p-3 w-[45px] h-[45px] p-2 rounded-full bg-primaryRed bg-opacity-[8%]">
// //             <TransactionIcon size="10" stroke="#E5302f" />
// //           </div>
          
// //           <CityInput
// //             value={section.arrivalCityInput}
// //             data={arrivalCityOptions}
// //             label="To where?"
// //             placeholder="City"
// //             onSearch={setArrivalCityInput}
// //             loading={arrivalLoading}
// //             onChange={(value, city) => handleArrivalCityChange(value, city, index)} // Use updated handler
// //           />
// //         </div>

// //         <DateInput labelText="Departure" onChange={(date) => handleDepartureDateChange(date, index)}  />

// //         <SelectInput
// //           data={ticketClasses}
// //           label="Class"
// //           placeholder="Class"
// //           value={selectedClass}
// //           onChange={setSelectedClass}
// //         />

// //         <Dropdown label="Passengers" btnText="Add passengers">
// //           <div className="flex flex-col gap-3 py-2">
// //           <PassengerCounter
// //                 label="Adults ( ≥ 12 years)"
// //                 count={section.adultCount}
// //                 increment={() => handleIncrement(index, "adultCount")}
// //                 decrement={() => handleDecrement(index, "adultCount")}
// //               />
// //               <PassengerCounter
// //                 label="Children ( 2 - 12 years)"
// //                 count={section.childCount}
// //                 increment={() => handleIncrement(index, "childCount")}
// //                 decrement={() => handleDecrement(index, "childCount")}
// //               />
// //               <PassengerCounter
// //                 label="Infants ( < 2 years)"
// //                 count={section.infantCount}
// //                 increment={() => handleIncrement(index, "infantCount")}
// //                 decrement={() => handleDecrement(index, "infantCount")}
// //               />
// //           </div>
// //         </Dropdown>

// //         {/* Delete Button */}
// //         {sections.length > 1 && (
// //             <Button
// //               variant="destructive"
// //               className="bg-red-500 hover:bg-red-600 duration-300 h-12 w-12 mt-2 lg:mt-0"
// //               onClick={() => deleteSection(index)}
// //               aria-label="Delete section"
// //             >
// //               <Trash2 size={16} color="#FFFFFF" />
// //             </Button>
// //           )}
// //       </div>
// //       ))}
      

// //       <div className="flex gap-5">
// //         <Button
// //           className="bg-primaryRed duration-300 h-12"
// //           onClick={addSection}
// //         >
// //           Add Another Flight
// //           {/* <Plus /> */}
// //         </Button>

// //         <Button
// //           className="col-span-2 bg-primaryRed duration-300 capitalize h-12"
// //           onClick={searchFlight}
// //           disabled={flightSearchLoading}
// //         >
// //           {flightSearchLoading ? (
// //             <Loading color="#FFFFFF" size="20" />
// //           ) : (
// //             "Search"
// //           )}
// //         </Button>
// //       </div>

      
// //     </div>
// //   );
// // };

// // export default MultiCityTab;