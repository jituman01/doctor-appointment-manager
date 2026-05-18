import AppointmentCard from '@/components/AppointmentCard';
import AppointmentHeader from '@/components/AppointmentHeader';
import { fetchAppointments } from '@/lib/appointments/data';
import { Button } from '@heroui/react';
import { BookOpen, Filter } from 'lucide-react';
import React from 'react';
import { FaUserDoctor } from 'react-icons/fa6';


const AppointmentsPage = async () => {
  const appointments = await fetchAppointments();
  // console.log(appointments);
  
  return(
     <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <AppointmentHeader/>

            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <FaUserDoctor className="w-6 h-6 text-blue-600" />
                        All Doctors
                    </h2>
                    <Button
                        variant="flat"
                        startContent={<Filter className="w-4 h-4" />}
                        className="rounded-full font-bold"
                    >
                        Filters
                    </Button>
                </div>

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {
            appointments?.map((appointment) => <AppointmentCard key={appointment._id } appointment={appointment} />)
          }
        </div>


            </main>
    </div>
    
  );
};

export default AppointmentsPage;