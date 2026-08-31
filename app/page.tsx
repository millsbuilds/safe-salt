"use client";

import { useState, useEffect } from "react";

const C = {
  navy: "#1B2E4A",
  peach: "#E89B7C",
  blush: "#FAEBDE",
  sky: "#7AA8C9",
  white: "#FFFFFF",
  navyMuted: "rgba(27,46,74,0.7)",
};

const F = '"Inter", system-ui, sans-serif';

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const linkStyle: React.CSSProperties = {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: F,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.15s",
  };

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: C.navy, fontFamily: F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ color: C.white, fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>SafeSalt™</span>

        {isMobile ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: "block", width: 22, height: 2, background: C.white, transition: "all 0.2s",
                ...(menuOpen && i === 0 ? { transform: "translateY(7px) rotate(45deg)" } : {}),
                ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                ...(menuOpen && i === 2 ? { transform: "translateY(-7px) rotate(-45deg)" } : {}),
              }} />
            ))}
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#science" style={linkStyle}>The Science</a>
            <a href="#nak" style={linkStyle}>Na:K Protocol</a>
            <a href="#product" style={linkStyle}>Ingredients</a>
            <a href="https://safesaltco.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>For Clinicians</a>
          </div>
        )}
      </div>

      {isMobile && menuOpen && (
        <div style={{ background: C.navy, borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <a href="#science" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 16, padding: "4px 0" }}>The Science</a>
          <a href="#nak" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 16, padding: "4px 0" }}>Na:K Protocol</a>
          <a href="#product" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 16, padding: "4px 0" }}>Ingredients</a>
          <a href="https://safesaltco.com" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 16, padding: "4px 0" }}>For Clinicians</a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ background: C.navy, padding: isMobile ? "64px 24px" : "112px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", gap: 48, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: C.peach, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 24, fontFamily: F }}>
            By SafeBrand™ · Health Science Nutritionals, PBC · Patent Pending
          </p>
          <h1 style={{ color: C.white, fontSize: isMobile ? 36 : 56, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 24, fontFamily: F }}>
            The only seasoning engineered for your Na:K protocol.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? 18 : 20, fontWeight: 300, lineHeight: 1.6, marginBottom: 12, maxWidth: 540, fontFamily: F }}>
            Tastes like salt. Works like salt. Zero potassium chloride — you control your electrolyte stack.
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: isMobile ? 18 : 20, fontWeight: 300, lineHeight: 1.6, marginBottom: 32, maxWidth: 540, fontFamily: F }}>
            SafeSalt™ is a precision electrolyte seasoning — the first formulated around your sodium-to-potassium ratio, not a generic daily value.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <a href="#science" style={{ display: "inline-block", background: C.white, color: C.navy, fontSize: 14, fontWeight: 600, padding: "16px 32px", textDecoration: "none", fontFamily: F }}>
              Explore the Science →
            </a>
            <a href="https://safesaltco.com" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, fontWeight: 500, textDecoration: "none", fontFamily: F }}>
              For physicians and clinicians →
            </a>
          </div>
        </div>
        <img src="/images/hand-salt.png" alt="SafeSalt" style={{ width: "100%", maxWidth: 500, height: "auto", display: "block" }} />
      </div>
    </section>
  );
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────

function Problem() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ background: C.white, padding: isMobile ? "64px 24px" : "112px 24px", borderTop: "1px solid rgba(27,46,74,0.05)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ color: C.peach, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 16, fontFamily: F }}>Why it matters</p>
        <h2 style={{ color: C.navy, fontSize: isMobile ? 28 : 36, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 48, maxWidth: 640, fontFamily: F }}>
          Most "lite salts" are solving the wrong problem.
        </h2>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 48, alignItems: "flex-start" }}>
          <p style={{ flex: 1, color: C.navyMuted, fontSize: 18, fontWeight: 300, lineHeight: 1.7, fontFamily: F }}>
            They replace sodium with potassium chloride — an ingredient kidney patients, heart failure patients, and anyone on a potassium-restricted diet are specifically warned to avoid. And even for healthy people, it means your seasoning is making potassium decisions for you.
          </p>

          <div style={{ flex: 1, background: C.navy, borderRadius: 8, padding: 32 }}>
            <div style={{ color: C.peach, fontSize: isMobile ? 48 : 56, fontWeight: 700, marginBottom: 12, fontFamily: F }}>40%</div>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 16, lineHeight: 1.6, fontFamily: F }}>
              of Americans have elevated sodium intake. Zero products on the market let them control their Na:K ratio intentionally — until now.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCT ──────────────────────────────────────────────────────────────────

