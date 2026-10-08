import React from "react";
import { Link } from "react-router-dom";
import { LogOut, ShieldAlert } from "lucide-react";
import { SignOutButton } from "@clerk/clerk-react";

function NotAuthorized() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-center text-white">
      <div className="max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-slate-950">
          <ShieldAlert size={30} />
        </div>
        <h1 className="mt-6 text-4xl font-black">Admin access only</h1>
        <p className="mt-3 text-slate-400">
          Your Clerk account is not assigned the admin role.
        </p>

        <div className="mt-7 flex flex-col items-center gap-3">
          <SignOutButton redirectUrl="/admin/login">
            <button className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950">
              <LogOut size={17} />
              Sign out & switch account
            </button>
          </SignOutButton>

          <Link
            to="/"
            className="inline-block rounded-xl border border-white/15 px-5 py-3 font-bold text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotAuthorized;
