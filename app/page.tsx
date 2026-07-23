import Image from "next/image";

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="bg-navy text-white sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight">SafeSalt™</span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#science" className="hover:text-peach transition-colors">The Science</a>
          <a href="#nak" className="hover:text-peach transition-colors">Na:K Protocol</a>
          <a href="#product" className="hover:text-peach transition-colors">Ingredients</a>
          <a href="https://safesaltco.com" target="_blank" rel="noopener noreferrer" className="hover:text-peach transition-colors">For Clinicians</a>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-navy py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-peach text-sm font-medium tracking-wide mb-6">
            By SafeBrand™ · Health Science Nutritionals, PBC
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
            The only seasoning engineered for your Na:K protocol.
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl">
            Not table salt. Not a lite salt. SafeSalt™ is a precision electrolyte seasoning — the first formulated around your sodium-to-potassium ratio, not a generic daily value.
          </p>
          <div className="flex flex-col gap-3 items-start">
            <a
              href="#science"
              className="bg-navy text-white text-sm font-semibold px-8 py-4 hover:bg-navy/90 transition-colors"
            >
              Explore the Science →
            </a>
            <a
              href="https://safesaltco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 text-sm font-medium hover:text-peach transition-colors"
            >
              For physicians and clinicians →
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/hand-salt.png"
            alt="SafeSalt in hand"
            width={560}
            height={560}
            className="w-full max-w-[480px] h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM ──────────────────────────────────────────────────────────────────

function Problem() {
  return (
    <section className="bg-white py-20 md:py-28 px-6 border-t border-navy/5">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-peach text-sm font-medium tracking-wide mb-4">Why it matters</p>
        <h2 className="text-navy text-3xl md:text-4xl font-bold tracking-tight mb-12 max-w-2xl">
          Most &ldquo;lite salts&rdquo; are solving the wrong problem.
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <p className="text-navy/70 text-lg font-light leading-relaxed">
            They replace sodium with potassium chloride — an ingredient kidney patients, heart failure patients, and anyone on a potassium-restricted diet are specifically warned to avoid. And even for healthy people, it means your seasoning is making potassium decisions for you.
          </p>

          <div className="bg-navy rounded-lg p-8">
            <div className="text-peach text-5xl md:text-6xl font-bold mb-3">40%</div>
            <p className="text-white/90 text-base leading-relaxed">
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
  const cards = [
    { stat: "50% less Na", desc: "Optimized sodium load without KCl substitution" },
    { stat: "45% DV Iodine", desc: "Thyroid support built into every pinch" },
    { stat: "8% DV Calcium", desc: "Passive bone density support through daily cooking" },
    { stat: "Zero KCl", desc: "Your potassium. Your sources. Your control." },
  ];

  return (
    <section id="product" className="bg-blush py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-peach text-sm font-medium tracking-wide mb-4">The formulation</p>
        <h2 className="text-navy text-3xl md:text-4xl font-bold tracking-tight mb-12 max-w-2xl">
          Six ingredients. Full mineral stack. Zero potassium chloride.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div key={c.stat} className="bg-white border-t-4 border-peach p-6">
              <div className="text-navy text-xl font-bold mb-2">{c.stat}</div>
              <p className="text-navy/60 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SCIENCE ──────────────────────────────────────────────────────────────────

function Science() {
  const credentials = [
    "Board Certified in Internal Medicine, Endocrinology, and Psychiatry",
    "Trained at Princeton, NYU School of Medicine, Stanford, NIH & Washington University",
    "Worked in the labs of Severo Ochoa and Arthur Kornberg",
  ];

  return (
    <section id="science" className="bg-navy py-20 md:py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-sky text-sm font-medium tracking-wide mb-4">The science behind it</p>
        <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-12 max-w-2xl">
          Formulated by a physician who worked in the labs of two Nobel Laureates.
        </h2>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {credentials.map((c) => (
            <div key={c} className="bg-white/5 border border-white/10 rounded-lg p-6">
              <p className="text-white/90 text-sm leading-relaxed font-medium">{c}</p>
            </div>
          ))}
        </div>

        <blockquote className="border-l-4 border-peach pl-6 max-w-3xl">
          <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed italic">
            &ldquo;In Severo Ochoa&rsquo;s laboratory, Dr. Gardner spent one summer discovering nearly 40% of the genetic code. That same precision defines SafeSalt™.&rdquo;
          </p>
        </blockquote>
      </div>
    </section>
  );
}

// ─── NA:K SECTION ─────────────────────────────────────────────────────────────

function NaK() {
  return (
    <section id="nak" className="bg-white py-20 md:py-28 px-6">
      <div className="max-w-[800px] mx-auto">
        <p className="text-peach text-sm font-medium tracking-wide mb-4">Your ratio</p>
        <h2 className="text-navy text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Get your potassium from food. Control the ratio intentionally.
        </h2>
        <p className="text-navy/70 text-lg font-light leading-relaxed mb-6">
          Every other seasoning makes your Na:K decisions for you. SafeSalt™ gives you clean, optimized sodium — so you can source your potassium from avocados, leafy greens, and whole foods, the way nature intended. Stack it with your electrolyte protocol. Know exactly what you&rsquo;re putting in.
        </p>
        <a
          href="https://safebrand.health"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-navy text-white text-sm font-semibold px-8 py-4 hover:bg-navy/90 transition-colors"
        >
          Take the NaK Precision Mineral Assessment →
        </a>
      </div>
    </section>
  );
}

// ─── CLINICIAN ────────────────────────────────────────────────────────────────

function Clinician() {
  return (
    <section className="bg-blush py-20 md:py-28 px-6">
      <div className="max-w-[800px] mx-auto">
        <p className="text-peach text-sm font-medium tracking-wide mb-4">For healthcare professionals</p>
        <h2 className="text-navy text-3xl md:text-4xl font-bold tracking-tight mb-8">
          A salt your patients can actually use.
        </h2>
        <p className="text-navy/70 text-lg font-light leading-relaxed mb-8">
          SafeSalt™ was built for the dietary protocols cardiologists, nephrologists, and endocrinologists prescribe. No potassium chloride. No synthetic additives. Full ingredient transparency and lab-verified specs available on request.
        </p>
        <a
          href="https://safesaltco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-navy text-white text-sm font-semibold px-8 py-4 hover:bg-navy/90 transition-colors"
        >
          Visit SafeSaltCo.com →
        </a>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: "safebrand.health", href: "https://safebrand.health" },
    { label: "safesaltco.com", href: "https://safesaltco.com" },
    { label: "safesupplements.health", href: "https://safesupplements.health" },
    { label: "safehydrate.health", href: "https://safehydrate.health" },
    { label: "healthsciencenutritionals.health", href: "https://healthsciencenutritionals.health" },
  ];

  return (
    <footer className="bg-navy py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <span className="text-white text-lg font-bold tracking-tight">SafeSalt™</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-sm hover:text-peach transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/30 text-xs leading-relaxed">
            SafeSalt™ is a trademark of Health Science Nutritionals, PBC. © 2026 Health Science Nutritionals, PBC.
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
