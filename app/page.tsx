import HomeContent from "@/components/HomeContent"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Muhammad Rafi | Portfolio",
  description: "Professional portfolio of Muhammad Rafi - Software Developer",
}

export default function Home() {
  return <HomeContent />
}
