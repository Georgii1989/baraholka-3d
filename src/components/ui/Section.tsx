import { cn } from "@/lib/cn";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  tone = "dark",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const isLight = tone === "light";

  return (
    <section
      id={id}
      className={cn(
        "relative px-4 py-24 md:px-8",
        isLight && "section-light",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <p
            className={cn(
              "mb-3 text-xs font-semibold tracking-[0.22em] uppercase",
              isLight ? "text-[#4f7cff]" : "text-[#b6ff3b]",
            )}
          >
            {eyebrow}
          </p>
          <h2
            className={cn(
              "font-display text-3xl font-bold tracking-tight md:text-5xl",
              isLight ? "text-[#0b1020]" : "text-white",
            )}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={cn(
                "mt-4 text-base leading-relaxed md:text-lg",
                isLight ? "text-[#4b5568]" : "text-white/60",
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
