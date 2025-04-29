import ActiveLink from "../ActiveLink";

// Desktop Nav Item
export function NavItem({
  href,
  label,
  exact,
}: {
  href: string;
  label: string;
  exact: boolean;
}) {
  return (
    <div className="rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-[#3a0579] transition-colors duration-300">
      <ActiveLink exact={exact} href={href}>
        {label}
      </ActiveLink>
    </div>
  );
}

// Mobile Nav Item
export function MobileNavItem({
  href,
  label,
  exact,
  onClick,
}: {
  href: string;
  label: string;
  exact: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-[#3a0579] transition-colors duration-300"
    >
      <ActiveLink exact={exact} href={href}>
        {label}
      </ActiveLink>
    </div>
  );
}

// Desktop Submenu Item
export function SubMenuItem({ href, label }: { href: string; label: string }) {
  return (
    <div className="rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-[#3a0579] transition-colors duration-300">
      <ActiveLink href={href}>{label}</ActiveLink>
    </div>
  );
}

// Mobile Submenu Item
export function MobileSubMenuItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-[#3a0579] transition-colors duration-300"
    >
      <ActiveLink href={href}>{label}</ActiveLink>
    </div>
  );
}
