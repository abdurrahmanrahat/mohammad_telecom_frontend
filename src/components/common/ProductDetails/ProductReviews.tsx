"use client";

import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import MTRating from "@/components/shared/Forms/MTRating";
import MTTextArea from "@/components/shared/Forms/MTTextArea";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAddReviewMutation } from "@/redux/api/productReviewApi";
import { Star, Verified } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Review {
  id: string;
  username: string;
  email: string;
  rating: number;
  review: string;
  createdAt: Date;
  isVerified: boolean;
}

const reviewSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Enter a valid email address"),
  rating: z
    .number({ required_error: "Rating is required" })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  review: z.string().min(1, "Review content is required"),
});

const reviewDefaultValues = {
  username: "",
  email: "",
  rating: 0,
  review: "",
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      username: "Sarah Johnson",
      email: "sarah.j@email.com",
      rating: 5,
      review:
        "This back cover is exactly what I was looking for. The quality is excellent and it fits my Xiaomi Mi 5 perfectly. Installation was super easy and it looks great. Highly recommended!",
      createdAt: new Date("2024-01-15"),
      isVerified: true,
    },
    {
      id: "2",
      username: "Mike Chen",
      email: "mike.chen@email.com",
      rating: 4,
      review:
        "Solid product for the price. The glass feels premium and the white color matches perfectly. Only minor issue is that it took a bit longer to ship than expected, but overall satisfied with the purchase.",
      createdAt: new Date("2024-01-10"),
      isVerified: true,
    },
    {
      id: "3",
      username: "Emma Wilson",
      email: "emma.w@email.com",
      rating: 5,
      review:
        "My original back cover cracked and this was the perfect replacement. The quality is actually better than the original! Fast shipping and great customer service.",
      createdAt: new Date("2024-01-05"),
      isVerified: false,
    },
    {
      id: "4",
      username: "David Rodriguez",
      email: "david.r@email.com",
      rating: 3,
      review:
        "The cover does its job but the adhesive could be stronger. It started peeling at the edges after a few weeks. For the price it's okay, but I expected it to last longer.",
      createdAt: new Date("2023-12-28"),
      isVerified: true,
    },
  ]);

  const [newReview, setNewReview] = useState({
    username: "",
    email: "",
    rating: 0,
    review: "",
  });

  // redux api
  const [addReview, { isLoading: isAddReviewLoading }] = useAddReviewMutation();

  // Calculate review statistics
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      (reviews.filter((review) => review.rating === rating).length /
        reviews.length) *
      100,
  }));

  const handleSubmitReview = async (values: FieldValues) => {
    const newReview = { ...values, product: productId };

    const payload = {
      productId,
      reviewData: newReview,
    };

    // Handle form submission logic here
    try {
      const res = await addReview(payload).unwrap();

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        {/* Reviews Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Customer Reviews</span>
              <Badge variant="outline">{reviews.length} reviews</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Average Rating */}
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(averageRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  Based on {reviews.length} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8">{rating}★</span>
                    <Progress value={percentage} className="flex-1" />
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">All Reviews</h3>
          {reviews.map((review) => (
            <Card key={review.id} className="p-0">
              <CardContent className="py-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {getInitials(review.username)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="md:flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{review.username}</h4>
                          {review.isVerified && (
                            <Badge variant="outline" className="text-xs">
                              <Verified className="w-3 h-3 mr-1" />
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {formatDate(review.createdAt)}
                        </p>
                      </div>

                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        {/* Write a Review Form */}
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <MTForm
              onSubmit={handleSubmitReview}
              schema={reviewSchema}
              defaultValues={reviewDefaultValues}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <div className="grid gap-1">
                    <label htmlFor="username" className="text-sm font-medium">
                      Name <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput
                      name="username"
                      type="text"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput
                      name="email"
                      type="email"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Rating <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTRating name="rating" />
                  </div>
                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your review{" "}
                      <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTTextArea
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      name="review"
                      rows={10}
                      className="min-h-[120px]"
                    />
                  </div>
                </div>

                <div className="mt-2 w-full flex justify-end">
                  <Button className="h-11 cursor-pointer w-full" type="submit">
                    {isAddReviewLoading ? (
                      <span className="flex gap-2">
                        <LoaderSpinner /> <span>Submitting...</span>
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </div>
            </MTForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
