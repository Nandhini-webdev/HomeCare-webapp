import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import { getBookings } from "../utils/api";

function Bookings() {
  const { user } = useUser();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      getBookings()
        .then((response) => {
          setItems(response.data.filter((item) => item.customerId === user.id));
        })
        .catch(() => {});
    }
  }, [user]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/bookings" />
      </SignedOut>

      <SignedIn>
        <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
          <p className="font-bold text-emerald-700">MY BOOKINGS</p>
          <h1 className="mt-2 text-4xl font-black">Service history & tracking</h1>
          <p className="mt-3 text-slate-500">
            Track the service status, diagnosis, health score and estimate for
            your bookings.
          </p>

          {items.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
              <p className="font-bold">No bookings yet.</p>
              <Link
                to="/book"
                className="mt-4 inline-block rounded-xl bg-emerald-900 px-5 py-3 font-bold text-white"
              >
                Book your first service
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-5">
              {items
                .slice()
                .reverse()
                .map((booking) => (
                  <article
                    key={booking.id}
                    className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                          #{booking.id}
                        </p>
                        <h2 className="mt-1 text-xl font-black">
                          {booking.appliance}
                          {booking.customAppliance &&
                            ` — ${booking.customAppliance}`}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          {booking.problem}
                        </p>
                      </div>
                      <span className="h-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <Info label="Date" value={booking.serviceDate} />
                      <Info label="Time" value={booking.serviceTime} />
                      <Info
                        label="Health score"
                        value={`${booking.healthScore}/100`}
                      />
                      <Info label="Estimate" value={booking.estimate} />
                    </div>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm">
                      <b>Diagnosis:</b> {booking.diagnosis}
                      <br />
                      <b>Repair guide:</b> {booking.repairDecision}
                    </div>
                  </article>
                ))}
            </div>
          )}
        </main>
      </SignedIn>
    </>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 font-bold">{value || "—"}</p>
    </div>
  );
}

export default Bookings;
