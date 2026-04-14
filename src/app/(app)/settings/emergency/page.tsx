import { Plus, Phone } from "lucide-react";

export default function EmergencyContactsPage() {
  const defaults = [
    { label: "Ambulance", number: "108" },
    { label: "Police", number: "100" },
    { label: "Chhanv Foundation", number: "8800111177" },
  ];

  const customs = [
    { label: "Dr. Sharma", number: "+91 98765 43210" },
    { label: "City Hospital", number: "022 2345 6789" },
  ];

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Emergency Contacts</h1>
        <button className="btn btn-primary" style={{ padding: "8px 16px" }}>
          <Plus size={18} /> Add Contact
        </button>
      </div>

      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "12px", opacity: 0.8 }}>Your Custom Contacts</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {customs.map((item, i) => (
            <div key={i} className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>{item.number}</div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <a href={`tel:${item.number}`} className="btn btn-secondary" style={{ padding: "8px", borderRadius: "50%" }}>
                  <Phone size={18} color="var(--success)" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "12px", opacity: 0.8 }}>Default National Helplines</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {defaults.map((item, i) => (
            <div key={i} className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", opacity: 0.8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.7 }}>{item.number}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
