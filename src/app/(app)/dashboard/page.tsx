"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, BrainCircuit, UploadCloud, FileText, Activity, Pill, AlertCircle, Clock, CheckCircle2, ChevronRight, Package, Droplets } from "lucide-react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";
import { EmptyState } from "@/components/EmptyState";

export default function DashboardPage() {
  const router = useRouter();

  // Modal states
  const [showVitalsModal, setShowVitalsModal] = useState(false);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [vitalsSaved, setVitalsSaved] = useState(false);

  // Vitals State for single sheet
  const [vList, setVList] = useState({
    bp: "", bsFasting: "", bsPost: "", weight: "", height: "", pulse: "", spo2: "", temp: ""
  });

  const bmiCalc = () => {
    if (vList.weight && vList.height) {
      const hMeters = Number(vList.height) / 100;
      const calc = Number(vList.weight) / (hMeters * hMeters);
      return calc.toFixed(1);
    }
    return null;
  };

  const bmi = bmiCalc();
  let bmiClass = { label: "Enter Data", color: "var(--border)" };
  if (bmi) {
    const val = Number(bmi);
    if (val < 18.5) bmiClass = { label: "Underweight", color: "var(--warning)" };
    else if (val < 25) bmiClass = { label: "Normal", color: "var(--success)" };
    else if (val < 30) bmiClass = { label: "Overweight", color: "var(--warning)" };
    else bmiClass = { label: "Obese", color: "var(--danger)" };
  }

  // Mock Data (Empty for demonstration of Empty States, or toggled)
  // Set these to see the 'populated' vs 'empty' states
  const [alerts, setAlerts] = useState<any[]>([]);

  const todayItems: any[] = [];
  const [upcomingItems, setUpcomingItems] = useState<any[]>([]);

  const suggestionChips = [
    "Show my latest report",
    "Add a medicine",
    "When is my next checkup?",
    "Log my BP",
    "What to do in emergency?"
  ];

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "24px" }}>
      
      {/* 1. AI Search Bar (Top) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ position: "relative" }}>
          <BrainCircuit size={24} color="var(--primary)" style={{ position: "absolute", left: "20px", top: "18px" }} />
           <input 
             type="text" 
             className="input" 
             placeholder="Ask MediPal anything..." 
             onKeyDown={(e) => {
                if(e.key === 'Enter') router.push(`/chat?q=${encodeURIComponent(e.currentTarget.value)}`);
             }}
             style={{ width: "100%", padding: "18px 20px 18px 56px", borderRadius: "32px", fontSize: "1rem", boxShadow: "var(--shadow-md)", border: "2px solid rgba(37,99,235,0.2)", background: "white" }} 
           />
        </div>
        
        {/* Suggestion Chips */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", msOverflowStyle: "none", scrollbarWidth: "none" }}>
          {suggestionChips.map((chip, idx) => (
             <button 
               key={idx} 
               onClick={() => router.push(`/chat?q=${encodeURIComponent(chip)}`)}
               className="glass" 
               style={{ padding: "8px 16px", borderRadius: "20px", fontSize: "0.85rem", whiteSpace: "nowrap", border: "1px solid var(--border)", background: "white", cursor: "pointer" }}
             >
               {chip}
             </button>
          ))}
        </div>
      </div>

      {/* 2. Alerts Section (High Priority) */}
      <div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Health Alerts</h3>
        {alerts.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {alerts.map((alert, idx) => {
              const Icon = alert.icon;
              return (
                <div key={idx} className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", gap: "16px", borderLeft: `4px solid ${alert.color}`, cursor: "pointer" }}>
                  <div style={{ padding: "10px", background: `${alert.color}15`, color: alert.color, borderRadius: "12px", height: "fit-content" }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: alert.color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "2px" }}>{alert.label}</div>
                    <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>{alert.title}</div>
                  </div>
                  <ChevronRight size={20} opacity={0.4} style={{ alignSelf: "center" }} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass" style={{ padding: "20px", borderRadius: "16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "rgba(16, 185, 129, 0.05)", border: "1px dashed var(--success)" }}>
            <CheckCircle2 size={32} color="var(--success)" />
            <div style={{ fontWeight: 600, color: "var(--success)" }}>Everything is on track. No urgent alerts.</div>
          </div>
        )}
      </div>

      {/* 3. Quick Actions (Most Used Actions) - 2x2 Grid */}
      <div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "16px" }}>Quick Actions</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          
          <button onClick={() => setShowUploadModal(true)} className="glass" style={{ padding: "16px", borderRadius: "20px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start", cursor: "pointer", position: "relative" }}>
            <div style={{ padding: "10px", background: "var(--primary)", color: "white", borderRadius: "12px" }}>
              <UploadCloud size={20} />
            </div>
            <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Upload Report</span>
            <ChevronRight size={18} opacity={0.3} style={{ position: "absolute", bottom: "16px", right: "16px" }} />
          </button>

          <button onClick={() => router.push("/health-locker")} className="glass" style={{ padding: "16px", borderRadius: "20px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start", cursor: "pointer", position: "relative" }}>
            <div style={{ padding: "10px", background: "var(--success)", color: "white", borderRadius: "12px" }}>
              <FileText size={20} />
            </div>
            <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Scan Record</span>
            <ChevronRight size={18} opacity={0.3} style={{ position: "absolute", bottom: "16px", right: "16px" }} />
          </button>

          <button onClick={() => setShowVitalsModal(true)} className="glass" style={{ padding: "16px", borderRadius: "20px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start", cursor: "pointer", position: "relative" }}>
            <div style={{ padding: "10px", background: "var(--warning)", color: "white", borderRadius: "12px" }}>
              <Activity size={20} />
            </div>
            <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Log Vitals</span>
            <ChevronRight size={18} opacity={0.3} style={{ position: "absolute", bottom: "16px", right: "16px" }} />
          </button>

           <button onClick={() => setShowMedicineModal(true)} className="glass" style={{ padding: "16px", borderRadius: "20px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start", cursor: "pointer", position: "relative" }}>
            <div style={{ padding: "10px", background: "#8b5cf6", color: "white", borderRadius: "12px" }}>
              <Pill size={20} />
            </div>
            <span style={{ fontWeight: 800, fontSize: "0.95rem" }}>Add Medicine</span>
            <ChevronRight size={18} opacity={0.3} style={{ position: "absolute", bottom: "16px", right: "16px" }} />
          </button>

        </div>
      </div>

      {/* 4. Today Section */}
      <div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Today</h3>
        {todayItems.length > 0 ? (
           <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
             {/* Map today's items here if they existed */}
           </div>
        ) : (
           <div className="glass" style={{ padding: "32px 20px", borderRadius: "20px", textAlign: "center", border: "1px dashed var(--border)" }}>
             <h4 style={{ fontWeight: 800, marginBottom: "8px" }}>You're all caught up!</h4>
             <p style={{ opacity: 0.7, fontWeight: 500 }}>No medicines or tasks scheduled for today.</p>
           </div>
        )}
      </div>

      <div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Upcoming (30 Days)</h3>
        {upcomingItems.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {upcomingItems.map((item, idx) => (
               <div key={idx} className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                   <div style={{ padding: "8px", background: `${item.color}15`, color: item.color, borderRadius: "12px" }}>
                     <item.icon size={18} />
                   </div>
                   <div style={{ fontWeight: 600 }}>{item.title}</div>
                 </div>
                 <div style={{ fontSize: "0.85rem", opacity: 0.7, fontWeight: 600 }}>{item.date}</div>
               </div>
            ))}
          </div>
        ) : (
          <div className="glass" style={{ padding: "20px", borderRadius: "16px", textAlign: "center", border: "1px dashed var(--border)" }}>
            <p style={{ opacity: 0.7, fontWeight: 600 }}>No upcoming events scheduled.</p>
          </div>
        )}
      </div>

      {/* 6. Health Score Progress Checklist */}
      <div className="glass" style={{ padding: "24px", borderRadius: "24px", border: "1px solid var(--border)", marginTop: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "4px" }}>Build Your Health Score</h2>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, fontWeight: 500 }}>Complete these to get started</p>
          </div>
          <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--primary)", background: "rgba(37,99,235,0.1)", padding: "4px 8px", borderRadius: "12px" }}>0/3 completed</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button onClick={() => setShowMedicineModal(true)} style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--card-bg)", padding: "16px", borderRadius: "16px", border: "1px solid var(--border)", cursor: "pointer", textAlign: "left" }}>
             <CheckCircle2 color="var(--border)" size={20} />
             <span style={{ fontWeight: 600, flex: 1, color: "var(--foreground)" }}>Add 1 Medicine</span>
          </button>
          <button onClick={() => setShowVitalsModal(true)} style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--card-bg)", padding: "16px", borderRadius: "16px", border: "1px solid var(--border)", cursor: "pointer", textAlign: "left" }}>
             <CheckCircle2 color="var(--border)" size={20} />
             <span style={{ fontWeight: 600, flex: 1, color: "var(--foreground)" }}>Log 1 Vital</span>
          </button>
          <button onClick={() => setShowUploadModal(true)} style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--card-bg)", padding: "16px", borderRadius: "16px", border: "1px solid var(--border)", cursor: "pointer", textAlign: "left" }}>
             <CheckCircle2 color="var(--border)" size={20} />
             <span style={{ fontWeight: 600, flex: 1, color: "var(--foreground)" }}>Upload 1 Report</span>
          </button>
        </div>
      </div>

      {/* Quick Action Modals */}
      <Modal isOpen={showVitalsModal} onClose={() => setShowVitalsModal(false)} title="Log Vitals (Single Sheet)">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxHeight: "70vh", overflowY: "auto", paddingRight: "8px" }}>
          
          {/* Automatically Calculating BMI Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", background: "rgba(37,99,235,0.05)", padding: "16px", borderRadius: "16px", border: "1px dashed var(--primary)" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "var(--primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={18} /> Body Mass Index (BMI)
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.7 }}>Weight (kg)</label>
                <input type="number" className="input" placeholder="e.g. 70" value={vList.weight} onChange={e => setVList(p => ({ ...p, weight: e.target.value }))} style={{ marginTop: "4px" }} />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.7 }}>Height (cm)</label>
                <input type="number" className="input" placeholder="e.g. 175" value={vList.height} onChange={e => setVList(p => ({ ...p, height: e.target.value }))} style={{ marginTop: "4px" }} />
              </div>
            </div>
            {bmi && (
              <div className="animate-in glass" style={{ marginTop: "8px", padding: "12px 16px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `6px solid ${bmiClass.color}` }}>
                <div>
                   <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 800, opacity: 0.6 }}>Result</div>
                   <div style={{ fontSize: "1.1rem", fontWeight: 800, color: bmiClass.color }}>{bmiClass.label}</div>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: 900 }}>{bmi}</div>
              </div>
            )}
          </div>

          {/* Other Vitals */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.7 }}>Blood Pressure</label>
              <input type="text" className="input" placeholder="120/80" value={vList.bp} onChange={e => setVList(p => ({ ...p, bp: e.target.value }))} style={{ marginTop: "4px" }} />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.7 }}>Blood Sugar (Fasting)</label>
              <input type="number" className="input" placeholder="e.g. 95" value={vList.bsFasting} onChange={e => setVList(p => ({ ...p, bsFasting: e.target.value }))} style={{ marginTop: "4px" }} />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.7 }}>Oxygen (SpO2 %)</label>
              <input type="number" className="input" placeholder="e.g. 98" value={vList.spo2} onChange={e => setVList(p => ({ ...p, spo2: e.target.value }))} style={{ marginTop: "4px" }} />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.7 }}>Temperature (°F)</label>
              <input type="number" className="input" placeholder="e.g. 98.6" value={vList.temp} onChange={e => setVList(p => ({ ...p, temp: e.target.value }))} style={{ marginTop: "4px" }} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 700, opacity: 0.7 }}>Heart Rate (Pulse)</label>
              <input type="number" className="input" placeholder="e.g. 72" value={vList.pulse} onChange={e => setVList(p => ({ ...p, pulse: e.target.value }))} style={{ marginTop: "4px" }} />
            </div>
          </div>

          {!vitalsSaved ? (
            <button className="btn btn-primary" onClick={() => setVitalsSaved(true)} style={{ padding: "16px", borderRadius: "16px", fontSize: "1.05rem" }}>
               Save All Vitals
            </button>
          ) : (
            <div className="animate-in glass" style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid var(--success)", padding: "20px", borderRadius: "16px", textAlign: "center" }}>
               <CheckCircle2 size={32} color="var(--success)" style={{ margin: "0 auto 8px" }} />
               <h4 style={{ fontWeight: 800, color: "var(--success)" }}>Saved successfully</h4>
               <p style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "16px", fontWeight: 600 }}>Trend line established.</p>
               {/* Extremely simple sparkline mock for trend */}
               <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "4px", height: "40px", marginTop: "8px" }}>
                 <div style={{ width: "8px", height: "15px", background: "var(--success)", borderRadius: "4px" }} />
                 <div style={{ width: "8px", height: "25px", background: "var(--success)", borderRadius: "4px" }} />
                 <div style={{ width: "8px", height: "20px", background: "var(--success)", borderRadius: "4px" }} />
                 <div style={{ width: "8px", height: "30px", background: "var(--success)", borderRadius: "4px" }} />
                 <div style={{ width: "8px", height: "35px", background: "var(--primary)", borderRadius: "4px" }} />
               </div>
               <button className="btn btn-secondary" onClick={() => { setShowVitalsModal(false); setVitalsSaved(false); }} style={{ marginTop: "16px", width: "100%" }}>Close</button>
            </div>
          )}
        </div>
      </Modal>

      <Modal isOpen={showMedicineModal} onClose={() => setShowMedicineModal(false)} title="Add Medicine">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>Medicine Name</label>
            <input type="text" className="input" placeholder="e.g. Paracetamol 500mg" />
          </div>
          <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>For full tracking capabilities, add medicines within the dedicated Medicines tab.</p>
           <button className="btn btn-primary" onClick={() => { setShowMedicineModal(false); router.push("/medicines"); }} style={{ marginTop: "16px" }}>Go to Medicines</button>
        </div>
      </Modal>

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Report">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <div style={{ width: "100%", padding: "40px 20px", border: "2px dashed var(--primary)", borderRadius: "20px", background: "rgba(37,99,235,0.05)", display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", transition: "all 0.2s" }} className="hover-scale">
            <UploadCloud size={40} color="var(--primary)" style={{ marginBottom: "16px" }} />
            <h4 style={{ fontWeight: 800, fontSize: "1.1rem" }}>Choose a file</h4>
            <p style={{ fontSize: "0.85rem", opacity: 0.6, marginTop: "8px", fontWeight: 600 }}>PDF, JPG, PNG supported.</p>
          </div>
          <button className="btn btn-secondary" onClick={() => setShowUploadModal(false)} style={{ width: "100%" }}>Cancel</button>
        </div>
      </Modal>

    </div>
  );
}
