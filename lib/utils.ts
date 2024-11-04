import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(str: string, n: number = 6) {
  return str?.length > n
    ? str.slice(0, n) + "..." + str.slice(str.length - 4, str.length)
    : str;
}

export function generateSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  let hasNumber = false;
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
    if (!hasNumber && /\d/.test(characters.charAt(randomIndex))) {
      hasNumber = true;
    }
  }
  // Ensure at least one number is included
  if (!hasNumber) {
    result = result.slice(0, 6) + "1"; // Replace last character with a number if no number was included
  }
  return result;
}
