import React from "react";

function Navbar({ setActivePage, activePage }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "analysis", label: "Analysis", icon: "📈" },
    { id: "database", label: "Database", icon: "🗄️" },
  ];

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
        color: "white",
        padding: "12px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "14px",
            padding: "6px 10px",
          }}
        >
          <span style={{ fontSize: "24px" }}>🕌</span>
        </div>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: "600" }}>Geo-Prayer</h1>
          <span style={{ fontSize: "10px", opacity: 0.8 }}>
            Pemetaan Tempat Ibadah
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          background: "rgba(255,255,255,0.1)",
          padding: "4px",
          borderRadius: "40px",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "32px",
              border: "none",
              background: activePage === item.id ? "white" : "transparent",
              color: activePage === item.id ? "#4f46e5" : "white",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div
        style={{
          fontSize: "11px",
          opacity: 0.7,
          background: "rgba(255,255,255,0.1)",
          padding: "4px 12px",
          borderRadius: "20px",
        }}
      >
        v1.0
      </div>
    </nav>
  );
}

export default Navbar;
