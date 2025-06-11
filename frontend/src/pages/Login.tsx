import React, { useState } from "react";
import { userAuth } from "../Context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useChat } from "../Context/chatContext.tsx";  // Import useChat

const Login = () => {
  const auth = userAuth();
  const navigate = useNavigate();
  const { createNewChat } = useChat(); // Use createNewChat

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });

      // Create a new chat and navigate to it
      createNewChat()
      navigate("/chat"); // Navigate to the chat
    } catch (error) {
      console.error(error);
      toast.error("Sign In Failed", { id: "login" });
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)]">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: "var(--gradient-from) var(--gradient-via) var(--gradient-to) var(--gradient-from)",
            }}
          ></div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] text-[var(--text-primary)] p-4">
          <div className="bg-[var(--bg-surface)] shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-[var(--border-muted)]">
            <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
            <p className="text-center text-[var(--text-secondary)]">
              Sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
              {/* <button className="flex items-center justify-center gap-3 p-3 rounded-xl border border-[var(--border-muted)] hover:bg-[var(--custom-bg-one)] transition">
                <FaMicrosoft className="text-blue-600 text-xl" /> Continue with Microsoft
              </button>
              <button className="flex items-center justify-center gap-3 p-3 rounded-xl border border-[var(--border-muted)] hover:bg-[var(--custom-bg-one)] transition">
                <FaApple className="text-black dark:text-white text-xl" /> Continue with Apple
              </button> */}
            </div>

            <p className="text-sm text-center text-[var(--text-secondary)]">
              Don’t have an account? <a href="/signup" className="underline">Sign up</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;