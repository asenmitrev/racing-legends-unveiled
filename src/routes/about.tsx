import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Masters of Puppets" },
      {
        name: "description",
        content:
          "Masters of Puppets is an editorial archive of every Formula 1 World Champion since 1950.",
      },
      { property: "og:title", content: "About — Masters of Puppets" },
      {
        property: "og:description",
        content:
          "An editorial archive of every Formula 1 World Champion since 1950.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <section className="px-6 py-20 border-b border-border">
        <div className="font-mono text-primary text-xs mb-4 uppercase tracking-widest">
          / About the project
        </div>
        <h1 className="font-display text-6xl md:text-8xl uppercase italic text-balance">
          For the pursuit of speed
        </h1>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto space-y-6 text-lg text-foreground/85 leading-relaxed">
          <p>
            Masters of Puppets is an editorial archive dedicated to the thirty-four
            men who have won the Formula 1 World Drivers' Championship.
          </p>
          <p>
            From Giuseppe Farina at Silverstone in May 1950 to Max Verstappen
            in the hybrid era, every champion has a story — of speed,
            engineering, courage, rivalry, and at times tragedy. We have
            collected those stories in one place.
          </p>
          <p>
            This is a tribute, not a sanctioned publication. All trademarks,
            team names, and circuit names remain the property of their
            respective owners.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
