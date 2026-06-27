import { createFileRoute, Link } from "@tanstack/react-router";
import { champions } from "@/data/champions";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "The Archive — Every F1 World Champion" },
      {
        name: "description",
        content:
          "A chronological archive of every Formula 1 World Champion, year by year, from 1950 to today.",
      },
      { property: "og:title", content: "The Archive — Every F1 World Champion" },
      {
        property: "og:description",
        content:
          "Every Formula 1 World Champion, year by year, from 1950 to today.",
      },
    ],
  }),
  component: ArchivePage,
});

type Row = { year: number; champion: (typeof champions)[number] };

function ArchivePage() {
  const rows: Row[] = champions
    .flatMap((c) => c.titleYears.map((year) => ({ year, champion: c })))
    .sort((a, b) => b.year - a.year);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="px-6 py-20 border-b border-border">
        <div className="font-mono text-primary text-xs mb-4 uppercase tracking-widest">
          / Chronology
        </div>
        <h1 className="font-display text-6xl md:text-8xl uppercase italic text-balance">
          The Archive
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground text-lg">
          Seventy-five seasons. Thirty-four men. One title each year.
        </p>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto divide-y divide-border border-y border-border">
          {rows.map(({ year, champion: c }) => (
            <Link
              key={`${year}-${c.slug}`}
              to="/champions/$slug"
              params={{ slug: c.slug }}
              className="group grid grid-cols-[80px_1fr_auto] sm:grid-cols-[120px_1fr_auto_auto] gap-4 sm:gap-8 items-center py-6 hover:bg-surface transition-colors px-2"
            >
              <span className="font-display text-3xl sm:text-4xl text-foreground group-hover:text-primary transition-colors">
                {year}
              </span>
              <span className="font-display text-xl sm:text-3xl uppercase italic">
                {c.name}
              </span>
              <span className="hidden sm:block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {c.teams.join(" · ")}
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {c.countryCode}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
