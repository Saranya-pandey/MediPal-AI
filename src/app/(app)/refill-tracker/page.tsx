import { Plus, RefreshCcw } from "lucide-react";

export default function RefillTrackerPage() {
  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Refill Tracker</h1>
        <button className="btn btn-primary" style={{ padding: "8px 16px" }}>
          <Plus size={18} /> Add Refill
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        
        {/* Urgent Refill */}
        <div className="glass" style={{ padding: "20px", borderRadius: "16px", border: "1px solid var(--danger)", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Amlodipine 5mg</h3>
              <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>Mother</p>
            </div>
            <div style={{ color: "var(--danger)", fontWeight: 700, fontSize: "0.9rem" }}>Finishes in 2 Days</div>
          </div>
          
          <div style={{ height: "8px", background: "var(--secondary)", borderRadius: "4px", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ height: "100%", width: "15%", background: "var(--danger)" }}></div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>3 tablets remaining</div>
            <button className="btn btn-primary" style={{ padding: "8px 16px", background: "var(--danger)", boxShadow: "none" }}>
              <RefreshCcw size={16} /> Mark Refilled
            </button>
          </div>
        </div>

        {/* Safe Refill */}
        <div className="glass" style={{ padding: "20px", borderRadius: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Metformin 500mg</h3>
              <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>Father</p>
            </div>
            <div style={{ color: "var(--success)", fontWeight: 600, fontSize: "0.9rem" }}>14 Days Left</div>
          </div>
          
          <div style={{ height: "8px", background: "var(--secondary)", borderRadius: "4px", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ height: "100%", width: "65%", background: "var(--success)" }}></div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>28 tablets remaining</div>
            <button className="btn btn-secondary" style={{ padding: "8px 16px" }}>
              <RefreshCcw size={16} /> Mark Refilled
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
