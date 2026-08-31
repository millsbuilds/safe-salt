"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

const C = {
  navy: "#1B2E4A",
  peach: "#E89B7C",
  blush: "#FAEBDE",
  sky: "#7AA8C9",
  white: "#FFFFFF",
  navyMuted: "rgba(27,46,74,0.7)",
};

const F = '"Inter", system-ui, sans-serif';

// ─── Types ───────────────────────────────────────────────────────────────────

type Tier = "balanced" | "sodium" | "turnover";

interface Result {
  tier: Tier;
  highSignal: boolean;
}

type Step = "sodium" | "potassium" | "activity" | "signals" | "goals" | "submitting" | "result";

// ─── Shared styles ───────────────────────────────────────────────────────────

const containerStyle: CSSProperties = {
  maxWidth: 640,
  margin: "0 auto",
  padding: "64px 24px 96px",
  fontFamily: F,
};

const headingStyle: CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
  color: C.navy,
  letterSpacing: "-0.02em",
  marginBottom: 12,
};

const subStyle: CSSProperties = {
  fontSize: 16,
  fontWeight: 300,
  color: C.navyMuted,
  lineHeight: 1.65,
  marginBottom: 36,
};

const btnStyle: CSSProperties = {
  background: C.navy,
  color: C.white,
  border: "none",
  fontSize: 14,
  fontWeight: 600,
  padding: "14px 32px",
  cursor: "pointer",
  fontFamily: F,
};

const btnDisabledStyle: CSSProperties = {
  ...btnStyle,
  opacity: 0.4,
  cursor: "not-allowed",
};

const backBtnStyle: CSSProperties = {
  ...btnStyle,
  background: "transparent",
  color: C.navy,
  border: `1px solid ${C.navy}`,
};

const disclaimerStyle: CSSProperties = {
  background: C.blush,
  padding: 20,
  borderRadius: 4,
};

const disclaimerTextStyle: CSSProperties = {
  fontSize: 12,
  color: C.navyMuted,
  lineHeight: 1.65,
  margin: 0,
  fontFamily: F,
};

// ─── Reusable controls ──────────────────────────────────────────────────────

function OptionButton({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "14px 18px",
        background: selected ? C.navy : C.white,
        color: selected ? C.white : C.navy,
        border: `1px solid ${selected ? C.navy : "rgba(27,46,74,0.15)"}`,
        borderRadius: 4,
        fontSize: 15,
        fontWeight: 500,
        fontFamily: F,
        cursor: "pointer",
        transition: "all 0.12s",
      }}
    >
      {label}
    </button>
  );
}

function ScaleGroup({
  label,
  value,
  onChange,
  low,
  high,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  low: string;
  high: string;
  max: number;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 15, fontWeight: 500, color: C.navy, marginBottom: 12, fontFamily: F }}>
        {label}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Array.from({ length: max + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              border: `1px solid ${value === i ? C.navy : "rgba(27,46,74,0.15)"}`,
              background: value === i ? C.navy : C.white,
              color: value === i ? C.white : C.navy,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: F,
            }}
          >
            {i}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.navyMuted, fontFamily: F }}>{low}</span>
        <span style={{ fontSize: 11, color: C.navyMuted, fontFamily: F }}>{high}</span>
      </div>
    </div>
  );
}

// ─── Tier display data ───────────────────────────────────────────────────────

const TIER_DATA: Record<Tier, { title: string; summary: string; detail: string }> = {
  balanced: {
    title: "Balanced Baseline",
    summary: "Your reported patterns suggest a relatively balanced sodium-to-potassium profile.",
    detail:
      "SafeSalt\u2122 can help you maintain that balance \u2014 delivering 50% less sodium per pinch with built-in iodine, and zero potassium chloride so you stay in control of your K sources.",
  },
  sodium: {
    title: "Sodium-Dominant",
    summary: "Your responses suggest your current diet skews toward higher sodium relative to potassium.",
    detail:
      "SafeSalt\u2122 is engineered for exactly this pattern \u2014 replacing standard salt with a precision formulation that cuts sodium by 50% without introducing potassium chloride, so you can bring your ratio back toward balance through the foods you actually eat.",
  },
  turnover: {
    title: "High-Turnover / Athletic",
    summary: "Your activity level and reported sweat loss suggest elevated electrolyte turnover.",
    detail:
      "Athletes and high-output individuals lose sodium and minerals faster than most. SafeSalt\u2122 gives you a clean, calibrated sodium base \u2014 with iodine built in \u2014 so you can layer your potassium from whole-food sources and dial in your recovery protocol intentionally.",
  },
};

