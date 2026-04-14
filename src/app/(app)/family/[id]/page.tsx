"use client";

import { ChevronLeft, FileText, Pill, Droplets } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FamilyMemberProfile() {
  const params = useParams();
  
  // Resolve dynamic URL param cleanly
  const urlId = Array.isArray(params.id) ? params.id[0] : params.id || "Member";
  const memberName = urlId.charAt(0).toUpperCase() + urlId.slice(1);

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      
      <header style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Link href="/family" style={{ padding: "8px", background: "var(--secondary)", borderRadius: "50%" }}>
          <ChevronLeft size={24} />
        </Link>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{memberName}</h1>
      </header>

      <div className="glass" style={{ padding: "20px", borderRadius: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
         <div style={{ width: "64px", height: "64px", background: "var(--primary)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800 }}>
           {memberName.charAt(0)}
         </div>
         <div>
           <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>{memberName}</div>
           <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Primary Profile • Blood Group: O+</div>
         </div>
      </div>

      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "-8px" }}>Health Snapshot</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
        
        <Link href="/medicines" className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "inherit" }}>
           <div style={{ display: "flex", gap: "12px" }}>
             <Pill color="var(--primary)" />
             <div style={{ fontWeight: 600 }}>Active Medicines</div>
           </div>
           <div style={{ fontWeight: 800 }}>0</div>
        </Link>

        <Link href="/health-locker" className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "inherit" }}>
           <div style={{ display: "flex", gap: "12px" }}>
             <FileText color="var(--primary)" />
             <div style={{ fontWeight: 600 }}>Documents in Locker</div>
           </div>
           <div style={{ fontWeight: 800 }}>0</div>
        </Link>

        <Link href="/medicines" className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid var(--danger)", textDecoration: "none", color: "inherit" }}>
           <div style={{ display: "flex", gap: "12px" }}>
             <Droplets color="var(--danger)" />
             <div style={{ fontWeight: 600 }}>Overdue Checks</div>
           </div>
           <div style={{ fontWeight: 800, color: "var(--danger)" }}>0</div>
        </Link>

      </div>
      
      <p style={{ fontSize: "0.8rem", textAlign: "center", opacity: 0.5 }}>Manage directly through the specific dashboard modules.</p>

    </div>
  );
}
