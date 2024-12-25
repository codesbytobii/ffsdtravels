// // import { DatePickerWithRangeInput } from "@/components/components/input/DatePickerWithRangeInput";
// // import SelectInput from "@/components/components/input/SelectInput";
// // import ButtonModal from "@/components/components/modal/ButtonModal";
// // import { Button } from "@/components/ui/button";
// import { CardHeader } from "@/components/ui/card";
// import { addDays } from "date-fns";
// // import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
// import SubtractIcon from "@/assets/svg/SubtractIcon";
// import { useState } from "react";
// import PlusIcon from "@/assets/svg/PlusIcon";
// // import { Plus, Minus } from "lucide-react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // const frameworks = [
// //   { value: "next.js", label: "Next.js" },
// //   { value: "sveltekit", label: "SvelteKit" },
// //   { value: "nuxt.js", label: "Nuxt.js" },
// //   { value: "remix", label: "Remix" },
// //   { value: "astro", label: "Astro" },
// // ];

// // const Rating = [
// //   { value: "1", label: "1 Star" },
// //   { value: "2", label: "2 Star" },
// //   { value: "3", label: "3 Star" },
// //   { value: "4", label: "4 Star" },
// //   { value: "5", label: "5 Star" },
// // ];

// // const GuestCounter = ({
// //   label,
// //   count,
// //   increment,
// //   decrement,
// // }: {
// //   label: string;
// //   count: number;
// //   increment: () => void;
// //   decrement: () => void;
// // }) => (
// //   <div className="flex justify-between items-center">
// //     <p className="text-sm font-medium">{label}</p>
// //     <div className="flex gap-3">
// //       <button
// //         className="w-[25px] h-[25px] bg-primaryRed flex items-center justify-center rounded-full"
// //         onClick={decrement}
// //       >
// //         <SubtractIcon stroke="#FFFFFF" />
// //       </button>
// //       <div className="w-[25px] h-[25px] flex items-center justify-center">
// //         <p className="text-sm font-medium">{count}</p>
// //       </div>
// //       <button
// //         className="w-[25px] h-[25px] bg-primaryRed flex items-center justify-center rounded-full"
// //         onClick={increment}
// //       >
// //         <PlusIcon stroke="#FFFFFF" />
// //       </button>
// //     </div>
// //   </div>
// // );

// const HotelTab = () => {
//   const [rooms, setRooms] = useState([{ id: 1, adults: 0, children: 0 }]);

//   const maxGuestsPerRoom = 7;
//   const maxChildrenPerRoom = 4;

//   const handleIncrement = (roomId: number, type: "adults" | "children") => {
//     setRooms((prevRooms) => {
//       return prevRooms.map((room) => {
//         if (room.id === roomId) {
//           const newCount = room[type] + 1;
//           const totalRoomGuests = room.adults + room.children;
//           const maxCount =
//             type === "adults" ? maxGuestsPerRoom : maxChildrenPerRoom;

//           if (totalRoomGuests < maxGuestsPerRoom && newCount <= maxCount) {
//             return { ...room, [type]: newCount };
//           } else {
//             const errorMessage =
//               type === "children"
//                 ? `Max ${maxChildrenPerRoom} children allowed per room.`
//                 : `Max ${maxGuestsPerRoom} guests allowed per room.`;

//             toast.error(errorMessage);
//           }
//         }
//         return room;
//       });
//     });
//   };

//   const handleDecrement = (roomId: number, type: "adults" | "children") => {
//     setRooms((prevRooms) =>
//       prevRooms.map((room) =>
//         room.id === roomId
//           ? {
//               ...room,
//               [type]: room[type] > 0 ? room[type] - 1 : 0,
//             }
//           : room
//       )
//     );
//   };

//   const addRoom = () => {
//     setRooms((prevRooms) => [
//       ...prevRooms,
//       { id: prevRooms.length + 1, adults: 0, children: 0 },
//     ]);
//   };

//   const removeRoom = (roomId: number) => {
//     setRooms((prevRooms) =>
//       prevRooms
//         .filter((room) => room.id !== roomId)
//         .map((room, index) => ({
//           ...room,
//           id: index + 1,
//         }))
//     );
//   };

//   const today = new Date();
//   const initialDateRange = {
//     from: today,
//     to: addDays(today, 20),
//   };

//   return (
//     <>
//       <CardHeader className="flex lg:flex-row flex-col lg:justify-center gap-4 lg:mt-4 mt-2 items-center w-full h-[200px]">
//         <p className="capitalize font-bold text-3xl">feature unavailable</p>
//         {/* <div className="flex lg:flex-row flex-col lg:justify-between gap-4 lg:mt-4 mt-2 items-center w-full">
//           <div className="flex lg:flex-row flex-col lg:gap-12 md:gap-9 sm:gap-6 gap-4 lg:w-fit w-full">
//             <SelectInput
//               data={frameworks}
//               label="Destination"
//               placeholder="Destination"
//             />

//             <DatePickerWithRangeInput
//               labelText="Check in - check out"
//               initialDateRange={initialDateRange}
//             />

//             <SelectInput data={Rating} label="Rating" placeholder="Rating" />

//             <ButtonModal
//               label="Rooms & Guests"
//               body={
//                 <>
//                   <div className="flex flex-col gap-3 py-2">
//                     {rooms.map((room) => (
//                       <div key={room.id} className="flex flex-col gap-3 py-2">
//                         <DialogHeader>
//                           {" "}
//                           <div className=" flex justify-between w-full items-center">
//                             <p className="font-semibold">Room {room.id}</p>
//                             {rooms.length > 1 && (
//                               <Button
//                                 variant="ghost"
//                                 onClick={() => removeRoom(room.id)}
//                               >
//                                 <Minus />
//                               </Button>
//                             )}
//                           </div>{" "}
//                         </DialogHeader>
//                         <GuestCounter
//                           label="Adults"
//                           count={room.adults}
//                           increment={() => handleIncrement(room.id, "adults")}
//                           decrement={() => handleDecrement(room.id, "adults")}
//                         />
//                         <GuestCounter
//                           label="Children (2 - 12 years)"
//                           count={room.children}
//                           increment={() => handleIncrement(room.id, "children")}
//                           decrement={() => handleDecrement(room.id, "children")}
//                         />
//                       </div>
//                     ))}
//                     <DialogFooter>
//                       <div className="flex justify-between w-full">
//                         <Button type="button" onClick={addRoom}>
//                           <span>
//                             <Plus />
//                           </span>
//                           Add room
//                         </Button>
//                         <Button variant="destructive" type="submit">
//                           Done
//                         </Button>
//                       </div>
//                     </DialogFooter>
//                   </div>
//                 </>
//               }
//             />
//           </div>

//           <Button className="bg-primaryRed duration-300">Search</Button>
//         </div> */}
//       </CardHeader>
//     </>
//   );
// };

// export default HotelTab;
