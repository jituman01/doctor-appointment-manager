'use client';

import { useState, useEffect } from 'react';
import { FaUserDoctor } from "react-icons/fa6";

import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import { signOut, useSession } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  // console.log(session);
  

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogOut = async () => {
    await signOut();
    toast.success('Logged out successfully!');
    router.push('/')
  }

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 bg-white/70 backdrop-blur-md shadow-sm py-2`
        }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className=" transition-transform">
                
                <img 
                src="/logo2.png" 
                alt="DocAppoint Logo" 
                className="w-10 h-auto"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-black">
                DocAppoint
              </span>
            </Link>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className={isActive('/') ? "text-white bg-blue-400  border border-gray-100 rounded-full px-3 py-2 shadow-md shadow-blue-200 font-semibold" : "text-gray-600 "}
            >
              Home
            </Link>
            <Link
              href="/appointments"
              className={isActive('/appointments') ? "text-white bg-blue-400  border border-gray-100 rounded-full px-3 py-2 shadow-md shadow-blue-200 font-semibold" : "text-gray-600"}
            >
              All Appointment
            </Link>
  
            <Link
              href="/dashboard"
              className={isActive('/dashboard') ? "text-white bg-blue-400  border border-gray-100 rounded-full px-3 py-2 shadow-md font-semibold" : "text-gray-600 "}
            >
              Dashboard
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {
              !isPending && !session ?
                <>
              <Link
                href="/login"
                className={isActive('/') ? "text-blue-600 font-bold" : "text-gray-600"}
              >
                Login
              </Link>
              <Link href="/register">
                <Button
                  color="primary"
                  className="font-bold rounded-full px-8 shadow-lg shadow-blue-600/20"
                >
                  Register
                </Button>
                  </Link>
                  
                </> :

                <div className="relative group flex gap-2">
              <div>               
                <Avatar>
                <Avatar.Image alt="John Doe" src={session?.user?.image} />
               <Avatar.Fallback>{session?.user?.name?.charAt(0) }</Avatar.Fallback>
               </Avatar>             
                  </div>
                  
              <div>
                <button variant='outline'
                onClick={handleLogOut}  className="px-4 py-2 text-sm  hover:bg-red-50 flex items-center gap-3  text-left cursor-pointer border rounded-full">
                  <LogOut className="w-4 h-4 cursor-pointer" /> Log Out
                </button>
              </div>
              
            </div>
            }

            

          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-muted "
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
{isMenuOpen && (
  <div className="md:hidden  space-y-2 bg-transparent   border-b border-slate-200 animate-in slide-in-from-top duration-500">
    <Link
      href="/"
      onClick={() => setIsMenuOpen(false)}
      className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl "
    >
      Home
    </Link>
    <Link
      href="/appointments"
      onClick={() => setIsMenuOpen(false)}
      className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl "
    >
      All Appointment
    </Link>
    <Link
      href="/dashboard"
      onClick={() => setIsMenuOpen(false)}
      className="block px-4 py-3 text-base font-medium text-slate-900 hover:bg-slate-50 rounded-xl "
    >
      Dashboard
    </Link>

    <div className="pt-4 border-t border-slate-100 mt-4">
      {!isPending && !session ? (
        <div className="grid grid-cols-2 gap-3">
          <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
            <Button variant="bordered" className="w-full h-11 font-bold rounded-xl border-slate-200 text-slate-700">
              Login
            </Button>
          </Link>
          <Link href="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
            <Button color="primary" className="w-full h-11 font-bold rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/10">
              Register
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">

          <button
            onClick={() => {
              handleLogOut();
              setIsMenuOpen(false);
            }}  
            className="w-full text-left px-4 py-3 text-base font-bold text-red-500 hover:bg-red-50 rounded-xl cursor-pointer flex items-center gap-3  border border-transparent hover:border-red-100"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </nav>
  );
}
