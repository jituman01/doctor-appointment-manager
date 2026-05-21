'use client';

import React, { useState, useEffect } from 'react';
import { authClient, useSession } from '@/lib/auth-client';
import MyBookings from '@/components/MyBookings';
import MyProfile from '@/components/MyProfile'; 
import { CalendarCheck, UserCircle } from 'lucide-react'; 



export default function DashboardPage() {
  //metadata
  useEffect(() => {
    document.title = "Dashboard | DocAppoint";
  }, []);

    const [activeTab, setActiveTab] = useState(''); 
const { data: session, isPending } = useSession();

const [token, setToken] = useState(null);

useEffect(() => {
  const getToken = async () => {
      const sessionToken = await authClient.getSession({ fetchOptions: { forceFetch: true } });


     
    setToken(sessionToken?.data?.session?.token);
  };
  getToken();
}, []);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const savedTab = getCookie('activeDashboardTab');
    if (savedTab) {
      setActiveTab(savedTab);
    } else {
      setActiveTab('bookings'); 
    }
  }, []);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    document.cookie = `activeDashboardTab=${tabName}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  };

  if (isPending || !activeTab) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/60">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Patient Dashboard</h1>
            <p className="text-xs text-slate-400">Manage your medical appointments and personal profile</p>
          </div>

          <div className="flex bg-blue-200/60 p-1.5 rounded-2xl border border-slate-200/40 w-fit">
            <button
              onClick={() => handleTabChange('bookings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" /> My Bookings
            </button>
            <button
              onClick={() => handleTabChange('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserCircle className="w-3.5 h-3.5" /> My Profile
            </button>
          </div>
        </div>

        <div className="transition-all duration-300">
          {activeTab === 'bookings' && (
            <MyBookings userEmail={session?.user?.email} token={token} />
          )}
          
          {activeTab === 'profile' && (
            <MyProfile user={session?.user} token={token} />
          )}
        </div>

      </div>
    </div>
  );
}