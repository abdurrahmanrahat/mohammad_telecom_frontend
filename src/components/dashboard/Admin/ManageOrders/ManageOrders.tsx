"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import MyPagination from "@/components/shared/Ui/MyPagination";
import { PaginationSkeleton } from "@/components/shared/Ui/PaginationSkeleton";
import SectionTitle from "@/components/shared/Ui/SectionTitle";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounced from "@/hooks/useDebounced";
import { cn } from "@/lib/utils";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { Search } from "lucide-react";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; // Number of items per page

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  const query: Record<string, any> = {};

  if (debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  if (activeTab) {
    query["status"] = activeTab;
  }
  if (currentPage) {
    query["page"] = currentPage;
  }
  if (limit) {
    query["limit"] = limit;
  }

  // redux api
  const { data: orders, isLoading: isOrderLoading } = useGetOrdersQuery(query);

  // if (isOrderLoading) {
  //   return <MyLoader />;
  // }
  const ordersData = orders?.data?.data || [];

  const totalData = orders?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalData / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // handle search change from the filter bar
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="py-6">
      {/* section title */}
      <div className="md:flex justify-between items-center gap-8 mb-6">
        <div className="w-full md:w-1/2">
          <SectionTitle text="Manage Orders" />
          <p className="font-medium text-base">
            Total: <span className="">{ordersData.length}</span> orders
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-1/2 mt-6 md:mt-0">
          <Input
            type="search"
            placeholder={`Search orders...`}
            className="pl-10 pr-4 h-10 w-full border-none bg-primary/10"
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

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

          <TabsContent value={activeTab} className="mt-6">
            {isOrderLoading ? <MyLoader /> : <OrderList orders={ordersData} />}
          </TabsContent>
        </Tabs>
      </div>

      {/* pagination */}
      {ordersData?.length > 0 && (
        <div className="flex justify-center items-center mt-8">
          {isOrderLoading ? (
            <PaginationSkeleton />
          ) : (
            <MyPagination
              onPageChange={handlePageChange}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
