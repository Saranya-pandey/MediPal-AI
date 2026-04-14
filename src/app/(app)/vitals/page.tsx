import { Plus, Activity, Droplets, Thermometer, Weight, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function VitalsLogPage() {
  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Vitals</h1>
        <button className="btn btn-primary" style={{ padding: "8px 16px" }}>
          <Plus size={18} /> Log Vital
        </button>
      </div>

      <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px" }}>
        <select className="input" style={{ width: "auto", borderRadius: "20px", fontWeight: 600 }}>
          <option>Self</option>
          <option>Mother</option>
          <option>Father</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
        
        {/* Blood Pressure Card */}
        <div className="glass" style={{ padding: "16px", borderRadius: "16px", borderTop: "4px solid var(--warning)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.8, marginBottom: "8px" }}>
            <Activity size={16} /> <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Blood Pressure</span>
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            135/85 <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--warning)", opacity: 0.8 }}>mmHg</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", fontSize: "0.75rem", opacity: 0.7 }}>
            <span>Today, 8:00 AM</span>
            <span style={{ display: "flex", color: "var(--warning)" }}><ArrowUpRight size={14} /></span>
          </div>
        </div>

        {/* Blood Sugar Card */}
        <div className="glass" style={{ padding: "16px", borderRadius: "16px", borderTop: "4px solid var(--success)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.8, marginBottom: "8px" }}>
            <Droplets size={16} /> <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Sugar (Fasting)</span>
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            95 <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--success)", opacity: 0.8 }}>mg/dL</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", fontSize: "0.75rem", opacity: 0.7 }}>
            <span>Yesterday</span>
            <span style={{ display: "flex", color: "var(--success)" }}><ArrowDownRight size={14} /></span>
          </div>
        </div>

        {/* Temperature Card */}
        <div className="glass" style={{ padding: "16px", borderRadius: "16px", borderTop: "4px solid var(--danger)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.8, marginBottom: "8px" }}>
            <Thermometer size={16} /> <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Temperature</span>
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
            101.2 <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--danger)", opacity: 0.8 }}>°F</span>
          </div>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", fontSize: "0.75rem", opacity: 0.7 }}>
            <span>2 days ago</span>
            <span style={{ display: "flex", color: "var(--danger)" }}><ArrowUpRight size={14} /></span>
          </div>
        </div>

      </div>

      <div style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Blood Pressure Trend</h3>
        <div className="glass" style={{ height: "200px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7 }}>
          [Trend Line Chart showing past 30 days]
        </div>
      </div>
    </div>
  );
}
