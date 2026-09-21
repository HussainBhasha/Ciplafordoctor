import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import About from "@/pages/About";
import Doctor from "@/pages/Doctor";
import Contact from "@/pages/Contact";
import ClinicalTrials from "@/pages/ClinicalTrials";
import PatientOutcomes from "@/pages/PatientOutcomes";
import Disclaimer from "@/pages/Disclaimer"; // Legal Disclaimer Page
import Admin from "@/pages/Admin";
import { DoctorAuthProvider, useDoctorAuth } from "@/context/DoctorAuthContext";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;

    const start = Date.now();
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

    if (tryScroll()) return;
    const timer = window.setInterval(() => {
      if (tryScroll() || Date.now() - start > 2000) {
        window.clearInterval(timer);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [location.pathname, location.hash]);

  return null;
}

// Protected route component that requires Doctor authentication
function ProtectedDoctorRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useDoctorAuth();

  if (!isAuthenticated) {
    return <Navigate to="/doctor" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <DoctorAuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="min-h-dvh flex items-center justify-center bg-sky-50">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
                <p className="text-sm font-semibold text-sky-800">Loading CiploStem...</p>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/doctor" replace />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route
              path="/about"
              element={
                <ProtectedDoctorRoute>
                  <About />
                </ProtectedDoctorRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedDoctorRoute>
                  <Contact />
                </ProtectedDoctorRoute>
              }
            />
            <Route
              path="/clinical-trials"
              element={
                <ProtectedDoctorRoute>
                  <ClinicalTrials />
                </ProtectedDoctorRoute>
              }
            />
            <Route
              path="/patient-outcomes"
              element={
                <ProtectedDoctorRoute>
                  <PatientOutcomes />
                </ProtectedDoctorRoute>
              }
            />
            <Route
              path="/disclaimer"
              element={
                <ProtectedDoctorRoute>
                  <Disclaimer />
                </ProtectedDoctorRoute>
              }
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/doctor" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </DoctorAuthProvider>
  );
}
