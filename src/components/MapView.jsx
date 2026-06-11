import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import Papa from "papaparse";
import LoadingSpinner from "./LoadingSpinner";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const getMarkerIcon = (jenis) => {
  const color = jenis === "Muslim" ? "#10b981" : "#6366f1";
  return L.divIcon({
    html: `<div style="position:relative;width:36px;height:36px;cursor:pointer;">
      <div style="position:absolute;top:0;left:0;width:36px;height:36px;background:${color};border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.15);opacity:0.2;"></div>
      <div style="position:absolute;top:3px;left:3px;width:30px;height:30px;background:${color};border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.12);border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:14px;">${jenis === "Muslim" ? "🕌" : "⛪"}</div>
    </div>`,
    className: "custom-marker",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

function FlyToLocation({ location }) {
  const map = useMap();
  const isFlying = useRef(false);
  useEffect(() => {
    if (
      location &&
      location.latitude &&
      location.longitude &&
      !isFlying.current
    ) {
      isFlying.current = true;
      map.setView([location.latitude, location.longitude], 15, {
        animate: true,
        duration: 0.8,
      });
      setTimeout(() => {
        isFlying.current = false;
      }, 900);
    }
  }, [location, map]);
  return null;
}

function MapView({ selectedLocation, selectedFilter, setPlaces }) {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showMap, setShowMap] = useState(false); // Untuk kontrol loading
  const [error, setError] = useState(null);
  const dataFetched = useRef(false);

  useEffect(() => {
    if (dataFetched.current) return;
    dataFetched.current = true;

    fetch("/places.csv")
      .then((res) => {
        if (!res.ok) throw new Error("CSV tidak ditemukan");
        return res.text();
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const validData = results.data
              .filter(
                (item) =>
                  item &&
                  item.nama &&
                  item.X != null &&
                  item.Y != null &&
                  item.type_tematik,
              )
              .map((item) => {
                let jenis = "";
                if (item.type_tematik === "muslim") jenis = "Muslim";
                else if (item.type_tematik === "christian_protestant")
                  jenis = "Kristen Protestan";
                else if (item.type_tematik === "christian_evangelical")
                  jenis = "Kristen Evangelis";
                else if (item.type_tematik === "christian") jenis = "Kristen";
                else jenis = item.type_tematik;
                return {
                  id: item.OBJECTID,
                  nama: item.nama,
                  jenis: jenis,
                  latitude: parseFloat(item.Y),
                  longitude: parseFloat(item.X),
                  alamat: item.alamat || "",
                  code: item.code,
                };
              });
            setLocations(validData);
            setPlaces(validData);
            // Data sudah siap, tapi loading spinner akan tetap jalan 2.5 detik
          },
          error: () => setError("Gagal baca CSV"),
        });
      })
      .catch((err) => setError(err.message));
  }, [setPlaces]);

  useEffect(() => {
    if (locations.length) {
      let filtered = locations;
      if (selectedFilter && selectedFilter !== "all")
        filtered = locations.filter((loc) => loc.jenis === selectedFilter);
      setFilteredLocations(filtered);
    }
  }, [locations, selectedFilter]);

  // Fungsi ini dipanggil setelah loading spinner selesai (2.5 detik)
  const handleLoadingComplete = () => {
    setShowMap(true);
  };

  // Selama showMap false, tampilkan loading spinner
  if (!showMap) {
    return <LoadingSpinner onLoadingComplete={handleLoadingComplete} />;
  }

  if (error) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: 40,
            background: "white",
            borderRadius: 24,
          }}
        >
          <span style={{ fontSize: 48 }}>⚠️</span>
          <h3 style={{ color: "#ef4444", marginTop: 16 }}>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[-3.44, 114.83]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap"
      />
      {filteredLocations.map((loc, idx) => (
        <Marker
          key={loc.id || idx}
          position={[loc.latitude, loc.longitude]}
          icon={getMarkerIcon(loc.jenis)}
        >
          <Popup>
            <div style={{ padding: 8 }}>
              <h3 style={{ marginBottom: 8, fontSize: 16, fontWeight: 600 }}>
                {loc.nama}
              </h3>
              <div
                style={{
                  display: "inline-block",
                  background: loc.jenis === "Muslim" ? "#d1fae5" : "#e0e7ff",
                  padding: "4px 12px",
                  borderRadius: 30,
                  fontSize: 11,
                  color: loc.jenis === "Muslim" ? "#059669" : "#4f46e5",
                }}
              >
                {loc.jenis === "Muslim" ? "🕌" : "⛪"} {loc.jenis}
              </div>
              {loc.alamat && (
                <p style={{ marginTop: 8, fontSize: 11, color: "#64748b" }}>
                  📍 {loc.alamat}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      <FlyToLocation location={selectedLocation} />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          padding: "12px 18px",
          borderRadius: 20,
          zIndex: 1000,
        }}
      >
        <p style={{ marginBottom: 8, fontSize: 11, fontWeight: 600 }}>
          📍 Keterangan
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            />
            <span>🕌 Masjid</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#6366f1",
              }}
            />
            <span>⛪ Gereja</span>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          padding: "8px 20px",
          borderRadius: 40,
          fontSize: 13,
          color: "#4f46e5",
          zIndex: 1000,
          pointerEvents: "none",
          fontWeight: 500,
        }}
      >
        🕌 {filteredLocations.length} Tempat Ibadah
      </div>
      <style>{`.custom-marker { transition: transform 0.2s; } .custom-marker:hover { transform: scale(1.15); }`}</style>
    </MapContainer>
  );
}

export default MapView;
