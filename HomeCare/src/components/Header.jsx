import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserRound, ShieldCheck } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { isAdmin } from "../utils/auth";

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <header className="absolute left-0 right-0 top-0 z-50 text-white">
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
         <span className="text-yellow-300">Home</span><span className="text-lime-300">Care</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <a href="/#services">Services</a>
          <a href="/#diagnosis">Smart diagnosis</a>
          <a href="/#process">How it works</a>
          <a href="/#contact">Contact</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 font-bold"
            >
              <UserRound size={16} />
              Login
            </button>
          </SignedOut>

          <SignedIn>
            {isAdmin(user) && (
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-1 rounded-full border border-amber-200/30 px-4 py-2.5 text-sm font-bold text-amber-100"
              >
                <ShieldCheck size={16} />
                Admin
              </button>
            )}
            <button
              onClick={() => navigate("/bookings")}
              className="rounded-full border border-white/25 px-4 py-2.5 text-sm font-bold"
            >
              My Bookings
            </button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Link
            to="/book"
            className="btn rounded-full bg-lime-300 px-5 py-2.5 font-bold text-slate-900"
          >
            Book a Service
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-6 py-5 md:hidden">
          <div className="container-x space-y-4">
            <a className="block" href="/#services" onClick={() => setOpen(false)}>
              Services
            </a>
            <a className="block" href="/#diagnosis" onClick={() => setOpen(false)}>
              Smart diagnosis
            </a>
            <a className="block" href="/#process" onClick={() => setOpen(false)}>
              How it works
            </a>
            <a className="block" href="/#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
            <Link className="block" to="/book" onClick={() => setOpen(false)}>
              Book a Service
            </Link>
            <SignedOut>
              <Link className="block" to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </SignedOut>
            <SignedIn>
              <Link className="block" to="/bookings" onClick={() => setOpen(false)}>
                My Bookings
              </Link>
              {isAdmin(user) && (
                <Link className="block" to="/admin" onClick={() => setOpen(false)}>
                  Admin dashboard
                </Link>
              )}
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
