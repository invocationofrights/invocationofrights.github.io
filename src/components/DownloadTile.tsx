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
      data-resource-id={resourceId}
      target="_blank"
      rel="noopener"
      className="group block border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md"
    >
      {/* thumb wrapper keeps ratio; inner Image uses object-contain */}
      <div className="relative w-full aspect-[3/2] bg-neutral-100">
        <Image
          src={thumb}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-contain"
        />
      </div>

      <div className="p-3 text-sm font-medium group-hover:underline">
        {title}
      </div>
    </a>
  );
}
