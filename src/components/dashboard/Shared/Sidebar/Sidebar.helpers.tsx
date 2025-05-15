import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TItemProps = {
  text: string;
  href: string;
  icon: LucideIcon;
};

export const SidebarItem = ({ item }: { item: TItemProps }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      key={item.href}
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ",
        "group relative overflow-hidden ",
        isActive && "bg-primary font-medium"
      )}
    >
      <div className="flex items-center gap-3 text-white">
        <item.icon className="w-4 h-4" />
        <span className="text-base">{item.text}</span>
      </div>
    </Link>
  );
};
