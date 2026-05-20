'use client';
import { useState } from 'react';
import { Button } from '@heroui/react';
import BookingModal from './BookingModal';

export default function BookingModalInitializer({
  doctorName,
  token,
  userEmail,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        color="primary"
        size="lg"
        className="w-full rounded-2xl font-black bg-blue-600 text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700 py-6"
      >
        Book Appointment Now
      </Button>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctorName={doctorName}
        token={token}
        userEmail={userEmail}
      />
    </>
  );
}