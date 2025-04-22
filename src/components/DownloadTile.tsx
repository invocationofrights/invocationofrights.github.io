// ---------------------------------------------
// File: src/components/DownloadTile.tsx
// ---------------------------------------------
import Image from 'next/image';

type Props = {
  title: string;
  thumb: string;
  href: string;
  resourceId: string;
};

export default function DownloadTile({
                                       title,
                                       thumb,
                                       href,
                                       resourceId,
                                     }: Props) {
  return (
    <a
      href={href}
      download
      data-resource-id={resourceId}
      rel="noopener"
      className="group flex flex-col border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md"
    >
      {/* preview wrapper: aspect‑ratio + centred content */}
      <div className="relative w-full aspect-[3/2] bg-neutral-100 overflow-hidden flex items-center justify-center">
        <Image
          src={thumb}
          alt={title}
          width={600}        // any size; Next will down‑scale
          height={400}
          className="object-contain object-center w-full h-full"
        />
      </div>

      <figcaption className="p-3 text-sm font-medium group-hover:underline">
        {title}
      </figcaption>
    </a>
  );
}
