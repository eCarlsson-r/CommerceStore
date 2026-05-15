"use client";
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from 'next-intl';

export default function Login() {
  const ta = useTranslations('auth');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const authenticate = async (endpoint: string, formData: FormData) => {
    setLoading(true);
    const credentials = Object.fromEntries(formData);

    try {
      const { data } = await api.post(endpoint, credentials);
      // Store token
      auth.login(data.token);
    } catch {
      toast.error(ta('loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
        
        {/* Login Section */}
        <div className="w-full lg:w-100 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">{ta('login')}</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{ta('returningClient')}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); authenticate("/login", new FormData(e.currentTarget)); }} className="space-y-4">
            <Input name="username" type="email" placeholder={ta('emailAddress')} required className="rounded-xl border-gray-100 p-6 focus:ring-secondary" />
            <Input name="password" type="password" placeholder={ta('passwordPlaceholder')} required className="rounded-xl border-gray-100 p-6 focus:ring-secondary" />
            
            <Button disabled={loading} className="w-full py-7 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-secondary transition-all">
              {loading ? ta('verifying') : ta('signIn')}
            </Button>
          </form>
        </div>

        {/* The "OR" Divider */}
        <div className="hidden lg:flex flex-col items-center h-75">
          <div className="w-px h-full bg-gray-100"></div>
          <span className="my-4 text-[10px] font-black text-gray-300">{ta('or')}</span>
          <div className="w-px h-full bg-gray-100"></div>
        </div>

        {/* Signup Section */}
        <div className="w-full lg:w-100 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">{ta('register')}</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{ta('newClient')}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); authenticate("/register", new FormData(e.currentTarget)); }} className="space-y-4">
            <Input name="name" placeholder={ta('fullName')} required className="rounded-xl border-gray-100 p-6" />
            <Input name="email" type="email" placeholder={ta('emailAddress')} required className="rounded-xl border-gray-100 p-6" />
            <Input name="password" type="password" placeholder={ta('createPassword')} required className="rounded-xl border-gray-100 p-6" />
            
            <Button disabled={loading} variant="outline" className="w-full py-7 border-2 border-primary text-primary rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all">
              {loading ? ta('creating') : ta('createAccount')}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}