import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BrainCircuit, ShieldCheck } from "lucide-react";
import { getAppliance } from "../utils/api";
import { diagnose } from "../data/diagnosis";
import { preloadImage } from "../utils/imagePreload";

function Appliance() {
  const { id } = useParams();
  const [appliance, setAppliance] = useState(null);
  const [problem, setProblem] = useState("");

  useEffect(() => {
    getAppliance(id)
      .then((response) => {
        setAppliance(response.data);
        preloadImage(response.data.img);
      })
      .catch(() => {});
  }, [id]);

  if (!appliance) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-20">Loading...</main>
    );
  }

  const diagnosis = diagnose(problem);

  return (
    <main className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="mt-7 grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={appliance.img}
            alt={appliance.name}
            className="h-[420px] w-full rounded-3xl object-cover"
            loading="eager"
            decoding="async"
            onError={(event) => {
              event.currentTarget.src =
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80";
            }}
          />
        </div>

        <div>
          <p className="font-bold text-emerald-700">SERVICE DETAILS</p>
          <h1 className="mt-2 text-4xl font-black">{appliance.name}</h1>
          <p className="mt-3 text-slate-500">{appliance.short}</p>

          <label className="mt-8 block text-sm font-bold">
            What problem are you facing?
          </label>
          <select
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-700"
          >
            <option value="">Select a problem</option>
            {appliance.problems.map((item) => (
              <option key={item}>{item}</option>
            ))}
            <option>Other</option>
          </select>

          {problem && (
            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-center gap-2 font-extrabold text-emerald-900">
                <BrainCircuit size={20} />
                Smart Diagnosis
              </div>
              <p className="mt-3 text-sm">
                <b>Possible category:</b> {diagnosis.issue}
              </p>
              <p className="mt-2 text-sm">
                <b>Safe check:</b> {diagnosis.check}
              </p>
              <p className="mt-2 text-sm">
                <b>Next step:</b> {diagnosis.advice}
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to={`/book?appliance=${appliance.id}${
                problem ? `&problem=${encodeURIComponent(problem)}` : ""
              }`}
              className="rounded-xl bg-emerald-900 px-5 py-3.5 font-bold text-white"
            >
              Book Service
            </Link>
            <span className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-600">
              <ShieldCheck size={17} />
              Safe guidance only
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Appliance;
