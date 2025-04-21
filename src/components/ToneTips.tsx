// src/components/ToneTips.tsx
// ───────────────────────────
export default function ToneTips() {
  return (
    <section className="space-y-4" id="tone">
      <h2 className="text-2xl font-semibold">Tone &amp; Delivery</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Calm volume</strong> – speak clearly enough for body‑cams.
        </li>
        <li>
          <strong>Open posture</strong> – hands visible; avoid sudden moves.
        </li>
        <li>
          <strong>Non‑accusatory framing</strong> – optional preface “Officer, I
          was taught to say this…”.
        </li>
        <li>
          <strong>Stop talking afterwards</strong> – silence completes the
          invocation.
        </li>
      </ul>
    </section>
  );
}
