"use client";

import { useEffect, useState } from "react";
import { Flower2, Share2, Heart } from "lucide-react";

const messages = [
  "You are the rose that makes my world bloom 🌹",
  "Every heartbeat of mine whispers your name 💖",
  "If love had a fragrance, it would smell like you",
  "This rose carries feelings I can’t put into words ❤️",
  "Among all roses, my heart chose you 🌹",
  "You make ordinary days feel magical ✨",
];

function Petals() {
  return (
    <div style={styles.petalsContainer}>
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          style={{
            ...styles.petal,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${12 + Math.random() * 18}px`,
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}

export default function RoseDayPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [customMsg, setCustomMsg] = useState("");
  const [opened, setOpened] = useState(false);
  const [finalMsg, setFinalMsg] = useState("");
  const [showRose, setShowRose] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get("from");
    const t = params.get("to");
    const m = params.get("msg");

    if (f && t) {
      setFrom(f);
      setTo(t);
      setFinalMsg(m || messages[Math.floor(Math.random() * messages.length)]);
      setShowRose(true);
    }
  }, []);

  const createLink = () => {
    if (!from || !to) {
      alert("Enter both names");
      return;
    }

    const url = `${window.location.origin}?from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(to)}&msg=${encodeURIComponent(customMsg)}`;

    navigator.clipboard.writeText(url);
    alert("Rose link copied 🌹");
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Rose Day Special 🌹",
        text: "I have a rose for you 🌹",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported. Copy the link instead.");
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      <div style={styles.page}>
        <div style={styles.card}>
          {showRose ? (
            !opened ? (
              <>
                <Flower2 size={64} />
                <h2>A rose is waiting for you 🌹</h2>
                <button style={styles.button} onClick={() => setOpened(true)}>
                  Open your rose 🌹
                </button>
              </>
            ) : (
              <>
                <Petals />
                <Flower2 size={80} />
                <h2>Dear {to}</h2>
                <p style={styles.message}>{finalMsg}</p>
                <p style={styles.from}>— {from}</p>
                <button style={styles.button} onClick={shareLink}>
                  <Share2 size={16} /> Share
                </button>
              </>
            )
          ) : (
            <>
              <Flower2 size={48} />
              <h1>Rose Day Special</h1>
              <p>Create a rose for someone special 💕</p>

              <input
                style={styles.input}
                placeholder="Your name"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Their name"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />

              <input
                style={styles.input}
                placeholder="Custom message (optional)"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
              />

              <button style={styles.button} onClick={createLink}>
                Create Rose Link 🌹
              </button>

              <div style={styles.footer}>
                <Heart size={14} /> Made with love
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #ec4899, #f43f5e, #a855f7)",
    padding: "16px",
    color: "white",
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: "380px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "24px",
    padding: "24px",
    backdropFilter: "blur(12px)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(to right, #ef4444, #ec4899)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  message: {
    fontStyle: "italic",
    margin: "12px 0",
  },
  from: {
    opacity: 0.8,
    marginBottom: "12px",
  },
  footer: {
    marginTop: "12px",
    fontSize: "12px",
    opacity: 0.8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  },
  petalsContainer: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    overflow: "hidden",
  },
  petal: {
    position: "absolute",
    top: "-10%",
    animation: "fall 8s linear infinite",
  },
};
