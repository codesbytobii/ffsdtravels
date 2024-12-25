import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardHeader } from "@/components/ui/card";
import OneWayTab from "./OneWayTab";
import RoundTripTab from "./RoundTripTab";
import MultiCityTab from "./MultiCityTab";

const FlightTab = () => {
  return (
    <>
      <CardHeader>
        <Tabs defaultValue="one-way" className="w-full">
          <TabsList className="grid grid-cols-3 text-[15px] capitalize lg:w-[400px] md:w-[400px] sm:w-full w-full">
            <TabsTrigger value="one-way">
              <p className="text-[15px] capitalize">One way</p>
            </TabsTrigger>
            <TabsTrigger value="Round-trip">
              <p className="text-[15px] capitalize">Round trip</p>
            </TabsTrigger>
            <TabsTrigger value="multi-city">
              <p className="text-[15px] capitalize">multi city</p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="one-way" className="w-full">
            <OneWayTab />
          </TabsContent>
          <TabsContent value="Round-trip">
            <RoundTripTab />
          </TabsContent>
          <TabsContent value="multi-city">
            <MultiCityTab />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </>
  );
};

export default FlightTab;
