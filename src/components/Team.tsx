"use client";

import { team, type Member } from "@/data/team";
import { sectionDefaults, type SectionHeadingData } from "@/data/sections";
import SectionHeading from "./SectionHeading";
import TeamCoverflow from "./TeamCoverflow";

export default function Team({
  members = team,
  heading = sectionDefaults.team,
}: {
  members?: Member[];
  heading?: SectionHeadingData;
}) {
  return (
    <section id="team" className="relative scroll-mt-24 bg-surface py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          kicker={heading.kicker}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        <div className="mt-12">
          <TeamCoverflow members={members} />
        </div>
      </div>
    </section>
  );
}
