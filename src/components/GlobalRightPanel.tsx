"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Plus, Phone, HeartPulse, Settings, FileText, ChevronDown, ChevronUp, Bell, ShieldAlert, X, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { FirstAidGuideModal } from "./FirstAidGuideModal";
import { useFamily } from "@/lib/FamilyContext";

export function GlobalRightPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const router = useRouter();
  const { members, activeMemberId, setActiveMemberId, addMember } = useFamily();
  
  const [openFirstAid, setOpenFirstAid] = useState(false);
  const [openNumbers, setOpenNumbers] = useState(false);
  
  // Add Member Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("Child");
  
  // First aid guide expansion state
  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  if (!isOpen) return null;

  const firstAidItems = [
    "CPR", "Choking", "Severe Bleeding", "Burns", "Fracture", "Stroke", 
    "Heart Attack", "Fainting", "Sprain", "Allergic Reaction", 
    "Poisoning", "Emergency Childbirth", "Acid Attack / Chemical Burn"
  ];

  const emergencyNumbers = [
    { label: "Ambulance", number: "108" },
    { label: "Police", number: "100" },
    { label: "Fire", number: "101" },
    { label: "National Emergency", number: "112" },
    { label: "Poison Control", number: "1800-116-117" },
    { label: "Women Helpline", number: "1091" },
    { label: "Child Helpline", number: "1098" },
    { label: "Chhanv Foundation", number: "+91-9999084268" }, // Example or dummy
    { label: "iCALL Mental Health", number: "9152987821" }
  ];

  return (
    <>
      <div 
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9998 }} 
        onClick={onClose} 
      />

      <div className="animate-slide-left" style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: "85%", maxWidth: "340px",
        background: "var(--background)", zIndex: 9999,
        display: "flex", flexDirection: "column", borderLeft: "1px solid var(--border)",
        overflowY: "auto", padding: "24px"
      }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800 }}>Profile Menu</h2>
          <button onClick={onClose} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "50%", padding: "8px", cursor: "pointer" }}>
            <X size={20} />
          </button>
        </div>

        {/* SECTION: FAMILY PROFILE SWITCHER (NETFLIX STYLE) */}
        <div style={{ marginBottom: "32px", marginTop: "16px" }}>
          <div style={{ fontSize: "1.2rem", fontWeight: 800, textAlign: "center", marginBottom: "20px" }}>Who's watching?</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
             
             {/* Dynamic Members from Context */}
             {members.map(m => (
               <button 
                 key={m.id}
                 onClick={() => { setActiveMemberId(m.id); onClose(); }} 
                 style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "transparent", border: "none", padding: 0, cursor: "pointer", transition: "all 0.2s", opacity: activeMemberId === m.id ? 1 : 0.6 }}
               >
                  <div style={{ width: "100%", aspectRatio: "1/1", background: activeMemberId === m.id ? "var(--primary)" : "var(--card-bg)", color: activeMemberId === m.id ? "white" : "var(--foreground)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "2rem", border: activeMemberId === m.id ? "3px solid var(--primary)" : "2px solid transparent", boxShadow: activeMemberId === m.id ? "0 8px 16px rgba(37,99,235,0.3)" : "none" }}>
                    {m.name.substring(0,1).toUpperCase()}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: activeMemberId === m.id ? 800 : 600, color: "var(--foreground)" }}>{m.name}</div>
                  </div>
               </button>
             ))}

             {/* All Family Option */}
             <button 
               onClick={() => { setActiveMemberId('all'); onClose(); }} 
               style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "transparent", border: "none", padding: 0, cursor: "pointer", transition: "all 0.2s", opacity: activeMemberId === 'all' ? 1 : 0.6 }}
             >
                <div style={{ width: "100%", aspectRatio: "1/1", background: activeMemberId === 'all' ? "var(--primary)" : "var(--card-bg)", color: activeMemberId === 'all' ? "white" : "var(--foreground)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", border: activeMemberId === 'all' ? "3px solid var(--primary)" : "2px solid transparent", boxShadow: activeMemberId === 'all' ? "0 8px 16px rgba(37,99,235,0.3)" : "none" }}>
                  <Users size={32} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: activeMemberId === 'all' ? 800 : 600, color: "var(--foreground)" }}>All Family</div>
                </div>
             </button>

             <button onClick={() => setShowAddModal(true)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "transparent", border: "none", padding: 0, cursor: "pointer", opacity: 0.8 }}>
                <div style={{ width: "100%", aspectRatio: "1/1", border: "3px dashed var(--border)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--foreground)", background: "transparent" }}>
                  <Plus size={32} />
                </div>
                <div style={{ textAlign: "center", fontSize: "0.9rem", fontWeight: 700 }}>Add Member</div>
             </button>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "24px" }} />

        {/* SECTION: EMERGENCY HELP */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 800, color: "var(--danger)", letterSpacing: "1px", marginBottom: "12px" }}>Emergency Help</div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* First Aid Accordion */}
            <div style={{ background: "rgba(239, 68, 68, 0.05)", borderRadius: "16px", overflow: "hidden" }}>
              <button 
                onClick={() => setOpenFirstAid(!openFirstAid)} 
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", padding: "16px", cursor: "pointer", fontSize: "1.05rem", fontWeight: 700, color: "var(--danger)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <HeartPulse size={20} /> First Aid
                </div>
                {openFirstAid ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openFirstAid && (
                <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {firstAidItems.map((item, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveGuide(item)}
                      style={{ textAlign: "left", padding: "12px", background: "white", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer" }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency Numbers Accordion */}
            <div style={{ background: "rgba(239, 68, 68, 0.05)", borderRadius: "16px", overflow: "hidden" }}>
              <button 
                onClick={() => setOpenNumbers(!openNumbers)} 
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", padding: "16px", cursor: "pointer", fontSize: "1.05rem", fontWeight: 700, color: "var(--danger)" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Phone size={20} /> Emergency Numbers
                </div>
                {openNumbers ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openNumbers && (
                <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {emergencyNumbers.map((item, idx) => (
                    <a 
                      key={idx} 
                      href={`tel:${item.number}`}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "white", border: "1px solid var(--border)", borderRadius: "12px", cursor: "pointer", textDecoration: "none", color: "inherit" }}
                    >
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.label}</div>
                      <div style={{ fontWeight: 800, color: "var(--primary)" }}>{item.number}</div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)", marginBottom: "24px" }} />

        {/* SECTION: SETTINGS */}
        <div>
          <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 800, color: "gray", letterSpacing: "1px", marginBottom: "12px" }}>Settings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
             <button onClick={() => { onClose(); router.push("/settings/reminders"); }} style={{ display: "flex", alignItems: "center", gap: "12px", background: "transparent", border: "none", cursor: "pointer", fontSize: "1rem", fontWeight: 600 }}>
                <div style={{ padding: "8px", background: "var(--card-bg)", borderRadius: "12px" }}><Bell size={20} /></div>
                Reminder Settings
             </button>
             <button onClick={() => { onClose(); router.push("/settings/emergency"); }} style={{ display: "flex", alignItems: "center", gap: "12px", background: "transparent", border: "none", cursor: "pointer", fontSize: "1rem", fontWeight: 600 }}>
                <div style={{ padding: "8px", background: "var(--card-bg)", borderRadius: "12px" }}><ShieldAlert size={20} /></div>
                Emergency Contacts
             </button>
             <button onClick={() => { onClose(); router.push("/settings/account"); }} style={{ display: "flex", alignItems: "center", gap: "12px", background: "transparent", border: "none", cursor: "pointer", fontSize: "1rem", fontWeight: 600 }}>
                <div style={{ padding: "8px", background: "var(--card-bg)", borderRadius: "12px" }}><Settings size={20} /></div>
                Account
             </button>
          </div>
        </div>

      </div>

      {/* Embedded Add Member Overlay */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div className="animate-in glass" style={{ background: "var(--background)", width: "100%", maxWidth: "400px", borderRadius: "24px", padding: "24px" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "20px" }}>New Family Member</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                 <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Name</label>
                 <input type="text" className="input" placeholder="e.g. Shanthi" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                 <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Relationship</label>
                 <select className="input" value={newRelation} onChange={e => setNewRelation(e.target.value)}>
                    <option>Child</option><option>Spouse</option><option>Sibling</option><option>Parent</option><option>Grandparent</option><option>Other</option>
                 </select>
              </div>
              
              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: "12px" }}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 1, padding: "12px" }} onClick={() => {
                  if(!newName.trim()) return;
                  addMember({ name: newName, relation: newRelation });
                  setShowAddModal(false);
                  setNewName("");
                }}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FirstAidGuideModal guide={activeGuide} onClose={() => setActiveGuide(null)} />
    </>
  );
}
