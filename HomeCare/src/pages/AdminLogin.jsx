import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSignIn, useUser, SignOutButton } from "@clerk/clerk-react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { isAdmin } from "../utils/auth";

function AdminLogin() {
  const { user, isLoaded: userLoaded } = useUser();
  const { isLoaded, signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (userLoaded && user && isAdmin(user)) {
    return <Navigate to="/admin" replace />;
  }

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/admin", { replace: true });
        return;
      }

      setError("Additional verification is required in your Clerk account.");
    } catch (err) {
      setError(
        err?.errors?.[0]?.longMessage ||
          err?.errors?.[0]?.message ||
          "Admin sign in failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-5 py-10">
        <div className="w-full rounded-[2rem] border border-slate-800 bg-slate-900 p-7 shadow-2xl sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="font-black">
              HomeCare Pro
            </Link>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-slate-950">
              <ShieldCheck />
            </div>
          </div>

          <p className="text-sm font-bold tracking-[.18em] text-amber-300">
            ADMIN PORTAL
          </p>
          <h1 className="mt-2 text-3xl font-black">Secure dashboard login</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Only Clerk users configured as admins can continue.
          </p>

          {userLoaded && user && !isAdmin(user) && (
            <div className="mt-5 rounded-2xl border border-amber-900 bg-amber-950/50 p-4 text-sm leading-6 text-amber-100">
              <p className="font-bold">You are already signed in.</p>
              <p className="mt-1 text-amber-200/70">
                The current Clerk account is not assigned as an admin. Sign out
                this account, then sign in with the admin account.
              </p>
              <SignOutButton redirectUrl="/admin/login">
                <button className="mt-4 flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 font-bold text-slate-950">
                  <LogOut size={17} />
                  Sign out & switch account
                </button>
              </SignOutButton>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-900 bg-red-950/60 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="mt-7 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="authInput"
                placeholder="admin@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">Password</span>
              <div className="relative">
                <input
                  required
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="authInput pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShow((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {show ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </label>

            <button
              disabled={loading || !isLoaded || Boolean(user && !isAdmin(user))}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-5 py-3.5 font-black text-slate-950 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Checking...
                </>
              ) : (
                <>
                  Enter dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            <Link to="/" className="font-bold text-slate-300">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
