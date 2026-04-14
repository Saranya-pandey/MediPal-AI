import { LogOut, Trash2 } from "lucide-react";

export default function AccountSettingsPage() {
  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Account Settings</h1>

      <div className="glass" style={{ borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
         <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.5rem", fontWeight: 700 }}>
            S
         </div>
         <div style={{ flex: 1 }}>
           <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>John Doe</h3>
           <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>john@example.com</p>
         </div>
         <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "0.85rem" }}>Edit</button>
      </div>

      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "12px", opacity: 0.8 }}>Security & Legal</h2>
        <div className="glass" style={{ borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid var(--border)", fontWeight: 600, cursor: "pointer" }}>Change Password</div>
          <div style={{ padding: "16px", borderBottom: "1px solid var(--border)", fontWeight: 600, cursor: "pointer" }}>Privacy Policy</div>
          <div style={{ padding: "16px", fontWeight: 600, cursor: "pointer" }}>Terms of Service</div>
        </div>
      </section>

      <section style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <button className="btn btn-secondary" style={{ padding: "16px", display: "flex", justifyContent: "center", gap: "8px", width: "100%", fontWeight: 700 }}>
          <LogOut size={20} /> Logout
        </button>
        
        <button className="glass" style={{ padding: "16px", display: "flex", justifyContent: "center", gap: "8px", width: "100%", color: "var(--danger)", border: "1px solid var(--danger)", fontWeight: 700, cursor: "pointer", borderRadius: "8px" }}>
          <Trash2 size={20} /> Delete Account
        </button>
        <p style={{ fontSize: "0.8rem", textAlign: "center", opacity: 0.6 }}>Deleting your account is permanent. All your data will be securely erased and cannot be recovered.</p>
      </section>

    </div>
  );
}
