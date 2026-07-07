import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroVideoOverlay from "@/components/media/IntroVideoOverlay";
import introVideo from "@/assets/introvideo.mp4";

export default function Home() {
  const navigate = useNavigate();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (introDone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;
    try {
      sessionStorage.setItem("ciplostem:portal", "doctor");
      sessionStorage.setItem("ciplostem:welcomeGate", "1");
    } catch {
      void 0;
    }
    navigate("/doctor", { replace: true });
  }, [introDone, navigate]);

  if (!introDone) {
    return (
      <IntroVideoOverlay
        src={introVideo}
        onDone={() => {
          setIntroDone(true);
        }}
      />
    );
  }

  return null;
}
