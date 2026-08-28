import type { NextRequest } from "next/server";

// ─── Rate limiting (in-memory, ~10 req/IP/hour) ─────────────────────────────

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hour
  const max = 10;

  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < window);
  if (timestamps.length >= max) {
    hits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Answers {
  processedFood: number;
  saltHabit: number;
  produceServings: number;
  potassiumFoods: number;
  exerciseDays: number;
  sweatCramping: number;
  fatigue: number;
  cramps: number;
  dizziness: number;
  goal: string;
}

type Tier = "balanced" | "sodium" | "turnover";

// ─── Scoring (trade-secret logic — never exposed to client) ──────────────────

function score(a: Answers): { tier: Tier; highSignal: boolean } {
  let sodium = 0;
  let depletion = 0;
  let signals = 0;

  // (a) Sodium patterns
  sodium += a.processedFood * 2;
  sodium += a.saltHabit * 2;

  // (b) Potassium / produce — low intake pushes sodium-dominant
  sodium += Math.max(0, 3 - a.produceServings);
  sodium += Math.max(0, 3 - a.potassiumFoods);

  // (c) Activity & sweat loss
  depletion += a.exerciseDays * 1.5;
  depletion += a.sweatCramping * 2;

  // (d) Self-reported signals
  signals += a.fatigue + a.cramps + a.dizziness;
  const highSignal = signals >= 5;

  // (e) Goal nudges
  if (a.goal === "athletic") depletion += 3;
  if (a.goal === "heart") sodium += 2;
  if (a.goal === "processed") sodium += 2;

  // Tier thresholds
  if (depletion >= 8) return { tier: "turnover", highSignal };
  if (sodium >= 7) return { tier: "sodium", highSignal };
  return { tier: "balanced", highSignal };
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: Answers;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Validate question fields exist and are numbers
  const numFields: (keyof Answers)[] = [
    "processedFood", "saltHabit", "produceServings", "potassiumFoods",
    "exerciseDays", "sweatCramping", "fatigue", "cramps", "dizziness",
  ];
  for (const f of numFields) {
    if (typeof body[f] !== "number" || body[f] < 0 || body[f] > 10) {
      return Response.json({ error: `Invalid value for ${f}.` }, { status: 400 });
    }
  }
  if (typeof body.goal !== "string") {
    return Response.json({ error: "Invalid goal." }, { status: 400 });
  }

  const result = score(body);
  return Response.json({
    tier: result.tier,
    highSignal: result.highSignal,
  });
}
