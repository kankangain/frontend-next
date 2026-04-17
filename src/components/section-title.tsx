import { cn } from "@/lib/utils";

type SectionTitleProps = {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionTitle({ badge, title, description, className }: SectionTitleProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {badge ? (
        <div className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
          {badge}
        </div>
      ) : null}
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description ? <p className="max-w-2xl text-muted-foreground">{description}</p> : null}
    </div>
  );
}
