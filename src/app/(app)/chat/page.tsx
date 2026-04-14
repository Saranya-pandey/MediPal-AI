"use client";

import { useState } from "react";
import { Send, BrainCircuit, FileText } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      content: "Hello! I'm MediPal AI, your family's health assistant. How can I help you today?",
    }
  ]);
  const [input, setInput] = useState("");

  const suggestedQuestions = [
    "Show my latest blood test report",
    "What medicines is Mother currently taking?",
    "When does my medicine refill run out?",
    "Is my blood sugar in the normal range?"
  ];

  const handleSend = (text?: string) => {
    const msgText = text || input;
    if (!msgText.trim()) return;
    
    const newMsg = { id: Date.now(), role: "user", content: msgText };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "ai",
        content: "Based on the records in your Health Locker, here is what I found. (This is a mock AI response since the backend API keys are not supplied)."
      }]);
    }, 1000);
  };

  return (
    <div className="animate-in" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 160px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
          <BrainCircuit color="var(--primary)" /> Ask AI
        </h1>
        <select className="input" style={{ width: "auto", padding: "6px 12px", borderRadius: "20px", fontWeight: 600 }}>
          <option>All Family</option>
          <option>Self</option>
          <option>Mother</option>
        </select>
      </div>

      {messages.length === 1 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "auto" }}>
          {suggestedQuestions.map((q, i) => (
            <button key={i} className="glass" style={{ padding: "8px 12px", fontSize: "0.85rem", borderRadius: "16px", border: "1px solid var(--border)", cursor: "pointer", textAlign: "left" }} onClick={() => handleSend(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", padding: "16px 0" }}>
        {messages.map((m) => (
          <div key={m.id} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div className="glass" style={{ 
              maxWidth: "85%", 
              padding: "16px", 
              borderRadius: m.role === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
              background: m.role === "user" ? "var(--primary)" : "var(--card-bg)",
              color: m.role === "user" ? "white" : "var(--foreground)",
              border: m.role === "user" ? "none" : "1px solid var(--border)"
            }}>
              {m.role === "ai" && <div style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "4px", color: "var(--primary)" }}>MediPal AI</div>}
              <div style={{ fontSize: "0.95rem", lineHeight: 1.5 }}>
                {m.content}
              </div>
              
              {/* Example Source Attribution */}
              {m.role === "ai" && m.id > 1 && (
                <div style={{ marginTop: "12px", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
                  <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                    <FileText size={14} /> View Report
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ position: "sticky", bottom: "0", background: "var(--background)", paddingTop: "16px" }}>
        <p style={{ fontSize: "0.75rem", textAlign: "center", opacity: 0.6, marginBottom: "8px" }}>
          This is not medical advice. Consult your doctor for any medical decisions.
        </p>
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <input 
            type="text" 
            className="input" 
            placeholder="Ask anything about your health records..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ borderRadius: "24px", paddingRight: "56px", width: "100%" }}
          />
          {input.trim() && (
            <button 
              onClick={() => handleSend()} 
              className="btn btn-primary" 
              style={{ 
                position: "absolute", right: "6px",
                borderRadius: "50%", padding: "10px", width: "40px", height: "40px", 
                border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
              <Send size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
