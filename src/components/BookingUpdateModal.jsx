import React from 'react';
import { Button } from '@heroui/react';
import { OctagonX } from 'lucide-react';

export default function BookingUpdateModal({isOpen,onClose,selectedBooking,formData,setFormData,handleUpdateSubmit 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl mx-4 relative">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-red-600 text-sm font-bold bg-transparent"
        >
          <OctagonX />
        </Button>

        <h3 className="text-lg font-black text-slate-800 mb-1">Update Your Appointment</h3>
        <p className="text-xs text-slate-400 mb-4">Review and modify booking details.</p>

        <form onSubmit={handleUpdateSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold block mb-1">Doctor Name</label>
            <p className="w-full px-4 py-2 text-slate-400 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold">
              {selectedBooking?.doctorName}
            </p>
          </div>
          
          <div>
            <label className="text-xs font-bold block mb-1">Patient Name</label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold block mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">Select Time</label>
              <select
                value={formData.appointmentTime}
                onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 font-semibold"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="04:00 PM">04:00 PM</option>
                <option value="06:30 PM">06:30 PM</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all mt-2 shadow-sm"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}