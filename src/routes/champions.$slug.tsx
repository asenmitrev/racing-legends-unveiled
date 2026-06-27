import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { champions, getChampion } from "@/data/champions";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/champions/$slug")({
  loader: ({ params }) => {
    const champion = getChampion(params.slug);
    if (!champion) throw notFound();
    return { champion };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.champion;
    if (!c) {
      return {
        meta: [
          { title: "Champion not found — Apex Legends" },
          { name: "description", content: "This Formula 1 World Champion is not in the archive." },
        ],
      };
    }
    const title = `${c.name} — ${c.titles}× F1 World Champion`;
    const description = c.short;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(c.image
          ? [
              { property: "og:image", content: c.image },
              { name: "twitter:image", content: c.image },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: NotFoundChampion,
  component: ChampionPage,
});

function NotFoundChampion() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <div className="px-6 py-32 max-w-3xl mx-auto text-center">
        <div className="font-mono text-primary text-xs mb-4 uppercase tracking-widest">
          / RECORD NOT FOUND
        </div>
        <h1 className="font-display text-6xl uppercase italic mb-6">
          No such champion
        </h1>
        <p className="text-muted-foreground mb-8">
          This driver isn't in the archive of F1 World Champions.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary"
        >
          ← Back to archive
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function ChampionPage() {
  const { champion: c } = Route.useLoaderData();
  const idx = champions.findIndex((x) => x.slug === c.slug);
  const prev = champions[idx - 1];
  const next = champions[idx + 1];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">
          <div className="lg:col-span-7 p-6 md:p-12 lg:p-16 flex flex-col justify-end relative">
            <div className="font-mono text-primary text-xs mb-6 flex items-center gap-2 uppercase tracking-widest">
              <span className="size-1.5 bg-primary rounded-full" />
              World Champion / {c.titleYears.join(" · ")}
            </div>
            <h1 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.85] uppercase italic text-balance">
              {c.name}
            </h1>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border pt-8">
              <Stat label="Titles" value={String(c.titles).padStart(2, "0")} />
              <Stat label="Race Wins" value={String(c.wins)} />
              <Stat label="Pole Positions" value={String(c.poles)} />
              <Stat label="Nationality" value={c.countryCode} />
            </div>
          </div>
          <div className="lg:col-span-5 relative bg-surface min-h-[300px]">
            {c.image ? (
              <img
                src={c.image}
                alt={`${c.name} helmet`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="font-display text-[12rem] leading-none italic text-primary/20">
                    {c.titles}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-4">
                    World Titles
                  </div>
                </div>
              </div>
            )}
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-primary flex flex-col items-end uppercase tracking-widest">
              <span>FILE / {c.slug.toUpperCase()}</span>
              <span>BORN / {c.born}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="px-6 py-24 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-primary font-mono text-[10px] text-primary-foreground uppercase tracking-widest mb-8">
            Biography
          </div>
          <p className="font-display text-3xl md:text-4xl uppercase italic leading-tight mb-12 text-balance">
            {c.short}
          </p>
          <div className="space-y-6 text-lg text-foreground/85 leading-relaxed">
            {c.bio.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="px-6 py-16 border-b border-border bg-surface">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Title Years
            </div>
            <div className="font-display text-3xl uppercase italic">
              {c.titleYears.join(" · ")}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Championship Teams
            </div>
            <div className="font-display text-3xl uppercase italic">
              {c.teams.join(" · ")}
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-3">
              Country
            </div>
            <div className="font-display text-3xl uppercase italic">
              {c.country}
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="px-6 py-12 border-b border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
          {prev ? (
            <Link
              to="/champions/$slug"
              params={{ slug: prev.slug }}
              className="group flex flex-col gap-2 p-6 border border-border hover:border-primary transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                ← Previous
              </span>
              <span className="font-display text-2xl uppercase italic group-hover:text-primary transition-colors">
                {prev.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to="/champions/$slug"
              params={{ slug: next.slug }}
              className="group flex flex-col gap-2 p-6 border border-border hover:border-primary transition-colors text-right items-end"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Next →
              </span>
              <span className="font-display text-2xl uppercase italic group-hover:text-primary transition-colors">
                {next.name}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
        {label}
      </div>
      <div className="font-display text-3xl md:text-4xl uppercase italic">
        {value}
      </div>
    </div>
  );
}
