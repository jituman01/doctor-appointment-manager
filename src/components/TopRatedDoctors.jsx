import AppointmentCard from '@/components/AppointmentCard';
import { Button } from '@heroui/react';
import { ArrowRight, Star } from 'lucide-react';
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
    <section className="bg-slate-50 py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-wider block mb-1 text-center">
              Meet Our Professionals
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              Top Rated Doctors
            </h2>
          </div>
          
          <Link href="/appointments">
            <Button 
              variant="light" 
              color="primary" 
              className="font-bold gap-1 rounded-xl hover:bg-blue-300"
            >
              See All Doctors <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {topDoctors.length === 0 ? (
          <p className="text-center text-slate-500 font-medium py-10">
            No doctors data available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topDoctors.map((doctor) => (
              <AppointmentCard key={doctor._id || doctor.id} appointment={doctor} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default TopRatedDoctors;