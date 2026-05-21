'use client';
import React from 'react';
import { Activity, ArrowRight, Brain, Eye, HeartPulse, ShieldPlus, Stethoscope } from 'lucide-react';
import animationData from '../animations/react.json';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

const services = [
  { title: 'Pediatric\nCardiology', desc: 'Specialized diagnosis and treatment for congenital and acquired heart conditions in children.', icon: <HeartPulse size={40} /> },
  { title: 'Pediatric\nPulmonology', desc: 'Expert care for respiratory issues, asthma management, and chronic lung conditions.', icon: <Activity size={40} /> },
  { title: 'Pediatric\nOphthalmology', desc: 'Comprehensive vision exams and surgical care for childhood eye disorders and misalignment.', icon: <Eye size={40} /> },
  { title: 'Covid-19\nTesting & Care', desc: 'Rapid testing, vaccination services, and comprehensive post-COVID care for families.', icon: <ShieldPlus size={40} /> },
  { title: 'Pediatric Dental\nServices', desc: 'Gentle dental care including routine cleanings, cavity treatment, and oral hygiene education.', icon: <Stethoscope size={40} /> },
  { title: 'Pediatric\nNeurology', desc: 'Advanced evaluation and treatment for epilepsy, headaches, and complex neurological disorders.', icon: <Brain size={40} /> },
];

const Services = () => {
  return (
    <section className="bg-[#f5f5f2] pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center justify-center px-4">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="lg:w-[35%] flex flex-col items-center"
        >
          <div className="w-[300px] lg:w-[500px]">
            <Lottie animationData={animationData} loop={true} />
          </div>
          
          <div className="text-center lg:text-left">
            <h2 className="text-[40px] lg:text-[50px] leading-[1.1] font-bold text-black tracking-[-1px]">
              Hospital Programs and Services
            </h2>
            <p className="mt-5 text-[16px] text-[#262626] max-w-[360px] font-medium mx-auto lg:mx-0">
              Our providers are qualified to help with many behavioral health needs.
            </p>
            <button className="mt-7 border border-blue-500 text-blue-500 rounded-full px-8 h-[46px] text-[13px] font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
              Full list of Services
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="lg:w-[60%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-blue-400 border border-[#e7e7e7] rounded-[22px] p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 min-h-[240px]"
            >
              <div>
                <div className="text-white mb-4">{item.icon}</div>
                <h3 className="text-[18px] font-bold text-white whitespace-pre-line">{item.title}</h3>
                <p className="text-[13px] text-gray-100 mt-2">{item.desc}</p>
              </div>
              <button className="mt-4 w-fit px-6 py-2 rounded-full bg-blue-500 text-white text-[12px] font-bold flex items-center gap-2 hover:bg-blue-800">
                Learn more <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default Services;