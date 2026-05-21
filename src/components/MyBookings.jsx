'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@heroui/react';
import BookingUpdateModal from './BookingUpdateModal';

export default function MyBookings({ userEmail, token }) {

  useEffect(() => {
    if (userEmail) {
      const fetchMyBookings = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${userEmail}`);
          const data = await res.json();
          if (res.ok) setBookings(data);
        } finally {
        }
      };
      fetchMyBookings();
    }
  }, [userEmail]);

  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setBookings(bookings.filter(b => b._id !== id));
      toast.success('Appointment deleted successfully!');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${selectedBooking._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updateFormData),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setBookings(bookings.map(b => b._id === selectedBooking._id ? { ...b, ...updateFormData } : b));
      setIsUpdateModalOpen(false);
      toast.success('Appointment updated successfully!');
    }
  };

  const [bookings, setBookings] = useState([]);



  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({patientName: '',phone: '',appointmentDate: '',appointmentTime: '',
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-700">No Appointments Yet</h3>
          <p className="text-sm text-gray-500 mt-1">You haven't booked any appointments yet.</p>
        </div>
      ) : (
        bookings.map(booking => (
          <div key={booking._id} className="bg-white border p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-lg mb-3">{booking.doctorName}</h3>
            <div className="space-y-2 text-sm font-semibold">
              <div className="flex items-center gap-2"><User className="w-4 h-4" />Patient Name: {booking.patientName}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" />Phone: {booking.phone}</div>

              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-3.5 h-3.5" /> {booking.appointmentDate}
                <Clock className="w-3.5 h-3.5" /> {booking.appointmentTime}
              </div>
            </div>
            <div className="flex gap-3 mt-5 pt-3 border-t">
              <Button
                variant='secondary'
                onClick={() => { setSelectedBooking(booking); setUpdateFormData(booking); setIsUpdateModalOpen(true); }} 
                className="flex-1"
              >
                <Edit /> Update
              </Button>

              <Button
                variant='outline'
                onClick={() => handleDelete(booking._id)}  
                className="flex-1 hover:text-red-500"
              >
                <Trash2 /> Delete
              </Button>
            </div>
          </div>
        ))
      )}

      <BookingUpdateModal 
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        selectedBooking={selectedBooking}
        formData={updateFormData}
        setFormData={setUpdateFormData}
        handleUpdateSubmit={handleUpdateSubmit}
      />
    </div>
  );
}