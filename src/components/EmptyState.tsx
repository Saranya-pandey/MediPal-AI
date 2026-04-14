export function EmptyState({ icon: Icon, title, description, actionText, onAction }: any) {
  return (
    <div style={{ 
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
      padding: "48px 24px", textAlign: "center", background: "var(--card-bg)", 
      border: "1px dashed var(--border)", borderRadius: "16px" 
    }}>
      <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", marginBottom: "16px" }}>
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "var(--foreground)", opacity: 0.7, fontSize: "0.95rem", marginBottom: "24px", maxWidth: "300px" }}>
        {description}
      </p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn btn-primary" style={{ padding: "10px 20px" }}>
          {actionText}
        </button>
      )}
    </div>
  );
}
