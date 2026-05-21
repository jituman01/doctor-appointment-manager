import AppointmentCard from '@/components/AppointmentCard';
import AppointmentHeader from '@/components/AppointmentHeader';
import { fetchAppointments } from '@/lib/appointments/data';
import { Button } from '@heroui/react';
import { BookOpen, Filter } from 'lucide-react';
import React from 'react';
import { FaUserDoctor } from 'react-icons/fa6';

export const metadata = {
  title: 'All Appointments',
  description: 'Manage and view all your doctor appointments here.',
};

const AppointmentsPage = async ({searchParams}) => {
  // console.log(searchParams);
  const sParams = await searchParams;
  // console.log(sParams);
  

  const appointments = await fetchAppointments(sParams?.searchTerm || "");
  // console.log(appointments);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <AppointmentHeader />

      <main className="max-w-7xl mx-auto px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <img src="/doctor.png"
              width={30}
              height={30}
              alt="" />
            Our Healthcare Professionals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments?.map(appointment => (
            <AppointmentCard key={appointment._id} appointment={appointment} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AppointmentsPage;
