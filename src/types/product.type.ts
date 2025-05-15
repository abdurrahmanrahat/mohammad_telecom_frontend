export type TProduct = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  images: string[];
  category: string;
  price: number;
  stock: number;
  discount: number | null;
  tags: string[];
  totalReviews: number;
  averageRatings: number;
  salesCount: number;
  isDeleted: boolean;
  createdAt: string; // ISO string (or `Date` if parsed)
  updatedAt: string; // ISO string (or `Date` if parsed)
  __v: number;
};
