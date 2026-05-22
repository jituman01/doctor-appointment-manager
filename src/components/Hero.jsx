'use client';
import React from 'react';
import { Button } from '@heroui/react';
import { CalendarDays, Search, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';

export default function Hero() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50/50 via-white to-white py-9 md:py-16 lg:py-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 bg-blue-100/40 w-96 h-96 rounded-full blur-3xl transform translate-x-20 -translate-y-20" />

      <div className="absolute bottom-10 left-0 -z-10 bg-emerald-100/30 w-72 h-72 rounded-full blur-3xl transform -translate-x-20" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <ShieldCheck size={16} className="text-blue-600" />

              <span>Your Health, Our Top Priority</span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 tracking-tight leading-none"
            >
              Find Trusted <span className="text-blue-600">Doctors</span> & Book
              Your Appointment
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Connect with certified medical specialists instantly. Skip the
              long waiting queues and manage your family's healthcare seamlessly
              from anywhere, anytime.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <Link href={'/appointments'}>
                <Button
                  color="primary"
                  size="lg"
                  className="font-semibold text-white shadow-lg shadow-blue-500/20 px-8 h-14 rounded-xl flex items-center gap-2"
                >
                  <CalendarDays size={20} />
                  Book Appointment
                </Button>
              </Link>

              <Button
                variant="bordered"
                size="lg"
                className="font-semibold text-zinc-700 border-zinc-200 hover:border-zinc-300 px-8 h-14 rounded-xl flex items-center gap-2 bg-white"
              >
                <Search size={20} className="text-zinc-500" />
                Find Specialists
              </Button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="pt-8 md:pt-12 border-t border-zinc-100 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900">
                  99%
                </h3>

                <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1">
                  Patient Satisfaction
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900">
                  500+
                </h3>

                <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1">
                  Expert Doctors
                </p>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900">
                  4.9/5
                </h3>

                <p className="text-xs md:text-sm text-zinc-500 font-medium mt-1 flex items-center justify-center lg:justify-start gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  Top Rated
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            viewport={{
              once: true,
            }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-square rounded-2xl md:rounded-[32px] bg-gradient-to-tr from-blue-600 to-cyan-500 p-1 shadow-2xl shadow-blue-500/10">
              <Swiper
                modules={[Autoplay]}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                className="w-full h-full rounded-2xl md:rounded-[28px] overflow-hidden"
              >
                <SwiperSlide>
                  <img
                    src="https://i.ibb.co.com/WpMbPf62/1e71ef3a80ef48e0deb30837461efefe.jpg"
                    alt="Doctor"
                    className="w-full h-full object-cover object-center"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    src="https://i.ibb.co.com/gMKSvcXx/4c86121e62bdd42aecf98ae673561052.jpg"
                    alt="Doctor"
                    className="w-full h-full object-cover object-center"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://i.ibb.co.com/DDXTZKXp/816f337609da0cbb322db84848f6b022.jpg"
                    alt="Doctor"
                    className="w-full h-full object-cover object-center"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    src="https://i.ibb.co.com/0pq1tDHj/Chat-GPT-Image-May-22-2026-04-36-39-PM.png"
                    alt="Doctor"
                    className="w-full h-full object-cover object-center"
                  />
                </SwiperSlide>
              </Swiper>

              <div className="absolute z-20 -bottom-6 -left-6 md:-left-10 bg-white p-4 rounded-xl shadow-xl border border-zinc-100 flex items-center gap-3 max-w-[240px]">
                <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-600">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-900">
                    Verified Doctors
                  </h4>

                  <p className="text-xs text-zinc-500">
                    100% Medical Council Certified
                  </p>
                </div>
              </div>

              <div className="absolute z-20 -top-10 -right-6 md:-right-8 bg-white p-3.5 rounded-xl shadow-2xl border border-zinc-100 space-y-1.5 text-center hidden sm:block">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Available
                </span>

                <p className="text-xs font-medium text-zinc-800">
                  Next Slot: Today, 4:00 PM
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
