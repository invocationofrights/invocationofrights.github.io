// ---------------------------------------------
// File: src/components/SectionHeading.tsx
// ---------------------------------------------

import React from "react";

export default function SectionHeading({
                                         id,
                                         children,
                                       }: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-2xl font-semibold tracking-tight text-[--foreground]"
    >
      {children}
    </h2>
  );
}
