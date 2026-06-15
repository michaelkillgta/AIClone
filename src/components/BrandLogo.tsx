import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  // Compute height based on size prop
  const heightClass = size === "sm" 
    ? "h-[22px]" 
    : size === "md" 
    ? "h-[28px]" 
    : "h-[42px]";

  return (
    <img 
      src="/logo.png" 
      alt="MakeItViral.ai Logo" 
      className={`${heightClass} w-auto object-contain select-none ${className}`}
      draggable={false}
    />
  );
}
