import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function SearchInput() {
  const [readOnly, setReadOnly] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearchClick = () => {
    // const trimmed = query.trim();
    if (query) {
      router.push(`/products?searchTerm=${query}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full lg:w-[300px]">
      <Input
        ref={inputRef}
        readOnly={readOnly}
        type="text" // ✅ use text instead of "search" to avoid native ✕
        placeholder="Search products..."
        value={query}
        onClick={() => setReadOnly(false)}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-4 pr-14 border-0 bg-white/10 text-white placeholder:text-white/70 focus:ring-white"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchClick();
        }}
      />

      {/* Clear icon button */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-7 top-3 z-10 text-muted-foreground cursor-pointer text-gray-200"
        >
          <X className="h-3 w-3" />
        </button>
      )}

      {/* Search icon button */}
      <button
        type="button"
        onClick={handleSearchClick}
        className="absolute right-2.5 top-2.5 z-10 text-muted-foreground cursor-pointer"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
}
