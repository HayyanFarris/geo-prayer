import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import Dashboard from "./components/Dashboard";
import Analysis from "./components/Analysis";
import Database from "./components/Database";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [places, setPlaces] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard places={places} />;
      case "analysis":
        return <Analysis places={places} />;
      case "database":
        return <Database places={places} />;
      default:
        return <Dashboard places={places} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar setActivePage={setActivePage} activePage={activePage} />
      <div className="main-layout">
        <Sidebar
          onSelectLocation={setSelectedLocation}
          onSelectFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          places={places}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="map-wrapper">
          <MapView
            selectedLocation={selectedLocation}
            selectedFilter={selectedFilter}
            setPlaces={setPlaces}
          />
        </div>

        {/* Panel Kanan - HANYA SATU TOMBOL CLOSE */}
        <div className={`right-panel ${isPanelOpen ? "open" : "closed"}`}>
          <div className="panel-header">
            <button
              className="panel-close-btn"
              onClick={() => setIsPanelOpen(false)}
              title="Tutup panel"
            >
              ✕
            </button>
          </div>
          {renderContent()}
        </div>
      </div>

      {/* Floating button untuk membuka panel - muncul saat panel tertutup */}
      {!isPanelOpen && (
        <button
          className="floating-open-btn"
          onClick={() => setIsPanelOpen(true)}
        >
          📊 Buka Panel
        </button>
      )}
    </div>
  );
}

export default App;
