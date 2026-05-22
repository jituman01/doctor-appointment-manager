'use client';
import { useState } from 'react';
import { Button, Input } from '@heroui/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const router = useRouter();

  const [passwordError, setPasswordError] = useState('');

  const handleSignup = async e => {
    e.preventDefault();

    // console.log(e.currentTarget);

    const formData = new FormData(e.currentTarget);

    // console.log(formData);

    const signupData = Object.fromEntries(formData.entries());

    // console.log(signupData);

    // password validation
    const password = signupData.password;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {

      setPasswordError(
        'Must contain uppercase, lowercase and minimum 6 characters'
      );

      return;
    }

    setPasswordError('');

    const signupPromise = authClient.signUp.email({
      ...signupData,
    });

    await toast.promise(signupPromise, {
      loading: 'Creating Account...',
      success: <b>Create Account Successfully!</b>,
      error: err => <b>{err.message || 'Registration Failed!'}</b>,
    });

    router.push('/');
  };

  const handleGoogleRegister = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col bg-slate-50 py-2">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="text-center space-y-2 relative">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Sign<span className="text-blue-600">Up</span>
              </h2>

              <p className="text-slate-500 font-medium">
                Create your account to explore doctor
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Full Name
                </label>

                <Input
                  id="name"
                  required
                  placeholder="Enter your name"
                  name="name"
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Email Address
                </label>

                <Input
                  id="email"
                  required
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Profile Image URL
                </label>

                <Input
                  id="image"
                  placeholder="https://images.com/..."
                  type="url"
                  name="image"
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-bold text-slate-700 ml-1"
                >
                  Password
                </label>

                <Input
                  id="password"
                  required
                  placeholder="Enter Your Password"
                  type="password"
                  name="password"
                  className="border-2 border-slate-200 hover:border-blue-600/50 focus-within:border-blue-600 transition-all duration-300 h-14 bg-white w-full rounded-2xl"
                />

                {
                  passwordError && (
                    <p className="text-red-500 text-sm font-medium mt-1 ml-1">
                      {passwordError}
                    </p>
                  )
                }
              </div>

              <Button
                color="primary"
                type="submit"
                className="w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-blue-600/20 group"
              >
                Create Account{' '}

                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            <div className="space-y-4">
              <Button
                onClick={handleGoogleRegister}
                variant="outline"
                className="w-full h-12 font-bold rounded-2xl border-slate-200 hover:bg-slate-50 transition-colors gap-3"
              >
                <FcGoogle />

                Sign in with Google
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-500 font-medium">
                Already have an account?{' '}

                <Link
                  href="/login"
                  className="text-blue-600 font-black hover:underline underline-offset-4 transition-all"
                >
                  Login
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;