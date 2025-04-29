import {
  LayoutDashboard,
  MessageCircle,
  MessageSquarePlus,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export const userSidebarItems = [
  { text: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
  {
    text: "Products",
    href: "/dashboard/user/cart-products",
    icon: ShoppingCart,
  },
  { text: "Contact", href: "/contact/user/contact", icon: MessageCircle },
];

export const adminSidebarItems = [
  { text: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
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
  { text: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
];
