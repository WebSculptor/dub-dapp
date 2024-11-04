"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export default function CustomButton({
  children,
  className,
  variant,
  size,
  type,
  onClick,
  disabled,
}: ICustomButton) {
  return (
    <motion.button
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      type={type || "submit"}
      className={buttonVariants({
        className: cn("flex items-center justify-center", className),
        size: size || "default",
        variant: variant || "default",
      })}
      onClick={onClick}>
      {children}
    </motion.button>
  );
}
