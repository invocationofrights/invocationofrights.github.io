// ---------------------------------------------
// File: src/components/DownloadTile.tsx
// ---------------------------------------------
"use client";

import Image from "next/image";
import logger from "@/lib/logger";
import React from "react";

interface DownloadTileProps {
  title: string;
  thumb: string; // public path to a small preview image
  href: string; // asset url (pdf, png, etc.)
  resourceId: string; // unique id for analytics
}

export default function DownloadTile({ title, thumb, href, resourceId }: DownloadTileProps) {
  const handleClick = () => {
    // fire GTM/GA event – degrades gracefully if dataLayer missing
    if (typeof window !== "undefined") {
      window.dataLayer?.push({
        event: "resource_download",
        resource_id: resourceId,
      });
    }
    logger.info("resource_download", { resource_id: resourceId });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={handleClick}
      className="group block rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="relative w-full aspect-[4/3] mb-3">
        <Image
          src={thumb}
          alt="Preview of resource"
          className="rounded-md object-cover"
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <span className="font-medium group-hover:text-blue-600">{title}</span>
    </a>
  );
}
