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

export default function Page() {
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

    const url =
      window.location.origin +
      `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(
        to
      )}&msg=${encodeURIComponent(customMsg)}`;

    navigator.clipboard.writeText(url);
    alert("Rose link copied 🌹");
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Rose Day Special 🌹",
        text: "I have something special for you 🌹",
        url: window.location.href,
      });
    }
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }
        @keyframes fall {
          0% { transform: translateY(-10vh); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        .petal {
          position: fixed;
          top: -10%;
          animation: fall 8s linear infinite;
          pointer-events: none;
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
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="petal"
                    style={{
                      left: Math.random() * 100 + "%",
                      animationDelay: Math.random() * 5 + "s",
                    }}
                  >
                    🌸
                  </span>
                ))}
                <Flower2 size={80} />
                <h2>Dear {to}</h2>
                <p style={{ fontStyle: "italic" }}>{finalMsg}</p>
                <p style={{ opacity: 0.7 }}>— {from}</p>
                <button style={styles.button} onClick={shareLink}>
                  <Share2 size={16} /> Share
                </button>
              </>
            )
          ) : (
            <>
              <Flower2 size={48} />
              <h1>Rose Day Special</h1>

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

              <div style={{ fontSize: 12, marginTop: 10 }}>
                <Heart size={12} /> Made with love
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
    background:
      "linear-gradient(135deg, #ec4899, #f43f5e, #a855f7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    color: "white",
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "rgba(255,255,255,0.2)",
    borderRadius: 24,
    padding: 24,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    border: "none",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 999,
    border: "none",
    background: "linear-gradient(to right, #ef4444, #ec4899)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
