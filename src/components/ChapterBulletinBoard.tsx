/** Weekly chapter notes. Swap these out as new accomplishments come in. */
const NOTES: {
  chapter: string
  line: string
  handle: string
  paper: string
  tilt: string
  nudge: string
  washi?: boolean
  heart?: boolean
}[] = [
  {
    chapter: 'WHS',
    line: 'Donated 4,500+ books and educational supplies to 5 shelters.',
    handle: 'whs_hereducation',
    paper: '#FFF6F4',
    tilt: '-3.4deg',
    nudge: 'lg:mt-2',
    washi: true,
  },
  {
    chapter: 'AHS',
    line: 'Collected 500+ clothing items and donated them to 6 shelters.',
    handle: 'ahs_hereducationrequired',
    paper: '#FDE4EE',
    tilt: '2.6deg',
    nudge: 'lg:mt-9',
  },
  {
    chapter: 'SBHS',
    line: 'Planning their first statewide event.',
    handle: 'sb.hereducationrequired',
    paper: '#FFF1E4',
    tilt: '-2.1deg',
    nudge: 'lg:mt-1',
    washi: true,
  },
  {
    chapter: 'CVU',
    line: "Taught 70+ 7th and 8th graders women's history, from suffrage to today.",
    handle: 'cvu_hereducationrequired',
    paper: '#FFFDF8',
    tilt: '3deg',
    nudge: 'lg:mt-8',
  },
  {
    chapter: 'Bolles',
    line: 'Raised $200+ for the scholarship fund.',
    handle: 'h.e.r_bolleschapter',
    paper: '#F8D5E4',
    tilt: '-2.4deg',
    nudge: 'lg:mt-0',
    washi: true,
  },
  {
    chapter: 'Missouri',
    line: 'Donated 100+ bookmarks for the History by HER initiative.',
    handle: 'fhs_hereducationrequired',
    paper: '#FFF8F2',
    tilt: '2.2deg',
    nudge: 'lg:mt-7',
  },
  {
    chapter: 'MVHS',
    line: 'Hosted a Friendsgiving',
    handle: 'mvhs_herclub',
    paper: '#FDE8D8',
    tilt: '-1.5deg',
    nudge: 'lg:mt-2',
    heart: true,
    washi: true,
  },
  {
    chapter: 'Bothell',
    line: 'Hosting their first meeting!',
    handle: 'bothell_her.educationrequired',
    paper: '#F9C9DA',
    tilt: '2.8deg',
    nudge: 'lg:mt-8',
  },
]

const HEARTS: {
  top?: string
  bottom?: string
  left?: string
  right?: string
  rotate: string
  color: string
  size: number
}[] = [
  { top: '7%', left: '4%', rotate: '-16deg', color: '#F4A8C2', size: 30 },
  { top: '11%', right: '5%', rotate: '12deg', color: '#E989B0', size: 22 },
  { top: '48%', left: '1.6%', rotate: '8deg', color: '#F8C4D6', size: 20 },
  { bottom: '8%', left: '44%', rotate: '-10deg', color: '#F4A9C4', size: 26 },
  { bottom: '4%', right: '1.2%', rotate: '14deg', color: '#E57AA6', size: 18 },
]

function BoardBow() {
  return (
    <svg viewBox="0 0 200 156" className="h-[92px] w-[124px] md:h-[118px] md:w-[158px]" aria-hidden>
      <path d="M100 62 C58 16 14 24 20 66 C26 102 68 90 100 66" fill="#F4A9C4" />
      <path d="M100 62 C68 36 34 42 32 68 C40 88 72 80 100 66" fill="#FBD4E4" opacity="0.9" />
      <path d="M100 62 C142 16 186 24 180 66 C174 102 132 90 100 66" fill="#E989B0" />
      <path d="M100 62 C132 36 166 42 168 68 C160 88 128 80 100 66" fill="#F4A9C4" opacity="0.65" />
      <ellipse cx="100" cy="64" rx="14" ry="12" fill="#E06B9A" />
      <ellipse cx="95" cy="59" rx="4.5" ry="3" fill="#FBD4E4" opacity="0.8" />
      <path d="M93 72 C76 102 56 124 42 142" stroke="#F4A9C4" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M107 72 C126 104 148 122 166 140" stroke="#E989B0" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M34 138 l16 6 -6 10 z" fill="#F4A9C4" />
      <path d="M166 134 l-4 14 14 -6 z" fill="#E989B0" />
    </svg>
  )
}

