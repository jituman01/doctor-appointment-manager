'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Trash2 } from 'lucide-react'; 
import toast from 'react-hot-toast';

export default function MyBookings({ userEmail }) {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    if (userEmail) {
      const fetchMyBookings = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${userEmail}`);
          const data = await res.json();
          
          if (res.ok) {
            setBookings(data);
          }
        } 
        finally {
        }
      };
      
      fetchMyBookings();
    }
  }, [userEmail]);

  const handleDelete = async (id) => {
  

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setBookings(bookings.filter((b) => b._id !== id));
        toast.success('Appointment deleted successfully!');
      } else {
        toast.error('Failed to delete appointment');
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center bg-white border border-slate-200/60 rounded-2xl p-12 shadow-sm">
        <p className="text-slate-400 font-bold mb-1">No appointments found!</p>
        <p className="text-xs text-slate-400">You haven't booked any sessions yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {bookings.map((booking) => (
        <div key={booking._id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-lg mt-1">{booking.doctorName}</h3>
              </div>
            </div>
            
            <div className="space-y-2 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span>Patient Name: <span className="text-slate-800 font-bold">{booking.patientName}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span>{booking.phone}</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100 text-xs">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-slate-700 font-bold">{booking.appointmentDate}</span>
                <Clock className="w-3.5 h-3.5 text-amber-500 ml-2" />
                <span className="text-slate-700 font-bold">{booking.appointmentTime}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-5 pt-3 border-t border-slate-100">
            <button
              onClick={() => handleDelete(booking._id)}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold py-2 rounded-xl text-xs transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Appointment
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}