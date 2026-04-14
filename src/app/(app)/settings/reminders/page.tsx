"use client";
import { useState } from "react";
import { Bell, Smartphone, Mail, ChevronRight } from "lucide-react";

export default function ReminderSettingsPage() {
  const [prefs, setPrefs] = useState({
    push: true,
    email: false,
    medicine: true,
    preventive: false,
    refill: true,
    expiry: true
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  };

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Reminder Settings</h1>

      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "12px", opacity: 0.8 }}>Notification Channels</h2>
        <div className="glass" style={{ borderRadius: "16px", overflow: "hidden" }}>
          
          <div style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Smartphone size={20} opacity={0.7} />
              <div style={{ fontWeight: 600 }}>Push Notifications</div>
            </div>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative", width: "44px", height: "26px" }}>
               <input type="checkbox" checked={prefs.push} onChange={() => toggle("push")} style={{ opacity: 0, position: "absolute" }} />
               <div style={{ width: "44px", height: "26px", background: prefs.push ? "var(--primary)" : "var(--border)", borderRadius: "13px", position: "absolute", inset: 0, transition: "0.2s" }} />
               <div style={{ position: "absolute", top: "3px", left: prefs.push ? "21px" : "3px", width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "0.2s", pointerEvents: "none" }} />
            </label>
          </div>

          <div style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Mail size={20} opacity={0.7} />
              <div style={{ fontWeight: 600 }}>Email Alerts</div>
            </div>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative", width: "44px", height: "26px" }}>
               <input type="checkbox" checked={prefs.email} onChange={() => toggle("email")} style={{ opacity: 0, position: "absolute" }} />
               <div style={{ width: "44px", height: "26px", background: prefs.email ? "var(--primary)" : "var(--border)", borderRadius: "13px", position: "absolute", inset: 0, transition: "0.2s" }} />
               <div style={{ position: "absolute", top: "3px", left: prefs.email ? "21px" : "3px", width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "0.2s", pointerEvents: "none" }} />
            </label>
          </div>

        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "12px", opacity: 0.8 }}>Preferences</h2>
        <div className="glass" style={{ borderRadius: "16px", overflow: "hidden" }}>
          
          {[
            { label: "Medicine Reminders", key: "medicine" },
            { label: "Preventive Care Reminders", key: "preventive" },
            { label: "Refill Warnings", key: "refill" },
            { label: "Expiry Warnings", key: "expiry" }
          ].map((item, i) => (
            <div key={i} style={{ padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
              <div style={{ fontWeight: 600 }}>{item.label}</div>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative", width: "44px", height: "26px" }}>
                 <input type="checkbox" checked={prefs[item.key as keyof typeof prefs]} onChange={() => toggle(item.key as keyof typeof prefs)} style={{ opacity: 0, position: "absolute" }} />
                 <div style={{ width: "44px", height: "26px", background: prefs[item.key as keyof typeof prefs] ? "var(--success)" : "var(--border)", borderRadius: "13px", position: "absolute", inset: 0, transition: "0.2s" }} />
                 <div style={{ position: "absolute", top: "3px", left: prefs[item.key as keyof typeof prefs] ? "21px" : "3px", width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "0.2s", pointerEvents: "none" }} />
              </label>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}
