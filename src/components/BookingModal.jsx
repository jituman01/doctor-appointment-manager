'use client';
import { useState } from 'react';
import { Calendar, Clock, User, Phone, Users, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingModal({ isOpen, onClose, doctorName, token, userEmail }) {
  const [isSubmit, setIsSubmit] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: '',
    gender: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    const finalBookingData = {
      userEmail: userEmail,
      doctorName: doctorName,
      ...formData
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(finalBookingData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Appointment booked successfully!");
        onClose(); 
        setFormData({ patientName: '', gender: '', phone: '', appointmentDate: '', appointmentTime: '' });
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Server error, please try again.");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Book Appointment</h3>
            <p className="text-xs text-slate-400 mt-0.5">With {doctorName}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Patient Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="patientName"
                required
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient full name"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="017XXXXXXXX"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Gender</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  name="appointmentDate"
                  required
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Select Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  name="appointmentTime"
                  required
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Choose Time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmit}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/10 flex items-center justify-center disabled:bg-blue-400"
          >
            {isSubmit ? "Booking..." : "Confirm Appointment"}
          </button>

        </form>
      </div>
    </div>
  );
}