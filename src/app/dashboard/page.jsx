'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import MyBookings from '@/components/MyBookings';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-800">My Dashboard</h1>
          <p className="text-xs text-slate-400">View your booked appointments below</p>
        </div>

        <MyBookings userEmail={session?.user?.email} />
      </div>
    </div>
  );
}