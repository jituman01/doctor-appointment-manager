import Hero from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import PatientTestimonial from "@/components/PatientTestimonial";
import Services from "@/components/Services";
import TopRatedDoctors from "@/components/TopRatedDoctors";
import Image from "next/image";


export default function Home() {
  return (
    <div>
      
      <Hero />
      <TopRatedDoctors />
      <Services />
      <PatientTestimonial/>
    </div>
  );
}





<div className=" ">
            <h2 className="text-[58px] leading-[64px] font-semibold text-black tracking-[-2px] max-w-[390px]">
              Hospital Programs and Services
            </h2>

            <p className="mt-5 text-[17px] leading-[30px] text-[#262626] max-w-[360px] font-medium">
              Our providers are qualified to help with many behavioral health
              needs.
            </p>

            <button className="mt-7 border border-blue-500 text-blue-500 rounded-full px-6 h-[46px] text-[13px] font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
              Full list of Services
            </button>
          </div>
