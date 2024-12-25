import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, PlaneIcon, LucideProps } from "lucide-react";
import Flight from "../../admin/dashboard/Flight";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ComponentType<LucideProps>;
  label: string;
}

const FLIGHT = "flight";
const HOTEL = "hotel";

const FlightComponent = () => <Flight />;
const HotelComponent = () => <div>Hotel Component</div>;

const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  onClick,
  icon: Icon,
  label,
}) => (
  <button
    className={`transition-colors flex gap-1 ${
      isActive
        ? "text-primaryRed text-sm font-bold"
        : "text-gray-500 text-sm font-medium"
    }`}
    onClick={onClick}
  >
    <Icon size={20} />
    {label}
  </button>
);

const StaffDashboard = () => {
  const [activeComponent, setActiveComponent] = useState<
    typeof FLIGHT | typeof HOTEL
  >(FLIGHT);

  const componentsMap: { [key: string]: React.ComponentType } = {
    [FLIGHT]: FlightComponent,
    [HOTEL]: HotelComponent,
  };

  const ActiveComponent = componentsMap[activeComponent];

  return (
    <Card className="w-full p-2 rounded-sm flex flex-col gap-3 shadow-sm">
      <CardHeader className="flex flex-row items-center px-2 py-1 justify-between">
        <h1 className="text-gray-800 font-bold capitalize leading-4 tracking-tight">
          Search
        </h1>
        <div className="flex justify-between gap-6 font-medium">
          <TabButton
            isActive={activeComponent === FLIGHT}
            onClick={() => setActiveComponent(FLIGHT)}
            icon={PlaneIcon}
            label="Flight"
          />
          <TabButton
            isActive={activeComponent === HOTEL}
            onClick={() => setActiveComponent(HOTEL)}
            icon={CalendarDays}
            label="Hotel"
          />
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default StaffDashboard;
