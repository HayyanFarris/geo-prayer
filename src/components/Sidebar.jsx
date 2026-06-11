import React, { useState } from "react";

function Sidebar({
  onSelectLocation,
  onSelectFilter,
  selectedFilter,
  places,
  isOpen,
  onToggle,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const jenisIbadah = ["all", ...new Set(places.map((p) => p.jenis))];

  const filteredPlaces = places.filter((place) => {
    const matchFilter =
      selectedFilter === "all" || place.jenis === selectedFilter;
    const matchSearch = place.nama
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  const getIcon = (jenis) => {
    if (jenis === "Muslim") return "🕌";
    return "⛪";
  };

  return (
    <>
      <button
        onClick={onToggle}
        style={{
          position: "absolute",
          left: isOpen ? "320px" : "0",
          top: "80px",
          width: "28px",
          height: "48px",
          background: "white",
          border: "none",
          borderRadius: "0 16px 16px 0",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#475569",
          boxShadow: "2px 0 12px rgba(0, 0, 0, 0.06)",
          transition: "left 0.3s ease",
          zIndex: 1001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isOpen ? "‹" : "›"}
      </button>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "320px",
          background: "white",
          boxShadow: "2px 0 20px rgba(0, 0, 0, 0.06)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          zIndex: 1000,
          borderRadius: "0 20px 20px 0",
        }}
      >
        <div
          style={{
            padding: "20px 20px 16px 20px",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "28px" }}>📍</span>
            <h2
              style={{ fontSize: "18px", fontWeight: "600", color: "#1e293b" }}
            >
              Tempat Ibadah
            </h2>
          </div>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>
            {places.length} Lokasi terdaftar
          </p>
        </div>

        <div
          style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#94a3b8",
              marginBottom: "10px",
            }}
          >
            📍 FILTER JENIS IBADAH
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {jenisIbadah.map((jenis) => (
              <button
                key={jenis}
                onClick={() => onSelectFilter(jenis)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "30px",
                  fontSize: "12px",
                  fontWeight: "500",
                  border:
                    selectedFilter === jenis ? "none" : "1px solid #e2e8f0",
                  background:
                    selectedFilter === jenis
                      ? "linear-gradient(135deg, #4f46e5, #6366f1)"
                      : "white",
                  color: selectedFilter === jenis ? "white" : "#64748b",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {jenis === "all" ? "🏛️ Semua" : `${getIcon(jenis)} ${jenis}`}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{ padding: "12px 20px", borderBottom: "1px solid #f1f5f9" }}
        >
          <input
            type="text"
            placeholder="🔍 Cari tempat ibadah..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 16px",
              border: "1px solid #e2e8f0",
              borderRadius: "30px",
              fontSize: "13px",
              outline: "none",
              backgroundColor: "#f8fafc",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#6366f1";
              e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#94a3b8",
              marginBottom: "12px",
            }}
          >
            🏛️ {filteredPlaces.length} tempat ibadah
          </p>

          {filteredPlaces.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
                background: "#f8fafc",
                borderRadius: "20px",
              }}
            >
              <span style={{ fontSize: "48px" }}>🕌</span>
              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  marginTop: "10px",
                }}
              >
                Tidak ada tempat ibadah
              </p>
            </div>
          ) : (
            filteredPlaces.map((place, idx) => (
              <div
                key={place.id}
                onClick={() => onSelectLocation(place)}
                style={{
                  background: "#f8fafc",
                  borderRadius: "16px",
                  padding: "12px",
                  marginBottom: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  border: "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "14px",
                      background:
                        place.jenis === "Muslim" ? "#d1fae5" : "#e0e7ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                    }}
                  >
                    {getIcon(place.jenis)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#1e293b",
                        marginBottom: "4px",
                      }}
                    >
                      {place.nama}
                    </h3>
                    <span
                      style={{
                        fontSize: "10px",
                        background:
                          place.jenis === "Muslim" ? "#d1fae5" : "#e0e7ff",
                        padding: "3px 12px",
                        borderRadius: "20px",
                        color: place.jenis === "Muslim" ? "#059669" : "#4f46e5",
                        fontWeight: "500",
                      }}
                    >
                      {place.jenis}
                    </span>
                  </div>
                  <span style={{ fontSize: "14px", color: "#cbd5e1" }}>→</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
