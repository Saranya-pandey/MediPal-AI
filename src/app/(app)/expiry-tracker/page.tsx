import { Plus, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ExpiryTrackerPage() {
  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Expiry Tracker</h1>
        <button className="btn btn-primary" style={{ padding: "8px 16px" }}>
          <Plus size={18} /> Add Item
        </button>
      </div>

      <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px" }}>
        <button className="btn btn-primary" style={{ borderRadius: "20px" }}>All</button>
        <button className="btn btn-secondary" style={{ borderRadius: "20px" }}>Medicines</button>
        <button className="btn btn-secondary" style={{ borderRadius: "20px" }}>First Aid</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        {/* Expiring Soon */}
        <div className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "12px", background: "var(--warning-light)", color: "#b45309", borderRadius: "12px" }}>
            <AlertTriangle size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Dolo 650</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>First Aid • Exp. Nov 2025</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "var(--warning)", fontWeight: 700, fontSize: "0.9rem" }}>28 Days</div>
            <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>Replace soon</div>
          </div>
        </div>

        {/* Safe */}
        <div className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "12px", background: "var(--success-light)", color: "var(--success)", borderRadius: "12px" }}>
            <CheckCircle2 size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Cough Syrup</h3>
            <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>Self • Exp. Mar 2027</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "var(--success)", fontWeight: 700, fontSize: "0.9rem" }}>1+ Year</div>
            <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>Safe</div>
          </div>
        </div>

      </div>
    </div>
  );
}
