import Link from "next/link";
import { BookOpen, Search, ChevronLeft, ArrowRight } from "lucide-react";

export default function KnowledgeBasePage() {
  return (
    <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
      <div className="container animate-in" style={{ padding: "20px" }}>
        
        <header style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <Link href="/" style={{ padding: "8px", background: "var(--secondary)", borderRadius: "50%" }}>
            <ChevronLeft size={24} />
          </Link>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Health Library</h1>
        </header>

        <div style={{ position: "relative", marginBottom: "32px" }}>
          <Search size={20} style={{ position: "absolute", left: "16px", top: "14px", opacity: 0.5 }} />
          <input type="text" className="input" placeholder="Search conditions, medicines, guides..." style={{ paddingLeft: "48px", borderRadius: "16px", fontSize: "1rem" }} />
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          
          <div className="glass" style={{ padding: "20px", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ background: "rgba(37, 99, 235, 0.1)", color: "var(--primary)", padding: "12px", borderRadius: "12px" }}>
                <BookOpen size={24} />
              </div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Normal Health Ranges</h2>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Blood Pressure</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Normal: 120/80 mmHg</div>
                </div>
                <ArrowRight size={16} opacity={0.5} />
              </li>
              <li style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Blood Sugar (Fasting)</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Normal: 70–100 mg/dL</div>
                </div>
                <ArrowRight size={16} opacity={0.5} />
              </li>
            </ul>
            <button className="btn btn-secondary" style={{ width: "100%", marginTop: "12px" }}>View All Ranges</button>
          </div>

          <div className="glass" style={{ padding: "20px", borderRadius: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--success)", padding: "12px", borderRadius: "12px" }}>
                <BookOpen size={24} />
              </div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Basic Medicine Info</h2>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Paracetamol</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Crocin / Dolo 650</div>
                </div>
                <ArrowRight size={16} opacity={0.5} />
              </li>
              <li style={{ display: "flex", justifyContent: "space-between", paddingBottom: "12px" }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Cetirizine</div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>Zyrtec / Cetzine</div>
                </div>
                <ArrowRight size={16} opacity={0.5} />
              </li>
            </ul>
            <button className="btn btn-secondary" style={{ width: "100%", marginTop: "12px" }}>View All Medicines</button>
          </div>

        </div>
      </div>
    </div>
  );
}
