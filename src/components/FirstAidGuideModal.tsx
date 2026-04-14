"use client";

import { X, PhoneCall } from "lucide-react";
import { useEffect } from "react";
import firstAidData from "@/lib/firstAidData"; 

export function FirstAidGuideModal({ guide, onClose }: { guide: string | null, onClose: () => void }) {
  useEffect(() => {
    if (guide) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [guide]);

  if (!guide) return null;

  const data = firstAidData[guide as keyof typeof firstAidData] || {
    when: "This guide is meant for " + guide.toLowerCase() + " emergencies.",
    steps: ["Assess the situation.", "Seek help.", "Wait for medical professionals."],
    notToDo: ["Do not panic.", "Do not give any unsolicited medical application."]
  };

  return (
    <div style={{
      position: "fixed", inset: 0, backgroundColor: "var(--background)", zIndex: 10000,
      display: "flex", flexDirection: "column", overflowY: "auto"
    }}>
      
      {/* Header Block */}
      <div style={{ background: "var(--danger)", color: "white", padding: "24px 20px 32px" }}>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "none", borderRadius: "50%", padding: "8px", display: "flex", marginLeft: "auto", cursor: "pointer", marginBottom: "12px" }}>
          <X size={24} />
        </button>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1.1, marginBottom: "8px" }}>{guide}</h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.9, fontWeight: 600 }}>Emergency Protocol</p>
      </div>

      <div style={{ padding: "20px", marginTop: "-20px", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Massive Call Ambulance CTA */}
        <a href="tel:108" style={{ width: "100%", background: "var(--danger)", color: "white", borderRadius: "20px", padding: "20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", textDecoration: "none", boxShadow: "0 8px 16px rgba(239,68,68,0.3)" }}>
          <PhoneCall size={28} />
          <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>CALL AMBULANCE (108)</span>
        </a>

        <div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "8px", color: "var(--foreground)" }}>When to use this</h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.5, background: "rgba(37,99,235,0.05)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(37,99,235,0.2)" }}>
            {data.when}
          </p>
        </div>

        <div>
           <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "16px", color: "var(--success)" }}>What to do</h2>
           <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
             {data.steps.map((step: string, idx: number) => (
                <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                   <div style={{ background: "var(--success)", color: "white", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, flexShrink: 0, marginTop: "2px" }}>
                     {idx + 1}
                   </div>
                   <div style={{ fontSize: "1.1rem", lineHeight: 1.5, fontWeight: 600 }}>
                     {step}
                   </div>
                </div>
             ))}
           </div>
        </div>

        <div>
           <h2 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "12px", color: "var(--danger)", borderTop: "2px dashed var(--border)", paddingTop: "24px" }}>⛔ What NOT to do</h2>
           <ul style={{ paddingLeft: "20px", fontSize: "1.05rem", lineHeight: 1.5, fontWeight: 600, display: "flex", flexDirection: "column", gap: "8px" }}>
             {data.notToDo.map((item: string, idx: number) => (
                <li key={idx} style={{ color: "var(--danger)" }}>{item}</li>
             ))}
           </ul>
        </div>

      </div>

    </div>
  );
}
