import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCloudSun, FaEye, FaEyeSlash } from "react-icons/fa";

import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { loadUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // ========================================
  // Handle Input
  // ========================================

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // Submit Login
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password,
      });

      toast.success(res?.message || "Login Successful");

      // Refresh authenticated user
      await loadUser();

      // Go directly to dashboard
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md">
          {/* ========================================
              Logo
          ======================================== */}

          <div className="mb-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-3xl text-white shadow-xl">
              <FaCloudSun />
            </div>

            <h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">
              SkyCast
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Weather Dashboard
            </p>
          </div>

          {/* ========================================
              Login Card
          ======================================== */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}

            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                Welcome Back
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Login to continue to your SkyCast dashboard.
              </p>
            </div>

            {/* ========================================
                Form
            ======================================== */}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-800 dark:focus:ring-blue-900/30"
                />
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-900/30"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed dark:hover:bg-slate-700 dark:hover:text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember */}

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span>Remember Me</span>
                </label>

                <span className="text-sm font-semibold text-slate-400">
                  Forgot Password?
                </span>
              </div>

              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              {/* Register */}

              <p className="pt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                Don't have an account?
                <Link
                  to="/register"
                  className="ml-2 font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>

          {/* Footer */}

          <p className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} SkyCast Weather Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
