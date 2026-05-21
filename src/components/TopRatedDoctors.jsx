import AppointmentCard from '@/components/AppointmentCard';
import { Button } from '@heroui/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const fetchAllDoctors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
    cache: 'no-store',
  });

  const data = await res.json();
  return data || [];
};

const TopRatedDoctors = async () => {
  const allDoctors = await fetchAllDoctors();

  const topDoctors = allDoctors
    .sort((a, b) => {
      const ratingA = parseFloat(a.rating) || 0;
      const ratingB = parseFloat(b.rating) || 0;
      return ratingB - ratingA;
    })
    .slice(0, 3);

  return (
    <section className="bg-slate-50 py-8 w-full animate-in fade-in duration-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 gap-4">
          <div className="animate-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-center items-center mb-2">
              <img src="/badge.png" width={40} height={30} alt="" />
            </div>
            <div className="flex justify-center mb-2">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center text-center gap-2">
                Top Rated Doctors
              </h2>
            </div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider block text-center">
              Meet Our Professionals
            </span>
          </div>
        </div>

        {topDoctors.length === 0 ? (
          <p className="text-center text-slate-500 font-medium py-10">
            No doctors data available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-1000">
            {topDoctors.map(doctor => (
              <div key={doctor._id || doctor.id} className="hover:scale-[1.02] transition-transform duration-300">
                <AppointmentCard
                  appointment={doctor}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-5">
        <Link href="/appointments">
          <Button
            variant="light"
            color="primary"
            className="font-bold gap-1 text-center rounded-xl hover:text-blue-600 transition-all duration-300"
          >
            See All Doctors <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default TopRatedDoctors;