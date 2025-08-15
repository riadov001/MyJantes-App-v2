import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16"
  };

  return (
    <img 
      src="https://myjantes.fr/wp-content/uploads/2024/01/cropped-Logo-2-1-768x543.png"
      alt="My Jantes - Expert en rénovation de jantes"
      className={cn(sizes[size], "w-auto object-contain", className)}
    />
  );
}