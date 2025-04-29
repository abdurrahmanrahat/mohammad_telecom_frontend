import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to ",
};

const DashboardMainLayout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default DashboardMainLayout;
