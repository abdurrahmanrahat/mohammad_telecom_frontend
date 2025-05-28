"use client";

import SectionTitle from "@/components/shared/Ui/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

const orderStatuses = [
  { _id: 1, label: "PENDING" },
  { _id: 2, label: "PROCESSING" },
  { _id: 3, label: "SHIPPED" },
  { _id: 4, label: "DELIVERED" },
  { _id: 5, label: "CANCELLED" },
];

const ManageOrders = () => {
  const [activeTab, setActiveTab] = useState("PENDING");

  return (
    <div className="py-6">
      {/* section title */}
      <div className="mb-6">
        <SectionTitle text="Manage Orders" />
        <p className="font-medium text-base">
          Total: <span className="">24</span> orders
        </p>
      </div>

      {/* search */}

      {/* tabs */}
      <div>
        <Tabs
          defaultValue={activeTab}
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="w-full md:w-[300px] justify-start rounded-none bg-transparent h-auto">
            {orderStatuses.map((status) => (
              <TabsTrigger
                key={status._id}
                value={status.label}
                className={cn(
                  "rounded-none px-6 py-3 cursor-pointer transition-all duration-300",
                  "data-[state=active]:border-b-2 data-[state=active]:border-primary",
                  "data-[state=active]:font-semibold data-[state=active]:text-primary",
                  "data-[state=active]:bg-muted data-[state=active]:shadow-sm data-[state=active]:rounded-t-md"
                )}
              >
                {status.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="PENDING" className="mt-6">
            dd
          </TabsContent>
          <TabsContent value="PROCESSING" className="mt-6">
            hh
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageOrders;
