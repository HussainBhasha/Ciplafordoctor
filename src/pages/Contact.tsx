import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import MarketingNavbar from "@/components/layout/MarketingNavbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Mail, MapPin, Send, AlertCircle, Phone } from "lucide-react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const INTERNATIONAL_PHONE_REGEX = /^\+?[1-9]\d{7,14}$/;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  // Auto-dismiss errors after 3.5 seconds
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const t = setTimeout(() => setErrors({}), 3500);
    return () => clearTimeout(t);
  }, [errors]);

  const contactName = "Cipla";

  useEffect(() => {
    document.title = "Cipla";
  }, []);

  const validatePhone = (value: string): boolean => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 10) {
      return INDIAN_PHONE_REGEX.test(digits);
    }
    return INTERNATIONAL_PHONE_REGEX.test(digits);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g., name@example.com).";
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!validatePhone(phone.trim())) {
      newErrors.phone =
        "Please enter a valid phone number. For India: 10 digits starting with 6-9. International: include country code with +.";
    }

    if (!message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-dvh bg-sky-50">
      <MarketingNavbar />
      <main className="pt-16">
        <section className="bg-sky-50/70">
          <Container>
            <div className="pt-8 pb-2 text-center sm:pt-12 sm:pb-4">
              <div className="text-[11px] font-semibold tracking-[0.32em] text-sky-700/80">
                FOR MORE INFORMATION
              </div>
              <div className="mx-auto mt-3 max-w-4xl text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-slate-900">
                Contact the{" "}
                <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  {contactName} Team
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="pt-2 pb-8 sm:pt-4 sm:pb-12">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
              <div className="space-y-5">
                <div className="rounded-[22px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Email</div>
                      <a
                        href="mailto:info@cipla.com"
                        className="mt-1 block text-sm text-sky-700 hover:text-sky-800"
                      >
                        info@cipla.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-[22px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300">
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 ring-1 ring-sky-100 text-sky-700">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Headquarters</div>
                      <a
                        href="https://www.google.com/maps?q=PENINSULA%20BUSINESS%20PARK%20GANPATRAO%20KADAM%20MARG%20LOWER%20PAREL%20MUMBAI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-sm leading-relaxed text-slate-600 hover:text-sky-700"
                      >
                        Cipla Ltd Head Office - Mumbai
                        <br />
                        Peninsula Business Park,
                        <br />
                        Ganpatrao Kadam Marg,
                        <br />
                        Lower Parel, Mumbai.
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] bg-white/90 p-5 ring-1 ring-sky-200/60 shadow-soft-xl transition-all duration-300 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] hover:ring-sky-300 sm:p-6">
                <div className="text-lg font-semibold text-slate-900">Send us a message</div>

                {sent ? (
                  <div className="mt-6 rounded-2xl bg-sky-50 p-5 ring-1 ring-sky-100">
                    <div className="text-sm font-semibold text-slate-900">Message sent</div>
                    <div className="mt-1 text-sm text-slate-600">
                      We&apos;ll get back to you soon.
                    </div>
                    <div className="mt-5">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSent(false);
                          setFullName("");
                          setEmail("");
                          setPhone("");
                          setSubject("");
                          setMessage("");
                          setErrors({});
                        }}
                      >
                        Send another
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    className="mt-6 space-y-3"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!validateForm()) return;

                      setLoading(true);

                      try {
                        const response = await fetch("/api/contact", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            full_name: fullName,
                            email: email.trim(),
                            phone: phone.trim(),
                            subject: subject.trim(),
                            message: message.trim(),
                          }),
                        });

                        const data = await response.json().catch(() => ({}));

                        if (response.ok && data.success) {
                          setSent(true);
                        } else if (data.validation_errors) {
                          setErrors(data.validation_errors);
                          alert(
                            "Please correct the highlighted fields before submitting."
                          );
                        } else {
                          alert(
                            data.message ||
                              "Failed to send message, please try again"
                          );
                        }
                      } catch (error) {
                        console.error("Error sending message:", error);
                        alert(
                          "Failed to send message, please try again. If the issue persists, email us directly at info@cipla.com."
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <input
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (errors.fullName)
                              setErrors({ ...errors, fullName: undefined });
                          }}
                          placeholder="Full name"
                          className={`w-full rounded-2xl border bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2 ${
                            errors.fullName
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-slate-200 focus:border-sky-400"
                          }`}
                          required
                        />
                        {errors.fullName && (
                          <div className="flex items-center gap-1 mt-1.5 text-[12px] text-red-600 font-medium">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{errors.fullName}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email)
                              setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="Email address"
                          className={`w-full rounded-2xl border bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2 ${
                            errors.email
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-slate-200 focus:border-sky-400"
                          }`}
                          required
                          inputMode="email"
                        />
                        {errors.email && (
                          <div className="flex items-center gap-1 mt-1.5 text-[12px] text-red-600 font-medium">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{errors.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone)
                              setErrors({ ...errors, phone: undefined });
                          }}
                          placeholder="Phone number (required) — e.g., 9876543210"
                          className={`w-full rounded-2xl border bg-slate-50/40 pl-10 pr-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2 ${
                            errors.phone
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-slate-200 focus:border-sky-400"
                          }`}
                          inputMode="tel"
                          required
                        />
                      </div>
                      {errors.phone && (
                        <div className="flex items-start gap-1 mt-1.5 text-[12px] text-red-600 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-px" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>

                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Subject (optional)"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2 focus:border-sky-400"
                    />

                    <div>
                      <textarea
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message)
                            setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Your message"
                        className={`min-h-[120px] w-full resize-none rounded-2xl border bg-slate-50/40 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring-2 ${
                          errors.message
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-slate-200 focus:border-sky-400"
                        }`}
                        required
                      />
                      {errors.message && (
                        <div className="flex items-center gap-1 mt-1.5 text-[12px] text-red-600 font-medium">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.message}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send message"}{" "}
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] bg-white ring-1 ring-sky-200/60 shadow-soft-xl">
              <iframe
                title="Ciplostem™ HQ"
                src="https://www.google.com/maps?q=PENINSULA%20BUSINESS%20PARK%20GANPATRAO%20KADAM%20MARG%20LOWER%20PAREL%20MUMBAI&output=embed"
                className="h-[260px] sm:h-[340px] md:h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
