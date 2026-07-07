import { Link, useLocation } from "react-router-dom";
import Container from "@/components/ui/Container";
import brandLogo from "@/assets/Cipla_logo.svg.png";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const location = useLocation();
  const nav = [
    { label: "About", href: "/about" },
    { label: "Doctor", href: "/doctor" },
    { label: "Contact", href: "/contact" },
  ] as const;

  return (
    <footer className="bg-white text-slate-900">
      <Container>
        <div className="flex flex-col gap-8 py-8 sm:py-10">
          {/* Desktop Layout: Logo left, nav middle, contact/address right */}
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-center">
            {/* Left: Logo */}
            <div className="hidden lg:flex justify-start">
              <img
                src={brandLogo}
                alt="CiploStem"
                className="h-14 sm:h-16 w-auto shrink-0 max-w-full"
              />
            </div>

            {/* Middle: Nav */}
            <div className="hidden lg:flex flex-wrap justify-center gap-6 text-sm text-slate-600">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`hover:text-sky-600 transition-colors font-medium ${
                    location.pathname === item.href ? "text-sky-700" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right: Contact & Address */}
            <div className="hidden lg:flex w-full max-w-[340px] justify-self-end flex-col gap-3 text-sm text-slate-600">
              <div className="grid grid-cols-[16px_1fr] items-center gap-3 text-left">
                <Mail className="h-4 w-4 text-sky-700" />
                <div>info@cipla.com</div>
              </div>
              <div className="grid grid-cols-[16px_1fr] items-center gap-3 text-left">
                <Phone className="h-4 w-4 text-sky-700" />
                <div>Toll Free: 1800-123-4567</div>
              </div>
              <div className="grid grid-cols-[16px_1fr] items-start gap-3 text-left">
                <MapPin className="mt-0.5 h-4 w-4 text-sky-700" />
                <div>
                  <div className="font-semibold">CIPLA LTD HEAD OFFICE-MUMBAI</div>
                  <div>PENINSULA BUSINESS PARK, GANPATRAO KADAM</div>
                  <div>MARG, LOWER PAREL, MUMBAI.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout for small screens */}
          <div className="flex flex-col gap-4 lg:hidden">
            {/* Logo first for mobile */}
            <div className="flex justify-center">
              <img
                src={brandLogo}
                alt="CiploStem"
                className="h-20 lg:h-24 w-auto shrink-0"
              />
            </div>
            <div className="mx-auto flex w-full max-w-sm flex-col gap-3 text-sm text-slate-600">
              <div className="grid grid-cols-[16px_1fr] items-center gap-3 text-left">
                <Mail className="h-4 w-4 text-sky-700" />
                <div>info@cipla.com</div>
              </div>
              <div className="grid grid-cols-[16px_1fr] items-center gap-3 text-left">
                <Phone className="h-4 w-4 text-sky-700" />
                <div>Toll Free: 1800-123-4567</div>
              </div>
              <div className="grid grid-cols-[16px_1fr] items-start gap-3 text-left">
                <MapPin className="mt-0.5 h-4 w-4 text-sky-700" />
                <div>
                  <div className="font-semibold">CIPLA LTD HEAD OFFICE-MUMBAI</div>
                  <div>PENINSULA BUSINESS PARK, GANPATRAO KADAM</div>
                  <div>MARG, LOWER PAREL, MUMBAI.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Cipla. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
