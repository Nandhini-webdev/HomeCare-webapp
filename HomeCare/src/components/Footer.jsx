import React from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="container-x grid gap-8 md:grid-cols-3">
        <div>
          <div className="text-2xl font-extrabold">
            Home<span className="text-lime-300">Care</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/50">
            A modern customer-first appliance service experience with smart
            diagnosis, booking and tracking.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Quick links</h3>
          <div className="mt-3 space-y-2 text-sm text-white/60">
            <a className="block" href="/#services">
              Services
            </a>
            <a className="block" href="/#diagnosis">
              Smart diagnosis
            </a>
            <a className="block" href="/#process">
              How it works
            </a>
            <Link className="block" to="/bookings">
              My bookings
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Support</h3>
          <div className="mt-3 space-y-2 text-sm text-white/60">
            <p>
              <Phone size={15} className="mr-2 inline" />
              +91 98765 43210
            </p>
            <p>support@homecare.demo</p>
            <p>Mon – Sat · 9 AM – 7 PM</p>
          </div>
        </div>
      </div>

      <div className="container-x mt-10 border-t border-white/10 pt-6 text-xs text-white/40">
        © 2026 HomeCare Pro · Smart appliance service demo
      </div>
    </footer>
  );
}

export default Footer;
