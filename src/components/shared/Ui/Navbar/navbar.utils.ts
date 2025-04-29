const admin = "admin";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/blogs", label: "Blogs" },
  {
    href: "",
    label: "dropdown",
    dropdownNavItems: [
      {
        label: "Demo",
        id: "demo",
        submenu: [
          { href: "/demo01", label: "Demo 01" },
          { href: "/demo02", label: "Demo 02" },
          { href: "/demo03", label: "Demo 03" },
        ],
      },
    ],
  },
  // { href: `/dashboard/${admin}`, label: "Dashboard" },
];

// export const dropdownNavItems = [
//   {
//     label: "Demo",
//     id: "demo",
//     submenu: [
//       { href: "/demo01", label: "Demo 01" },
//       { href: "/demo02", label: "Demo 02" },
//       { href: "/demo03", label: "Demo 03" },
//     ],
//   },
//   {
//     label: "Pemo",
//     id: "pemo",
//     submenu: [
//       { href: "/demo01", label: "Pemo 01" },
//       { href: "/demo02", label: "Pemo 02" },
//       { href: "/demo03", label: "Pemo 03" },
//     ],
//   },
// ];