function PaperHeart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 30" className="h-full w-full" aria-hidden>
      <path
        fill={color}
        d="M16 27.2S5.2 20.2 2.2 14.2C.6 10.6 1.6 6.2 5.6 5.2 8.4 4.5 11.2 6 16 10.2 20.8 6 23.6 4.5 26.4 5.2c4 1 5 5.4 3.4 9-3 6-13.8 13-13.8 13z"
      />
    </svg>
  )
}

function StringLights() {
  return (
    <div aria-hidden className="pointer-events-none absolute -top-5 left-1 right-1 h-12 md:-top-6">
      <svg
        className="absolute inset-x-0 top-3 h-8 w-full"
        viewBox="0 0 1000 40"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 10 C 70 30, 130 0, 210 16 S 360 36, 450 12 S 620 2, 730 18 S 880 34, 1000 8"
          stroke="#c6a36a"
          strokeWidth="1.6"
        />
      </svg>
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          className="bulletin-bulb"
          style={{
            left: `${3.5 + i * (93 / 15)}%`,
            top: i % 3 === 0 ? 4 : i % 3 === 1 ? 16 : 9,
            animationDelay: `${(i % 6) * 0.28}s`,
            ...(i % 4 === 2
              ? {
                  background:
                    'radial-gradient(circle at 40% 35%, #fff, #ffd0e4 50%, #f0a0c0)',
                  boxShadow: '0 0 8px 2px rgba(255, 170, 200, 0.7)',
                }
              : null),
          }}
        />
      ))}
    </div>
  )
}

export default function ChapterBulletinBoard() {
  return (
    <section
      className="relative z-30 overflow-visible bg-[#FFFBF3] px-4 pt-2 pb-16 md:px-8 md:pb-24"
      aria-label="Chapter bulletin board"
    >
      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 text-center md:mb-12">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.34em] text-[#EB89B5] md:mb-6 md:text-xs">
            Chapter bulletin
          </p>
          <h2 className="text-2xl font-bold leading-snug text-[#7A2454] sm:text-3xl md:text-4xl">
            Pinned this week
          </h2>
        </header>

        <div className="relative">
          <StringLights />

          <div className="bulletin-board relative">
            <div className="bulletin-fabric" aria-hidden />

            {HEARTS.map((heart, i) => (
              <div
                key={i}
                className="pointer-events-none absolute z-[5]"
                style={{
                  top: heart.top,
                  bottom: heart.bottom,
                  left: heart.left,
                  right: heart.right,
                  width: heart.size,
                  height: heart.size,
                  transform: `rotate(${heart.rotate})`,
                }}
              >
                <span className="bulletin-pin" style={{ top: -6, width: 11, height: 11, marginLeft: -5.5 }} />
                <PaperHeart color={heart.color} />
              </div>
            ))}

            <div className="relative z-10 px-8 pt-5 pb-10 md:px-12 md:pt-6 md:pb-14">
              <div className="mb-1 flex justify-center -mt-8 md:-mt-12">
                <BoardBow />
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {NOTES.map((note) => (
                  <div key={note.chapter} className={`relative hover:z-40 ${note.nudge}`}>
                    <article
                      className="bulletin-note mx-auto w-full max-w-[280px]"
                      style={{ ['--tilt' as string]: note.tilt, ['--paper' as string]: note.paper }}
                    >
                      <span className="bulletin-pin" aria-hidden />
                      {note.washi ? <span className="bulletin-washi" aria-hidden /> : null}
                      <h3 className="bulletin-hand text-[2.05rem] font-bold leading-none text-[#7A2454]">
                        {note.chapter}
                      </h3>
                      <p className="bulletin-hand mt-0.5 text-[1.2rem] leading-tight text-[#7A2454]/75">
                        Her Education Required
                      </p>
                      <p className="bulletin-hand mt-2 text-[1.45rem] leading-snug md:text-[1.5rem]">
                        {note.line}
                        {note.heart ? (
                          <span className="text-[#E45B8A]" aria-label="heart">
                            {' '}
                            ♥
                          </span>
                        ) : null}
                      </p>
                      <a
                        className="bulletin-handle mt-3"
                        href={`https://www.instagram.com/${note.handle}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{note.handle}
                      </a>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
