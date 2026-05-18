import { Button } from '@heroui/react';
import { Award, Building2, Calendar, ChevronLeft, MapPin, ShieldCheck, Star, Stethoscope, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const fetchDoctorDetails = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
      cache: 'no-store',
    });

    const allDoctors = await res.json();
    return allDoctors.find((doc) => (doc._id || doc.id) === id) || null;
  
};

const DoctorDetailsPage = async ({ params }) => {
  const { id } = await params;
  const doctor = await fetchDoctorDetails(id);

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      
      <div className=" border-t border-slate-200/60 py-2 sticky top-0 z-40 backdrop-blur-md ">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <Link href="/appointments" className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600  group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 " /> Back to Specialists
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-3">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          
          <div className="lg:col-span-1 grid grid-cols-1 gap-2 sticky lg:top-24">
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
              <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                <img
                  src={doctor?.image}
                  alt={doctor?.name}
                  className="w-full h-full object-cover"
                />
                
                {doctor?.rating && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-md border border-slate-100">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black text-slate-800">{Number(doctor.rating).toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-slate-400 uppercase">Reviews</span>
                  <span className="text-sm font-black text-slate-700">{doctor?.reviewCount || "50+"} Cases</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Award className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                  <span className="block text-xs font-bold text-slate-400 uppercase">Experience</span>
                  <span className="text-sm font-black text-slate-700">{doctor?.experience}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 md:p-4 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-blue-600 rounded-full block"></span> Professional Biography
              </h3>
              <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
                {doctor?.description}
              </p>
            </div>
            
          </div>

          <div className="lg:col-span-2 flex flex-col gap-2">
            
            <div className="bg-white border border-slate-200/80 rounded-xl p-2 md:p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100/50">
                  <Stethoscope className="w-3.5 h-3.5" /> {doctor?.specialty}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-3 tracking-tight">
                {doctor?.name}
              </h1>
              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                Senior consultant at {doctor?.hospital}. Renowned specialist dedicated to high-standard medical solutions and continuous post-operative patient care.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 md:p-4 shadow-sm flex flex-col gap-5">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest pb-2 border-b border-slate-100 flex items-center gap-2">
                <span className="w-1.5 h-3.5 bg-blue-600 rounded-full block"></span> Chamber Location & Schedule
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-start gap-3.5 text-sm">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100/50">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 text-sm md:text-base">Hospital Venue</h4>
                    <p className="text-slate-500 font-semibold text-xs md:text-sm mt-0.5">{doctor?.hospital}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-sm">
                  <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center shrink-0 border border-red-100/50">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 text-sm md:text-base">Chamber Address</h4>
                    <p className="text-slate-500 font-semibold text-xs md:text-sm mt-0.5">{doctor?.location}</p>
                  </div>
                </div>
              </div>

              {doctor?.availability && doctor.availability.length > 0 && (
                <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/80 mt-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <Calendar className="w-4 h-4 text-blue-500" /> Visiting Timeline Slots
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm font-bold mt-1">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/50 flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-500">Days: <span className="text-slate-700 font-extrabold">{doctor.availability[0]}</span></span>
                    </div>
                    {doctor.availability[1] && (
                      <div className="bg-white p-3 rounded-xl border border-slate-200/50 flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-500">Time: <span className="text-slate-700 font-extrabold">{doctor.availability[1]}</span></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase  block mb-0.5">
                  Total Consultation Fee
                </span>
                <div className="text-slate-800 font-black text-3xl flex items-center">
                  <span className="text-2xl font-bold text-slate-500 mr-1">৳</span>
                  {doctor?.fee}
                  
                </div>
              </div>
              
              <Button
                color="primary"
                size="lg"
                className="w-full rounded-2xl font-black bg-blue-600 text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700  py-6"
              >
                Book Appointment Now
              </Button>
            </div>

            

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;