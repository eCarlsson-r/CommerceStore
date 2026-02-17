"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const authenticate = async (endpoint: string, formData: FormData) => {
    const credentials = Object.fromEntries(formData);

    try {
      const { data } = await api.post(endpoint, credentials);
      Cookies.set("auth_token", data.token, { expires: 7, secure: true });
      toast.success("Login successful!");
      router.push("/account"); // Default landing page
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    authenticate("/login", new FormData(e.currentTarget));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    authenticate("/register", new FormData(e.currentTarget));
  };

  return (
    <div className="flex flex-wrap justify-center items-center">
      <Card className="w-full sm:w-4/12 px-4">
        <CardHeader className="text-center">
          <CardTitle>
            <h2
              className="text-2xl font-bold text-primary mb-6 uppercase"
              data-i18n="login-account"
            >
              Login to your account
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              name="email"
              className="space-y-2"
              required
              type="email"
              placeholder="Email Address"
            />

            <Input
              name="password"
              className="space-y-2"
              type="password"
              required
              placeholder="Password"
            />

            <label className="flex items-center gap-2 mb-4 cursor-pointer text-text-main font-light text-sm">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="accent-primary w-4 h-4"
              />
              <span data-i18n="keep-sign-in">Keep me signed in</span>
            </label>

            <Button
              type="submit"
              className="w-full bg-primary text-white px-8 py-2.5 border-none rounded-none hover:bg-secondary transition-colors cursor-pointer uppercase"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="w-full sm:w-1/12 px-4 flex items-center justify-center">
        <h2 className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white font-bold text-2xl">
          OR
        </h2>
      </div>

      <Card className="w-full sm:w-4/12 px-4">
        <CardHeader className="text-center">
          <CardTitle>
            <h2
              className="text-2xl font-bold text-primary mb-6 uppercase"
              data-i18n="new-user-signup"
            >
              New User Signup!
            </h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              name="name"
              className="space-y-2"
              required
              placeholder="Full Name"
            />

            <Input
              name="email"
              type="email"
              className="space-y-2"
              required
              placeholder="Email Address"
            />

            <Input
              name="password"
              className="space-y-2"
              type="password"
              required
              placeholder="Password"
            />

            <label className="flex items-center gap-2 mb-4 cursor-pointer text-text-main font-light text-sm">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="accent-primary w-4 h-4"
              />
              <span data-i18n="keep-sign-in">Keep me signed in</span>
            </label>

            <Button
              type="submit"
              className="w-full bg-primary text-white px-8 py-2.5 border-none rounded-none hover:bg-secondary transition-colors cursor-pointer uppercase"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
