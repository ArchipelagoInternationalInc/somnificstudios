import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/* ── Rate limit: 5 per IP per 10 min (quiz is heavier than dream widget) ── */
const ratemap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT  = 5;
const RATE_WINDOW = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ratemap.get(ip);
  if (!entry || now > entry.reset) {
    ratemap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

/* ── Available Somnific videos (update when library grows) ─────────────── */
const VIDEOS = `
- "Above the Clouds" — floating, dreamlike; bed drifting above a soft cloudscape. For those who need to rise above racing thoughts.
- "Still Water" — deep, glassy reflections at dusk. For those whose minds stay active and need something to anchor to.
- "Crimson Moon" — low red moon over a still horizon. Vivid, mysterious. For those with active dream lives or creative restlessness.
- "Salt & Silence" — coastal stillness, tide, open shore. For those carrying something heavy or needing permission to let go.
- "Evening Tide" — the soft fade from golden hour into night. For those who struggle with the transition into sleep.
`.trim();

/* ── System prompt ──────────────────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are the poetic voice of Somnific Studios — a sleep and meditation channel created by Madelyn Greco. Someone has just answered a brief sleep personality quiz.

Your task: read their answers and return a personal, warm sleep reading in exactly this format (use these exact labels, nothing else):

ARCHETYPE: [A 2-4 word evocative name for their sleep personality — poetic, not clinical. E.g. "The Midnight Wanderer" or "The Restless Tide"]

PORTRAIT: [2–3 sentences describing their sleep world in Somnific's voice — intimate, lyrical, atmospheric. Not a diagnosis. Speak directly to them as "you".]

VIDEO: [The title of exactly ONE video from the list below]

REASON: [1–2 sentences explaining why this video is right for them specifically — warm, personal, referencing their answers]

Available Somnific videos:
${VIDEOS}

Voice rules:
- Poetic, warm, unhurried. Never clinical or diagnostic.
- Speak to someone winding down. Invitational, not instructional.
- Never give medical advice. Never say "you should" or "you need to."
- The portrait should feel like something they'd want to screenshot.`;

export async function POST(req: NextRequest) {
  /* ── Rate limit ── */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You've asked a lot of the night. Rest a moment and try again." },
      { status: 429 }
    );
  }

  /* ── Parse + validate ── */
  let answers: Record<string, string> = {};
  try {
    ({ answers = {} } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const answerCount = Object.values(answers).filter(Boolean).length;
  if (answerCount < 4) {
    return NextResponse.json(
      { error: "Please answer all four questions." },
      { status: 400 }
    );
  }

  /* ── Format answers for the prompt ── */
  const formatted = Object.entries(answers)
    .map(([q, a]) => `${q}: ${a}`)
    .join("\n");

  /* ── Anthropic API call ── */
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set");
    return NextResponse.json(
      { error: "The reading is not ready. Try again soon." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model:      "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system:     SYSTEM_PROMPT,
      messages: [
        {
          role:    "user",
          content: `Here are my quiz answers:\n${formatted}`,
        },
      ],
    });

    const raw =
      message.content[0].type === "text" ? message.content[0].text.trim() : "";

    /* ── Parse structured response ── */
    const get = (label: string) => {
      const match = raw.match(new RegExp(`${label}:\\s*(.+?)(?=\\n[A-Z]+:|$)`, "s"));
      return match ? match[1].trim() : "";
    };

    const archetype = get("ARCHETYPE");
    const portrait  = get("PORTRAIT");
    // Strip any surrounding quotes the model may add to the title
    const video     = get("VIDEO").replace(/^["'"'"]+|["'"'"]+$/g, "").trim();
    const reason    = get("REASON");

    if (!archetype || !portrait || !video || !reason) {
      console.error("Unexpected response format:", raw);
      return NextResponse.json(
        { error: "The reading came back unclear. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ archetype, portrait, video, reason }, { status: 200 });

  } catch (err) {
    console.error("Anthropic API error:", err);
    return NextResponse.json(
      { error: "Something stirred in the dark. Try again in a moment." },
      { status: 502 }
    );
  }
}
