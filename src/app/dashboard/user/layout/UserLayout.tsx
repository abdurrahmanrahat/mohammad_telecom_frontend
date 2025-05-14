import DashboardNavbar from "@/components/dashboard/Shared/DashboardNavbar/DashboardNavbar";
import Sidebar from "@/components/dashboard/Shared/Sidebar/Sidebar";
import { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-3 hidden lg:block">
        <Sidebar role="user" />
      </div>
      <div className="col-span-12 lg:col-span-9">
        <DashboardNavbar role="user">{children}</DashboardNavbar>
      </div>
    </div>
  );
};

export default UserLayout;
