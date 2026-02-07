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
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-[-10%] animate-fall"
          style={{
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
        .animate-fall {
          animation: fall 8s linear infinite;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-rose-500 to-purple-500 p-4 text-white">
        <div className="w-full max-w-md rounded-3xl bg-white/20 backdrop-blur-xl shadow-xl p-8 text-center">
          {showRose ? (
            <>
              {!opened ? (
                <>
                  <Flower2 className="w-16 h-16 mx-auto mb-6 animate-pulse" />
                  <h2 className="text-2xl font-bold mb-6">
                    A rose is waiting for you 🌹
                  </h2>
                  <button
                    onClick={() => setOpened(true)}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 font-semibold"
                  >
                    Open your rose 🌹
                  </button>
                </>
              ) : (
                <>
                  <Petals />
                  <flower2 className="w-20 h-20 mx-auto mb-4 animate-bounce" />
                  <h2 className="text-2xl font-bold mb-2">Dear {to}</h2>
                  <p className="italic mb-4">{finalMsg}</p>
                  <p className="text-sm opacity-80 mb-6">— {from}</p>
                  <button
                    onClick={shareLink}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center gap-2"
                  >
                    <Share2 size={16} /> Share
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <flower2 className="w-12 h-12 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Rose Day Special</h1>
              <p className="text-sm mb-6 opacity-90">
                Create a rose for someone special 💕
              </p>

              <input
                placeholder="Your name"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full mb-3 px-4 py-2 rounded-lg bg-white/20 placeholder-white/70 outline-none"
              />

              <input
                placeholder="Their name"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full mb-3 px-4 py-2 rounded-lg bg-white/20 placeholder-white/70 outline-none"
              />

              <input
                placeholder="Custom message (optional)"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="w-full mb-4 px-4 py-2 rounded-lg bg-white/20 placeholder-white/70 outline-none"
              />

              <button
                onClick={createLink}
                className="w-full py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 font-semibold"
              >
                Create Rose Link 🌹
              </button>

              <div className="flex justify-center items-center gap-1 text-xs mt-4 opacity-80">
                <Heart size={14} /> Made with love
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
