import { Plus, Check, Clock, HeartPulse, BrainCircuit } from "lucide-react";

export default function PreventiveCarePage() {
  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Preventive Care</h1>
        <button className="btn btn-primary" style={{ padding: "8px 16px" }}>
          <Plus size={18} /> Add Care Item
        </button>
      </div>

      <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px" }}>
        <button className="btn btn-primary" style={{ borderRadius: "20px" }}>Upcoming</button>
        <button className="btn btn-secondary" style={{ borderRadius: "20px" }}>Completed</button>
      </div>

      {/* AI Recommendation */}
      <div className="glass" style={{ padding: "20px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary)", fontWeight: 700, marginBottom: "12px" }}>
          <BrainCircuit size={20} /> AI Suggested
        </div>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Vitamin D Test</h3>
        <p style={{ fontSize: "0.9rem", opacity: 0.8, marginTop: "4px" }}>Recommended for Mother based on age (62) and low sunlight exposure typically associated with urban lifestyles.</p>
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <button className="btn btn-primary" style={{ flex: 1, padding: "8px" }}>Add to Schedule</button>
          <button className="btn btn-secondary" style={{ flex: 1, padding: "8px" }}>Dismiss</button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Overdue */}
        <div className="glass" style={{ padding: "20px", borderRadius: "16px", borderLeft: "4px solid var(--danger)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Dental Checkup</h3>
              <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>Self • Every 6 Months</p>
            </div>
            <div style={{ padding: "4px 8px", background: "var(--danger-light)", color: "var(--danger)", fontSize: "0.75rem", borderRadius: "4px", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={12} /> 15 Days Overdue
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
            <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>Last done: Mar 2025</div>
            <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem" }}><Check size={16} /> Mark Done</button>
          </div>
        </div>

        {/* Due soon */}
        <div className="glass" style={{ padding: "20px", borderRadius: "16px", borderLeft: "4px solid var(--warning)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
             <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Blood Sugar Fasting</h3>
              <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>Father • Every 3 Months</p>
            </div>
            <div style={{ padding: "4px 8px", background: "var(--warning-light)", color: "#b45309", fontSize: "0.75rem", borderRadius: "4px", fontWeight: 700 }}>
              Due in 5 Days
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
            <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>Last done: Jul 2025</div>
            <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem" }}><Check size={16} /> Mark Done</button>
          </div>
        </div>

      </div>
    </div>
  );
}
