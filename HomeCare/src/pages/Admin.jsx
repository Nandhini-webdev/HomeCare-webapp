import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import {
  getBookings,
  getContacts,
  updateBooking,
  deleteBooking,
} from "../utils/api";
import { isAdmin } from "../utils/auth";

function Admin() {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [tab, setTab] = useState("bookings");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    try {
      const [bookingResponse, contactResponse] = await Promise.all([
        getBookings(),
        getContacts(),
      ]);

      setBookings(bookingResponse.data);
      setContacts(contactResponse.data);
    } catch {
      // Keep the dashboard available even if JSON Server is temporarily unavailable.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (!isAdmin(user)) {
    return <Navigate to="/not-authorized" replace />;
  }

  const statusChange = async (id, status) => {
    try {
      await updateBooking(id, { status });
      await load();
    } catch {
      alert("Could not update booking status. Start JSON Server first.");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this booking?")) {
      return;
    }

    try {
      await deleteBooking(id);
      await load();
    } catch {
      alert("Could not delete booking. Start JSON Server first.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-amber-700">
              ADMIN PORTAL
            </p>
            <h1 className="text-2xl font-black">HomeCare Pro Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-xl border px-4 py-2 text-sm font-bold"
            >
              Website
            </Link>
            <SignOutButton redirectUrl="/">
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
                Logout
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          <Stat label="Bookings" value={bookings.length} />
          <Stat
            label="Received / Active"
            value={bookings.filter((booking) => booking.status !== "Completed").length}
          />
          <Stat label="Messages" value={contacts.length} />
        </div>

        <div className="mt-8 flex gap-2">
          <button
            onClick={() => setTab("bookings")}
            className={`rounded-xl px-4 py-2 text-sm font-bold ${
              tab === "bookings" ? "bg-emerald-900 text-white" : "bg-white"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setTab("contacts")}
            className={`rounded-xl px-4 py-2 text-sm font-bold ${
              tab === "contacts" ? "bg-emerald-900 text-white" : "bg-white"
            }`}
          >
            Contact Messages
          </button>
        </div>

        {loading ? (
          <p className="mt-8">Loading...</p>
        ) : tab === "bookings" ? (
          <div className="mt-6 grid gap-4">
            {bookings.length === 0 ? (
              <Empty text="No bookings yet." />
            ) : (
              bookings
                .slice()
                .reverse()
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-4 lg:flex-row">
                      <div>
                        <p className="text-xs text-slate-400">
                          Booking #{booking.id}
                        </p>
                        <h2 className="mt-1 font-black">
                          {booking.appliance}
                          {booking.customAppliance &&
                            ` — ${booking.customAppliance}`}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          {booking.problem} · {booking.name} · {booking.phone}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {booking.serviceDate} at {booking.serviceTime}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={booking.status}
                          onChange={(event) =>
                            statusChange(booking.id, event.target.value)
                          }
                          className="rounded-xl border px-3 py-2 text-sm font-bold"
                        >
                          <option>Received</option>
                          <option>Assigned</option>
                          <option>On the way</option>
                          <option>Started</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                        <button
                          onClick={() => remove(booking.id)}
                          className="rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <Small title="Diagnosis" value={booking.diagnosis} />
                      <Small
                        title="Health score"
                        value={`${booking.healthScore}/100`}
                      />
                      <Small title="Estimate" value={booking.estimate} />
                    </div>

                    <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                      Address: {booking.address}
                    </p>
                  </div>
                ))
            )}
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {contacts.length === 0 ? (
              <Empty text="No contact messages yet." />
            ) : (
              contacts
                .slice()
                .reverse()
                .map((contact) => (
                  <div
                    key={contact.id}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col justify-between gap-2 md:flex-row">
                      <div>
                        <h2 className="font-black">{contact.name}</h2>
                        <p className="text-sm text-slate-500">
                          {contact.email} · {contact.phone}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(contact.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6">
                      {contact.message}
                    </p>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function Small({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-100 p-3">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="mt-1 text-sm font-bold">{value || "—"}</p>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
      {text}
    </div>
  );
}

export default Admin;
