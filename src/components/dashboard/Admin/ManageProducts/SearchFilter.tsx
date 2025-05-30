import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";

type TSearchFilterProps = {
  category: string;
  onSearchChange: (newSearchTerm: string) => void;
  onCategoryHandler: (category: string) => void;
  onSortChange: (sortOption: string) => void;
};

const SearchFilter = ({
  category,
  onSearchChange,
  onCategoryHandler,
  onSortChange,
}: TSearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  // RTK Query hook
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({});

  if (isCategoriesLoading) {
    return <MyLoader />;
  }

  // categories list for dropdown
  const allCategoriesList: { label: string; value: string }[] =
    categoriesData?.data?.flatMap((parentCategory: TCategory) => {
      const parentItem = {
        label: parentCategory.title,
        value: parentCategory.slug,
      };

      const subItems = Array.isArray(parentCategory.subCategories)
        ? parentCategory.subCategories.map((sub) => ({
            label: sub.title,
            value: sub.slug,
          }))
        : [];

      return [parentItem, ...subItems];
    }) || [];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  // Handle sort option selection
  const handleSortChange = (option: string) => {
    setSortOption(option);
    // Call the parent's onSortChange callback with the new sort option
    onSortChange(option);
  };

  const sortOptions = [
    { label: "Normal", value: "all" },
    { label: "Price: Low to High", value: "price:low_to_high" },
    { label: "Price: High to Low", value: "price:high_to_low" },
    { label: "Newest", value: "newest" },
    { label: "Best Selling", value: "best_selling" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Name: A to Z", value: "sort:a_to_z" },
    { label: "Name: Z to A", value: "sort:z_to_a" },
  ];

  return (
    <div className="mb-6 md:flex justify-between items-center gap-8">
      {/* Search bar */}
      <div className="relative w-full">
        <Input
          type="search"
          placeholder={`Search ${category || "products"}...`}
          className="pl-10 pr-4 h-10 w-full border-none bg-primary/10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <div className="flex justify-center md:justify-end items-center gap-2 md:gap-4 mt-4 md:mt-0">
        <Select value={category} onValueChange={onCategoryHandler}>
          <SelectTrigger className="max-w-[120px] md:max-w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Products</SelectItem>
              {allCategoriesList.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Sort dropdown */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="focus-visible:ring-0 border-none"
          >
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border border-primary/10"
            >
              <ArrowUpDown className="mr-1 h-3.5 w-3.5" />
              <span>{sortOption ? sortOption : "Featured"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white">
            {sortOptions.map((option: TSortOption) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className="cursor-pointer hover:bg-primary/10"
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu> */}
        <Select
          value={sortOption}
          onValueChange={(value: string) => handleSortChange(value)}
        >
          <SelectTrigger className="w-56 border border-primary/10">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilter;