// ─── Main component ──────────────────────────────────────────────────────────

export default function AssessmentClient() {
  const [step, setStep] = useState<Step>("sodium");
  const [error, setError] = useState("");

  // Question answers
  const [processedFood, setProcessedFood] = useState(0);
  const [saltHabit, setSaltHabit] = useState(0);
  const [produceServings, setProduceServings] = useState(0);
  const [potassiumFoods, setPotassiumFoods] = useState(0);
  const [exerciseDays, setExerciseDays] = useState(0);
  const [sweatCramping, setSweatCramping] = useState(0);
  const [fatigue, setFatigue] = useState(0);
  const [cramps, setCramps] = useState(0);
  const [dizziness, setDizziness] = useState(0);
  const [goal, setGoal] = useState("");

  // Result
  const [result, setResult] = useState<Result | null>(null);

  const submit = async () => {
    setStep("submitting");
    setError("");

    try {
      const res = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          processedFood,
          saltHabit,
          produceServings,
          potassiumFoods,
          exerciseDays,
          sweatCramping,
          fatigue,
          cramps,
          dizziness,
          goal,
        }),
      });

      if (res.status === 429) {
        setError("You\u2019ve submitted too many assessments. Please try again later.");
        setStep("goals");
        return;
      }

      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        setStep("goals");
        return;
      }

      const data: Result = await res.json();
      setResult(data);
      setStep("result");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStep("goals");
    }
  };

  // ─── Tier result ─────────────────────────────────────────────────────────

  if (step === "result" && result) {
    const tier = TIER_DATA[result.tier];
    return (
      <div style={containerStyle}>
        <p style={{ color: C.peach, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 16 }}>
          Your Result
        </p>
        <h1 style={headingStyle}>{tier.title}</h1>
        <p style={subStyle}>{tier.summary}</p>

        {result.highSignal && (
          <div style={{ background: "#FFF8F0", border: `1px solid ${C.peach}`, borderRadius: 4, padding: 18, marginBottom: 28 }}>
            <p style={{ fontSize: 14, color: C.navy, lineHeight: 1.6, margin: 0, fontWeight: 500, fontFamily: F }}>
              You reported multiple symptoms (fatigue, cramping, dizziness). While these are common and often diet-related, consider discussing them with your physician to rule out other causes.
            </p>
          </div>
        )}

        <p style={{ fontSize: 16, fontWeight: 300, color: C.navyMuted, lineHeight: 1.65, marginBottom: 32, fontFamily: F }}>
          {tier.detail}
        </p>

        <a
          href="/#product"
          style={{
            display: "inline-block",
            background: C.navy,
            color: C.white,
            fontSize: 14,
            fontWeight: 600,
            padding: "16px 32px",
            textDecoration: "none",
            fontFamily: F,
            marginBottom: 32,
          }}
        >
          Learn More About SafeSalt™ →
        </a>

        <div style={disclaimerStyle}>
          <p style={disclaimerTextStyle}>
            This assessment is self-reported and educational. It is not a diagnostic test. Always consult a physician for kidney, cardiac, or endocrine conditions — including if you are on dialysis — before changing sodium or potassium intake.
          </p>
        </div>
      </div>
    );
  }

  // ─── Submitting state ────────────────────────────────────────────────────

  if (step === "submitting") {
    return (
      <div style={{ ...containerStyle, textAlign: "center", paddingTop: 128 }}>
        <p style={{ fontSize: 16, color: C.navyMuted, fontFamily: F }}>Calculating your results…</p>
      </div>
    );
  }

  // ─── Question steps ──────────────────────────────────────────────────────

  return (
    <div style={containerStyle}>
      <p style={{ color: C.peach, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 16 }}>
        NaK Precision Mineral Assessment
      </p>

      {/* ── (a) Sodium patterns ────────────────────────────────────────────── */}
      {step === "sodium" && (
        <>
          <h1 style={headingStyle}>Sodium Patterns</h1>
          <p style={subStyle}>Tell us about your typical sodium intake.</p>
          <ScaleGroup
            label="How often do you eat processed or restaurant food?"
            value={processedFood}
            onChange={setProcessedFood}
            low="Rarely"
            high="Daily"
            max={4}
          />
          <ScaleGroup
            label="How often do you add salt to your food at the table?"
            value={saltHabit}
            onChange={setSaltHabit}
            low="Never"
            high="Every meal"
            max={4}
          />
          <button style={btnStyle} onClick={() => setStep("potassium")}>Continue →</button>
        </>
      )}

      {/* ── (b) Potassium / produce intake ─────────────────────────────────── */}
      {step === "potassium" && (
        <>
          <h1 style={headingStyle}>Potassium &amp; Produce</h1>
          <p style={subStyle}>Tell us about your fruit, vegetable, and potassium-rich food intake.</p>
          <ScaleGroup
            label="How many servings of fruits and vegetables do you eat per day?"
            value={produceServings}
            onChange={setProduceServings}
            low="0 servings"
            high="6+ servings"
            max={6}
          />
          <ScaleGroup
            label="How often do you eat potassium-rich foods (bananas, avocados, leafy greens, beans)?"
            value={potassiumFoods}
            onChange={setPotassiumFoods}
            low="Rarely"
            high="Daily"
            max={4}
          />
          <div style={{ display: "flex", gap: 12 }}>
            <button style={backBtnStyle} onClick={() => setStep("sodium")}>← Back</button>
            <button style={btnStyle} onClick={() => setStep("activity")}>Continue →</button>
          </div>
        </>
      )}

      {/* ── (c) Activity & sweat loss ──────────────────────────────────────── */}
      {step === "activity" && (
        <>
          <h1 style={headingStyle}>Activity &amp; Sweat Loss</h1>
          <p style={subStyle}>Tell us about your exercise and physical activity.</p>
          <ScaleGroup
            label="How many days per week do you exercise?"
            value={exerciseDays}
            onChange={setExerciseDays}
            low="0 days"
            high="7 days"
            max={7}
          />
          <ScaleGroup
            label="How often do you experience heavy sweating or exercise-related cramping?"
            value={sweatCramping}
            onChange={setSweatCramping}
            low="Never"
            high="Very often"
            max={4}
          />
          <div style={{ display: "flex", gap: 12 }}>
            <button style={backBtnStyle} onClick={() => setStep("potassium")}>← Back</button>
            <button style={btnStyle} onClick={() => setStep("signals")}>Continue →</button>
          </div>
        </>
      )}

      {/* ── (d) Self-reported signals ──────────────────────────────────────── */}
      {step === "signals" && (
        <>
          <h1 style={headingStyle}>How You Feel</h1>
          <p style={subStyle}>Have you noticed any of the following recently?</p>
          <ScaleGroup
            label="Have you noticed unusual fatigue or low energy?"
            value={fatigue}
            onChange={setFatigue}
            low="Not at all"
            high="Frequently"
            max={4}
          />
          <ScaleGroup
            label="Have you noticed muscle cramps or twitching?"
            value={cramps}
            onChange={setCramps}
            low="Not at all"
            high="Frequently"
            max={4}
          />
          <ScaleGroup
            label="Have you noticed lightheadedness or dizziness?"
            value={dizziness}
            onChange={setDizziness}
            low="Not at all"
            high="Frequently"
            max={4}
          />
          <div style={{ display: "flex", gap: 12 }}>
            <button style={backBtnStyle} onClick={() => setStep("activity")}>← Back</button>
            <button style={btnStyle} onClick={() => setStep("goals")}>Continue →</button>
          </div>
        </>
      )}

      {/* ── (e) Goals ──────────────────────────────────────────────────────── */}
      {step === "goals" && (
        <>
          <h1 style={headingStyle}>Your Goal</h1>
          <p style={subStyle}>What best describes your primary motivation?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
            {[
              { id: "wellness", label: "General wellness" },
              { id: "athletic", label: "Athletic performance" },
              { id: "heart", label: "Heart-healthy diet" },
              { id: "processed", label: "Cutting processed sodium" },
              { id: "physician", label: "Physician-guided management" },
            ].map((opt) => (
              <OptionButton
                key={opt.id}
                selected={goal === opt.id}
                label={opt.label}
                onClick={() => setGoal(opt.id)}
              />
            ))}
          </div>
          {error && (
            <p style={{ color: "#c0392b", fontSize: 14, marginBottom: 16, fontFamily: F }}>{error}</p>
          )}
          <div style={{ display: "flex", gap: 12 }}>
            <button style={backBtnStyle} onClick={() => setStep("signals")}>← Back</button>
            <button
              style={goal ? btnStyle : btnDisabledStyle}
              disabled={!goal}
              onClick={submit}
            >
              See My Results →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
