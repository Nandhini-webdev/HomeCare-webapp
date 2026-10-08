import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn, useUser } from "@clerk/clerk-react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Home,
  Loader2,
  LogIn,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const { isLoaded: userLoaded, user } = useUser();
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userLoaded && user) {
      navigate("/", { replace: true });
    }
  }, [userLoaded, user, navigate]);

  const change = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const message = (errorObject) => {
    return (
      errorObject?.errors?.[0]?.longMessage ||
      errorObject?.errors?.[0]?.message ||
      "Could not sign in. Check your email and password."
    );
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: form.email.trim(),
        password: form.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/", { replace: true });
      } else {
        setError(
          "Additional verification is required in your Clerk account. Please complete the verification step."
        );
      }
    } catch (errorObject) {
      setError(message(errorObject));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_.95fr]">
        <section className="hidden flex-col justify-between bg-emerald-950 p-10 lg:flex lg:p-14">
          <Link to="/" className="flex items-center gap-3 text-xl font-black">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
              HC
            </span>
            HomeCare Pro
          </Link>

          <div className="max-w-xl">
            <p className="text-sm font-bold tracking-[.2em] text-emerald-300">
              WELCOME BACK
            </p>
            <h1 className="mt-5 text-5xl font-black leading-tight">
              Your appliances. One smart service account.
            </h1>
            <p className="mt-5 text-lg leading-8 text-emerald-50/70">
              Continue booking services, viewing diagnosis guidance and tracking
              your technician status.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Track bookings", "View health scores", "See service estimates", "Book faster"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-emerald-800 bg-emerald-900/60 p-4 text-sm font-bold"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <p className="text-xs text-emerald-100/50">
            Secure sign-in powered by Clerk.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link to="/" className="flex items-center gap-2 font-black">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 text-sm text-slate-950">
                  HC
                </span>
                HomeCare Pro
              </Link>
              <Link to="/" className="text-slate-400">
                <Home size={19} />
              </Link>
            </div>

            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <LogIn size={24} />
              </div>
              <p className="text-sm font-bold text-emerald-400">CUSTOMER LOGIN</p>
              <h2 className="mt-2 text-3xl font-black">Welcome back</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Sign in with the email and password you used to create your
                account.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-900 bg-red-950/60 p-4 text-sm leading-6 text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-200">
                  Email address
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={change}
                  className="authInput"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-200">
                  Password
                </span>
                <div className="relative">
                  <input
                    required
                    type={show ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={change}
                    className="authInput pr-12"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((previous) => !previous)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
                  >
                    {show ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </label>

              <button
                disabled={loading || !isLoaded}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3.5 font-black text-slate-950 hover:bg-emerald-300 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                className="font-bold text-emerald-400 hover:text-emerald-300"
                to="/sign-up"
              >
                Create one
              </Link>
            </p>

            <Link
              to="/admin/login"
              className="mx-auto mt-6 flex w-fit items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-300"
            >
              <ShieldCheck size={14} />
              Admin portal
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
