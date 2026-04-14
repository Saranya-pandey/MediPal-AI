"use client";

import { useFamily } from "@/lib/FamilyContext";
import { Users, Plus, Bell, Moon, PhoneCall, ShieldAlert, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { members, activeMemberId, setActiveMemberId } = useFamily();
  
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "32px" }}>
      <div>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px" }}>Profile</h1>
        <p style={{ opacity: 0.7, fontWeight: 500 }}>Manage your context and settings.</p>
      </div>

      {/* Profile Switcher */}
      <div className="glass" style={{ padding: "24px", borderRadius: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
           <h2 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Who's monitoring?</h2>
           <Link href="/family" style={{ fontSize: "0.9rem", color: "var(--primary)", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center" }}>
             Manage Family <ChevronRight size={16} />
           </Link>
        </div>
        
        <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px" }}>
          {members.map(m => (
            <button 
              key={m.id}
              onClick={() => setActiveMemberId(m.id)} 
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "transparent", border: "none", padding: 0, cursor: "pointer", transition: "all 0.2s", opacity: activeMemberId === m.id ? 1 : 0.6, minWidth: "70px" }}
            >
              <div style={{ width: "64px", height: "64px", background: activeMemberId === m.id ? "var(--primary)" : "var(--card-bg)", color: activeMemberId === m.id ? "white" : "var(--foreground)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.5rem", border: activeMemberId === m.id ? "3px solid var(--primary)" : "2px solid transparent", boxShadow: activeMemberId === m.id ? "0 8px 16px rgba(37,99,235,0.3)" : "none" }}>
                {m.name.substring(0,1).toUpperCase()}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: activeMemberId === m.id ? 800 : 600, color: "var(--foreground)" }}>{m.name}</div>
              </div>
            </button>
          ))}

          <button 
            onClick={() => setActiveMemberId('all')} 
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "transparent", border: "none", padding: 0, cursor: "pointer", transition: "all 0.2s", opacity: activeMemberId === 'all' ? 1 : 0.6, minWidth: "70px" }}
          >
            <div style={{ width: "64px", height: "64px", background: activeMemberId === 'all' ? "var(--primary)" : "var(--card-bg)", color: activeMemberId === 'all' ? "white" : "var(--foreground)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", border: activeMemberId === 'all' ? "3px solid var(--primary)" : "2px solid transparent", boxShadow: activeMemberId === 'all' ? "0 8px 16px rgba(37,99,235,0.3)" : "none" }}>
              <Users size={24} />
            </div>
            <div style={{ textAlign: "center", fontSize: "0.85rem", fontWeight: activeMemberId === 'all' ? 800 : 600 }}>All Family</div>
          </button>
        </div>
      </div>

      {/* Emergency Info Card */}
      <div>
        <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--danger)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldAlert size={20} /> Emergency Info
        </h3>
        <div className="glass" style={{ padding: "20px", borderRadius: "20px", borderLeft: "4px solid var(--danger)", background: "rgba(239, 68, 68, 0.05)" }}>
           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
             <div>
               <div style={{ fontSize: "0.8rem", fontWeight: 700, opacity: 0.7, textTransform: "uppercase" }}>Blood Group</div>
               <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--danger)" }}>O+</div>
             </div>
             <div>
               <div style={{ fontSize: "0.8rem", fontWeight: 700, opacity: 0.7, textTransform: "uppercase" }}>Allergies</div>
               <div style={{ fontSize: "1rem", fontWeight: 700 }}>Penicillin, Peanuts</div>
             </div>
           </div>
           <hr style={{ border: "none", borderTop: "1px dashed rgba(239, 68, 68, 0.3)", margin: "0 0 16px 0" }} />
           <div>
             <div style={{ fontSize: "0.8rem", fontWeight: 700, opacity: 0.7, textTransform: "uppercase", marginBottom: "4px" }}>ICE Contact (In Case of Emergency)</div>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                   <div style={{ fontWeight: 800 }}>Wife / Anjali</div>
                   <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--primary)" }}>+91 98765 43210</div>
                </div>
                <a href="tel:+919876543210" className="btn btn-primary" style={{ padding: "10px", borderRadius: "50%" }}>
                  <PhoneCall size={18} />
                </a>
             </div>
           </div>
        </div>
      </div>

      {/* App Settings */}
      <div>
        <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "gray", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>App Settings</h3>
        <div className="glass" style={{ padding: "8px 16px", borderRadius: "20px" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontWeight: 600 }}>
              <div style={{ padding: "8px", background: "rgba(37,99,235,0.1)", color: "var(--primary)", borderRadius: "12px" }}><Bell size={20} /></div>
              Notifications
            </div>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }}>
               <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} style={{ opacity: 0, position: "absolute" }} />
               <div style={{ width: "44px", height: "26px", background: notifications ? "var(--primary)" : "var(--border)", borderRadius: "13px", position: "relative", transition: "0.2s" }}>
                 <div style={{ position: "absolute", top: "3px", left: notifications ? "21px" : "3px", width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "0.2s" }} />
               </div>
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontWeight: 600 }}>
              <div style={{ padding: "8px", background: "rgba(107, 114, 128, 0.1)", color: "gray", borderRadius: "12px" }}><Moon size={20} /></div>
              Dark Mode
            </div>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }}>
               <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} style={{ opacity: 0, position: "absolute" }} />
               <div style={{ width: "44px", height: "26px", background: darkMode ? "var(--primary)" : "var(--border)", borderRadius: "13px", position: "relative", transition: "0.2s" }}>
                 <div style={{ position: "absolute", top: "3px", left: darkMode ? "21px" : "3px", width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "0.2s" }} />
               </div>
            </label>
          </div>

        </div>
      </div>

      <button className="glass" style={{ padding: "16px", borderRadius: "16px", border: "1px dashed var(--danger)", color: "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: 700, cursor: "pointer", background: "transparent" }}>
        <LogOut size={20} /> Sign Out
      </button>

    </div>
  );
}
