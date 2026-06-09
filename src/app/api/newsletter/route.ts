import { NextRequest, NextResponse } from "next/server";

const BREVO_CONTACTS = "https://api.brevo.com/v3/contacts";

/* Simple in-memory rate limit: max 3 submissions per IP per 10 min.
   Works for a single-instance dev/small-traffic deployment.
   TODO: replace with Redis / Upstash KV before high-traffic launch. */
const ratemap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ratemap.get(ip);
  if (!entry || now > entry.reset) {
    ratemap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  /* ── Rate limit ── */
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes." },
      { status: 429 }
    );
  }

  /* ── Parse + validate ── */
  let name = "";
  let email = "";
  try {
    ({ name = "", email = "" } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const trimmedEmail = email.trim().toLowerCase();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(trimmedEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  /* ── Brevo API call ── */
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID) || 3;

  if (!apiKey) {
    console.error("BREVO_API_KEY is not set");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  const payload = {
    email: trimmedEmail,
    attributes: {
      FIRSTNAME: name.trim() || undefined,
    },
    listIds: [listId],
    updateEnabled: true,   /* idempotent: updating an existing contact → 204 */
  };

  let brevoRes: Response;
  try {
    brevoRes = await fetch(BREVO_CONTACTS, {
      method: "POST",
      headers: {
        accept:         "application/json",
        "content-type": "application/json",
        "api-key":      apiKey,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Brevo fetch failed:", err);
    return NextResponse.json(
      { error: "Could not reach subscription service. Try again soon." },
      { status: 503 }
    );
  }

  /* 201 = new contact created; 204 = existing contact updated */
  if (brevoRes.status === 201 || brevoRes.status === 204) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  /* Surface Brevo's error message in dev, hide it in production */
  const errBody = await brevoRes.json().catch(() => ({}));
  console.error(`Brevo ${brevoRes.status}:`, errBody);

  return NextResponse.json(
    { error: "Subscription failed. Please try again." },
    { status: 502 }
  );
}
