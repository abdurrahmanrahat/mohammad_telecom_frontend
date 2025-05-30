"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { PaginationSkeleton } from "@/components/shared/Ui/PaginationSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDebounced from "@/hooks/useDebounced";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { TProduct } from "@/types";
import { getPaginationPageItems } from "@/utils/getPaginationPageItems";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteProductModal from "./DeleteProductModal";
import ProductDetailsModal from "./ProductDetailsModal";
import SearchFilter from "./SearchFilter";

const ManageProducts = () => {
  const [category, setCategory] = useState("");
  // const [priceRange, setPriceRange] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSortOption, setCurrentSortOption] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12; // Number of items per page

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  const query: Record<string, any> = {};

  if (debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  if (category) {
    query["category"] = category;
  }

  // if (priceRange) {
  //   const [minPrice, maxPrice] = priceRange.split("-");

  //   query["minPrice"] = Number(minPrice);
  //   query["maxPrice"] = Number(maxPrice);
  // }

  if (currentSortOption !== "all") {
    query["sort"] = currentSortOption;
  }

  if (currentPage) {
    query["page"] = currentPage;
  }
  if (limit) {
    query["limit"] = limit;
  }

  // RTK Query hook
  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery(query);

  // handle category change from the filter bar
  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === "all") {
      setCategory("");
    } else {
      setCategory(newCategory);
    }
  };

  // handle price range change from the filter bar
  // const handlePriceRangeChange = (newPriceRange: string) => {
  //   setPriceRange(newPriceRange);
  // };

  // handle search change from the filter bar
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // Handle sorting change from the header
  const handleSortChange = (sortOption: string) => {
    setCurrentSortOption(sortOption);
  };

  const totalData = productsData?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalData / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Get pagination items based on current page and total pages
  const pageNumbers = getPaginationPageItems(currentPage, totalPages);

  useEffect(() => {
    // setCategory("");
    setCurrentPage(1); // Optional: reset pagination on filter change
  }, [currentSortOption]);

  if (isProductsLoading) {
    return <MyLoader />;
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <p className="font-medium text-sm">
            Total: <span className="">{productsData.data.totalCount}</span>{" "}
            products
          </p>
        </div>

        <Link href={`/dashboard/admin/add-product`}>
          <Button className="cursor-pointer h-11">Add New Product</Button>
        </Link>
      </div>

      <SearchFilter
        category={category}
        onSearchChange={handleSearchChange}
        onCategoryHandler={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {/* table */}
      <div className="shadow-cardLightShadow rounded-md">
        {productsData?.data?.data?.length === 0 ? (
          <div className="w-full h-full flex justify-center text-center mt-16 py-12">
            <h2 className="text-xl md:text-2xl font-medium">
              No Product Found!
            </h2>
          </div>
        ) : (
          <Table className="w-full ">
            <TableHeader className="">
              <TableRow className="bg-primary text-white text-base py-3">
                <TableHead className="w-[80px] py-3">Image</TableHead>
                <TableHead className="max-w-[250px] py-3">
                  Product Name
                </TableHead>
                <TableHead className="py-3">Category</TableHead>
                <TableHead className="py-3">Price</TableHead>
                <TableHead className="py-3">Stock</TableHead>
                <TableHead className="py-3">Sold</TableHead>
                <TableHead className="text-right py-3">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsData.data.data.map((product: TProduct) => (
                <TableRow key={product._id} className="">
                  <TableCell>
                    <div className="h-12 w-12 relative overflow-hidden rounded-md">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium max-w-[250px] truncate">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Badge className="capitalize text-white">
                      {product.category.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>৳{product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.stock > 10 ? "default" : "destructive"}
                      className="font-medium text-white"
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.salesCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <ProductDetailsModal product={product} />

                      {/* <EditProductModal product={product} /> */}
                      <Link
                        href={`/dashboard/admin/manage-products/${product.slug}`}
                        className="mt-2"
                      >
                        <button className="cursor-pointer">
                          <Edit className="h-5 w-5" />
                        </button>
                      </Link>

                      <DeleteProductModal productId={product._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* pagination */}
      {productsData?.data?.data?.length > 0 && (
        <div className="flex justify-center items-center mt-8">
          {isProductsLoading ? (
            <PaginationSkeleton />
          ) : (
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    {/* <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    /> */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="cursor-pointer mr-2 border-none bg-primary/20"
                    >
                      {/* Icon only on mobile */}
                      <span className="block md:hidden">
                        <ChevronLeft />
                      </span>

                      {/* Icon + text on desktop */}
                      <span className="hidden md:flex items-center gap-1">
                        <ChevronLeft />
                        <span>Previous</span>
                      </span>
                    </Button>
                  </PaginationItem>

                  {pageNumbers.map((page: string | number, idx: number) => (
                    <PaginationItem key={idx}>
                      {page === "..." ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(Number(page))}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    {/* <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    /> */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="cursor-pointer ml-2 border-none bg-primary/20"
                    >
                      {/* Mobile: icon only */}
                      <span className="block md:hidden">
                        <ChevronRight />
                      </span>

                      {/* Desktop: icon + text */}
                      <span className="hidden md:flex items-center gap-1">
                        <span>Next</span>
                        <ChevronRight />
                      </span>
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
