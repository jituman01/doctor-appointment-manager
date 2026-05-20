'use client';

import React from 'react';
import { User, Image, Cross, Octagon, OctagonX } from 'lucide-react';

export default function UpdateModal({ isModalOpen, setIsModalOpen, formData, setFormData, handleProfileSubmit }) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl mx-4 relative">
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="absolute top-4 right-4 text-slate-400 hover:text-red-600 text-sm font-bold cursor-pointer"
        ><OctagonX/>
        </button>

        <h3 className="text-lg font-black text-slate-800 mb-1">Edit Profile Info</h3>
        <p className="text-xs text-slate-400 mb-5">Keep your account details up to date.</p>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Profile Photo URL</label>
            <div className="relative">
              <Image className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="url" 
                required 
                value={formData.photoURL}
                onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm mt-2 shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}