// ──────────────────────────────────────────────
// File: src/app/how-to/page.tsx
// ──────────────────────────────────────────────

import ScriptHero        from '@/components/ScriptHero';
import UsageIcons        from '@/components/UsageIcons';
import ToneTips          from '@/components/ToneTips';
import PracticeDrill     from '@/components/PracticeDrill';
import DisclaimerBox     from '@/components/DisclaimerBox';
// import DownloadsSection  from '@/components/DownloadsSection';
// import SocialProof       from '@/components/SocialProof';
import InvolveTeaser     from '@/components/InvolveTeaser';

export const metadata = {
  title: 'How‑To · Invocation of Rights',
  description:
    'Learn when, why, and how to speak the four‑line script—and practise it right now.',
};

export default function HowToPage() {
  return (
    <article className="space-y-16">
      {/* 0‑1. Hero banner + Script front‑and‑center */}
      <ScriptHero />

      {/* 2. Where / when to use it */}
      <UsageIcons />

      {/* 3. Tone & body‑language tips */}
      <ToneTips />

      {/* 4. 30‑second practice drill */}
      <PracticeDrill />

      {/* 5. Limits / caveats */}
      <DisclaimerBox />

      {/*/!* 6. Downloads & shareables *!/*/}
      {/*<DownloadsSection />*/}

      {/*/!* 7. Social proof *!/*/}
      {/*<SocialProof />*/}

      {/* 8. Get‑involved teaser */}
      <InvolveTeaser />
    </article>
  );
}
