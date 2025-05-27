// src/app/why/page.tsx

import Link from 'next/link';

export default function WhyPage() {
  return (
    <section className="prose dark:prose-invert">
      <h1>Why This Exists</h1>

      {/* 1. Problem statement */}
      <h2>Rights beyond reach</h2>
      <p>
        Constitutional protections mean little if a person waives them without
        realizing it. Studies show that most civilians—under stress, confusion,
        or social pressure—talk to police after Miranda, agree to “consensual”
        searches, and never clarify whether they are free to leave. In other
        words, the rights that matter most are also the rights most frequently
        lost at the roadside or station.
      </p>

      {/* 2. A single, tractable solution */}
      <h2>The four-line Invocation</h2>
      <p>
        We focus on the four protections that are both
        most often waived and simplest to lock in with one sentence each:
      </p>
      <ul>
        <li>Silence — “I am invoking my right to remain silent.”</li>
        <li>Counsel — “I want an attorney.”</li>
        <li>No search — “I do not consent to any searches.”</li>
        <li>Freedom to leave — “Am I free to go?”</li>
      </ul>
      <p>
        Standardizing this wording does for civilians what the
        Miranda script did for officers: it creates a shared baseline that
        courts immediately recognize.
      </p>

      {/* 3. Why centralize multiple projects */}
      <h2>Why one script powers many projects</h2>
      <ul>
        <li>
          <strong>Consistency fuels culture.</strong> Wallet cards, lock-screen
          graphics, role-play drills, and officer-training modules all reinforce
          the same lines, preventing message drift.
        </li>
        <li>
          <strong>Measurable impact.</strong> Uniform language lets researchers
          and agencies track invocation rates—​for example, by scanning body-cam
          transcripts for the exact phrases.
        </li>
        <li>
          <strong>Scalable ecosystem.</strong> Educators, public defenders,
          translators, and YouTubers can plug into a shared standard instead of
          reinventing phrasing.
        </li>
      </ul>

      {/* 4. System-wide benefits */}
      <h2>Who benefits</h2>
      <ul>
        <li>
          <strong>Civilians:</strong> clear, stress-proof protection and a
          cleaner evidentiary record.
        </li>
        <li>
          <strong>Officers:</strong> immediate clarity on encounter boundaries,
          reducing liability and courtroom disputes.
        </li>
        <li>
          <strong>Courts &amp; prosecutors:</strong> fewer ambiguous transcripts
          and simpler suppression analysis.
        </li>
        <li>
          <strong>Researchers &amp; policymakers:</strong> data streams that
          enable cost-benefit studies and iterative improvement.
        </li>
      </ul>

      {/* 5. Vision */}
      <h2>From tool to civic habit</h2>
      <p>
        The long-term vision is a cultural norm as ordinary as buckling a
        seatbelt: a brief, polite invocation that people, officers, and judges
        all expect—and that consistently protects everyone’s rights.
      </p>

      {/* 6. Call to action */}
      <h2>Take the next step</h2>
      <ul>
        <li>
          <Link href="/how-to">Learn the script in under a minute</Link>
        </li>
        <li>
          <Link href="/resources">Download shareable resources</Link>
        </li>
        <li>
          <Link href="/get-involved">Collaborate on pilots or research</Link>
        </li>
      </ul>
    </section>
  );
}
