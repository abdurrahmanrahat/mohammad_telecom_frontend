"use client";
import { cn } from "@/lib/utils";
import "@/styles/loader.css";
import { Loader } from "lucide-react";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export function LoaderSpinner({
  size = 24,
  color = "#fff",
  className,
  strokeWidth = 3,
}: LoaderProps) {
  return (
    <Loader
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={cn("loading-spin-slow", className)}
    />
  );
}
