'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import UpdateModal from './UpdateModal';
import Image from 'next/image';

export default function MyProfile({ user, token }) {
  const [profileData, setProfileData] = useState({
    name: user?.name,
    image: user?.image,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', photoURL: '' });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        image: user.image,
      });
    }
  }, [user]);

  const handleProfileSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user?.email}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (res.ok && data.success) {
        if (authClient?.updateUser) {
          await authClient.updateUser({
            name: formData.name,
            image: formData.photoURL,
          });
        } else if (authClient?.useSession?.reload) {
          await authClient.useSession.reload();
        }

        setProfileData({
          name: formData.name,
          image: formData.photoURL,
        });

        setIsModalOpen(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="rounded-3xl p-8 border border-slate-200 bg-white relative overflow-hidden text-black max-w-2xl mx-auto shadow-sm">
  <div className="flex flex-col items-center justify-center gap-6 text-center">
    
    <div className="group">
          <Image
        width={40}
        height={40}
        src={profileData.image}
        alt={profileData.name}
        className="w-28 h-28 rounded-full object-cover border-2 border-black shadow-md mx-auto"
      />
    </div>

    <div className="space-y-1">
      <h2 className="text-2xl font-black text-slate-900">
        {profileData.name}
      </h2>
      <div className="flex items-center justify-center gap-2 text-slate-500 text-sm font-medium">
        <Mail className="w-4 h-4 text-slate-400" />
        <span>{user?.email || 'user@gmail.com'}</span>
      </div>
    </div>

    <Button
      variant="outline"
      onClick={() => {
        setFormData({
          name: profileData.name,
          photoURL: profileData.image,
        });
        setIsModalOpen(true);
      }}
      className="flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm w-full sm:w-auto"
    >
      <Edit2 className="w-3.5 h-3.5" /> Update Profile
    </Button>
    
      </div>
      <UpdateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleProfileSubmit={handleProfileSubmit}
      />
</div>
  );
}