function Product() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cards = [
    { stat: "50% less Na", desc: "Optimized sodium load without KCl substitution" },
    { stat: "Zero KCl", desc: "Your potassium. Your sources. Your control." },
  ];

  return (
    <section id="product" style={{ background: C.blush, padding: isMobile ? "64px 24px" : "112px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ color: C.peach, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 16, fontFamily: F }}>The formulation</p>
        <h2 style={{ color: C.navy, fontSize: isMobile ? 28 : 36, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 16, maxWidth: 640, fontFamily: F }}>
          50% less sodium. Zero potassium chloride. Same great taste as salt.
        </h2>
        <p style={{ color: C.peach, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 48, fontFamily: F }}>
          U.S. Patent Pending
        </p>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 24 }}>
          {cards.map((c) => (
            <div key={c.stat} style={{ background: C.white, borderTop: `4px solid ${C.peach}`, padding: 24 }}>
              <div style={{ color: C.navy, fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: F }}>{c.stat}</div>
              <p style={{ color: C.navyMuted, fontSize: 14, lineHeight: 1.6, fontFamily: F }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SCIENCE ──────────────────────────────────────────────────────────────────

function Science() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const credentials = [
    "Board Certified in Internal Medicine",
    "Princeton University",
    "Trained at NYU School of Medicine, Stanford, NIH & Washington University",
  ];

  return (
    <section id="science" style={{ background: C.navy, padding: isMobile ? "64px 24px" : "112px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ color: C.sky, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 16, fontFamily: F }}>The science behind it</p>
        <h2 style={{ color: C.white, fontSize: isMobile ? 28 : 36, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24, maxWidth: 640, fontFamily: F }}>
          Formulated by a physician-scientist whose early research is still cited today.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: isMobile ? 16 : 18, fontWeight: 300, lineHeight: 1.6, marginBottom: 48, maxWidth: 760, fontFamily: F }}>
          Dr. Robert S. &lsquo;Isaac&rsquo; Gardner, MD, practices in endocrinology and psychiatry and is board certified in Internal Medicine. In his twenties and thirties, his laboratory research contributed to foundational discoveries in molecular genetics — work still cited in the field today. That same rigor defines every SafeSalt™ formulation.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
          {credentials.map((c) => (
            <div key={c} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: 24 }}>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, lineHeight: 1.6, fontWeight: 500, fontFamily: F }}>{c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NA:K SECTION ─────────────────────────────────────────────────────────────

function NaK() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="nak" style={{ background: C.white, padding: isMobile ? "64px 24px" : "112px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ color: C.peach, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 16, fontFamily: F }}>Your ratio</p>
        <h2 style={{ color: C.navy, fontSize: isMobile ? 28 : 36, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, fontFamily: F }}>
          Get your potassium from food. Control the ratio intentionally.
        </h2>
        <p style={{ color: C.navyMuted, fontSize: 18, fontWeight: 300, lineHeight: 1.7, marginBottom: 24, fontFamily: F }}>
          Every other seasoning makes your Na:K decisions for you. SafeSalt™ gives you clean, optimized sodium — so you can source your potassium from avocados, leafy greens, and whole foods, the way nature intended. Stack it with your electrolyte protocol. Know exactly what you're putting in.
        </p>
        <a href="/assessment" style={{ display: "inline-block", background: C.navy, color: C.white, fontSize: 14, fontWeight: 600, padding: "16px 32px", textDecoration: "none", fontFamily: F }}>
          Take the NaK Precision Mineral Assessment →
        </a>
      </div>
    </section>
  );
}

// ─── CLINICIAN ────────────────────────────────────────────────────────────────

function Clinician() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section style={{ background: C.blush, padding: isMobile ? "64px 24px" : "112px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ color: C.peach, fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", marginBottom: 16, fontFamily: F }}>For healthcare professionals</p>
        <h2 style={{ color: C.navy, fontSize: isMobile ? 28 : 36, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32, fontFamily: F }}>
          A salt your patients can actually use.
        </h2>
        <p style={{ color: C.navyMuted, fontSize: 18, fontWeight: 300, lineHeight: 1.7, marginBottom: 32, fontFamily: F }}>
          SafeSalt™ was built for the dietary protocols cardiologists, nephrologists, and endocrinologists prescribe. No potassium chloride. No synthetic additives. Full ingredient transparency and lab-verified specs available on request.
        </p>
        <a href="https://safesaltco.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: C.navy, color: C.white, fontSize: 14, fontWeight: 600, padding: "16px 32px", textDecoration: "none", fontFamily: F }}>
          Visit SafeSaltCo.com →
        </a>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const links = [
    { label: "safebrand.health", href: "https://safebrand.health" },
    { label: "safesaltco.com", href: "https://safesaltco.com" },
    { label: "safesupplements.health", href: "https://safesupplements.health" },
    { label: "safehydrate.health", href: "https://safehydrate.health" },
    { label: "healthsciencenutritionals.health", href: "https://healthsciencenutritionals.health" },
  ];

  return (
    <footer style={{ background: C.navy, padding: "64px 24px", fontFamily: F }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "flex-start", gap: 48, marginBottom: 48 }}>
          <span style={{ color: C.white, fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>SafeSalt™</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32 }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.6 }}>
            SafeSalt™ is a trademark of Health Science Nutritionals, PBC. Patent Pending. © 2026 Health Science Nutritionals, PBC.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Product />
      <Science />
      <NaK />
      <Clinician />
      <Footer />
    </>
  );
}
