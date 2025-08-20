import { projects } from "@/data/projects";
import { useContent } from "@/hooks/use-content";

const backgroundWave = "/backgound-wave.jpg";

export default function ProjectCarousel() {
  const { data: content, isLoading } = useContent();

  if (isLoading || !content) {
    return (
      <div className="relative overflow-hidden">
        <div className="animate-pulse flex space-x-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-none w-[400px] h-[280px] bg-gray-200 rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Use content projects if available, otherwise fallback to projects.ts
  const allProjects = content.projects && content.projects.length > 0 ? content.projects : projects;
  const featuredProjects = allProjects.filter(
    (project: any) => project.featured,
  );

  return (
    <div className="relative overflow-hidden">
      {/* Seamless Infinite Scrolling Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex space-x-4 project-carousel-scroll">
          {/* Quintuple the projects for ultra-smooth seamless loop */}
          {[
            ...featuredProjects,
            ...featuredProjects,
            ...featuredProjects,
            ...featuredProjects,
            ...featuredProjects,
          ].map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className="flex-none cursor-pointer"
              onClick={() => window.open(project.projectUrl || "#", "_blank")}
            >
              {/* Simple image without laptop frame - just clean photos with gray border */}
              <div className="relative w-[500px] h-[380px] lg:desktop-w-400 lg:desktop-h-280 rounded overflow-hidden shadow-2xl border-2 border-white-800">
                <img
                  src={project.imageUrl}
                  alt={`${project.title} website`}
                  className="w-full h-full object-cover"
                />
                {/* Subtle shadow enhancement */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-80 h-8 bg-black/20 rounded-full blur-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays - dihapus agar full width */}
      </div>
    </div>
  );
}