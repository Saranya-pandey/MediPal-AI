"use client";

import { useState } from "react";
import { Search, Filter, MoreVertical, FileText, UploadCloud, ChevronRight, Menu, X, Plus } from "lucide-react";
import { Modal } from "@/components/Modal";
import { EmptyState } from "@/components/EmptyState";
import { useFamily } from "@/lib/FamilyContext";

type DocType = "Eye" | "ENT" | "Hair" | "Dermatology" | "Kidney" | "Heart" | "Liver" | "Injury" | "Pregnancy" | "Other" | "Blood Tests" | "X-ray" | "MRI" | "Ultrasound" | "CT Scan" | "Urine Test" | "ECG" | "Biopsy" | "Medicine Photo";

export default function HealthLockerPage() {
  const { activeMemberId } = useFamily();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile drawer
  const [selectedSub, setSelectedSub] = useState<DocType | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [actionMenuId, setActionMenuId] = useState<number | null>(null);
  const [previewDoc, setPreviewDoc] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Example Documents Data
  const [documents, setDocuments] = useState<any[]>([]);

  const taxonomy = {
    prescriptions: ["Eye", "ENT", "Hair", "Dermatology", "Kidney", "Heart", "Liver", "Injury", "Pregnancy"],
    reports: ["Blood Tests", "X-ray", "MRI", "Ultrasound", "CT Scan", "Urine Test", "ECG", "Biopsy"],
    medicines: ["Medicine Photo"]
  };

  // Filter Logic
  const contextDocs = documents.filter(doc => activeMemberId === 'all' || doc.memberKey === activeMemberId);
  const filteredDocs = contextDocs.filter(doc => {
    const matchType = selectedSub === "All" || doc.type === selectedSub;
    const q = searchQuery.toLowerCase();
    const matchSearch = doc.title.toLowerCase().includes(q) || doc.member.toLowerCase().includes(q) || (doc.summary && doc.summary.toLowerCase().includes(q));
    return matchType && matchSearch;
  });

  const Sidebar = () => (
    <div style={{ padding: "0 16px 24px", display: "flex", flexDirection: "column", gap: "24px", height: "100%", overflowY: "auto" }}>
      <button className="btn btn-primary" onClick={() => setShowUpload(true)} style={{ width: "100%", padding: "12px", display: "flex", gap: "8px", justifyContent: "center" }}>
        <UploadCloud size={18} /> Upload Record
      </button>

      <div>
        <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 800, color: "var(--foreground)", opacity: 0.5, marginBottom: "12px", letterSpacing: "1px" }}>Prescriptions</h4>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
          {taxonomy.prescriptions.map(item => (
            <li 
              key={`p-${item}`} 
              onClick={() => { setSelectedSub(item as DocType); setIsSidebarOpen(false); }}
              style={{
                padding: "8px 12px", borderRadius: "8px", fontSize: "0.9rem", cursor: "pointer", fontWeight: selectedSub === item ? 700 : 500,
                background: selectedSub === item ? "rgba(37,99,235,0.1)" : "transparent",
                color: selectedSub === item ? "var(--primary)" : "var(--foreground)"
              }}
            >
              {item}
            </li>
          ))}
          <li style={{ padding: "8px 12px", fontSize: "0.9rem", color: "var(--primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}><Plus size={16}/> Custom</li>
        </ul>
      </div>

      <div>
        <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 800, color: "var(--foreground)", opacity: 0.5, marginBottom: "12px", letterSpacing: "1px" }}>Reports & Tests</h4>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
          {taxonomy.reports.map(item => (
            <li 
              key={`r-${item}`} 
              onClick={() => { setSelectedSub(item as DocType); setIsSidebarOpen(false); }}
              style={{
                padding: "8px 12px", borderRadius: "8px", fontSize: "0.9rem", cursor: "pointer", fontWeight: selectedSub === item ? 700 : 500,
                background: selectedSub === item ? "rgba(37,99,235,0.1)" : "transparent",
                color: selectedSub === item ? "var(--primary)" : "var(--foreground)"
              }}
            >
              {item}
            </li>
          ))}
          <li style={{ padding: "8px 12px", fontSize: "0.9rem", color: "var(--primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}><Plus size={16}/> Custom</li>
        </ul>
      </div>

      <div>
        <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 800, color: "var(--foreground)", opacity: 0.5, marginBottom: "12px", letterSpacing: "1px" }}>Medicines</h4>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px" }}>
            <li 
              onClick={() => { setSelectedSub("Medicine Photo"); setIsSidebarOpen(false); }}
              style={{
                padding: "8px 12px", borderRadius: "8px", fontSize: "0.9rem", cursor: "pointer", fontWeight: selectedSub === "Medicine Photo" ? 700 : 500,
                background: selectedSub === "Medicine Photo" ? "rgba(37,99,235,0.1)" : "transparent",
                color: selectedSub === "Medicine Photo" ? "var(--primary)" : "var(--foreground)"
              }}
            >
              Uploaded Photos
            </li>
        </ul>
      </div>

    </div>
  );

  return (
    <div className="animate-in" style={{ display: "flex", height: "calc(100vh - 160px)", margin: "-20px" }}> {/* Negative margin to bleed into padding of app layout */}
      
      {/* Desktop Sidebar */}
      <aside style={{ width: "260px", borderRight: "1px solid var(--border)", display: "none" }} className="desktop-sidebar">
        <Sidebar />
      </aside>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) { .desktop-sidebar { display: block !important; } .mobile-menu-btn { display: none !important; } }
      `}} />

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="mobile-menu-btn btn btn-secondary" style={{ padding: "8px" }} onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>{selectedSub === "All" ? "Health Locker" : selectedSub}</h1>
          </div>
        </div>

        <div style={{ position: "relative", marginBottom: "8px" }}>
          <Search size={20} style={{ position: "absolute", left: "16px", top: "14px", opacity: 0.5 }} />
          <input 
            type="text" 
            className="input" 
            placeholder={`Search ${selectedSub === "All" ? "all documents" : selectedSub}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "48px", borderRadius: "16px", background: "white" }} 
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc, idx) => (
              <div key={idx} className="glass" style={{ padding: "16px", borderRadius: "16px", display: "flex", gap: "16px", cursor: "pointer", transition: "all 0.2s" }} onClick={() => setPreviewDoc(doc)}>
                <div style={{ padding: "12px", background: "rgba(37, 99, 235, 0.1)", color: "var(--primary)", borderRadius: "12px", height: "fit-content" }}>
                  <FileText size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "4px" }}>{doc.title}</h3>
                  <div style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ background: "var(--secondary)", padding: "2px 8px", borderRadius: "12px", fontWeight: 600 }}>{doc.member}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", opacity: 0.8, background: "#f8fafc", padding: "8px", borderRadius: "8px", border: "1px solid var(--border)" }}>
                     <span style={{ fontWeight: 600, color: "var(--primary)" }}>AI Note:</span> {doc.summary}
                  </p>
                </div>
                <div style={{ position: "relative" }}>
                  <button 
                    className="btn" 
                    onClick={(e) => { e.stopPropagation(); setActionMenuId(actionMenuId === doc.id ? null : doc.id); }} 
                    style={{ padding: "8px", background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <MoreVertical size={20} opacity={0.5} />
                  </button>
                  
                  {actionMenuId === doc.id && (
                    <div style={{ position: "absolute", top: "100%", right: 0, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "8px", boxShadow: "var(--shadow-md)", zIndex: 10, minWidth: "120px", overflow: "hidden" }}>
                       <button style={{ display: "block", width: "100%", padding: "10px 16px", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", borderBottom: "1px solid var(--border)" }} onClick={(e) => { e.stopPropagation(); setPreviewDoc(doc); setActionMenuId(null); }}>View</button>
                       <button style={{ display: "block", width: "100%", padding: "10px 16px", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", borderBottom: "1px solid var(--border)" }} onClick={(e) => { e.stopPropagation(); setActionMenuId(null); }}>Download</button>
                       <button style={{ display: "block", width: "100%", padding: "10px 16px", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", color: "var(--danger)" }} onClick={(e) => { e.stopPropagation(); setActionMenuId(null); }}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div style={{ marginTop: "32px" }}>
              <EmptyState 
                icon={FileText} 
                title={searchQuery ? "No matching records found" : "No records found"}
                description={searchQuery ? `Try adjusting your search for "${searchQuery}".` : `You haven't uploaded any records for this category yet.`}
                actionText={searchQuery ? undefined : "Upload Document"}
                onAction={searchQuery ? undefined : () => setShowUpload(true)}
              />
            </div>
          )}
        </div>

      </div>

      {/* Mobile Drawer */}
      {isSidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.5)", display: "flex" }}>
          <div className="animate-slide-up" style={{ width: "280px", background: "var(--background)", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", marginBottom: "16px" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.2rem" }}>Categories</h2>
              <button onClick={() => setIsSidebarOpen(false)} style={{ background: "transparent", border: "none" }}><X size={24} /></button>
            </div>
            <Sidebar />
          </div>
          <div style={{ flex: 1 }} onClick={() => setIsSidebarOpen(false)}></div>
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={showUpload} onClose={() => { setShowUpload(false); setSelectedFile(null); }} title="Upload Health Record">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <label style={{ display: "block", border: "2px dashed var(--primary)", borderRadius: "16px", padding: "40px 20px", textAlign: "center", background: "rgba(37,99,235,0.05)", cursor: "pointer" }}>
            <input type="file" style={{ display: "none" }} onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }} />
            <UploadCloud size={32} color={selectedFile ? "var(--success)" : "var(--primary)"} style={{ margin: "0 auto 12px" }} />
            <h4 style={{ fontWeight: 700, marginBottom: "8px" }}>
              {selectedFile ? selectedFile.name : "Tap to select file"}
            </h4>
            <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
              {selectedFile ? "File ready to upload" : "JPG, PNG, PDF up to 10MB"}
            </p>
          </label>

          <button 
            className="btn btn-primary" 
            disabled={!selectedFile}
            onClick={() => { setShowUpload(false); setSelectedFile(null); }}
            style={{ opacity: selectedFile ? 1 : 0.5 }}
          >
            Save to Locker
          </button>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal isOpen={previewDoc !== null} onClose={() => setPreviewDoc(null)} title="Document Detail">
        {previewDoc && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "var(--secondary)", height: "200px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.7 }}>
              [ Document File Preview ]
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{previewDoc.title}</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>{previewDoc.type} • Uploaded {previewDoc.date}</p>
            </div>
            
            <div style={{ background: "rgba(37,99,235,0.05)", padding: "16px", borderRadius: "12px", border: "1px solid var(--primary)" }}>
              <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 800, color: "var(--primary)", marginBottom: "8px" }}>AI Summary</h4>
              <p style={{ fontSize: "0.95rem" }}>{previewDoc.summary}</p>
            </div>

            <button className="btn btn-primary" onClick={() => setPreviewDoc(null)} style={{ marginTop: "8px" }}>Close</button>
          </div>
        )}
      </Modal>

    </div>
  );
}
