import DashboardNavbar from "@/components/dashboard/Shared/DashboardNavbar/DashboardNavbar";
import Sidebar from "@/components/dashboard/Shared/Sidebar/Sidebar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-2 hidden lg:block">
        <Sidebar role="admin" />
      </div>
      <div className="col-span-12 lg:col-span-10">
        <DashboardNavbar role="admin">{children}</DashboardNavbar>
      </div>
    </div>
  );
};

export default AdminLayout;
