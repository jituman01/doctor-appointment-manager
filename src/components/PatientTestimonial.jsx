'use client';

import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Yamin Khan',
    role: "Claire's Dad",
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    review:
      'Staff and doctors are very cooperative and work tirelessly towards a healthy outcome.',
  },
  {
    id: 2,
    name: 'Ayman Rahman',
    role: "Joshua's Dad",
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    review:
      'We have been impressed by the hospitality and patient care given by doctors and nurses.',
  },
  {
    id: 3,
    name: 'Tashfia Khatun',
    role: "John's Mom",
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
    review:
      'My heartfelt appreciation to all the doctors and nurses who have done the best.',
  },
  {
    id: 4,
    name: 'Tasrif Ahmed',
    role: 'Patient',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    review:
      'Amazing support and care from the entire hospital team and staff members.',
  },
  {
    id: 5,
    name: 'Lamiya Sheikh',
    role: 'Patient',
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=300&auto=format&fit=crop',
    review:
      'Doctors were very friendly and treatment quality was outstanding.',
  },
];

const PatientTestimonial = () => {
  const [current, setCurrent] = useState(0);

  const visibleCards = testimonials.slice(current, current + 3);

  return (
    <section className="w-full bg-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-black text-black leading-none">
            Testimonials
          </h2>
          <p className='text-gray-500'>Patient experience with our services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleCards.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-[26px] px-6 py-7 text-center h-[320px] flex flex-col items-center shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[58px] h-[58px] rounded-full object-cover mb-3"
              />

              <h3 className="text-[17px] font-bold text-[#1b1b1b]">
                {item.name}
              </h3>

              <p className="text-[13px] text-[#444] mt-1">
                {item.role}
              </p>

              <div className="w-[150px] h-[1px] bg-gray-200 my-4"></div>

              <div className="text-blue-500 text-[42px] font-bold leading-none">
                ”
              </div>

              <p className="text-[13px] leading-[26px] text-[#333] max-w-[220px] mt-1">
                {item.review}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          {Array.from({
            length: testimonials.length - 2,
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index
                  ? 'bg-blue-500 scale-125'
                  : 'bg-blue-500/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatientTestimonial;