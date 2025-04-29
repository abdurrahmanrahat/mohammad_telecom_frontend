import { Metadata } from "next";
import { ReactNode } from "react";
import UserLayout from "./layout/UserLayout";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "Welcome to ",
};

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <UserLayout>{children}</UserLayout>
    </div>
  );
};

export default UserDashboardLayout;
