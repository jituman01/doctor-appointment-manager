import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#dfe5f2] relative flex items-center justify-center">
      
      <div className="absolute inset-0 h-[55%] bg-gradient-to-b from-sky-400 to-[#dfe5f2]" />

      <div className="absolute top-20 left-10 w-52 h-20 bg-white/40 blur-2xl rounded-full" />
      <div className="absolute top-32 right-20 w-72 h-24 bg-white/30 blur-3xl rounded-full" />
      <div className="absolute top-10 right-1/3 w-40 h-16 bg-white/40 blur-2xl rounded-full" />

      <h1 className="absolute text-[320px] md:text-[420px] font-black text-white/70 tracking-[-20px] select-none leading-none top-10">
        404
      </h1>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        <div className="relative w-[220px] h-[260px] md:w-[380px] md:h-[320px]">
          <Image
            
            src="https://i.ibb.co.com/QFgF7YCC/9300a7623e2e329c76324e5e594050e7-removebg-preview.png"
            alt="Monster"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Oops, i think we’re lost
        </h2>

        <p className="text-slate-500 text-lg">
          Let’s get you back somewhere familiar...
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 bg-white text-slate-800 px-6 py-3 rounded-2xl shadow-lg border border-slate-200 hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to home
        </Link>
      </div>

    </div>
  );
}