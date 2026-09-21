import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  LogIn,
} from "lucide-react";
import brandLogo from "@/assets/Cipla_logo.svg.png";
import ciplostemLogo from "@/assets/logo.png";
import { useDoctorAuth } from "@/context/DoctorAuthContext";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const INTERNATIONAL_PHONE_REGEX = /^\+?[1-9]\d{7,14}$/;
const MCI_REGEX = /^[A-Za-z0-9\-\/\s]{3,20}$/;

interface Props {
  onSuccess?: () => void;
}

export default function DoctorAuthGate({ onSuccess }: Props) {
  const { login } = useDoctorAuth();

  const [tab, setTab] = useState<"signin" | "signup">("signin");

  // Sign in state (direct sign in, NO otp)
  const [signInEmail, setSignInEmail] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  // Sign up state (WITH otp verification)
  const [signUpEmail, setSignUpEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [mciCode, setMciCode] = useState("");
  const [signupStep, setSignupStep] = useState<"form" | "otp">("form");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  const [signUpErrors, setSignUpErrors] = useState<{
    email?: string;
    city?: string;
    phone?: string;
    mci_code?: string;
  }>({});

  // Auto-dismiss alert banners after 3.5 seconds
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), 3500);
    return () => clearTimeout(t);
  }, [errorMsg]);

  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(null), 3500);
    return () => clearTimeout(t);
  }, [successMsg]);

  // Auto-dismiss inline signup field errors after 3.5 seconds
  useEffect(() => {
    if (Object.keys(signUpErrors).length === 0) return;
    const t = setTimeout(() => setSignUpErrors({}), 3500);
    return () => clearTimeout(t);
  }, [signUpErrors]);

  // OTP timer for signup OTP
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (signupStep === "otp" && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [signupStep, otpTimer]);

  // ============= OTP helpers (only for SIGNUP) =============
  const handleOtpChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, "");
    if (!cleanVal) {
      const newDigits = [...otpDigits];
      newDigits[index] = "";
      setOtpDigits(newDigits);
      return;
    }

    if (cleanVal.length > 1) {
      const pastedChars = cleanVal.slice(0, 6).split("");
      const newDigits = [...otpDigits];
      pastedChars.forEach((ch, i) => {
        if (index + i < 6) newDigits[index + i] = ch;
      });
      setOtpDigits(newDigits);
      const nextIndex = Math.min(index + pastedChars.length, 5);
      otpInputsRef.current[nextIndex]?.focus();
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);

    if (index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleSendOtpForEmail = async (emailToSend: string) => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToSend }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

      setSignupStep("otp");
      setOtpTimer(60);
      setCanResend(false);
      setOtpDigits(["", "", "", "", "", ""]);
      setSuccessMsg(`A 6-digit OTP has been sent to ${emailToSend}`);
      setTimeout(() => otpInputsRef.current[0]?.focus(), 200);
    } catch (err: any) {
      setErrorMsg(err.message || "Could not send OTP. Please verify your email.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || loading) return;
    await handleSendOtpForEmail(signUpEmail);
  };

  // ============= SIGN IN (DIRECT - NO OTP) =============
  const handleDirectSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!signInEmail) {
      setErrorMsg("Please enter your registered Email ID.");
      return;
    }
    setSigningIn(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sign in failed");

      login(data.user);
      setVerifiedSuccess(true);
      setSuccessMsg("Login successful! Opening portal...");
      // Call onSuccess immediately after login — a brief visual delay for UX
      // is handled by the success message above, but we transition right away
      // so the authenticated content begins painting & ScrollTrigger / GSAP
      // observers initialize cleanly without a 1-second white gap.
      setTimeout(() => onSuccess?.(), 150);
    } catch (err: any) {
      setErrorMsg(err.message || "Sign in failed. Please verify email and try again.");
    } finally {
      setSigningIn(false);
    }
  };

  // ============= SIGN UP VALIDATION HELPERS =============
  const validatePhone = (value: string): boolean => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 10) {
      return INDIAN_PHONE_REGEX.test(digits);
    }
    return INTERNATIONAL_PHONE_REGEX.test(value.trim());
  };

  const validateSignUpForm = (): boolean => {
    const newErrors: typeof signUpErrors = {};

    const trimmedEmail = signUpEmail.trim();
    const trimmedCity = city.trim();
    const trimmedPhone = phone.trim();
    const trimmedMci = mciCode.trim();

    if (!trimmedEmail) {
      newErrors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address (e.g., doctor@hospital.com).";
    }

    if (!trimmedCity) {
      newErrors.city = "Please enter your city.";
    } else if (trimmedCity.length < 2) {
      newErrors.city = "City must be at least 2 characters.";
    }

    if (!trimmedPhone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!validatePhone(trimmedPhone)) {
      newErrors.phone =
        "Please enter a valid phone. For India: 10 digits starting with 6-9. International: + country code.";
    }

    if (!trimmedMci) {
      newErrors.mci_code = "Please enter your MCI / Medical Council code.";
    } else if (!MCI_REGEX.test(trimmedMci)) {
      newErrors.mci_code = "MCI code must be 3-20 alphanumeric characters (hyphens and slashes allowed).";
    }

    setSignUpErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============= SIGN UP (WITH OTP VERIFICATION) =============
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!validateSignUpForm()) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signUpEmail.trim(),
          city: city.trim(),
          phone: phone.trim(),
          mci_code: mciCode.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.validation_errors) {
          setSignUpErrors(data.validation_errors);
        }
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMsg("Registration created! Sending verification OTP...");
      setSignUpErrors({});
      await handleSendOtpForEmail(signUpEmail.trim());
    } catch (err: any) {
      setErrorMsg(err.message || "Registration could not be completed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySignupOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const fullOtp = otpDigits.join("");
    if (fullOtp.length !== 6) {
      setErrorMsg("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signUpEmail,
          otp: fullOtp,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid or expired OTP");

      login(data.user);
      setVerifiedSuccess(true);
      setSuccessMsg("Registration verified! Opening portal...");
      // See comment in handleDirectSignIn — minimize transition delay so
      // the authenticated page starts painting immediately, preventing
      // a blank white flash between "auth card" and portal content.
      setTimeout(() => onSuccess?.(), 150);
    } catch (err: any) {
      setErrorMsg(err.message || "Verification failed. Please check the OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-100 via-sky-50 to-cyan-50 overflow-y-auto animate-fadeIn">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[55%] w-[45%] rounded-full bg-sky-200/60 blur-3xl animate-floaty" />
        <div className="absolute bottom-[-15%] right-[-5%] h-[55%] w-[45%] rounded-full bg-cyan-200/50 blur-3xl animate-floaty" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative w-full max-w-7xl px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12">
          {/* Left Side - Minimal welcome text */}
          <div className="hidden lg:flex flex-col justify-center items-start">
            <div>
              <div
                className="text-[28px] sm:text-[32px] font-bold tracking-[0.18em] text-sky-500 uppercase opacity-0 animate-slide-up"
                style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}
              >
                Welcome to
              </div>

              <div
                className="my-3 opacity-0 animate-slide-up"
                style={{ animationDelay: '0.18s', animationFillMode: 'forwards' }}
              >
                <img
                  src={ciplostemLogo}
                  alt="CiploStem™"
                  className="h-16 sm:h-20 lg:h-24 xl:h-28 w-auto object-contain -ml-1 sm:-ml-2 max-w-[90vw]"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <div
                className="mt-3 opacity-0 animate-slide-up"
                style={{ animationDelay: '0.32s', animationFillMode: 'forwards' }}
              >
                <p className="text-[24px] sm:text-[28px] font-semibold text-slate-800 tracking-tight">
                  Doctor Portal
                </p>
              </div>

              <div
                className="mt-5 opacity-0 animate-slide-up"
                style={{ animationDelay: '0.45s', animationFillMode: 'forwards' }}
              >
                <div className="relative w-[180px]">
                  <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-blue-900 animate-underline-grow" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-md opacity-0 animate-slide-up"
              style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
            >
              <div className="rounded-2xl bg-white border border-slate-100 shadow-[0_4px_40px_-12px_rgba(14,116,144,0.18)] p-7 sm:p-8">
                {/* Logo + Header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <img
                    src={brandLogo}
                    alt="Cipla"
                    className="h-12 sm:h-14 w-auto object-contain mb-4"
                  />
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-[11px] font-semibold text-sky-700 tracking-wide">
                    <Stethoscope className="h-3 w-3 text-sky-600" />
                    HEALTHCARE PROFESSIONAL
                  </div>
                </div>

                {/* Tab Switcher (hide when in signup OTP step) */}
                {signupStep !== "otp" && (
                  <div className="flex rounded-xl bg-sky-50/80 border border-sky-100 p-0.5 mb-5">
                    <button
                      type="button"
                      onClick={() => {
                        setTab("signin");
                        setErrorMsg(null);
                        setSuccessMsg(null);
                        setSignUpErrors({});
                      }}
                      className={`flex-1 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 ${
                        tab === "signin"
                          ? "bg-white text-blue-800 shadow-sm border border-sky-100"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTab("signup");
                        setSignupStep("form");
                        setErrorMsg(null);
                        setSuccessMsg(null);
                        setSignUpErrors({});
                      }}
                      className={`flex-1 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 ${
                        tab === "signup"
                          ? "bg-white text-blue-800 shadow-sm border border-sky-100"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                {/* Alerts */}
                {errorMsg && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-100 p-3 mb-4 text-[13px] text-red-700 animate-fadeIn">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-3 mb-4 text-[13px] text-emerald-700 animate-fadeIn">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* ================= SIGN IN (DIRECT - NO OTP) ================= */}
                {tab === "signin" && (
                  <form onSubmit={handleDirectSignIn} className="space-y-4 animate-fadeIn">
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1.5 tracking-wide">
                        REGISTERED EMAIL ID
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          placeholder="doctor@hospital.com"
                          className="w-full rounded-lg border border-sky-100 bg-sky-50/40 pl-9 pr-3 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={signingIn || verifiedSuccess}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-2.5 text-[14px] font-semibold shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-blue-900/25 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    >
                      {verifiedSuccess ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Logging in...</span>
                        </>
                      ) : signingIn ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4" />
                          <span>Sign In</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center pt-1">
                      <span className="text-[12px] text-slate-500">Not registered? </span>
                      <button
                        type="button"
                        onClick={() => {
                          setTab("signup");
                          setSignupStep("form");
                          setErrorMsg(null);
                          setSuccessMsg(null);
                          setSignUpErrors({});
                        }}
                        className="text-[12px] font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                      >
                        Create Profile
                      </button>
                    </div>
                  </form>
                )}

                {/* ================= SIGN UP (WITH OTP) ================= */}
                {tab === "signup" && signupStep === "form" && (
                  <form onSubmit={handleSignUpSubmit} className="space-y-3 animate-fadeIn">
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1 tracking-wide">
                        EMAIL ID
                      </label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${signUpErrors.email ? "text-red-400" : "text-slate-400"}`} />
                        <input
                          type="email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          placeholder="doctor@hospital.com"
                          className={`w-full rounded-lg bg-sky-50/40 pl-9 pr-3 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition ${
                            signUpErrors.email
                              ? "border border-red-300 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              : "border border-sky-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                          }`}
                        />
                      </div>
                      {signUpErrors.email && (
                        <div className="flex items-center gap-1 mt-1.5 text-[12px] text-red-600">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{signUpErrors.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1 tracking-wide">
                        CITY
                      </label>
                      <div className="relative">
                        <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${signUpErrors.city ? "text-red-400" : "text-slate-400"}`} />
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Mumbai"
                          className={`w-full rounded-lg bg-sky-50/40 pl-9 pr-3 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition ${
                            signUpErrors.city
                              ? "border border-red-300 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              : "border border-sky-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                          }`}
                        />
                      </div>
                      {signUpErrors.city && (
                        <div className="flex items-center gap-1 mt-1.5 text-[12px] text-red-600">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{signUpErrors.city}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1 tracking-wide">
                        PHONE
                      </label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${signUpErrors.phone ? "text-red-400" : "text-slate-400"}`} />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9876543210"
                          className={`w-full rounded-lg bg-sky-50/40 pl-9 pr-3 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition ${
                            signUpErrors.phone
                              ? "border border-red-300 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              : "border border-sky-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                          }`}
                        />
                      </div>
                      {signUpErrors.phone && (
                        <div className="flex items-center gap-1 mt-1.5 text-[12px] text-red-600">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{signUpErrors.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-slate-700 mb-1 tracking-wide">
                        MCI / MEDICAL COUNCIL CODE
                      </label>
                      <div className="relative">
                        <FileCheck2 className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${signUpErrors.mci_code ? "text-red-400" : "text-slate-400"}`} />
                        <input
                          type="text"
                          value={mciCode}
                          onChange={(e) => setMciCode(e.target.value)}
                          placeholder="MCI-12345"
                          className={`w-full rounded-lg bg-sky-50/40 pl-9 pr-3 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 outline-none transition ${
                            signUpErrors.mci_code
                              ? "border border-red-300 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                              : "border border-sky-100 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                          }`}
                        />
                      </div>
                      {signUpErrors.mci_code && (
                        <div className="flex items-center gap-1 mt-1.5 text-[12px] text-red-600">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{signUpErrors.mci_code}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-2.5 text-[14px] font-semibold shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-blue-900/25 active:scale-[0.99] disabled:opacity-60 cursor-pointer mt-2"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Registering & Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Sign Up & Send OTP</span>
                        </>
                      )}
                    </button>

                    <div className="text-center pt-1">
                      <span className="text-[12px] text-slate-500">Already registered? </span>
                      <button
                        type="button"
                        onClick={() => {
                          setTab("signin");
                          setErrorMsg(null);
                          setSuccessMsg(null);
                          setSignUpErrors({});
                        }}
                        className="text-[12px] font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                )}

                {/* ================= SIGN UP - OTP STEP ================= */}
                {tab === "signup" && signupStep === "otp" && (
                  <form onSubmit={handleVerifySignupOtp} className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-sky-100">
                      <div className="text-[12px] text-slate-500">
                        Code sent to <span className="font-semibold text-slate-800">{signUpEmail}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSignupStep("form");
                          setErrorMsg(null);
                          setSuccessMsg(null);
                          setSignUpErrors({});
                        }}
                        className="flex items-center gap-1 text-[12px] font-semibold text-blue-700 hover:text-blue-800"
                      >
                        <ArrowLeft className="h-3 w-3" /> Back
                      </button>
                    </div>

                    <div>
                      <label className="block text-center text-[12px] font-semibold text-slate-700 mb-3 tracking-wide">
                        VERIFY REGISTRATION · ENTER 6-DIGIT OTP
                      </label>
                      <div className="flex justify-center gap-2">
                        {otpDigits.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              otpInputsRef.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="h-12 w-11 rounded-lg border border-sky-100 bg-sky-50/50 text-center text-xl font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-slate-500">
                        {otpTimer > 0 ? `Resend in ${otpTimer}s` : "No code received?"}
                      </span>
                      <button
                        type="button"
                        disabled={!canResend || loading}
                        onClick={handleResendOtp}
                        className="font-semibold text-blue-700 hover:text-blue-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} /> Resend
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || verifiedSuccess}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white py-2.5 text-[14px] font-semibold shadow-md shadow-blue-900/20 transition-all hover:shadow-lg hover:shadow-blue-900/25 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                    >
                      {verifiedSuccess ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Verified!</span>
                        </>
                      ) : loading ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="h-4 w-4" />
                          <span>Verify Registration</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
