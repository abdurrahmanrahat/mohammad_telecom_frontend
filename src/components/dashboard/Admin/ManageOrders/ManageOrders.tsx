"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import SectionTitle from "@/components/shared/Ui/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { TOrder } from "@/types";
import { useState } from "react";
import OrderList from "./OrderList";

const orderStatuses = [
  { _id: 1, label: "PENDING" },
  { _id: 2, label: "PROCESSING" },
  { _id: 3, label: "SHIPPED" },
  { _id: 4, label: "DELIVERED" },
  { _id: 5, label: "CANCELLED" },
];

const ManageOrders = () => {
  const [activeTab, setActiveTab] = useState("PENDING");

  // redux api
  const { data: orders, isLoading: isOrderLoading } = useGetOrdersQuery({});

  if (isOrderLoading) {
    return <MyLoader />;
  }

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
          <TabsList className="w-full justify-start rounded-none bg-transparent h-auto overflow-auto">
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

          {orderStatuses.map((status) => {
            const filteredOrders = orders.data.data.filter(
              (order: TOrder) => order.status === status.label
            );

            return (
              <TabsContent
                key={status._id}
                value={status.label}
                className="mt-6"
              >
                <OrderList orders={filteredOrders} />
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default ManageOrders;
