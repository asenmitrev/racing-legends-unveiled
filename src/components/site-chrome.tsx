import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
      <Link
        to="/"
        className="font-display text-2xl tracking-tighter uppercase italic"
      >
        Masters of Puppets
      </Link>
      <div className="flex gap-4 sm:gap-8 text-[10px] font-mono uppercase tracking-widest">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: "text-primary" }}
          className="hover:text-primary transition-colors"
        >
          01 / Champions
        </Link>
        <Link
          to="/archive"
          activeProps={{ className: "text-primary" }}
          className="hover:text-primary transition-colors"
        >
          02 / Archive
        </Link>
        <Link
          to="/about"
          activeProps={{ className: "text-primary" }}
          className="hover:text-primary transition-colors"
        >
          03 / About
        </Link>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="p-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="font-display text-xl uppercase italic">
        Masters of Puppets // 1950–2024
      </div>
      <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
        &copy; Apex Motors Archive // Built for the pursuit of speed
      </div>
    </footer>
  );
}
