import { useState, useEffect } from "react";

const SLIDES = [
  {
    icon: "🧘", bigEmoji: "🧘‍♀️", tag: "Mindfulness",
    title: "Find Your", titleItalic: "Inner Peace",
    desc: "Start each day with guided meditation, breathing exercises and mood tracking personalised just for you.",
    col: "#7C3AED", bg: "#F5F3FF", chipBg: "#EDE9FE", chipCol: "#7C3AED",
    gradFrom: "#F5F3FF", gradTo: "#EDE9FE",
  },
  {
    icon: "⚡", bigEmoji: "🏃‍♂️", tag: "Activity",
    title: "Stay Active", titleItalic: "Every Day",
    desc: "Log workouts, track calories burned and crush weekly challenges that push you to your personal best.",
    col: "#E87AA0", bg: "#FDF0F3", chipBg: "#FDF0F3", chipCol: "#E87AA0",
    gradFrom: "#FDF0F3", gradTo: "#FCE7F3",
  },
  {
    icon: "🥗", bigEmoji: "🥗", tag: "Nutrition",
    title: "Eat Smart,", titleItalic: "Live Better",
    desc: "Personalised meal plans with veg & non-veg options, calculated from your BMI and wellness goals.",
    col: "#D97706", bg: "#FEF9ED", chipBg: "#FEF3C7", chipCol: "#D97706",
    gradFrom: "#FEF9ED", gradTo: "#FEF3C7",
  },
  {
    icon: "💧", bigEmoji: "💧", tag: "Wellness",
    title: "Feel Your", titleItalic: "Best Daily",
    desc: "Track hydration, monitor sleep stages and get AI-powered lifestyle recommendations made for you.",
    col: "#2563EB", bg: "#EFF6FF", chipBg: "#DBEAFE", chipCol: "#2563EB",
    gradFrom: "#EFF6FF", gradTo: "#DBEAFE",
  },
];

