"use client";

import type React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Star, Verified } from "lucide-react";
import { useState } from "react";

interface Review {
  id: string;
  username: string;
  email: string;
  rating: number;
  review: string;
  createdAt: Date;
  isVerified: boolean;
}

interface ProductReviewsProps {
  productId: string;
}

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

  const [hoveredRating, setHoveredRating] = useState(0);

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newReview.username &&
      newReview.email &&
      newReview.rating &&
      newReview.review
    ) {
      const review: Review = {
        id: Date.now().toString(),
        ...newReview,
        createdAt: new Date(),
        isVerified: false,
      };
      console.log(review);
      setReviews([review, ...reviews]);
      setNewReview({
        username: "",
        email: "",
        rating: 0,
        review: "",
      });
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
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Name *</Label>
                  <Input
                    id="username"
                    value={newReview.username}
                    onChange={(e) =>
                      setNewReview({ ...newReview, username: e.target.value })
                    }
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newReview.email}
                    onChange={(e) =>
                      setNewReview({ ...newReview, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Rating *</Label>
                <div className="flex space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || newReview.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="review">Your Review *</Label>
                <Textarea
                  id="review"
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview({ ...newReview, review: e.target.value })
                  }
                  placeholder="Share your experience with this product..."
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
