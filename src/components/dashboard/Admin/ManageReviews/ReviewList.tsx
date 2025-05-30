import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TProductReview } from "@/types";
import DeleteReviewModal from "./DeleteReviewModal";
import DetailsReviewModal from "./DetailsReviewModal";
import EditReviewModal from "./EditReviewModal";

const ReviewList = ({ reviews }: { reviews: TProductReview[] }) => {
  return (
    <div className="shadow-cardLightShadow rounded-md">
      {reviews?.length === 0 ? (
        <div className="w-full h-full flex justify-center text-center mt-16 py-12">
          <h2 className="text-xl md:text-2xl font-medium">No Review Found!</h2>
        </div>
      ) : (
        <Table className="w-full">
          <TableHeader className="">
            <TableRow className="bg-primary text-white text-base py-3">
              <TableHead className="py-3">Username</TableHead>
              <TableHead className="py-3">email</TableHead>
              <TableHead className="py-3">rating</TableHead>
              <TableHead className="py-3">Status</TableHead>
              <TableHead className="text-right py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review: TProductReview) => (
              <TableRow key={review._id}>
                <TableCell className="py-3 font-medium max-w-[250px] truncate">
                  {review.username}
                </TableCell>
                <TableCell className="py-3">
                  <span className="">{review.email}</span>
                </TableCell>
                <TableCell className="py-3">
                  <span className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    variant={review.isVerified ? "default" : "destructive"}
                    className="capitalize"
                  >
                    {review.isVerified ? "Approved" : "Pending"}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex justify-end gap-2">
                    <DetailsReviewModal review={review} />
                    <EditReviewModal
                      productId={review.product._id}
                      reviewId={review._id}
                      currentStatus={review.isVerified ? "APPROVED" : "PENDING"}
                    />
                    <DeleteReviewModal
                      productId={review.product._id}
                      reviewId={review._id}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ReviewList;
