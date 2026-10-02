import Image from 'next/image'

type Photo = {
  src: string
  alt: string
  className?: string
}

export default function PhotoMosaic({
  title,
  eyebrow,
  photos,
}: {
  title: string
  eyebrow?: string
  photos: Photo[]
}) {
  return (
    <section className="my-14 md:my-20">
      <div className="text-center mb-8 md:mb-10">
        {eyebrow ? (
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.28em] text-[#EB89B5] mb-3">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl md:text-4xl font-bold text-[#7A2454] tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className={`relative overflow-hidden rounded-2xl bg-[#FFD7E9] border border-[#EB89B5]/20 shadow-[0_16px_40px_-28px_rgba(122,36,84,0.4)] ${photo.className || 'aspect-[4/5]'}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
