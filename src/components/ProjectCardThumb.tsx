import { projectThumbnails } from "@/components/ProjectThumbs";

export default function ProjectCardThumb({ index }: { index: number }) {
  const Thumb = projectThumbnails[index];
  if (!Thumb) return null;

  return (
    <div className="relative h-[300px] w-full sm:h-[380px]">
      {/* Back-left image — tilted */}
      <div
        className="absolute left-[2%] top-[18%] w-[55%] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 transition-transform duration-700 group-hover:translate-x-[-4%] group-hover:translate-y-[-2%]"
        style={{
          transform: "perspective(800px) rotateY(12deg) rotateX(-2deg) rotate(-3deg)",
          transformOrigin: "center center",
        }}
      >
        <div className="project-thumb aspect-[16/10]">
          <Thumb />
        </div>
      </div>

      {/* Back-right image — tilted opposite */}
      <div
        className="absolute right-[2%] top-[8%] w-[52%] overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 transition-transform duration-700 group-hover:translate-x-[4%] group-hover:translate-y-[-2%]"
        style={{
          transform: "perspective(800px) rotateY(-10deg) rotateX(2deg) rotate(2deg)",
          transformOrigin: "center center",
        }}
      >
        <div className="project-thumb aspect-[16/10]">
          <Thumb />
        </div>
      </div>

      {/* Front-center main image — slightly raised, larger */}
      <div
        className="absolute bottom-0 left-[10%] w-[60%] overflow-hidden rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/15 transition-transform duration-700 group-hover:scale-105 group-hover:translate-y-[-4%]"
        style={{
          transform: "perspective(800px) rotateY(8deg) rotateX(-3deg)",
          transformOrigin: "bottom center",
          zIndex: 3,
        }}
      >
        <div className="project-thumb aspect-[16/10]">
          <Thumb />
        </div>
      </div>

      {/* Small floating card — top right accent */}
      <div
        className="absolute right-[8%] bottom-[15%] w-[38%] overflow-hidden rounded-lg shadow-xl ring-1 ring-white/10 transition-transform duration-700 group-hover:translate-x-[3%] group-hover:translate-y-[2%]"
        style={{
          transform: "perspective(800px) rotateY(-14deg) rotateX(4deg) rotate(1deg)",
          transformOrigin: "center center",
          zIndex: 4,
        }}
      >
        <div className="project-thumb aspect-[16/10]">
          <Thumb />
        </div>
      </div>
    </div>
  );
}
