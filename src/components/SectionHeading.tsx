import { Reveal } from "./Motion";

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={
        isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"
      }
    >
      <Reveal direction="up">
        <span className={`kicker ${isCenter ? "justify-center" : ""}`}>
          {kicker}
        </span>
      </Reveal>
      <Reveal direction="up" delay={0.08}>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal direction="up" delay={0.16}>
          <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
