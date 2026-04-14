"use client";

import { useState } from "react";
import { Users, Plus, ChevronRight } from "lucide-react";
import { Modal } from "@/components/Modal";
import Link from "next/link";

export default function FamilyPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<{id: string, name: string, relation: string, age: number}[]>([]);

  // Form State
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("Child");

  const saveMember = () => {
    if(!newName.trim()) return;
    const newMember = {
      id: newName.toLowerCase().replace(/\s+/g, '-'),
      name: newName,
      relation: newRelation,
      age: 0
    };
    setFamilyMembers(prev => [...prev, newMember]);
    setShowAddModal(false);
    setNewName("");
    setNewRelation("Child");
  };

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Family Profiles</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)} style={{ padding: "8px 16px" }}>
          <Plus size={18} /> Add Member
        </button>
      </div>

      {familyMembers.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
          {familyMembers.map((member) => (
            <Link key={member.id} href={`/family/${member.id}`} className="glass" style={{ padding: "20px", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", color: "inherit", position: "relative", cursor: "pointer" }}>
              <div style={{ position: "absolute", top: "12px", right: "12px", opacity: 0.4 }}><ChevronRight size={18} /></div>
              <div style={{ width: "64px", height: "64px", background: "rgba(37,99,235,0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", marginBottom: "12px" }}>
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800 }}>{member.name}</h3>
              <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "4px" }}>{member.relation} • {member.age} yrs</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="glass" style={{ padding: "40px 24px", borderRadius: "24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", border: "1px dashed var(--border)" }}>
          <div style={{ width: "80px", height: "80px", background: "rgba(37,99,235,0.1)", color: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
            <Users size={40} />
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px" }}>Add Your Family Members</h2>
          <p style={{ opacity: 0.7, marginBottom: "24px", fontWeight: 500, maxWidth: "300px" }}>Track medicines, reports, and vitals for your loved ones in one place.</p>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)} style={{ padding: "12px 24px" }}>
             <Plus size={18} style={{ marginRight: "6px" }} /> Add Member
          </button>
        </div>
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Family Member">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
             <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Name</label>
             <input type="text" className="input" placeholder="e.g. Rahul" value={newName} onChange={e => setNewName(e.target.value)} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
             <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Relationship</label>
             <select className="input" value={newRelation} onChange={e => setNewRelation(e.target.value)}>
                <option>Child</option><option>Spouse</option><option>Sibling</option><option>Parent</option>
             </select>
          </div>
          <button className="btn btn-primary" onClick={saveMember} style={{ marginTop: "16px" }}>Save Profile</button>
        </div>
      </Modal>

    </div>
  );
}
