import {
  Layers2,
  LayoutDashboard,
  MessageSquarePlus,
  Package,
  Settings,
  ShoppingCart,
  Star,
} from "lucide-react";

export const adminSidebarItems = [
  { text: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  {
    text: "Categories",
    href: "/dashboard/admin/manage-categories",
    icon: Layers2,
  },
  {
    text: "Add Product",
    href: "/dashboard/admin/add-product",
    icon: MessageSquarePlus,
  },
  {
    text: "Manage Products",
    href: "/dashboard/admin/manage-products",
    icon: Settings,
  },
  {
    text: "Manage Orders",
    href: "/dashboard/admin/manage-orders",
    icon: Package,
  },
  {
    text: "Manage Reviews",
    href: "/dashboard/admin/manage-reviews",
    icon: Star,
  },
  // { text: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
];

export const userSidebarItems = [
  { text: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  {
    text: "Products",
    href: "/dashboard/user/cart-products",
    icon: ShoppingCart,
  },
];
