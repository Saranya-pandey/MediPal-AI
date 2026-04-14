import Link from "next/link";
import { Phone, AlertOctagon, HeartPulse, ShieldAlert, ChevronLeft } from "lucide-react";

export default function EmergencyHelpPage() {
  const numbers = [
    { label: "Ambulance", number: "108" },
    { label: "Police", number: "100" },
    { label: "Fire", number: "101" },
    { label: "National Emergency", number: "112" },
    { label: "Poison Control", number: "1800-116-117" },
    { label: "Chhanv Foundation (Acid Attack)", number: "8800111177" },
  ];

  return (
    <div style={{ backgroundColor: "var(--danger-light)", minHeight: "100vh" }}>
      <div className="container animate-in" style={{ padding: "20px 20px 80px", color: "#7f1d1d" }}>
        
        <header style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <Link href="/" style={{ padding: "8px", background: "rgba(255,255,255,0.5)", borderRadius: "50%" }}>
            <ChevronLeft size={24} />
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Emergency Help</h1>
        </header>

        <div style={{ background: "var(--danger)", color: "white", padding: "16px", borderRadius: "12px", marginBottom: "24px", display: "flex", gap: "12px", alignItems: "flex-start", boxShadow: "var(--shadow-md)" }}>
          <AlertOctagon size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "0.9rem", fontWeight: 500, lineHeight: 1.4 }}>
            This is basic first aid guidance only. Always call emergency services immediately in a life-threatening situation. MediPal AI does not replace professional medical care.
          </p>
        </div>

        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "16px" }}>Emergency Numbers (Tap to call)</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
          {numbers.map((item) => (
            <a key={item.number} href={`tel:${item.number}`} style={{ background: "white", padding: "16px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "var(--shadow-sm)", textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Phone size={20} color="var(--danger)" />
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{item.number}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.8, fontWeight: 500 }}>{item.label}</div>
            </a>
          ))}
        </div>

        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "16px" }}>Emergency Guides</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          
          <details style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <summary style={{ padding: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", listStyle: "none" }}>
              <HeartPulse size={20} color="var(--danger)" /> CPR (Cardiopulmonary Resuscitation)
            </summary>
            <div style={{ padding: "0 16px 16px", fontSize: "0.95rem" }}>
              <p style={{ fontWeight: 600, marginBottom: "8px" }}>When: person is unresponsive and not breathing</p>
              <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", opacity: 0.9 }}>
                <li>Call ambulance immediately — 108</li>
                <li>Lay person flat on a firm surface</li>
                <li>Place heel of hand on centre of chest, press down 5–6 cm hard and fast (100–120/min)</li>
                <li>Give 2 rescue breaths after 30 compressions</li>
              </ol>
            </div>
          </details>

          <details style={{ background: "white", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <summary style={{ padding: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", listStyle: "none" }}>
              <ShieldAlert size={20} color="var(--danger)" /> Acid Attack / Chemical Burn
            </summary>
            <div style={{ padding: "0 16px 16px", fontSize: "0.95rem" }}>
              <div style={{ background: "var(--danger-light)", padding: "12px", borderRadius: "8px", marginBottom: "12px", fontSize: "0.85rem", fontWeight: 600 }}>
                This is a life-threatening emergency. Call 108 immediately. Speed of water flushing is the most important factor.
              </div>
              <ol style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px", opacity: 0.9 }}>
                <li>Call 108 immediately. Keep line open.</li>
                <li>Remove contaminated clothing gently. Do not touch with bare hands.</li>
                <li><strong>Flush with large amounts of cool running water for minimum 30-60 minutes continuously.</strong></li>
                <li>If eyes affected, flush continuously for minimum 30 mins holding eyelid open.</li>
              </ol>
              <div style={{ marginTop: "12px", background: "#fef2f2", padding: "12px", borderRadius: "8px", fontSize: "0.8rem" }}>
                <strong>Legal Note:</strong> Acid attacks are an offence under Sec 326A/326B IPC. Victim has the right to FREE medical treatment at any government hospital.
              </div>
            </div>
          </details>

        </div>
      </div>
    </div>
  );
}
