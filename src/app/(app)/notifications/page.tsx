import { Bell, Pill, Package, Droplets, CheckCircle2 } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Notifications</h1>
        <button className="btn btn-secondary" style={{ padding: "8px 16px", borderRadius: "20px", fontSize: "0.85rem" }}>
          <CheckCircle2 size={16} /> Mark all read
        </button>
      </div>

      <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "4px" }}>
        <button className="btn btn-primary" style={{ borderRadius: "20px" }}>All</button>
        <button className="btn btn-secondary" style={{ borderRadius: "20px" }}>Medicines</button>
        <button className="btn btn-secondary" style={{ borderRadius: "20px" }}>Preventive</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        
        <div className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", gap: "16px", position: "relative" }}>
          <div style={{ width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%", position: "absolute", top: "24px", left: "8px" }}></div>
          <div style={{ padding: "10px", background: "rgba(37, 99, 235, 0.1)", borderRadius: "12px", color: "var(--primary)", height: "fit-content", marginLeft: "12px" }}>
            <Pill size={20} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <div style={{ fontWeight: 600 }}>Medicine Reminder</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>2m ago</div>
            </div>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Time to take Telmisartan 40mg (1 tablet) for Mother.</p>
          </div>
        </div>

        <div className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", gap: "16px" }}>
          <div style={{ padding: "10px", background: "var(--warning-light)", borderRadius: "12px", color: "var(--warning)", height: "fit-content", marginLeft: "12px" }}>
            <Package size={20} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <div style={{ fontWeight: 600 }}>Refill Warning</div>
              <div style={{ fontSize: "0.8rem", opacity: 0.6 }}>Yesterday</div>
            </div>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>Amlodipine for Mother will finish in 3 days. Time to refill.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