export default function GetStarted({ onDone }) {
  const [slide, setSlide] = useState(0);
  const cur = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 3500);
    return () => clearInterval(t);
  }, []);

  const goNext = () => {
    if (isLast) { onDone && onDone(); return; }
    setSlide(s => s + 1);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#F9F8F6", display: "flex",
      flexDirection: "column", alignItems: "center",
      fontFamily: "'DM Sans',sans-serif", maxWidth: 430, margin: "0 auto"
    }}>

      {/* Accent stripe */}
      <div style={{ width: "100%", height: 3, background: "linear-gradient(90deg,#C4B8E8,#F5C5A8,#C4B8E8)" }} />

      {/* Top bar */}
      <div style={{
        width: "100%", padding: "12px 20px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        background: "#fff", borderBottom: "1px solid #EBEBF0"
      }}>
        <div style={{
          fontFamily: "'DM Serif Display',serif",
          fontSize: 22, color: "#4A4A6A", fontStyle: "italic"
        }}>HumanOS</div>
        {!isLast && (
          <button onClick={() => onDone && onDone()} style={{
            background: "#F9F8F6",
            border: "1.5px solid #EBEBF0", borderRadius: 100, padding: "7px 16px",
            fontSize: 12, fontWeight: 700, color: "#8A8A9A", cursor: "pointer"
          }}>
            Skip
          </button>
        )}
      </div>

      {/* Illustration card */}
      <div style={{
        width: "calc(100% - 32px)", margin: "20px 16px 0",
        background: `linear-gradient(145deg,${cur.gradFrom},${cur.gradTo})`,
        borderRadius: 28, padding: "40px 20px 32px",
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative", overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,.07)",
        minHeight: 280, border: `1px solid ${cur.chipBg}`
      }}>

        {/* BG circles */}
        <div style={{
          position: "absolute", top: -50, right: -50, width: 180,
          height: 180, borderRadius: "50%", background: "rgba(255,255,255,.5)"
        }} />
        <div style={{
          position: "absolute", bottom: -40, left: -40, width: 140,
          height: 140, borderRadius: "50%", background: "rgba(255,255,255,.35)"
        }} />

        {/* Slide counter */}
        <div style={{
          position: "absolute", top: 16, right: 16,
          background: "rgba(255,255,255,.7)", borderRadius: 100,
          padding: "4px 12px", fontSize: 11, fontWeight: 700, color: cur.col
        }}>
          {slide + 1} / {SLIDES.length}
        </div>

        {/* Big emoji */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            width: 150, height: 150, borderRadius: "50%",
            background: "rgba(255,255,255,.55)",
            border: "3px solid rgba(255,255,255,.8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 0 16px rgba(255,255,255,.2)`
          }}>
            <div style={{
              width: 110, height: 110, borderRadius: "50%",
              background: "rgba(255,255,255,.7)",
              display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 56
            }}>
              {cur.bigEmoji}
            </div>
          </div>
        </div>

        {/* Tag pill */}
        <div style={{
          position: "relative", zIndex: 1, marginTop: 20,
          background: "rgba(255,255,255,.65)", borderRadius: 100,
          padding: "7px 20px", fontSize: 12, fontWeight: 800, color: cur.col,
          border: "1px solid rgba(255,255,255,.8)",
          letterSpacing: ".06em", textTransform: "uppercase"
        }}>
          {cur.icon} {cur.tag}
        </div>

        {/* Dots */}
        <div style={{
          display: "flex", gap: 7, marginTop: 18,
          position: "relative", zIndex: 1
        }}>
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => setSlide(i)} style={{
              width: slide === i ? 28 : 8, height: 8, borderRadius: 100,
              cursor: "pointer",
              background: slide === i ? cur.col : "rgba(0,0,0,.15)",
              transition: "all .35s ease"
            }} />
          ))}
        </div>
      </div>

      {/* Text card */}
      <div style={{
        width: "calc(100% - 32px)", margin: "14px 16px 0",
        background: "#fff", borderRadius: 28, padding: "26px 22px 28px",
        boxShadow: "0 2px 20px rgba(0,0,0,.06)"
      }}>

        {/* Chip */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: cur.chipBg, color: cur.col, borderRadius: 100,
          padding: "5px 14px", fontSize: 11, fontWeight: 800,
          letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 14
        }}>
          {cur.icon} Step {slide + 1}
        </div>

        {/* Title */}
        <div style={{ marginBottom: 10 }}>
          <span style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: 28, color: "#1C1C1E"
          }}>{cur.title} </span>
          <span style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: 28, color: cur.col, fontStyle: "italic"
          }}>
            {cur.titleItalic}
          </span>
        </div>

        {/* Desc */}
        <div style={{
          fontSize: 14, color: "#8A8A9A",
          lineHeight: 1.7, marginBottom: 22
        }}>{cur.desc}</div>

        {/* Feature chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {[
            { icon: "💧", label: "Hydration", col: "#2563EB", bg: "#EFF6FF" },
            { icon: "🧘", label: "Wellness", col: "#7C3AED", bg: "#F5F3FF" },
            { icon: "📊", label: "BMI", col: "#D97706", bg: "#FEF9ED" },
            { icon: "🤖", label: "AI Coach", col: "#4A4A6A", bg: "#F9F8F6" },
            { icon: "😴", label: "Sleep", col: "#2563EB", bg: "#EFF6FF" },
            { icon: "🏆", label: "Challenges", col: "#E87AA0", bg: "#FDF0F3" },
          ].map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 5,
              background: f.bg, border: `1px solid ${f.bg}`,
              borderRadius: 100, padding: "6px 12px",
              fontSize: 12, fontWeight: 600, color: f.col
            }}>
              {f.icon} {f.label}
            </div>
          ))}
        </div>

        {/* Button */}
        <button onClick={goNext} style={{
          width: "100%",
          background: "#4A4A6A", border: "none", borderRadius: 100,
          padding: "15px 28px", color: "#fff",
          fontSize: 16, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: 12,
          boxShadow: "0 6px 20px rgba(74,74,106,.28)",
          marginBottom: 16
        }}>
          {isLast ? "Get Started" : "Next"}
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,.18)",
            display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 18
          }}>
            {isLast ? "✓" : "→"}
          </div>
        </button>

        {/* Sign in */}
        <div style={{
          textAlign: "center", fontSize: 13,
          color: "#8A8A9A", fontWeight: 500
        }}>
          Already have an account?{" "}
          <button onClick={() => onDone && onDone()} style={{
            background: "none", border: "none", color: "#4A4A6A",
            fontWeight: 800, cursor: "pointer", fontSize: 13
          }}>
            Sign In
          </button>
        </div>
      </div>
      <div style={{ height: 24 }} />
    </div>
  );
}