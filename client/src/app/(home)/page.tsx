import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl bg-clip-text font-bold pb-8">
        Welcome to Chatify!
      </h1>

      <Link href="/chat">
        <Button
          className="py-6 px-12 hover:brightness-90 rounded-full bg-gradient-to-br
       from-purple-400 to-blue-400 mb-20"
        >
          Get Started
        </Button>
      </Link>
    </main>
  );
}
