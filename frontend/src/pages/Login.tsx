import React from "react";
import { userAuth } from "../Context/AuthContext.tsx";
import { useTheme } from "../Context/ThemeProvider.tsx";
import {
  FcGoogle
} from "react-icons/fc";
import {
  FaApple,
  FaMicrosoft
} from "react-icons/fa";
import {toast} from "react-hot-toast";

const Login = () => {
  const auth = userAuth();
  const { theme, colorTheme } = useTheme();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In",{id:"login"});
      await auth?.login(email,password);
      toast.success("Signed In Successfully", {id:"login"});
    } catch (error) {
      console.log(error);
      toast.error("Sign In Failed", {id:"login"});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] text-[var(--text-primary)] p-4">
      <div className="bg-[var(--bg-surface)] shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-[var(--border-muted)]">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-[var(--text-secondary)]">
          Sign in to your account
        </p>

        <form onSubmit={(handleSubmit)} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-[var(--border-muted)] rounded-xl bg-transparent focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-[var(--border-muted)] rounded-xl bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="w-full p-3 rounded-xl font-semibold text-white"
            style={{
              background: `linear-gradient(to right, var(--gradient-from), var(--gradient-via), var(--gradient-to))`,
            }}
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-2">
          <div className="h-px bg-[var(--border-muted)] flex-1"></div>
          <span className="text-sm text-[var(--text-secondary)]">OR</span>
          <div className="h-px bg-[var(--border-muted)] flex-1"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 p-3 rounded-xl border border-[var(--border-muted)] hover:bg-[var(--custom-bg-one)] transition">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 p-3 rounded-xl border border-[var(--border-muted)] hover:bg-[var(--custom-bg-one)] transition">
            <FaMicrosoft className="text-blue-600 text-xl" /> Continue with Microsoft
          </button>
          <button className="flex items-center justify-center gap-3 p-3 rounded-xl border border-[var(--border-muted)] hover:bg-[var(--custom-bg-one)] transition">
            <FaApple className="text-black dark:text-white text-xl" /> Continue with Apple
          </button>
        </div>

        <p className="text-sm text-center text-[var(--text-secondary)]">
          Don’t have an account? <a href="/signup" className="underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;