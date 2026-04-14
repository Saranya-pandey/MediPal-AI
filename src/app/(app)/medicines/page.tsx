"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Bell, Package, Clock, Activity, Edit2, Trash2, FileText, Settings, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/Modal";
import { EmptyState } from "@/components/EmptyState";
import { useRouter } from "next/navigation";
import { useFamily } from "@/lib/FamilyContext";

export default function MedicinesPage() {
  const router = useRouter();
  const { activeMemberId, members } = useFamily();
  
  const [activeTab, setActiveTab] = useState("Active");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReminderSettings, setShowReminderSettings] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [showReminderPrompt, setShowReminderPrompt] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<number | null>(null);
  
  // Quick Filter State from Summary Cards
  const [summaryFilter, setSummaryFilter] = useState<string | null>(null);

  // Draft state for Add/Edit
  const [draftMed, setDraftMed] = useState({
    name: "", dose: "", frequency: "Morning", daysRemaining: 30
  });

  // Preference State
  const [preferences, setPreferences] = useState({
    medicine: true,
    refill: true,
    expiry: true,
    preventive: false,
    push: true,
    email: false
  });

  const togglePref = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Mock Data
  const [medicines, setMedicines] = useState<any[]>([
    { 
      id: 1, name: "Telmisartan", dose: "40mg", memberKey: "mother", memberName: "Mother", status: "Active", 
      frequency: "Morning, Night", daysRemaining: 5, refillStatus: "urgent", 
      expiryStatus: "ok", remindersOn: true 
    },
    { 
      id: 2, name: "Amoxicillin", dose: "500mg", memberKey: "self", memberName: "Self", status: "Past", 
      frequency: "Morning, Afternoon, Night", daysRemaining: 0, refillStatus: "empty", 
      expiryStatus: "expired", remindersOn: false 
    },
    { 
      id: 3, name: "Atorvastatin", dose: "10mg", memberKey: "father", memberName: "Father", status: "Active", 
      frequency: "Night", daysRemaining: 45, refillStatus: "ok", 
      expiryStatus: "warning", remindersOn: true 
    }
  ]);

  // Derived Summary Stats (Pre-Filter by Context Context)
  const contextMeds = medicines.filter(m => activeMemberId === 'all' || m.memberKey === activeMemberId);

  const refillsNeeded = contextMeds.filter(m => m.refillStatus === "urgent" || m.daysRemaining <= 7).length;
  const expiringSoon = contextMeds.filter(m => m.expiryStatus === "warning" || m.expiryStatus === "expired").length;
  const activeCount = contextMeds.filter(m => m.status === "Active").length;

  // Final Filter Logic (Tabs + Summary Cards + Context)
  const filteredMeds = contextMeds.filter(m => {
    // 1. Tab Filter
    const matchTab = activeTab === "All" || m.status === activeTab;
    
    // 2. Summary Filter
    let matchSummary = true;
    if (summaryFilter === "refill") matchSummary = m.refillStatus === "urgent" || m.daysRemaining <= 7;
    if (summaryFilter === "expiring") matchSummary = m.expiryStatus === "warning" || m.expiryStatus === "expired";
    if (summaryFilter === "active") matchSummary = m.status === "Active";

    return matchTab && matchSummary;
  });

  const toggleReminder = (id: number) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, remindersOn: !m.remindersOn } : m));
  };
  const deleteMed = (id: number) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
  };

  const saveDraftMed = () => {
    if (!draftMed.name.trim()) return;
    
    if (editingId) {
       setMedicines(prev => prev.map(m => m.id === editingId ? { ...m, ...draftMed } : m));
       setShowEditModal(false);
    } else {
       const activeMemObj = members.find(m => m.id === activeMemberId);
       const memKey = activeMemberId === 'all' ? 'self' : activeMemberId;
       const memName = activeMemberId === 'all' ? 'Self' : (activeMemObj?.name || 'Self');
       
       const newId = Date.now();
       setMedicines(prev => [...prev, {
         id: newId,
         name: draftMed.name,
         dose: draftMed.dose,
         memberKey: memKey,
         memberName: memName,
         status: "Active",
         frequency: draftMed.frequency,
         daysRemaining: Number(draftMed.daysRemaining),
         refillStatus: Number(draftMed.daysRemaining) > 7 ? 'ok' : 'urgent',
         expiryStatus: 'ok',
         remindersOn: false
       }]);
       setShowAddModal(false);
       setRecentlyAddedId(newId);
       setShowReminderPrompt(true);
    }
    setDraftMed({ name: "", dose: "", frequency: "Morning", daysRemaining: 30 });
    setEditingId(null);
  };

  const openEdit = (med: any) => {
    setDraftMed({ name: med.name, dose: med.dose, frequency: med.frequency, daysRemaining: med.daysRemaining });
    setEditingId(med.id);
    setShowEditModal(true);
  };

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "32px" }}>
      
      {/* 1. TOP SECTION */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "16px" }}>Medicines</h1>
          
          <div style={{ display: "flex", gap: "8px", background: "var(--card-bg)", padding: "4px", borderRadius: "20px", width: "fit-content", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            {["Active", "Past", "All"].map(tab => (
              <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setSummaryFilter(null); }}
                className={activeTab === tab ? "btn btn-primary" : "btn"}
                style={{ 
                  borderRadius: "16px", padding: "8px 16px", fontSize: "0.85rem", fontWeight: 700,
                  background: activeTab === tab ? "var(--primary)" : "transparent",
                  color: activeTab === tab ? "white" : "inherit", border: "none"
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{ padding: "10px 16px", borderRadius: "20px", display: "flex", gap: "6px" }}>
            <Plus size={18} /> Add Medicine
          </button>
          <button onClick={() => setShowReminderSettings(true)} className="glass" style={{ padding: "8px 12px", borderRadius: "16px", border: "1px solid var(--border)", display: "flex", gap: "6px", alignItems: "center", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", background: "white" }}>
            <Bell size={16} color="var(--primary)" /> Settings
          </button>
        </div>
      </div>

      {/* 2. SUMMARY CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
        <div 
          onClick={() => setSummaryFilter(summaryFilter === "refill" ? null : "refill")} 
          className="glass" 
          style={{ padding: "16px", borderRadius: "16px", cursor: "pointer", border: summaryFilter === "refill" ? "2px solid var(--warning)" : "1px solid transparent", background: "rgba(249,115,22,0.05)" }}
        >
          <div style={{ color: "#f97316", marginBottom: "8px" }}><Package size={20} /></div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{refillsNeeded}</div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, opacity: 0.8 }}>Refills Needed</div>
        </div>

        <div 
          onClick={() => setSummaryFilter(summaryFilter === "expiring" ? null : "expiring")} 
          className="glass" 
          style={{ padding: "16px", borderRadius: "16px", cursor: "pointer", border: summaryFilter === "expiring" ? "2px solid var(--danger)" : "1px solid transparent", background: "rgba(239,68,68,0.05)" }}
        >
          <div style={{ color: "var(--danger)", marginBottom: "8px" }}><Clock size={20} /></div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{expiringSoon}</div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, opacity: 0.8 }}>Expiring Soon</div>
        </div>

        <div 
          onClick={() => setSummaryFilter(summaryFilter === "active" ? null : "active")} 
          className="glass" 
          style={{ padding: "16px", borderRadius: "16px", cursor: "pointer", border: summaryFilter === "active" ? "2px solid var(--success)" : "1px solid transparent", background: "rgba(16,185,129,0.05)" }}
        >
          <div style={{ color: "var(--success)", marginBottom: "8px" }}><Activity size={20} /></div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>{activeCount}</div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, opacity: 0.8 }}>Active Meds</div>
        </div>
      </div>

      {/* 3. MEDICINE LIST */}
      <div>
        {filteredMeds.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredMeds.map(med => (
              <div key={med.id} className="glass" style={{ padding: "20px", borderRadius: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "4px", color: "var(--foreground)" }}>{med.name} <span style={{ opacity: 0.6, fontSize: "0.9rem", fontWeight: 600 }}>{med.dose}</span></h3>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", background: "rgba(37,99,235,0.1)", padding: "2px 8px", borderRadius: "12px" }}>{med.memberName}</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, opacity: 0.7 }}>• {med.frequency}</span>
                    </div>
                  </div>
                  
                  {/* Reminder Toggle */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Bell size={16} opacity={med.remindersOn ? 1 : 0.4} color={med.remindersOn ? "var(--primary)" : "currentColor"} />
                    <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }}>
                       <input type="checkbox" checked={med.remindersOn} onChange={() => toggleReminder(med.id)} style={{ opacity: 0, position: "absolute" }} />
                       <div style={{ width: "40px", height: "24px", background: med.remindersOn ? "var(--primary)" : "var(--border)", borderRadius: "12px", position: "relative", transition: "0.2s" }}>
                         <div style={{ position: "absolute", top: "2px", left: med.remindersOn ? "18px" : "2px", width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "0.2s" }} />
                       </div>
                    </label>
                  </div>
                </div>

                <hr style={{ border: "none", borderTop: "1px dashed var(--border)", margin: 0 }} />

                {/* Status Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, opacity: 0.5, marginBottom: "4px" }}>Remaining</div>
                    <div style={{ fontSize: "1rem", fontWeight: 700 }}>{med.daysRemaining} days</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, opacity: 0.5, marginBottom: "4px" }}>Refill</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, 
                      color: med.refillStatus === "urgent" ? "var(--danger)" : med.refillStatus === "ok" ? "var(--success)" : "gray"
                    }}>
                      {med.refillStatus === "urgent" ? "Urgent" : med.refillStatus === "ok" ? "OK" : "Empty"}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, opacity: 0.5, marginBottom: "4px" }}>Expiry</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, 
                      color: med.expiryStatus === "expired" ? "var(--danger)" : med.expiryStatus === "warning" ? "#f97316" : "var(--success)"
                    }}>
                      {med.expiryStatus === "expired" ? "Expired" : med.expiryStatus === "warning" ? "Exp. Soon" : "OK"}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "4px" }}>
                  <button onClick={() => openEdit(med)} className="btn" style={{ padding: "8px 16px", borderRadius: "12px", background: "rgba(37,99,235,0.05)", border: "none", color: "var(--primary)", display: "flex", gap: "6px", fontSize: "0.85rem" }}>
                     <Edit2 size={14} /> Edit
                  </button>
                  <button onClick={() => deleteMed(med.id)} className="btn" style={{ padding: "8px 16px", borderRadius: "12px", background: "rgba(239,68,68,0.05)", border: "none", color: "var(--danger)", display: "flex", gap: "6px", fontSize: "0.85rem" }}>
                     <Trash2 size={14} /> Remove
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="glass" style={{ padding: "32px 20px", borderRadius: "24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", border: "1px dashed var(--border)", marginTop: "24px" }}>
             <Package size={48} opacity={0.2} style={{ marginBottom: "16px" }} />
             <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "8px" }}>No medicines added yet.</h3>
             <p style={{ opacity: 0.7, marginBottom: "24px", fontWeight: 500 }}>Start tracking your family's prescriptions safely in one place.</p>
             <div style={{ display: "flex", gap: "12px" }}>
               <button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{ padding: "12px 20px" }}>
                 <Plus size={18} style={{ marginRight: "6px" }}/> Add Medicine
               </button>
               <button onClick={() => router.push("/health-locker")} className="btn btn-secondary" style={{ padding: "12px 20px" }}>
                 <FileText size={18} style={{ marginRight: "6px" }}/> Scan Prescription
               </button>
             </div>
          </div>
        )}
      </div>

      {/* 4. REMINDER SETTINGS MODAL */}
      <Modal isOpen={showReminderSettings} onClose={() => setShowReminderSettings(false)} title="Reminder Settings">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div>
            <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.5px", color: "gray", marginBottom: "16px" }}>App Reminders</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Medicine Reminders", key: "medicine", on: preferences.medicine },
                { label: "Refill Reminders", key: "refill", on: preferences.refill },
                { label: "Expiry Reminders", key: "expiry", on: preferences.expiry },
                { label: "Preventive Care", key: "preventive", on: preferences.preventive },
              ].map((setting) => (
                <div key={setting.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{setting.label}</span>
                   <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative", width: "44px", height: "26px" }}>
                       <input type="checkbox" checked={setting.on} onChange={() => togglePref(setting.key as any)} style={{ opacity: 0, position: "absolute" }} />
                       <div style={{ width: "44px", height: "26px", background: setting.on ? "var(--success)" : "var(--border)", borderRadius: "13px", position: "absolute", inset: 0, transition: "0.2s" }} />
                       <div style={{ position: "absolute", top: "3px", left: setting.on ? "21px" : "3px", width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "0.2s", pointerEvents: "none" }} />
                    </label>
                </div>
              ))}
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

          <div>
            <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.5px", color: "gray", marginBottom: "16px" }}>Notification Channels</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "Push Notifications", key: "push", on: preferences.push },
                { label: "Email Alerts", key: "email", on: preferences.email },
              ].map((setting) => (
                <div key={setting.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{setting.label}</span>
                   <label style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative", width: "44px", height: "26px" }}>
                       <input type="checkbox" checked={setting.on} onChange={() => togglePref(setting.key as any)} style={{ opacity: 0, position: "absolute" }} />
                       <div style={{ width: "44px", height: "26px", background: setting.on ? "var(--primary)" : "var(--border)", borderRadius: "13px", position: "absolute", inset: 0, transition: "0.2s" }} />
                       <div style={{ position: "absolute", top: "3px", left: setting.on ? "21px" : "3px", width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "0.2s", pointerEvents: "none" }} />
                    </label>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => setShowReminderSettings(false)} style={{ marginTop: "8px", padding: "16px", borderRadius: "16px", fontWeight: 700 }}>
            Save Preferences
          </button>
        </div>
      </Modal>

      {/* Interactive Add / Edit Modal */}
      <Modal isOpen={showAddModal || showEditModal} onClose={() => { setShowAddModal(false); setShowEditModal(false); setEditingId(null); setDraftMed({ name: "", dose: "", frequency: "Morning", daysRemaining: 30 }); }} title={showEditModal ? "Edit Medicine" : "Add Medicine"}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Medicine Name</label>
            <input type="text" className="input" placeholder="e.g. Paracetamol" value={draftMed.name} onChange={e => setDraftMed(p => ({ ...p, name: e.target.value }))} style={{ marginTop: "6px" }} />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
             <div style={{ flex: 1 }}>
               <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Dose</label>
               <input type="text" className="input" placeholder="e.g. 500mg" value={draftMed.dose} onChange={e => setDraftMed(p => ({ ...p, dose: e.target.value }))} style={{ marginTop: "6px" }} />
             </div>
             <div style={{ flex: 1 }}>
               <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Days Left</label>
               <input type="number" className="input" value={draftMed.daysRemaining} onChange={e => setDraftMed(p => ({ ...p, daysRemaining: Number(e.target.value) }))} style={{ marginTop: "6px" }} />
             </div>
          </div>
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Frequency</label>
            <select className="input" value={draftMed.frequency} onChange={e => setDraftMed(p => ({ ...p, frequency: e.target.value }))} style={{ marginTop: "6px" }}>
               <option>Morning</option>
               <option>Night</option>
               <option>Morning, Night</option>
               <option>Morning, Afternoon, Night</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={saveDraftMed} style={{ marginTop: "8px", padding: "14px", borderRadius: "16px" }}>
            {showEditModal ? "Save Changes" : "Save Medicine"}
          </button>
        </div>
      </Modal>

      {/* Reminder Prompt Modal */}
      <Modal isOpen={showReminderPrompt} onClose={() => setShowReminderPrompt(false)} title="Set Reminder?">
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <Bell size={48} color="var(--primary)" style={{ marginBottom: "16px", opacity: 0.8 }} />
          <h4 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "8px" }}>Never miss a dose</h4>
          <p style={{ opacity: 0.7, marginBottom: "24px", fontWeight: 600 }}>We can alert you when it's time to take this medicine.</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn btn-secondary" onClick={() => setShowReminderPrompt(false)} style={{ flex: 1, padding: "12px" }}>Skip</button>
            <button className="btn btn-primary" onClick={() => {
               if(recentlyAddedId) toggleReminder(recentlyAddedId);
               setShowReminderPrompt(false);
            }} style={{ flex: 1, padding: "12px" }}>Yes, set it</button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
