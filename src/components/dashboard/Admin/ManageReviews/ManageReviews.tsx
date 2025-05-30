"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import MyPagination from "@/components/shared/Ui/MyPagination";
import { PaginationSkeleton } from "@/components/shared/Ui/PaginationSkeleton";
import SectionTitle from "@/components/shared/Ui/SectionTitle";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounced from "@/hooks/useDebounced";
import { cn } from "@/lib/utils";
import { useGetAllReviewsQuery } from "@/redux/api/productReviewApi";
import { Search } from "lucide-react";
import { useState } from "react";
import ReviewList from "./ReviewList";

const reviewStatuses = [
  { _id: 1, label: "PENDING" },
  { _id: 2, label: "APPROVED" },
];

type TReviewRating = "1" | "2" | "3" | "4" | "5" | "all";

const ManageReviews = () => {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [selectedRating, setSelectedRating] = useState<TReviewRating>("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; // Number of items per page

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  const query: Record<string, any> = {};

  if (debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  if (activeTab) {
    query["isVerified"] = activeTab === "PENDING" ? false : true;
  }
  if (selectedRating !== "all") {
    query["rating"] = Number(selectedRating);
  }
  if (currentPage) {
    query["page"] = currentPage;
  }
  if (limit) {
    query["limit"] = limit;
  }

  // redux api
  const { data: reviews, isLoading: isReviewsLoading } =
    useGetAllReviewsQuery(query);

  // if (isOrderLoading) {
  //   return <MyLoader />;
  // }
  const reviewsData = reviews?.data?.data || [];

  const totalData = reviews?.data?.totalCount || 0;
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

  const statusOptions: {
    value: TReviewRating;
    label: string;
  }[] = [
    { value: "all", label: "All" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  return (
    <div className="py-6">
      {/* section title */}
      <div className="md:flex justify-between items-center gap-8 mb-6">
        <div className="w-full md:w-1/2">
          <SectionTitle text="Manage Reviews" />
          <p className="font-medium text-base">
            Total: <span className="">{reviewsData.length || 0}</span> reviews
          </p>
        </div>

        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex items-center gap-2 md:gap-4">
          <div className="w-1/3">
            <Select
              value={selectedRating}
              onValueChange={(value: TReviewRating) => setSelectedRating(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Search bar */}
          <div className="relative w-2/3">
            <Input
              type="search"
              placeholder={`Search reviews...`}
              className="pl-10 pr-4 h-10 w-full border-none bg-primary/10"
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* tabs */}
      <div>
        <Tabs
          defaultValue={activeTab}
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="w-full justify-start rounded-none bg-transparent h-auto overflow-auto">
            {reviewStatuses.map((status) => (
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
            {isReviewsLoading ? (
              <MyLoader />
            ) : (
              <ReviewList reviews={reviewsData} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* pagination */}
      {reviewsData?.length > 0 && (
        <div className="flex justify-center items-center mt-8">
          {isReviewsLoading ? (
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

export default ManageReviews;
