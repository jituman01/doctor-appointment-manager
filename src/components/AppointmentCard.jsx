'use client';
import { Button } from '@heroui/react';
import { Award, Building2, ChevronRight, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const AppointmentCard = ({ appointment }) => {
  const doctorId = appointment?._id || appointment?.id;

  return (
    <div className="w-full bg-white backdrop-blur-3xl border border-slate-200/80 rounded-3xl p-4 shadow-sm hover:shadow-md hover:border-blue-500/30 duration-300 flex flex-col justify-between group mx-auto max-w-90">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center justify-center text-center gap-3 ">
          <div className="relative w-full h-60 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0 mx-auto">
            <img
              src={appointment?.image }
              
              alt={appointment?.name || 'Doctor'}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300 mx-auto"
              
              
            />

            {appointment?.rating && (
              <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-white/50">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-slate-900 leading-none pt-px">
                  {Number(appointment.rating).toFixed(1)}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center">
            <h3 className="font-black text-slate-800 text-base md:text-lg group-hover:text-blue-600 transition-colors leading-tight mb-1">
              {appointment?.name}
            </h3>
            <span className="inline-flex items-center w-fit px-2.5 py-0.5 rounded-md text-xs font-bold bg-orange-50 text-orange-400">
              {appointment?.specialty}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-500 line-clamp-2 font-medium leading-relaxed text-center sm:text-left">
          {appointment?.description}
        </p>

        <div className="flex flex-col gap-2 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 shrink-0 text-green-600" />
            <span className="truncate">{appointment?.hospital}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-slate-500 font-medium">
              {appointment?.location}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-5 pt-3 border-t border-slate-100">
        <div className="flex flex-col shrink-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase">
            Consultation Fee
          </span>
          <div className="flex items-center text-slate-800 font-black text-lg md:text-xl">
            <span className="text-lg font-bold text-slate-600 mr-0.5">৳</span>
            {appointment?.fee}
          </div>
        </div>

        <div className="shrink-0">
          <Link href={`/appointments/${doctorId}`}>
          <Button color="primary" endContent={<ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />} className="rounded-xl font-bold bg-blue-600 text-white shadow-sm hover:bg-blue-700 px-4 py-1.5 text-sm" > View Details </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;









