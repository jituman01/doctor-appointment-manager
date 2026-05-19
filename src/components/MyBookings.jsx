'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Trash2, Edit } from 'lucide-react'; 
import toast from 'react-hot-toast';

export default function MyBookings({ userEmail }) {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    patientName: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
  });

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
          setLoadingBookings(false);
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

  const openUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setUpdateFormData({
      patientName: booking.patientName,
      phone: booking.phone,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateFormData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setBookings(bookings.map((b) => b._id === selectedBooking._id ? { ...b, ...updateFormData } : b));
        setIsUpdateModalOpen(false); 
        toast.success('Appointment updated successfully!');
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error('Something went wrong!');
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

          <div className="flex gap-3 mt-5 pt-3 border-t border-slate-100">
            <button
              onClick={() => openUpdateModal(booking)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold py-2 rounded-xl text-xs transition-colors"
            >
              <Edit className="w-3.5 h-3.5" /> Update
            </button>
            <button
              onClick={() => handleDelete(booking._id)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold py-2 rounded-xl text-xs transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>
      ))}

      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl mx-4 relative">
            <button
              onClick={() => setIsUpdateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold"
            >
              ✕
            </button>
            
            <h3 className="text-lg font-black text-slate-800 mb-1">Update Appointment</h3>
            <p className="text-xs text-slate-400 mb-4">Review and modify booking details.</p>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Doctor Name</label>
                <p className="w-full px-4 py-2 text-slate-400 bg-slate-20 border border-slate-200 rounded-xl text-sm focus:outline-none font-semibold">
                  {selectedBooking?.doctorName}
                  </p>
                
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Patient Name</label>
                <input
                  type="text" required value={updateFormData.patientName}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, patientName: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Phone Number</label>
                <input
                  type="tel" required value={updateFormData.phone}
                  onChange={(e) => setUpdateFormData({ ...updateFormData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Date</label>
                  <input
                    type="date" required value={updateFormData.appointmentDate}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, appointmentDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Select Time</label>
                  <select
                    value={updateFormData.appointmentTime}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, appointmentTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-semibold"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all mt-2 shadow-sm"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}