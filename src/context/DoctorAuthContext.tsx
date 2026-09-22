import React, { createContext, useContext, useState, useEffect } from "react";

export interface DoctorUser {
  id?: number;
  mci_code: string;
  email?: string;
  city?: string;
  phone?: string;
  is_verified?: boolean;
}

interface DoctorAuthContextType {
  doctor: DoctorUser | null;
  isAuthenticated: boolean;
  login: (user: DoctorUser) => void;
  logout: () => void;
}

const STORAGE_KEY = "ciplostem:doctor_auth";

const DoctorAuthContext = createContext<DoctorAuthContextType | undefined>(undefined);

function readStoredAuth(): DoctorUser | null {
  try {
    // Proactively clear any localStorage auth keys from previous versions
    // so closing the browser strictly logs the user out and reopening is completely fresh.
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("ciplostem:welcomeGate");
      localStorage.removeItem("ciplostem:portal");
    } catch {
      void 0;
    }

    const sessionStored = sessionStorage.getItem(STORAGE_KEY);
    if (sessionStored) return JSON.parse(sessionStored);
    return null;
  } catch {
    return null;
  }
}

export function DoctorAuthProvider({ children }: { children: React.ReactNode }) {
  const [doctor, setDoctor] = useState<DoctorUser | null>(() => readStoredAuth());

  const isAuthenticated = !!doctor && (!!doctor.mci_code || !!doctor.email);

  const login = (user: DoctorUser) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        void 0;
      }
    } catch {
      void 0;
    }
    setDoctor(user);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem("ciplostem:welcomeGate");
      sessionStorage.removeItem("ciplostem:portal");
    } catch {
      void 0;
    }
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("ciplostem:welcomeGate");
      localStorage.removeItem("ciplostem:portal");
    } catch {
      void 0;
    }
    setDoctor(null);
  };

  return (
    <DoctorAuthContext.Provider value={{ doctor, isAuthenticated, login, logout }}>
      {children}
    </DoctorAuthContext.Provider>
  );
}

export function useDoctorAuth() {
  const context = useContext(DoctorAuthContext);
  if (!context) {
    throw new Error("useDoctorAuth must be used within a DoctorAuthProvider");
  }
  return context;
}
