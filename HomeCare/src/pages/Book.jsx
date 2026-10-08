import React, { useEffect, useMemo, useState } from "react";
import {
  useSearchParams,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import { createBooking, getAppliances } from "../utils/api";
import { diagnose } from "../data/diagnosis";

function Book() {
  const { user } = useUser();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    appliance: params.get("appliance") || "",
    customAppliance: "",
    problem: params.get("problem") || "",
    customIssue: "",
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    age: "3",
    lastService: "6",
    previousRepairs: "0",
  });

  useEffect(() => {
    getAppliances()
      .then((response) => setApps(response.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      setForm((previous) => ({
        ...previous,
        name: previous.name || user.fullName || "",
        phone: previous.phone || user.primaryPhoneNumber?.phoneNumber || "",
      }));
    }
  }, [user]);

  const change = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const selected = apps.find((appliance) => appliance.id === form.appliance);
  const effectiveProblem =
    form.problem === "Other" ? form.customIssue : form.problem;
  const diagnosis = diagnose(effectiveProblem);

  const score = useMemo(() => {
    return Math.max(
      0,
      Math.min(
        100,
        100 -
          Number(form.age) * 7 -
          Number(form.previousRepairs) * 8 -
          (Number(form.lastService) > 12 ? 10 : 0)
      )
    );
  }, [form.age, form.previousRepairs, form.lastService]);

  const decision =
    score >= 70
      ? "Repair is a reasonable first option"
      : score >= 45
        ? "Inspect before deciding"
        : "Compare repair cost with replacement";

  const estimate =
    score >= 70
      ? "₹299–₹799 inspection/service range"
      : score >= 45
        ? "₹499–₹1,299 inspection range"
        : "₹699–₹1,999 inspection range";

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createBooking({
        customerId: user.id,
        customerEmail: user.primaryEmailAddress?.emailAddress || "",
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        appliance:
          form.appliance === "other"
            ? "Other appliance"
            : selected?.name || form.appliance,
        customAppliance: form.customAppliance.trim(),
        problem: effectiveProblem,
        diagnosis: diagnosis.issue,
        serviceDate: form.date,
        serviceTime: form.time,
        healthScore: score,
        repairDecision: decision,
        estimate,
        status: "Received",
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);
      setTimeout(() => navigate("/bookings"), 800);
    } catch {
      alert("Booking failed. Start JSON Server first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/book" />
      </SignedOut>

      <SignedIn>
        <main className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
          <p className="font-bold text-emerald-700">BOOK SERVICE</p>
          <h1 className="mt-2 text-4xl font-black">
            Tell us about your appliance
          </h1>
          <p className="mt-3 text-slate-500">
            Smart diagnosis and health score are added to your booking
            automatically.
          </p>

          {success && (
            <div className="mt-6 rounded-xl bg-emerald-100 p-4 font-bold text-emerald-900">
              Booking created successfully. Opening My Bookings...
            </div>
          )}

          <form
            onSubmit={submit}
            className="mt-10 grid gap-7 lg:grid-cols-2"
          >
            <div className="space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Field label="Appliance *">
                <select
                  required
                  name="appliance"
                  value={form.appliance}
                  onChange={change}
                  className="input"
                >
                  <option value="">Select appliance</option>
                  {apps.map((appliance) => (
                    <option key={appliance.id} value={appliance.id}>
                      {appliance.name}
                    </option>
                  ))}
                  <option value="other">Other appliance</option>
                </select>
              </Field>

              {form.appliance === "other" && (
                <Field label="Custom appliance name *">
                  <input
                    required
                    name="customAppliance"
                    value={form.customAppliance}
                    onChange={change}
                    className="input"
                    placeholder="e.g. Mixer Grinder"
                  />
                </Field>
              )}

              <Field label="Problem *">
                <select
                  required
                  name="problem"
                  value={form.problem}
                  onChange={change}
                  className="input"
                >
                  <option value="">Select problem</option>
                  {selected?.problems.map((problem) => (
                    <option key={problem}>{problem}</option>
                  ))}
                  <option>Other</option>
                </select>
              </Field>

              {form.problem === "Other" && (
                <Field label="Describe your issue *">
                  <textarea
                    required
                    minLength="5"
                    name="customIssue"
                    value={form.customIssue}
                    onChange={change}
                    className="input min-h-28"
                    placeholder="Explain what is happening..."
                  />
                </Field>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Service date *">
                  <input
                    required
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={change}
                    className="input"
                  />
                </Field>
                <Field label="Preferred time *">
                  <input
                    required
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={change}
                    className="input"
                  />
                </Field>
              </div>

              <Field label="Name *">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={change}
                  className="input"
                />
              </Field>

              <Field label="Phone *">
                <input
                  required
                  pattern="[6-9][0-9]{9}"
                  name="phone"
                  value={form.phone}
                  onChange={change}
                  className="input"
                  placeholder="9876543210"
                />
              </Field>

              <Field label="Address *">
                <textarea
                  required
                  minLength="10"
                  name="address"
                  value={form.address}
                  onChange={change}
                  className="input min-h-24"
                />
              </Field>
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-950 p-6 text-white">
                <h2 className="text-xl font-black">
                  Smart Appliance Health Score
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Use simple details to generate a demo preventive score.
                </p>

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-6xl font-black text-emerald-400">
                    {score}
                  </span>
                  <span className="pb-2 text-slate-400">/ 100</span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <Mini label="Age (years)">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      name="age"
                      value={form.age}
                      onChange={change}
                      className="darkInput"
                    />
                  </Mini>
                  <Mini label="Last service (months)">
                    <input
                      type="number"
                      min="0"
                      max="60"
                      name="lastService"
                      value={form.lastService}
                      onChange={change}
                      className="darkInput"
                    />
                  </Mini>
                  <Mini label="Previous repairs">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      name="previousRepairs"
                      value={form.previousRepairs}
                      onChange={change}
                      className="darkInput"
                    />
                  </Mini>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
                <p className="text-sm font-bold text-emerald-700">
                  REPAIR VS REPLACE GUIDE
                </p>
                <h2 className="mt-2 text-xl font-black">{decision}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  This is a guidance feature, not a guaranteed repair quote.
                </p>

                <div className="mt-5 rounded-2xl bg-white p-4">
                  <p className="text-sm font-bold">Transparent estimate</p>
                  <p className="mt-1 text-lg font-black text-emerald-800">
                    {estimate}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-bold text-emerald-700">
                  DIAGNOSIS PREVIEW
                </p>
                <p className="mt-2 font-black">
                  {effectiveProblem
                    ? diagnosis.issue
                    : "Select a problem to see guidance"}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {effectiveProblem
                    ? diagnosis.advice
                    : "We will attach a possible issue category to your booking."}
                </p>
              </div>

              <button
                disabled={loading}
                className="w-full rounded-xl bg-emerald-900 px-5 py-4 font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
              >
                {loading ? "Creating booking..." : "Confirm Service Booking"}
              </button>

              <Link
                to="/"
                className="block text-center text-sm font-bold text-slate-500"
              >
                Cancel
              </Link>
            </div>
          </form>
        </main>
      </SignedIn>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">{label}</span>
      {React.cloneElement(children, {
        className: `${children.props.className || ""} input`,
      })}
    </label>
  );
}

function Mini({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs text-slate-400">{label}</span>
      {children}
    </label>
  );
}

export default Book;
