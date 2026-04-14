"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, User, Users, HeartPulse, CheckCircle2, Pill, Check } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  
  // States to pass forward
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [medicineReminders, setMedicineReminders] = useState(true);

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else router.push("/dashboard");
  };

  const toggleMember = (member: string) => {
    if (selectedMembers.includes(member)) {
      setSelectedMembers(selectedMembers.filter(m => m !== member));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)", display: "flex", flexDirection: "column" }}>
      <header style={{ padding: "24px", display: "flex", justifyContent: "center" }}>
        <Link href="/dashboard" style={{ fontWeight: 800, fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit" }}>
          <HeartPulse size={28} color="var(--primary)" />
          MediPal AI
        </Link>
      </header>

      <main className="container animate-in" style={{ padding: "20px 20px 60px", maxWidth: "500px", margin: "0 auto", flex: 1 }}>
        <p style={{ textAlign: "center", fontSize: "0.85rem", opacity: 0.6, marginBottom: "16px", fontWeight: 600 }}>Step {step} of 5</p>
        <div style={{ display: "flex", gap: "4px", marginBottom: "32px", height: "4px", backgroundColor: "var(--secondary)", borderRadius: "4px", overflow: "hidden" }}>
           {[1,2,3,4,5].map(s => (
             <div key={s} style={{ flex: 1, backgroundColor: s <= step ? "var(--primary)" : "transparent", transition: "0.3s" }}></div>
           ))}
        </div>

        {step === 1 && (
          <div className="animate-in">
            <User size={32} color="var(--primary)" style={{ marginBottom: "16px" }} />
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>Tell us about yourself</h1>
            <p style={{ color: "var(--foreground)", opacity: 0.7, marginBottom: "32px" }}>This creates your primary 'Self' profile.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Name</label>
                <input type="text" className="input" defaultValue="John Doe" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Date of Birth</label>
                <input type="date" className="input" defaultValue="1990-01-01" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Gender</label>
                <select className="input">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>
            
            <p style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "16px", textAlign: "center" }}>
              🔒 Your data is fully encrypted and never shared.
            </p>

            <button className="btn btn-primary" style={{ width: "100%", padding: "14px", marginTop: "32px" }} onClick={handleNext}>
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in">
            <Users size={32} color="var(--primary)" style={{ marginBottom: "16px" }} />
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>Add family members</h1>
            <p style={{ color: "var(--foreground)", opacity: 0.7, marginBottom: "32px" }}>Who do you manage health for?</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {["Mother", "Father", "Spouse", "Child"].map((member) => {
                const isSelected = selectedMembers.includes(member);
                return (
                  <div key={member} onClick={() => toggleMember(member)} className={isSelected ? "glass active" : "glass"} 
                       style={{ 
                         padding: "16px", borderRadius: "16px", textAlign: "center", cursor: "pointer", position: "relative",
                         border: isSelected ? "2px solid var(--primary)" : "2px solid var(--border)",
                         background: isSelected ? "rgba(37, 99, 235, 0.05)" : "var(--card-bg)",
                         transition: "all 0.2s"
                       }}>
                    {isSelected && <div style={{ position: "absolute", top: "8px", right: "8px", color: "var(--primary)" }}><CheckCircle2 size={20} /></div>}
                    <div style={{ width: "40px", height: "40px", background: isSelected ? "var(--primary)" : "rgba(37,99,235,0.1)", color: isSelected ? "white" : "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                       {isSelected ? <Check size={20}/> : '+'}
                    </div>
                    <div style={{ fontWeight: 600 }}>{member}</div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "32px" }}>
              <button className="btn btn-primary" style={{ width: "100%", padding: "14px" }} onClick={handleNext}>
                Continue <ChevronRight size={18} />
              </button>
              <button className="btn btn-secondary" style={{ width: "100%", padding: "14px", border: "none", background: "transparent" }} onClick={handleNext}>
                Skip for now
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in">
            <Pill size={32} color="var(--primary)" style={{ marginBottom: "16px" }} />
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>Medicine Reminders</h1>
            <p style={{ color: "var(--foreground)", opacity: 0.7, marginBottom: "32px" }}>Never miss a dose. Would you like us to automatically notify you when it's time to take medicines?</p>

            <div className="glass" style={{ padding: "20px", borderRadius: "16px", border: "1px solid var(--primary)", background: "rgba(37, 99, 235, 0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ fontWeight: 700 }}>Enable Smart Alerts</div>
                <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
                  <input type="checkbox" checked={medicineReminders} onChange={() => setMedicineReminders(!medicineReminders)} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: medicineReminders ? "var(--primary)" : "var(--border)", borderRadius: "24px", transition: "0.3s" }}>
                    <span style={{ position: "absolute", content: "''", height: "18px", width: "18px", left: medicineReminders ? "22px" : "4px", bottom: "3px", backgroundColor: "white", borderRadius: "50%", transition: "0.3s" }}></span>
                  </span>
                </label>
              </div>
              <ul style={{ fontSize: "0.85rem", opacity: 0.8, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>Get timely push notifications for doses</li>
                <li>Receive alerts when your strips are running low</li>
                <li>Get warned about upcoming expiries</li>
              </ul>
            </div>
            
            <button className="btn btn-primary" style={{ width: "100%", padding: "14px", marginTop: "32px" }} onClick={handleNext}>
              Continue <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in">
            <HeartPulse size={32} color="var(--primary)" style={{ marginBottom: "16px" }} />
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "8px" }}>Preventive care baseline</h1>
            <p style={{ color: "var(--foreground)", opacity: 0.7, marginBottom: "32px" }}>Based on the profiles you added, we've pre-selected common checkups to track.</p>

            <div className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
              
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                {/* Standard checkbox with custom styles to avoid generic teal circle bug via raw styling */}
                <input type="checkbox" defaultChecked id="pc1" style={{ width: "24px", height: "24px", marginTop: "4px", accentColor: "var(--primary)" }} />
                <label htmlFor="pc1" style={{ flex: 1, cursor: "pointer" }}>
                  <div style={{ fontWeight: 600 }}>Yearly Blood Test</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Self{selectedMembers.length > 0 && `, ${selectedMembers.join(", ")}`}</div>
                </label>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked id="pc2" style={{ width: "24px", height: "24px", marginTop: "4px", accentColor: "var(--primary)" }} />
                <label htmlFor="pc2" style={{ flex: 1, cursor: "pointer" }}>
                   <div style={{ fontWeight: 600 }}>Blood Pressure Check</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Every 3 months • Optional</div>
                </label>
              </div>

               <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked id="pc3" style={{ width: "24px", height: "24px", marginTop: "4px", accentColor: "var(--primary)" }} />
                <label htmlFor="pc3" style={{ flex: 1, cursor: "pointer" }}>
                   <div style={{ fontWeight: 600 }}>Eye Checkup</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Yearly • All family</div>
                </label>
              </div>

            </div>
            
            <button className="btn btn-primary" style={{ width: "100%", padding: "14px", marginTop: "32px" }} onClick={handleNext}>
              Schedule Reminders <ChevronRight size={18} />
            </button>
          </div>
        )}

        {step === 5 && (
          <div className="animate-in" style={{ textAlign: "center", paddingTop: "20px" }}>
             <CheckCircle2 size={64} color="var(--success)" style={{ margin: "0 auto 24px" }} />
            <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "16px" }}>You're all set!</h1>
            
            <div className="glass" style={{ padding: "20px", borderRadius: "16px", textAlign: "left", marginBottom: "40px" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "12px" }}>Here's what we setup:</h3>
              <ul style={{ paddingLeft: "20px", fontSize: "0.9rem", opacity: 0.8, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>Your primary profile was created</li>
                {selectedMembers.length > 0 && <li>Family profiles for {selectedMembers.join(", ")}</li>}
                {medicineReminders && <li>Smart Reminders & Restock Alerts activated</li>}
                <li>Baseline preventive care timeline established</li>
              </ul>
            </div>

             <button className="btn btn-primary" style={{ width: "100%", padding: "14px" }} onClick={handleNext}>
              Go to Dashboard <ChevronRight size={18} />
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
