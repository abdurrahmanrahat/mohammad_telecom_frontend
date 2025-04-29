"use client";

import Container from "@/components/shared/Ui/Container";
import Link from "next/link";
import { SidebarItem } from "./Sidebar.helpers";
import { adminSidebarItems, userSidebarItems } from "./sidebar.utils";

const Sidebar = ({ role }: { role: "user" | "admin" }) => {
  return (
    <div className="h-screen px-4 md:px-0 py-4 md:py-0 border-r">
      <Container>
        <div className="p-10">
          {/* logo section */}
          <div className="flex justify-start items-center">
            <Link href="/">
              {/* <Image src={IMAGES.shared.Logo} alt="Logo" /> */}
              <h2 className="text-xl font-semibold">Brand Logo</h2>
            </Link>
          </div>

          {/* Nav items section */}
          <div className="hidden md:flex flex-col mt-8">
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
