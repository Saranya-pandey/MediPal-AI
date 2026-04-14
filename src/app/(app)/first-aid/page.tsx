import { Plus, Package, AlertCircle } from "lucide-react";

export default function FirstAidLockerPage() {
  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>First Aid Locker</h1>
        <button className="btn btn-primary" style={{ padding: "8px 16px" }}>
          <Plus size={18} /> Add Item
        </button>
      </div>

      <div>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 600, opacity: 0.8, marginBottom: "12px" }}>Quick Add</h3>
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px" }}>
          {["Paracetamol", "Bandage", "Dettol", "ORS", "Thermometer"].map(item => (
            <button key={item} className="btn btn-secondary" style={{ borderRadius: "20px", padding: "6px 12px", fontSize: "0.85rem" }}>
              + {item}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        {/* Inventory Item (Low Stock) */}
        <div className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "16px", borderRight: "4px solid var(--danger)" }}>
          <div style={{ padding: "12px", background: "rgba(37, 99, 235, 0.1)", borderRadius: "12px", color: "var(--primary)" }}>
            <Package size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Band-Aids</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
              <span style={{ padding: "2px 8px", background: "var(--danger-light)", color: "var(--danger)", fontSize: "0.75rem", borderRadius: "4px", fontWeight: 600 }}>Low Stock</span>
              <span style={{ fontSize: "0.8srem", opacity: 0.6 }}>Exp. Dec 2026</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "4px", background: "var(--background)", borderRadius: "20px", border: "1px solid var(--border)" }}>
            <button style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--secondary)", border: "none" }}>-</button>
            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>2 pcs</span>
            <button style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--primary)", color: "white", border: "none" }}>+</button>
          </div>
        </div>

        {/* Inventory Item (Good Stock) */}
        <div className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "16px", borderRight: "4px solid var(--success)" }}>
          <div style={{ padding: "12px", background: "rgba(37, 99, 235, 0.1)", borderRadius: "12px", color: "var(--primary)" }}>
            <Package size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>Antiseptic Liquid (Dettol)</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
              <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>Exp. Aug 2027</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "4px", background: "var(--background)", borderRadius: "20px", border: "1px solid var(--border)" }}>
            <button style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--secondary)", border: "none" }}>-</button>
            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>250 ml</span>
            <button style={{ width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "var(--primary)", color: "white", border: "none" }}>+</button>
          </div>
        </div>

      </div>
    </div>
  );
}
