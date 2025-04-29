import { cn } from "@/lib/utils";
import { ChevronRight, LucideIcon } from "lucide-react";
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
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        "group relative overflow-hidden",
        isActive && "bg-accent font-medium text-accent-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <item.icon className="w-4 h-4" />
        <span className="text-base">{item.text}</span>
      </div>
      <ChevronRight
        className={cn(
          "ml-auto h-4 w-4 text-muted-foreground/50",
          "transition-transform duration-300 ease-in-out",
          "group-hover:translate-x-0.5 group-hover:text-foreground"
        )}
      />
      {isActive && (
        <div className="absolute inset-y-0 left-0 w-1 bg-[#3a0579] rounded-full" />
      )}
    </Link>
  );
};
