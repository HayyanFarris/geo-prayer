import React from "react";

function Analysis({ places }) {
  // Hitung jumlah per jenis
  const counts = places.reduce((acc, place) => {
    const jenis = place.jenis || "Lainnya";
    acc[jenis] = (acc[jenis] || 0) + 1;
    return acc;
  }, {});

  const totalPlaces = places.length;

  // Gabungkan semua Kristen menjadi satu
  const muslimCount = counts["Muslim"] || 0;
  const kristenCount =
    (counts["Kristen Protestan"] || 0) +
    (counts["Kristen Evangelis"] || 0) +
    (counts["Kristen"] || 0);

  const analysisData = [
    {
      jenis: "Muslim",
      count: muslimCount,
      icon: "🕌",
      color: "#10b981",
      bg: "#d1fae5",
    },
    {
      jenis: "Kristen",
      count: kristenCount,
      icon: "⛪",
      color: "#4f46e5",
      bg: "#e0e7ff",
    },
  ];

  const getPercentage = (count) => ((count / totalPlaces) * 100).toFixed(1);
  const colors = ["#10b981", "#4f46e5"];

  // Cari yang tertinggi
  const highest = analysisData.reduce(
    (max, item) => (item.count > max.count ? item : max),
    analysisData[0],
  );

  // Untuk pie chart
  let cumulativeAngle = 0;
  const pieSegments = analysisData.map((item, index) => {
    const percentage = (item.count / totalPlaces) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += percentage;
    return {
      ...item,
      startAngle,
      percentage,
      color: colors[index % colors.length],
    };
  });

  return (
    <div style={{ padding: "4px" }}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "8px",
          letterSpacing: "-0.3px",
        }}
      >
        📈 Analysis
      </h2>

      <p
        style={{
          fontSize: "13px",
          color: "#64748b",
          marginBottom: "24px",
          borderLeft: "3px solid #6366f1",
          paddingLeft: "12px",
        }}
      >
        Analisis distribusi tempat ibadah
      </p>

      {/* Highest Card */}
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5, #6366f1)",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "24px",
          color: "white",
        }}
      >
        <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "8px" }}>
          🏆 TEMPAT IBADAH TERBANYAK
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            {highest.icon}
          </div>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "700" }}>
              {highest.jenis}
            </div>
            <div style={{ fontSize: "13px", opacity: 0.9 }}>
              {highest.count} lokasi ({getPercentage(highest.count)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "24px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#475569",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Perbandingan Jumlah
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "40px",
            height: "200px",
          }}
        >
          {analysisData.map((item, index) => {
            const maxCount = Math.max(...analysisData.map((d) => d.count));
            const barHeight = (item.count / maxCount) * 150;
            return (
              <div key={item.jenis} style={{ textAlign: "center", flex: 1 }}>
                <div
                  style={{
                    height: `${barHeight}px`,
                    width: "60px",
                    margin: "0 auto",
                    background: colors[index % colors.length],
                    borderRadius: "12px 12px 0 0",
                    transition: "height 0.5s ease",
                    position: "relative",
                    boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-28px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: colors[index % colors.length],
                    }}
                  >
                    {item.count}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#64748b",
                  }}
                >
                  {item.icon} {item.jenis}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pie Chart CSS */}
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "24px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#475569",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Distribusi Per Jenis
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: `conic-gradient(${pieSegments
                .map(
                  (seg) =>
                    `${seg.color} ${seg.startAngle}deg ${seg.startAngle + seg.percentage}deg`,
                )
                .join(", ")})`,
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          {analysisData.map((item, index) => (
            <div
              key={item.jenis}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "4px",
                  backgroundColor: colors[index % colors.length],
                }}
              />
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                {item.jenis} ({getPercentage(item.count)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div
        style={{
          background: "#f8fafc",
          borderRadius: "20px",
          padding: "20px",
          border: "1px solid #e2e8f0",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#475569",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "4px",
              height: "18px",
              background: "#6366f1",
              borderRadius: "4px",
            }}
          ></span>
          Ringkasan Statistik
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Total Lokasi
            </span>
            <span
              style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b" }}
            >
              {totalPlaces} tempat ibadah
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Jenis Tempat Ibadah
            </span>
            <span
              style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b" }}
            >
              2 jenis
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <span style={{ fontSize: "13px", color: "#64748b" }}>Dominasi</span>
            <span
              style={{ fontSize: "15px", fontWeight: "700", color: "#10b981" }}
            >
              {highest.jenis} ({getPercentage(highest.count)}%)
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
            }}
          >
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Rata-rata per jenis
            </span>
            <span
              style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b" }}
            >
              {(totalPlaces / 2).toFixed(1)} lokasi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
