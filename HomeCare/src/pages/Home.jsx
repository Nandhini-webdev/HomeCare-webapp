import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Wrench,
  Stethoscope,
  RefreshCcw,
  Activity,
  Search,
  CalendarDays,
  UserRound,
} from "lucide-react";
import { getAppliances } from "../utils/api";
import { preloadImages } from "../utils/imagePreload";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

function Home() {
  const [appliances, setAppliances] = useState([]);

  useEffect(() => {
    getAppliances()
      .then((response) => {
        setAppliances(response.data);
        preloadImages(response.data.map((appliance) => appliance.img));
      })
      .catch(() => setAppliances([]));
  }, []);

  return (
    <div>
      <section className="hero min-h-[700px] text-white">
        <div className="container-x grid min-h-[700px] items-center gap-10 py-28 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              Smart doorstep appliance care
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.05] md:text-7xl">
              Your home.
              <br />
              <span className="text-lime-300">Our expertise.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              Book trusted appliance repair and maintenance at your doorstep.
              Understand the symptom, get safe guidance, see your service
              estimate and track the request from one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="btn flex items-center gap-2 rounded-full bg-lime-300 px-6 py-3.5 font-bold text-slate-900"
              >
                Book a Service <ArrowRight size={18} />
              </Link>
              <a
                href="#diagnosis"
                className="rounded-full border border-white/30 px-6 py-3.5 font-bold"
              >
                Try Smart Diagnosis
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-7 text-sm text-white/80">
              <span className="flex gap-2">
                <ShieldCheck size={19} className="text-lime-300" />
                Transparent estimates
              </span>
              <span className="flex gap-2">
                <Clock3 size={19} className="text-lime-300" />
                Flexible slots
              </span>
            </div>
          </div>

          <div className="glass rounded-[2rem] p-6 text-slate-900 shadow-soft">
            <p className="text-sm font-bold text-emerald-800">QUICK SERVICE</p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Need a technician today?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Start with an appliance and continue to the full smart booking flow.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <Search className="text-emerald-800" />
                <div>
                  <b>Choose appliance</b>
                  <p className="text-xs text-slate-500">
                    8 categories + Other appliance
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <Stethoscope className="text-emerald-800" />
                <div>
                  <b>Describe the symptom</b>
                  <p className="text-xs text-slate-500">
                    Get a possible issue and safe checks
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <CalendarDays className="text-emerald-800" />
                <div>
                  <b>Pick your slot</b>
                  <p className="text-xs text-slate-500">
                    Confirm the service request
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/book"
              className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-emerald-900 px-5 py-3.5 font-bold text-white"
            >
              Start booking <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-bold text-emerald-700">OUR SERVICES</p>
              <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">
                Care for every
                <br />
                essential appliance.
              </h2>
            </div>
            <p className="max-w-md text-slate-600">
              From everyday maintenance to unexpected repairs, choose your
              appliance and tell us what needs attention.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {appliances.map((appliance) => (
              <Link
                to={`/services/${appliance.id}`}
                key={appliance.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-soft"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={appliance.img}
                    alt={appliance.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold">{appliance.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {appliance.short}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm font-bold text-emerald-700">
                    View services <ArrowRight size={17} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-emerald-100 bg-emerald-50 p-6 md:flex md:items-center md:justify-between">
            <div>
              <p className="font-bold text-emerald-800">CAN’T FIND YOUR APPLIANCE?</p>
              <h3 className="mt-1 text-2xl font-extrabold">
                No problem — add it yourself.
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Choose “Other appliance” during booking and enter the appliance
                name. You can also describe an unlisted issue in your own words.
              </p>
            </div>
            <Link
              to="/book"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 font-bold text-white md:mt-0"
            >
              Add your appliance <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section id="diagnosis" className="pattern py-20">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="font-bold text-emerald-700">SMART APPLIANCE DIAGNOSIS</p>
            <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">
              Know the next step before booking.
            </h2>
            <p className="mt-4 text-slate-600">
              Customers do not need to know the technical fault. Select a symptom
              and the booking page gives a possible issue category, safe visual
              checks and a service recommendation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            <Feature
              icon={<Stethoscope />}
              title="Smart Diagnosis"
              text="Symptom → possible issue → safe check."
            />
            <Feature
              icon={<RefreshCcw />}
              title="Repair vs Replace"
              text="Use appliance age and repair history for guidance."
            />
            <Feature
              icon={<Activity />}
              title="Health Score"
              text="See a simple 0–100 condition score."
            />
            <Feature
              icon={<ShieldCheck />}
              title="Estimate & Tracking"
              text="View estimate range and service status."
            />
          </div>
        </div>
      </section>

      <section id="process" className="bg-[#17362e] py-20 text-white">
        <div className="container-x">
          <div className="max-w-2xl">
            <p className="font-bold text-lime-300">HOW IT WORKS</p>
            <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">
              From problem to solved
              <br />
              in four easy steps.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              ["01", "Choose", "Pick an appliance or Other appliance."],
              ["02", "Tell us", "Select a symptom or write your own issue."],
              ["03", "Schedule", "Choose a date and preferred time."],
              [
                "04",
                "Track",
                "Follow Received → Assigned → On the way → Started → Completed.",
              ],
            ].map(([number, title, text]) => (
              <div
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
                key={number}
              >
                <span className="text-sm font-bold text-lime-300">{number}</span>
                <h3 className="mt-8 text-2xl font-bold">{title}</h3>
                <p className="mt-2 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-bold text-emerald-700">WHY HOMECARE PRO</p>
            <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">
              More than a normal booking website.
            </h2>

            <div className="mt-8 space-y-5">
              {[
                ["Symptom-first service", "You do not need to know the technical fault."],
                ["Repair vs Replace guide", "Get a practical decision guide before spending more."],
                ["Service transparency", "See a demo estimate range and status updates."],
                ["Customer account", "Keep bookings connected to your Clerk account."],
              ].map(([title, text]) => (
                <div className="flex gap-4" key={title}>
                  <div className="rounded-2xl bg-emerald-900 p-3 text-lime-300">
                    <CheckCircle2 />
                  </div>
                  <div>
                    <h3 className="font-bold">{title}</h3>
                    <p className="mt-1 text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem]">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1100&q=85"
              alt="Technician service"
              className="h-[500px] w-full object-cover"
            />
            <div className="glass absolute bottom-6 left-6 right-6 rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-lime-300 p-3">
                  <Wrench />
                </div>
                <div>
                  <b>Professional service, simplified.</b>
                  <p className="text-sm text-slate-600">
                    Diagnosis, booking, tracking and admin management in one project.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#f0f3ee] py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="font-bold text-emerald-700">SUPPORT</p>
            <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">
              Need help with an appliance?
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-slate-600">
              Send your question or issue. The message is stored in JSON Server so
              the admin dashboard can review it.
            </p>

            <div className="mt-8 space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-800" />
                Customer-first service flow
              </p>
              <p className="flex items-center gap-3">
                <UserRound className="text-emerald-800" />
                Clerk customer authentication
              </p>
              <p className="flex items-center gap-3">
                <Wrench className="text-emerald-800" />
                Separate admin dashboard
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-soft md:p-9">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-900 text-lime-300">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-extrabold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}

export default Home;
