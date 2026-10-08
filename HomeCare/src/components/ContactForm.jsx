import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { createContact } from "../utils/api";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await createContact({
        ...form,
        createdAt: new Date().toISOString(),
      });
      setForm({ name: "", email: "", phone: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch {
      alert("Could not send message. Start JSON Server first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="font-bold text-emerald-700">CONTACT US</p>
      <h3 className="mt-2 text-2xl font-extrabold">
        Tell us what you need help with.
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Have a question or appliance issue? Send us a message and our support
        team can help you.
      </p>

      {sent && (
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <CheckCircle2 size={20} />
          Message sent successfully!
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">Name *</label>
          <input
            required
            minLength="2"
            maxLength="50"
            pattern="[A-Za-z ]{2,50}"
            title="Name should contain only letters and spaces"
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Enter your name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Email *</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={change}
            placeholder="example@gmail.com"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Phone *</label>
          <input
            required
            type="tel"
            pattern="[6-9][0-9]{9}"
            title="Enter a valid 10-digit Indian mobile number"
            name="phone"
            value={form.phone}
            onChange={change}
            placeholder="9876543210"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-700"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">Message *</label>
          <textarea
            required
            minLength="10"
            maxLength="500"
            rows="5"
            name="message"
            value={form.message}
            onChange={change}
            placeholder="Describe your issue..."
            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-700"
          />
        </div>

        <button
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Message"}
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
