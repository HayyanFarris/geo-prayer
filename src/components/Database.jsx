import React, { useState } from "react";

function Database({ places }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const getIcon = (jenis) => (jenis === "Muslim" ? "🕌" : "⛪");

  const filteredPlaces = places.filter(
    (place) =>
      place.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (place.alamat &&
        place.alamat.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    if (sortBy === column) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column) =>
    sortBy !== column ? "↕️" : sortOrder === "asc" ? "↑" : "↓";

  return (
    <div style={{ padding: "4px" }}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#1e293b",
          marginBottom: "8px",
        }}
      >
        🗄️ Database
      </h2>
      <p
        style={{
          fontSize: "13px",
          color: "#64748b",
          marginBottom: "20px",
          borderLeft: "3px solid #6366f1",
          paddingLeft: "12px",
        }}
      >
        Dataset tempat ibadah yang digunakan pada peta
      </p>

      <input
        type="text"
        placeholder="🔍 Cari nama atau alamat..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "30px",
          fontSize: "13px",
          marginBottom: "16px",
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "12px",
          fontSize: "12px",
          color: "#94a3b8",
        }}
      >
        <span>
          📋 {sortedPlaces.length} dari {places.length} data
        </span>
        <span>Klik header untuk sorting</span>
      </div>

      <div
        style={{
          maxHeight: "420px",
          overflowY: "auto",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          backgroundColor: "white",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#f8fafc",
              zIndex: 10,
            }}
          >
            <tr>
              <th
                onClick={() => handleSort("id")}
                style={{
                  padding: "12px 8px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "600",
                  color: "#475569",
                }}
              >
                ID {getSortIcon("id")}
              </th>
              <th
                onClick={() => handleSort("nama")}
                style={{
                  padding: "12px 8px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "600",
                  color: "#475569",
                }}
              >
                Nama {getSortIcon("nama")}
              </th>
              <th
                onClick={() => handleSort("jenis")}
                style={{
                  padding: "12px 8px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "600",
                  color: "#475569",
                }}
              >
                Jenis {getSortIcon("jenis")}
              </th>
              <th
                onClick={() => handleSort("alamat")}
                style={{
                  padding: "12px 8px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "600",
                  color: "#475569",
                }}
              >
                Alamat {getSortIcon("alamat")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPlaces.map((place, idx) => (
              <tr
                key={place.id}
                style={{
                  borderBottom:
                    idx !== sortedPlaces.length - 1
                      ? "1px solid #f1f5f9"
                      : "none",
                  backgroundColor: idx % 2 === 0 ? "white" : "#fafafa",
                }}
              >
                <td style={{ padding: "10px 8px", color: "#64748b" }}>
                  {place.id}
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    fontWeight: "500",
                    color: "#1e293b",
                  }}
                >
                  {place.nama}
                </td>
                <td style={{ padding: "10px 8px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background:
                        place.jenis === "Muslim" ? "#d1fae5" : "#e0e7ff",
                      padding: "4px 12px",
                      borderRadius: "30px",
                      fontSize: "11px",
                      color: place.jenis === "Muslim" ? "#059669" : "#4f46e5",
                      fontWeight: "500",
                    }}
                  >
                    {getIcon(place.jenis)} {place.jenis}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px 8px",
                    color: "#64748b",
                    maxWidth: "150px",
                  }}
                >
                  {place.alamat || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        style={{
          marginTop: "16px",
          fontSize: "11px",
          color: "#94a3b8",
          textAlign: "center",
        }}
      >
        Sumber data: GIS OpenStreetMap Banjarbaru Raya
      </div>
    </div>
  );
}

export default Database;
