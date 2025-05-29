"use client";

// import {
//   Avatar,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   Input,
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
// } from "@nextui-org/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { SidebarItem } from "../Sidebar/Sidebar.helpers";
import { adminSidebarItems, userSidebarItems } from "../Sidebar/sidebar.utils";

export default function DashboardNavbar({
  role,
  children,
}: {
  role: "user" | "admin";
  children: ReactNode;
}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const pathname = usePathname();

  // Toggle function to handle the navbar's display
  const handleNavToggle = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  // Function to handle clicks outside of the navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.getElementById("navbar");
      if (isOpenMenu && navbar && !navbar.contains(event.target as Node)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu]);

  // Close menu when route changes
  useEffect(() => {
    setIsOpenMenu(false);
  }, [pathname]);

  return (
    <div>
      <div className="w-full">
        <div className="lg:hidden shadow-cardLightShadow border-b border-gray-200 bg-white">
          <div className="w-[90%] mx-auto flex justify-between py-4 ">
            <div className="">
              <Link href="/">
                {/* <Image src={IMAGES.shared.Logo} alt="Logo" /> */}
                <h2 className="text-xl font-semibold">Brand Logo</h2>
              </Link>
            </div>

            <div onClick={handleNavToggle} className="block lg:hidden ">
              {isOpenMenu ? <X /> : <Menu />}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="navbar"
          className={`fixed lg:hidden top-0 left-0 bg-secondary w-[70%] md:w-[50%] border-r h-screen ease-in-out duration-700 z-[999] p-[20px] ${
            isOpenMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* logo */}
          <div className="my-[12px] flex justify-center items-center">
            <Link href="/">
              {/* <Image src={IMAGES.shared.Logo} alt="Logo" /> */}
              <h2 className="text-xl font-semibold text-white">Brand Logo</h2>
            </Link>
          </div>

          {/* mobile nav items */}
          <nav className="mt-8">
            <div className="space-y-[6px]">
              {role === "user" &&
                userSidebarItems.map((item, index) => (
                  <SidebarItem key={index} item={item} />
                ))}

              {role === "admin" &&
                adminSidebarItems.map((item, index) => (
                  <SidebarItem key={index} item={item} />
                ))}
            </div>
          </nav>
        </div>
      </div>
      <div className="w-[90%] mx-auto max-w-[1240px]">{children}</div>
    </div>
  );
}
