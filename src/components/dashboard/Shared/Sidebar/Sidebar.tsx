"use client";

import Container from "@/components/shared/Ui/Container";
import Link from "next/link";
import { SidebarItem } from "./Sidebar.helpers";
import { adminSidebarItems, userSidebarItems } from "./sidebar.utils";

const Sidebar = ({ role }: { role: "user" | "admin" }) => {
  return (
    <div className="h-screen w-2/12 fixed top-0 left-0 px-4 md:px-0 py-4 md:py-0 border-r bg-secondary">
      <Container>
        <div className="">
          {/* logo section */}
          <div className="flex justify-center items-center pt-6">
            <Link href="/">
              {/* <Image src={IMAGES.shared.Logo} alt="Logo" /> */}
              <h2 className="text-xl font-semibold text-white">Brand Logo</h2>
            </Link>
          </div>

          {/* Nav items section */}
          <div className="hidden md:flex flex-col mt-8 w-full">
            {role === "user" &&
              userSidebarItems.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}

            {role === "admin" &&
              adminSidebarItems.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Sidebar;
