"use client";

import React, { createContext, useContext, useState } from "react";

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  avatar?: string;
  dob?: string;
  gender?: string;
};

type FamilyContextType = {
  members: FamilyMember[];
  activeMemberId: string; // "all" | string
  setActiveMemberId: (id: string) => void;
  addMember: (m: Omit<FamilyMember, "id">) => void;
};

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export function FamilyProvider({ children }: { children: React.ReactNode }) {
  // REQUIREMENT: There should be only ONE profile by default (Self)
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: "self", name: "Self", relation: "Self" }
  ]);
  
  // By default, the active member can just map to 'all' or 'self'
  const [activeMemberId, setActiveMemberId] = useState<string>("all");

  const addMember = (member: Omit<FamilyMember, "id">) => {
    const newId = member.name.toLowerCase().replace(/\s+/g, '-');
    setMembers((prev) => [...prev, { ...member, id: newId }]);
  };

  return (
    <FamilyContext.Provider value={{ members, activeMemberId, setActiveMemberId, addMember }}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamily() {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error("useFamily must be used within a FamilyProvider");
  }
  return context;
}
