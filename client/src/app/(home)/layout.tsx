import Header from "@/components/home/Header";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const WavyBackground = dynamic(
  () => import("@/components/ui/wavy-background"),
  {
    ssr: false,
  }
);

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <WavyBackground
        className="relative h-full w-full"
        containerClassName=""
        waveWidth={40}
      >
        <Header />
        {children}
      </WavyBackground>
    </>
  );
}
