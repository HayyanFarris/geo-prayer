import React, { useEffect, useState, useRef } from "react";

function LoadingSpinner({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Menyiapkan data...");
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const emojis = ["🕌", "⛪", "🕋", "✝️"];
  const hasCompleted = useRef(false);
  const startTimeRef = useRef(Date.now());
  const duration = 2500; // 2.5 detik

  useEffect(() => {
    // Ganti emoji setiap 400ms
    const emojiInterval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length);
    }, 400);

    // Progress bar animation
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      let newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 25) setLoadingText("Membaca data...");
      else if (newProgress < 50) setLoadingText("Memproses lokasi...");
      else if (newProgress < 75) setLoadingText("Memuat peta...");
      else if (newProgress < 100) setLoadingText("Menyiapkan marker...");
      else setLoadingText("Siap! 🎉");

      // Selesai loading setelah 100%
      if (newProgress >= 100 && !hasCompleted.current) {
        hasCompleted.current = true;
        clearInterval(interval);
        clearInterval(emojiInterval);
        // Panggil callback setelah delay 200ms
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 200);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      clearInterval(emojiInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, #f0f4f8 0%, #e8edf2 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          fontSize: "80px",
          marginBottom: "20px",
          animation: "float 2s ease-in-out infinite",
        }}
      >
        {emojis[currentEmoji]}
      </div>

      <div
        style={{
          width: "70px",
          height: "70px",
          border: "3px solid #e2e8f0",
          borderTop: "3px solid #6366f1",
          borderRight: "3px solid #4f46e5",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />

      <div style={{ marginTop: "28px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "6px",
          }}
        >
          {loadingText}
        </h2>
        <p style={{ fontSize: "13px", color: "#64748b" }}>🕌 Geo-Prayer</p>
      </div>

      <div style={{ width: "280px", marginTop: "28px" }}>
        <div
          style={{
            width: "100%",
            height: "6px",
            backgroundColor: "#e2e8f0",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #4f46e5, #6366f1)",
              borderRadius: "10px",
              transition: "width 0.05s linear",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <p style={{ fontSize: "12px", fontWeight: "600", color: "#6366f1" }}>
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "28px" }}>
        📍 Tempat Ibadah Banjarbaru Raya
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;
