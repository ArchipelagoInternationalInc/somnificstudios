import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/* ── Rate limit: 10 requests per IP per 10 min ────────────────────────────
   Higher ceiling than newsletter — this is interactive, not a form submit.
   TODO: replace with Redis / Upstash KV before high-traffic launch.        */
const ratemap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT   = 10;
const RATE_WINDOW  = 10 * 60 * 1000;

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

/* ── Somnific voice system prompt ─────────────────────────────────────────
   This is the only place the voice is defined. Keep it here, never on the
   client. Adjust tone / length here without touching the UI.               */
const SYSTEM_PROMPT = `You are the poetic voice of Somnific Studios — a sleep and meditation channel created by Madelyn Greco. Your role is to gently receive whatever word or feeling a visitor brings to the threshold of sleep, and offer a brief, beautiful response that feels like an invitation to dream.

Respond with exactly 2–3 sentences. No more.

Your voice is:
- Poetic, atmospheric, and unhurried
- Warm but never saccharine
- Grounded in the sensory world of night: breath, water, dusk, stars, quiet rooms
- An invitation or gentle observation, never advice or instruction
- Evocative of the liminal space between waking and sleep

What you never do:
- Give medical, clinical, or therapeutic advice
- Diagnose, prescribe, or suggest treatment
- Use the word "sleep" as a verb-command ("try to sleep," "sleep well")
- Be overly cheerful or positive ("That's great!")
- Use hashtags, emojis, or conversational filler

The output should be beautiful enough that someone would want to screenshot it and share it. Write each response as if it were a small poem — not rhyming, but lyrical.`;

export async function POST(req: NextRequest) {
  /* ── Rate limit ────────────────────────────────────────────────────── */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You've asked a lot of the night. Rest a moment and try again." },
      { status: 429 }
    );
  }

  /* ── Parse + validate ─────────────────────────────────────────────── */
  let word = "";
  try {
    ({ word = "" } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const trimmed = word.trim().slice(0, 80); // cap at 80 chars
  if (!trimmed) {
    return NextResponse.json(
      { error: "Bring one word — or one feeling." },
      { status: 400 }
    );
  }

  /* ── Anthropic API call ───────────────────────────────────────────── */
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set");
    return NextResponse.json(
      { error: "The dream is not yet ready. Try again soon." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model:      "claude-haiku-4-5-20251001",
      max_tokens: 200,
      system:     SYSTEM_PROMPT,
      messages: [
        {
          role:    "user",
          content: trimmed,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text.trim() : "";

    if (!text) {
      return NextResponse.json(
        { error: "The dream slipped away. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: text }, { status: 200 });

  } catch (err) {
    console.error("Anthropic API error:", err);
    return NextResponse.json(
      { error: "Something stirred in the dark. Try again in a moment." },
      { status: 502 }
    );
  }
}
