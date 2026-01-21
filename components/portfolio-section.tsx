"use client"

import { useState, useEffect } from "react"
import { Eye, X, Download, ExternalLink } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"

interface PortfolioSectionProps {
  data?: typeof portfolioData
}

export function PortfolioSection({ data = portfolioData }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState("level design")
  const [activeProjectFilter, setActiveProjectFilter] = useState("all")
  const [filterType, setFilterType] = useState<"design" | "project">("design")
  const [selectedProject, setSelectedProject] = useState<(typeof data.projects)[0] | null>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [selectedProject])

  const filteredProjects = data.projects.filter((p) => {
    if (filterType === "design") {
      return activeFilter === "all" ? true : p.category === activeFilter
    } else {
      return activeProjectFilter === "all" ? true : p.project === activeProjectFilter
    }
  })

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Portfolio</h2>
          <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={() => {
              setFilterType("design")
              setActiveFilter("all")
            }}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              filterType === "design"
                ? "bg-accent text-accent-foreground shadow-lg"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            카테고리별
          </button>
          <button
            onClick={() => {
              setFilterType("project")
              setActiveProjectFilter("all")
            }}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              filterType === "project"
                ? "bg-accent text-accent-foreground shadow-lg"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            프로젝트별
          </button>
        </div>

        {filterType === "design" ? (
          <div className="flex flex-wrap gap-2 md:gap-3">
            {data.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium capitalize transition-all ${
                  activeFilter === category
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 md:gap-4 items-center">
            {data.projectCategories.map((project) => (
              <button
                key={project}
                onClick={() => setActiveProjectFilter(project)}
                className={`relative transition-all ${
                  activeProjectFilter === project
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-100"
                }`}
                title={project}
              >
                {project === "all" ? (
                  <div className="px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium bg-secondary text-muted-foreground hover:text-foreground">
                    All Projects
                  </div>
                ) : (
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-secondary rounded-xl border border-border flex items-center justify-center p-2 hover:border-accent transition-colors">
                    <img
                      src={data.projectLogos[project as keyof typeof data.projectLogos] || "/placeholder.svg"}
                      alt={project}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10"
            >
              <div className="aspect-[4/3] overflow-hidden bg-background">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent flex flex-col justify-end p-4 md:p-6">
                <div className="text-xs font-medium text-accent/80 mb-1">{project.project}</div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 md:mb-4">{project.title}</h3>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 w-fit px-3 py-1.5 bg-accent text-accent-foreground rounded-md text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
              </div>

              {/* Category Badge - Always visible */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 px-2.5 md:px-3 py-1 md:py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-xs font-medium text-accent capitalize">
                {project.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-6xl h-[90vh] bg-secondary border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and actions */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background/50">
              <div className="flex items-center gap-3">
                <h2 className="text-lg md:text-xl font-bold text-foreground">{selectedProject.title}</h2>
                <span className="px-2 py-0.5 bg-accent/20 border border-accent rounded text-xs font-medium text-accent">
                  {selectedProject.project}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedProject.pdfUrl && (
                  <>
                    <a
                      href={selectedProject.pdfUrl}
                      download
                      className="p-2 bg-background border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <a
                      href={selectedProject.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-background border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-background border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-background">
              {selectedProject.pdfUrl ? (
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedProject.pdfUrl)}&embedded=true`}
                  className="w-full h-full border-0"
                  title={selectedProject.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  PDF 파일이 없습니다
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
