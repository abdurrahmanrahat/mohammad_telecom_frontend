import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TProductReview } from "@/types";
import { Info, Star } from "lucide-react";
import { useState } from "react";

const DetailsReviewModal = ({ review }: { review: TProductReview }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const formatDate = (date: Date | string): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Info className="h-5 w-5 hover:text-primary" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full !max-w-[600px] max-h-[80%] overflow-auto bg-white rounded-lg shadow-xl">
        <div>
          <DialogHeader className="mb-4 border-b pb-4">
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {review.username}
              <Badge
                variant={review.isVerified ? "default" : "destructive"}
                className="capitalize"
              >
                {review.isVerified ? "Verified Purchase" : "Pending"}
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {review.email}
            </DialogDescription>
          </DialogHeader>

          {/* Review content */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= review.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-700 text-base leading-relaxed">
              {review.review}
            </p>

            <div className="text-right text-sm text-gray-500">
              Reviewed on: {formatDate(review.createdAt)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsReviewModal;
