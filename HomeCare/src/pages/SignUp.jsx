import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp, useUser } from "@clerk/clerk-react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Home, Loader2, ShieldCheck } from "lucide-react";

function SignUp() {
  const { isLoaded: userLoaded, user } = useUser();
  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userLoaded && user) navigate("/", { replace: true });
  }, [userLoaded, user, navigate]);

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const message = (err) => {
    const first = err?.errors?.[0];
    return first?.longMessage || first?.message || "Could not create your account. Please try again.";
  };

  const createAccount = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLoaded) return;
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");

    setLoading(true);
    try {
      const result = await signUp.create({ emailAddress: form.email.trim(), password: form.password });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/", { replace: true });
        return;
      }
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify");
    } catch (err) {
      setError(message(err));
    } finally {
      setLoading(false);
    }
  };

  const verify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: code.trim() });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/", { replace: true });
      } else {
        setError("Verification is not complete yet. Please check the required fields in Clerk.");
      }
    } catch (err) {
      setError(message(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_.95fr]">
        <section className="hidden flex-col justify-between bg-emerald-950 p-10 lg:flex lg:p-14">
          <Link to="/" className="flex items-center gap-3 text-xl font-black">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">HC</span>
            HomeCare Pro
          </Link>
          <div className="max-w-xl">
            <p className="text-sm font-bold tracking-[.2em] text-emerald-300">SMART HOME SERVICE</p>
            <h1 className="mt-5 text-5xl font-black leading-tight">Create once. Book smarter every time.</h1>
            <p className="mt-5 text-lg leading-8 text-emerald-50/70">Save your service details, track technicians, review appliance health and get smart diagnosis guidance from one account.</p>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {["Smart diagnosis", "Repair vs replace guide", "Health score", "Service tracking"].map((x) => (
                <div key={x} className="flex items-center gap-3 rounded-2xl border border-emerald-800 bg-emerald-900/60 p-4 text-sm font-bold">
                  <CheckCircle2 className="text-emerald-300" size={18} /> {x}
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-emerald-100/50">Your authentication is securely handled by Clerk.</p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link to="/" className="flex items-center gap-2 font-black"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 text-sm text-slate-950">HC</span>HomeCare Pro</Link>
              <Link to="/" className="text-slate-400"><Home size={19}/></Link>
            </div>
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400"><ShieldCheck size={24}/></div>
              <p className="text-sm font-bold text-emerald-400">CUSTOMER ACCOUNT</p>
              <h2 className="mt-2 text-3xl font-black">{step === "verify" ? "Verify your email" : "Create your account"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{step === "verify" ? `We sent a verification code to ${form.email}.` : "Use your email and password to create a HomeCare Pro account."}</p>
            </div>

            {error && <div className="mb-5 rounded-2xl border border-red-900 bg-red-950/60 p-4 text-sm leading-6 text-red-200">{error}</div>}

            {step === "form" ? (
              <form onSubmit={createAccount} className="space-y-5">
                <Field label="Email address"><input required type="email" name="email" value={form.email} onChange={change} className="authInput" placeholder="you@example.com" autoComplete="email" /></Field>
                <PasswordField label="Password" name="password" value={form.password} onChange={change} show={showPassword} setShow={setShowPassword} />
                <PasswordField label="Confirm password" name="confirm" value={form.confirm} onChange={change} show={showConfirm} setShow={setShowConfirm} />
                <button disabled={loading || !isLoaded} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3.5 font-black text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60">
                  {loading ? <><Loader2 className="animate-spin" size={18}/> Creating account...</> : <>Create account <ArrowRight size={18}/></>}
                </button>
              </form>
            ) : (
              <form onSubmit={verify} className="space-y-5">
                <Field label="Verification code"><input required inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} className="authInput text-center text-2xl tracking-[.35em]" placeholder="123456" /></Field>
                <button disabled={loading || code.length < 4} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3.5 font-black text-slate-950 disabled:opacity-60">
                  {loading ? <><Loader2 className="animate-spin" size={18}/> Verifying...</> : <>Verify & continue <ArrowRight size={18}/></>}
                </button>
              </form>
            )}

            <p className="mt-7 text-center text-sm text-slate-400">Already have an account? <Link className="font-bold text-emerald-400 hover:text-emerald-300" to="/login">Sign in</Link></p>
            <p className="mt-5 text-center text-xs leading-5 text-slate-600">By creating an account, you agree to use HomeCare Pro for genuine service requests.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-200">{label}</span>
      {children}
    </label>
  );
}
function PasswordField({ label, name, value, onChange, show, setShow }) {
  return (
    <Field label={label}>
      <div className="relative">
        <input
          required
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="authInput pr-12"
          autoComplete="new-password"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShow((previous) => !previous)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
        >
          {show ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
      </div>
    </Field>
  );
}
export default SignUp;
