"use client";
import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner"; // Switching to sonner to match our previous setup
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  const authenticate = async (endpoint: string, formData: FormData) => {
    setLoading(true);
    const credentials = Object.fromEntries(formData);

    try {
      const { data } = await api.post(endpoint, credentials);
      // Store token
      auth.login(data.token);
    } catch (error: unknown) {
      const message = error || "Authentication failed";
      toast.error(message.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
        
        {/* Login Section */}
        <div className="w-full lg:w-[400px] space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Login</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Returning Boutique Client</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); authenticate("/login", new FormData(e.currentTarget)); }} className="space-y-4">
            <Input name="username" type="email" placeholder="EMAIL ADDRESS" required className="rounded-xl border-gray-100 p-6 focus:ring-secondary" />
            <Input name="password" type="password" placeholder="PASSWORD" required className="rounded-xl border-gray-100 p-6 focus:ring-secondary" />
            
            <Button disabled={loading} className="w-full py-7 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-secondary transition-all">
              {loading ? "Verifying..." : "Sign In"}
            </Button>
          </form>
        </div>

        {/* The "OR" Divider */}
        <div className="hidden lg:flex flex-col items-center h-[300px]">
          <div className="w-px h-full bg-gray-100"></div>
          <span className="my-4 text-[10px] font-black text-gray-300">OR</span>
          <div className="w-px h-full bg-gray-100"></div>
        </div>

        {/* Signup Section */}
        <div className="w-full lg:w-[400px] space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Register</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">New to Republican Jewelry</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); authenticate("/register", new FormData(e.currentTarget)); }} className="space-y-4">
            <Input name="name" placeholder="FULL NAME" required className="rounded-xl border-gray-100 p-6" />
            <Input name="email" type="email" placeholder="EMAIL ADDRESS" required className="rounded-xl border-gray-100 p-6" />
            <Input name="password" type="password" placeholder="CREATE PASSWORD" required className="rounded-xl border-gray-100 p-6" />
            
            <Button disabled={loading} variant="outline" className="w-full py-7 border-2 border-primary text-primary rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all">
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}