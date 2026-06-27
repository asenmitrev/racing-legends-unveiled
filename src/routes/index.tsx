import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-f1.jpg";
import laudaImg from "@/assets/driver-lauda.jpg";
import { champions, featured } from "@/data/champions";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex Legends — F1 World Champions Archive" },
      {
        name: "description",
        content:
          "An editorial archive of every Formula 1 World Champion, from 1950 to today. Biographies, statistics and stories of the drivers who defined the sport.",
      },
      { property: "og:title", content: "Apex Legends — F1 World Champions Archive" },
      {
        property: "og:description",
        content:
          "Every Formula 1 World Champion in one editorial archive. Biographies, statistics and stories.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const lauda = champions.find((c) => c.slug === "niki-lauda")!;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-end overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Formula 1 car at speed on a night circuit"
          width={1920}
          height={1088}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="relative z-10 w-full px-6 pb-12 animate-reveal">
          <div className="font-mono text-primary text-xs mb-4 flex items-center gap-2">
            <span className="size-1.5 bg-primary animate-pulse rounded-full" />
            LIVE ARCHIVE / SEASON_2024.v3
          </div>
          <h1 className="font-display text-[clamp(4rem,15vw,12rem)] leading-[0.85] uppercase -ml-1 italic text-balance">
            The Masters
            <br />
            Of Speed
          </h1>
          <p className="mt-8 max-w-xl text-base sm:text-lg text-muted-foreground text-pretty">
            Every Formula 1 World Champion since 1950. Thirty-four drivers,
            seventy-five seasons, one obsession — the absolute pursuit of
            velocity.
          </p>
        </div>
      </section>

      {/* Featured Champions */}
      <section className="px-6 py-24">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12">
          <h2 className="font-display text-5xl uppercase italic tracking-tight">
            Featured Icons
          </h2>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            [ Scroll to explore history ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {featured.slice(0, 3).map((d, i) => (
            <Link
              key={d.slug}
              to="/champions/$slug"
              params={{ slug: d.slug }}
              className="group relative aspect-[3/4] overflow-hidden bg-secondary border border-border animate-reveal"
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <img
                src={d.image!}
                alt={`${d.name} helmet`}
                width={800}
                height={1066}
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="font-mono text-primary text-[10px] mb-1 uppercase tracking-widest">
                  {d.titles}× World Champion
                </div>
                <div className="font-display text-3xl uppercase italic">
                  {d.name}
                </div>
                <div className="h-px w-0 group-hover:w-full bg-primary transition-all duration-500 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bio Snippet */}
      <section className="px-6 py-24 border-t border-border bg-surface">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 bg-primary font-mono text-[10px] text-primary-foreground uppercase tracking-widest">
              The Profile
            </div>
            <h3 className="font-display text-6xl md:text-7xl uppercase italic tracking-tighter">
              Niki Lauda
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-[50ch] leading-relaxed">
              Defined by the grit of the Nürburgring and a comeback that defied
              medical science. A technician, a warrior, and the ultimate
              calculating mind of the 1970s grid.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-8">
              <div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                  Championships
                </div>
                <div className="font-display text-3xl">
                  {lauda.titleYears.join(", ")}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                  Teams
                </div>
                <div className="font-display text-3xl">
                  {lauda.teams.join(", ")}
                </div>
              </div>
            </div>
            <Link
              to="/champions/$slug"
              params={{ slug: "niki-lauda" }}
              className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary hover:gap-5 transition-all"
            >
              Read full biography <span>→</span>
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 border border-primary/20 group-hover:border-primary/50 transition-colors" />
            <img
              src={laudaImg}
              alt="Vintage Ferrari racing helmet"
              width={1000}
              height={800}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover relative z-10"
            />
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-primary z-20 flex flex-col items-end">
              <span>DATA_STREAM_ENABLED</span>
              <span>LAT: 47.3333 / LON: 13.3333</span>
            </div>
          </div>
        </div>
      </section>

      {/* Full Archive */}
      <section className="px-6 py-24 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12">
          <h2 className="font-display text-5xl uppercase italic tracking-tight">
            The Complete Archive
          </h2>
          <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            34 Champions / 1950 — 2024
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border border border-border">
          {champions.map((c) => (
            <Link
              key={c.slug}
              to="/champions/$slug"
              params={{ slug: c.slug }}
              className="group relative bg-background hover:bg-surface transition-colors p-6 flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <span className="font-display text-5xl text-foreground/15 group-hover:text-primary transition-colors">
                  {String(c.titleYears[0]).slice(2)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-secondary px-2 py-1">
                  {c.countryCode}
                </span>
              </div>
              <div className="space-y-2 mt-12">
                <div className="font-display text-2xl uppercase italic leading-tight">
                  {c.name}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  {c.titles}× champion · {c.wins} wins
                </div>
              </div>
              <div className="pt-4 border-t border-border flex justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="text-muted-foreground">
                  {c.titleYears.join(" · ")}
                </span>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Marquee Ticker */}
      <section className="border-t border-border py-6 bg-surface overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...Array(2)].flatMap((_, k) => [
            { label: "Most Titles", value: "7 — Schumacher / Hamilton" },
            { label: "Most Wins", value: "105 — Hamilton" },
            { label: "Most Poles", value: "104 — Hamilton" },
            { label: "Youngest Champion", value: "23y — Vettel" },
            { label: "Oldest Champion", value: "46y — Fangio" },
            { label: "Posthumous Title", value: "1970 — Rindt" },
          ].map((item, i) => (
            <div key={`${k}-${i}`} className="flex gap-4 items-center shrink-0">
              <span className="text-primary italic font-bold uppercase text-[10px] tracking-widest font-mono">
                {item.label}
              </span>
              <span className="font-display text-2xl uppercase italic">
                {item.value}
              </span>
            </div>
          )))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
