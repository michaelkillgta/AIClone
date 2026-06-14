import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  // Configured sizing tailwind classes
  const textClass = size === "sm" 
    ? "text-sm font-bold" 
    : size === "md" 
    ? "text-lg md:text-xl font-extrabold" 
    : "text-2xl md:text-3xl font-black";

  const bubbleClass = size === "sm"
    ? "h-[18px] w-6 rounded-md"
    : size === "md"
    ? "h-[24px] w-8 rounded-lg"
    : "h-[36px] w-12 rounded-xl";

  const heartStyle = size === "sm"
    ? { top: "-6px", width: "9px", height: "9px" }
    : size === "md"
    ? { top: "-8px", width: "11px", height: "11px" }
    : { top: "-11px", width: "16px", height: "16px" };

  const letterStyle = size === "sm"
    ? "text-[11px]"
    : size === "md"
    ? "text-[15px]"
    : "text-[22px]";

  const arrowClass = size === "sm"
    ? "w-1.5 h-1.5 -bottom-0.5"
    : size === "md"
    ? "w-2 h-2 -bottom-[3px]"
    : "w-3 h-3 -bottom-1";

  return (
    <div 
      id={`brand-logo-${size}`} 
      className={`flex items-center ${className} select-none font-sans tracking-tight text-white inline-flex`}
      style={{ overflow: "visible" }}
    >
      <span className={`${textClass} lowercase`}>make</span>
      
      {/* Coral Red "it" Chat/Like bubble as shown in prompt image 2 */}
      <div 
        className={`relative flex items-center justify-center bg-[#f15b6c] mx-1 shrink-0 ${bubbleClass}`}
        style={{ overflow: "visible" }}
      >
        <span className="relative flex items-center font-extrabold text-white leading-none">
          {/* Dotless i with Custom Heart Jot */}
          <span className="relative inline-block mr-[1px] leading-none">
            <svg 
              className="absolute text-white fill-current left-1/2 -translate-x-1/2 transition-all" 
              style={heartStyle} 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span className={`${letterStyle} font-extrabold leading-none select-none`}>ı</span>
          </span>
          <span className={`${letterStyle} font-extrabold leading-none`}>t</span>
        </span>
        
        {/* Dynamic Bubble Pointer at the bottom (SVG for perfect chat bubble shape) */}
        <svg 
          className="absolute left-[35%] -translate-x-1/2 text-[#f15b6c] fill-current" 
          style={{
            bottom: size === "sm" ? "-5px" : size === "md" ? "-7px" : "-10px",
            width: size === "sm" ? "8px" : size === "md" ? "12px" : "16px",
            height: size === "sm" ? "6px" : size === "md" ? "8px" : "11px",
          }}
          viewBox="0 0 12 8"
        >
          <path d="M 0 0 L 12 0 L 3 8 Z" />
        </svg>
      </div>

      <span className={`${textClass} lowercase`}>viral.ai</span>
    </div>
  );
}
