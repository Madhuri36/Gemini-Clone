import { useState } from "react";
import { userAuth } from "../Context/AuthContext.tsx";
import { useTheme } from "../Context/ThemeProvider.tsx";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useChat } from "../Context/chatContext.tsx";  // Import useChat


const Signup = () => {
  const auth = userAuth();
  const { theme, colorTheme } = useTheme();
  const navigate = useNavigate();
  const { createNewChat } = useChat(); // Use createNewChat

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);
      toast.loading("Creating Account...", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Account Created Successfully", { id: "signup" });

      // Create a new chat and navigate to it
      createNewChat()
      navigate("/chat"); // Navigate to the chat
    } catch (error) {
      console.error(error);
      toast.error("Signup Failed", { id: "signup" });
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
              borderColor:
                "var(--gradient-from) var(--gradient-via) var(--gradient-to) var(--gradient-from)",
            }}
          ></div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)] text-[var(--text-primary)] p-4">
          <div className="bg-[var(--bg-surface)] shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-[var(--border-muted)]">
            <h2 className="text-3xl font-bold text-center">Create Account</h2>
            <p className="text-center text-[var(--text-secondary)]">
              Sign up to get started
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-3 border border-[var(--border-muted)] rounded-xl bg-transparent focus:outline-none"
              />
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
                Sign Up
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
              Already have an account?{" "}
              <a href="/login" className="underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;