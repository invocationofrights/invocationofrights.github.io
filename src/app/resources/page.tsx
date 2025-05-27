// ---------------------------------------------
// File: src/app/resources/page.tsx
// ---------------------------------------------

import SectionHeading from "@/components/SectionHeading";
import DownloadTile from "@/components/DownloadTile";
import NewsletterForm from "@/components/NewsletterForm";

const quickDownloads = [
  {
    title: "Wallet Card – PDF (EN)",
    thumb: "/images/wallet_card_front-en.svg",
    href: "/downloads/wallet_card_en.pdf",
    resourceId: "wallet_card_en_pdf",
  },
  {
    title: "Wallet Card – SVG (EN)",
    thumb: "/images/wallet_card_front-en.svg",
    href: "/images/wallet_card_front-en.svg",
    resourceId: "wallet_card_en_svg",
  },
  // {
  //   title: "Lock‑screen 9×16 (EN)",
  //   thumb: "/thumbs/lockscreen_9x16_en.png",
  //   href: "/downloads/lockscreen_9x16_en.png",
  //   resourceId: "lockscreen_9x16_en_png",
  // },
  // {
  //   title: "Flyer – US Letter (EN)",
  //   thumb: "/thumbs/flyer_en.png",
  //   href: "/downloads/flyer_en.pdf",
  //   resourceId: "flyer_en_pdf",
  // },
  // …add the rest later …
];

export default function ResourcesPage() {
  return (
    <section className="prose dark:prose-invert max-w-none">
      {/* Hero */}
      <header className="text-center space-y-4 mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          Download &amp; Share <br className="sm:hidden" /> Invocation Resources
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Wallet cards, lock‑screens, teaching decks, research kits — everything
          you need to spread the four‑line script.
        </p>
      </header>

      {/* Quick downloads */}
      <SectionHeading id="quick">Quick Downloads</SectionHeading>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickDownloads.map((d) => (
          <DownloadTile key={d.resourceId} {...d} />
        ))}
      </div>

      {/* Teaching Toolkit */}
      {/*<SectionHeading id="teaching">Teaching Toolkit</SectionHeading>*/}
      {/*<p>*/}
      {/*  Ready‑to‑use slides, role‑play guides, and a 5‑minute explainer video*/}
      {/*  make classroom or community training turnkey.*/}
      {/*</p>*/}
      {/*<ul className="list-disc pl-5">*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/teaching_deck.pdf"*/}
      {/*      data-resource-id="teaching_deck_pdf"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Slide deck (PDF)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/roleplay_guide.pdf"*/}
      {/*      data-resource-id="roleplay_guide_pdf"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Role‑play guide (PDF)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="https://youtu.be/your‑video"*/}
      {/*      data-resource-id="explainer_video_youtube"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      5‑min explainer video (YouTube)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*</ul>*/}

      {/*/!* Research kit *!/*/}
      {/*<SectionHeading id="research">Pilot / Research Kit</SectionHeading>*/}
      {/*<p>*/}
      {/*  Planning a mock‑stop study or field trial? Download protocols and data*/}
      {/*  templates, or <a href="mailto:info@invocationofrights.org">contact us</a>{" "}*/}
      {/*  to co‑design a pilot.*/}
      {/*</p>*/}
      {/*<ul className="list-disc pl-5">*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/mock_stop_protocol.pdf"*/}
      {/*      data-resource-id="mock_stop_protocol_pdf"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Mock‑stop protocol (PDF)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/data_sheet.csv"*/}
      {/*      data-resource-id="data_sheet_csv"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Data‑collection sheet (CSV)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/irb_template.docx"*/}
      {/*      data-resource-id="irb_template_docx"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      IRB template (DOCX)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*</ul>*/}

      {/*/!* Brand assets *!/*/}
      {/*<SectionHeading id="brand">Brand &amp; Design Assets</SectionHeading>*/}
      {/*<ul className="list-disc pl-5">*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/logo.svg"*/}
      {/*      data-resource-id="logo_svg"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Logo (SVG)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/brand_palette.pdf"*/}
      {/*      data-resource-id="brand_palette_pdf"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Colour palette &amp; typography (PDF)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/usage_rules.png"*/}
      {/*      data-resource-id="usage_rules_png"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Usage rules (PNG)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*</ul>*/}

      {/*/!* Legal / reference *!/*/}
      {/*<SectionHeading id="legal">Legal &amp; Reference</SectionHeading>*/}
      {/*<ul className="list-disc pl-5">*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/docs/invocation_whitepaper.pdf"*/}
      {/*      data-resource-id="whitepaper_pdf"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Full white‑paper (PDF)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/caselaw_cheatsheet.pdf"*/}
      {/*      data-resource-id="caselaw_cheatsheet_pdf"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Case‑law cheat‑sheet (PDF)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*  <li>*/}
      {/*    <a*/}
      {/*      href="/downloads/licence_notice.txt"*/}
      {/*      data-resource-id="licence_notice_txt"*/}
      {/*      target="_blank"*/}
      {/*      rel="noopener"*/}
      {/*    >*/}
      {/*      Licence notice (CC‑BY‑NC 4.0)*/}
      {/*    </a>*/}
      {/*  </li>*/}
      {/*</ul>*/}

      {/* Contribute / stay updated */}
      <SectionHeading id="contribute">Contribute &amp; Stay Updated</SectionHeading>
      <p>
        Help translate materials, pilot new formats, or just stay in the loop.
        Join the newsletter or open a PR.
      </p>
      <NewsletterForm />

      <footer className="text-xs text-neutral-500 mt-16 border-t pt-6">
        These materials are educational and provided under CC‑BY‑NC 4.0. They
        are <strong>not</strong> legal advice.
      </footer>
    </section>
  );
}
