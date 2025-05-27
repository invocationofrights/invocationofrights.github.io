// ──────────────────────────────────────────────
// File: src/lib/legalCases.ts
// ──────────────────────────────────────────────

export interface LegalCase {
  id: string;
  title: string;
  holding: string;
  scriptLine: string;
  slug: string;
}

export const CASES: LegalCase[] = [
  {
    id: 'berghuis',
    title: 'Berghuis v. Thompkins (2010)',
    holding:
      'Silence alone does not invoke the Fifth Amendment; an explicit verbal invocation is required.',
    scriptLine: 'I invoke my right to remain silent.',
    slug: 'berghuis-v-thompkins-2010',
  },
  {
    id: 'salinas',
    title: 'Salinas v. Texas (2013)',
    holding:
      'Pre-custodial silence may be used as evidence unless the right is explicitly invoked.',
    scriptLine: 'I invoke my right to remain silent.',
    slug: 'salinas-v-texas-2013',
  },
  {
    id: 'davis',
    title: 'Davis v. United States (1994)',
    holding:
      'An ambiguous mention of counsel is insufficient; request must be clear and unequivocal.',
    scriptLine: 'I invoke my right to a lawyer.',
    slug: 'davis-v-united-states-1994',
  },
  {
    id: 'edwards',
    title: 'Edwards v. Arizona (1981)',
    holding:
      'Once counsel is clearly requested, officers must cease questioning until counsel is present.',
    scriptLine: 'I invoke my right to a lawyer.',
    slug: 'edwards-v-arizona-1981',
  },
  {
    id: 'schneckloth',
    title: 'Schneckloth v. Bustamonte (1973)',
    holding:
      'Consent to search must be voluntary, but silence or compliance can be construed as permission.',
    scriptLine: 'I do not consent to any searches.',
    slug: 'schneckloth-v-bustamonte-1973',
  },
  {
    id: 'bostick',
    title: 'Florida v. Bostick (1991)',
    holding:
      'Passive compliance during questioning may constitute valid consent.',
    scriptLine: 'I do not consent to any searches.',
    slug: 'florida-v-bostick-1991',
  },
  {
    id: 'royer',
    title: 'Florida v. Royer (1983)',
    holding:
      'Officers exceeded the bounds of a consensual encounter, creating an unlawful detention.',
    scriptLine: 'Am I free to go?',
    slug: 'florida-v-royer-1983',
  },
  {
    id: 'terry',
    title: 'Terry v. Ohio (1968)',
    holding:
      'Brief investigatory stops require reasonable suspicion and are limited in scope.',
    scriptLine: 'Am I free to go?',
    slug: 'terry-v-ohio-1968',
  },
  {
    id: 'hiibel',
    title: 'Hiibel v. Sixth Judicial District (2004)',
    holding:
      'States may mandate identification during lawful stops under stop-and-identify statutes.',
    scriptLine: 'Compatibility with ID duties.',
    slug: 'hiibel-v-sixth-judicial-2004',
  },
];
