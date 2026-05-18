import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      
      <Hero />
      <TopRatedDoctors/>
    </div>
  );
}
