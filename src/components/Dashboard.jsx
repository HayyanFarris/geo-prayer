import React from "react";

function Dashboard({ places }) {
  // Hitung jumlah per jenis
  const counts = places.reduce((acc, place) => {
    const jenis = place.jenis || "Lainnya";
    acc[jenis] = (acc[jenis] || 0) + 1;
    return acc;
  }, {});

  const totalPlaces = places.length;
  const muslimCount = counts["Muslim"] || 0;
  const kristenCount =
    (counts["Kristen Protestan"] || 0) +
    (counts["Kristen Evangelis"] || 0) +
    (counts["Kristen"] || 0);

  return (
    <div style={{ padding: "4px" }}>
      {/* Header */}
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "600",
          color: "#1e293b",
          marginBottom: "8px",
          letterSpacing: "-0.3px",
        }}
      >
        📊 Dashboard
      </h2>

      <p
        style={{
          fontSize: "13px",
          color: "#94a3b8",
          marginBottom: "24px",
          borderLeft: "3px solid #6366f1",
          paddingLeft: "12px",
        }}
      >
        Ringkasan data tempat ibadah di Banjarbaru Raya
      </p>

      {/* Stat Cards - 2 card sejajar */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        {/* Card Muslim */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(145deg, #ffffff, #f8fafc)",
            borderRadius: "24px",
            padding: "24px 16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              background: "#d1fae5",
              borderRadius: "26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto",
            }}
          >
            <span style={{ fontSize: "26px" }}>🕌</span>
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "500",
              color: "#059669",
              letterSpacing: "-1px",
            }}
          >
            {muslimCount}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#64748b",
              marginTop: "6px",
            }}
          >
            Masjid / Musholla
          </div>
        </div>

        {/* Card Gereja */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(145deg, #ffffff, #f8fafc)",
            borderRadius: "24px",
            padding: "24px 16px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            border: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              background: "#e0e7ff",
              borderRadius: "26px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto",
            }}
          >
            <span style={{ fontSize: "26px" }}>⛪</span>
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "500",
              color: "#4f46e5",
              letterSpacing: "-1px",
            }}
          >
            {kristenCount}
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#64748b",
              marginTop: "6px",
            }}
          >
            Gereja
          </div>
        </div>
      </div>

      {/* Total Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #f8fafc, #ffffff)",
          borderRadius: "24px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "24px",
          border: "1px solid #f1f5f9",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "#94a3b8",
            letterSpacing: "1px",
          }}
        >
          TOTAL TEMPAT IBADAH
        </div>
        <div
          style={{
            fontSize: "44px",
            fontWeight: "500",
            color: "#1e293b",
            marginTop: "6px",
            letterSpacing: "-1px",
          }}
        >
          {totalPlaces}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#94a3b8",
            marginTop: "6px",
          }}
        >
          Tersebar di Banjarbaru, Martapura, Gambut
        </div>
      </div>

      {/* Detail per Jenis - Tanpa duplikasi */}
      <div>
        <h3
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#64748b",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "3px",
              height: "14px",
              background: "#6366f1",
              borderRadius: "2px",
            }}
          ></span>
          Detail per Jenis
        </h3>

        {/* Muslim */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 0",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#d1fae5",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "16px" }}>🕌</span>
            </div>
            <span
              style={{ fontSize: "13px", fontWeight: "500", color: "#334155" }}
            >
              Muslim
            </span>
          </div>
          <div
            style={{
              background: "#f8fafc",
              padding: "2px 12px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#059669",
            }}
          >
            {muslimCount}
          </div>
        </div>

        {/* Kristen */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 0",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                background: "#e0e7ff",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "16px" }}>⛪</span>
            </div>
            <span
              style={{ fontSize: "13px", fontWeight: "500", color: "#334155" }}
            >
              Kristen
            </span>
          </div>
          <div
            style={{
              background: "#f8fafc",
              padding: "2px 12px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#4f46e5",
            }}
          >
            {kristenCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
