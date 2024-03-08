import { cn } from "@/lib/utils";
import { Titillium_Web } from "next/font/google";
import Link from "next/link";

const font = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
});

export default function Logo() {
  return (
    <Link href="/">
      <h1
        className={cn(
          font.className,
          "font-bold text-4xl bg-gradient-to-br from-blue-400 to-pink-400 text-transparent bg-clip-text"
        )}
      >
        Chatify.
      </h1>
    </Link>
  );
}
