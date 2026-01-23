"use client"

import { useState, useEffect } from "react"
import { X, Download, ExternalLink } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"

interface PortfolioSectionProps {
  data?: typeof portfolioData & {
    projects: Array<{
      title: string
      category: string
      project: string
      image: string
      pdfUrl: string
      description: string
      tech: string[]
    }>
  }
}

export function PortfolioSection({ data }: PortfolioSectionProps) {
  const [activeProject, setActiveProject] = useState<string>("PUBG:NewState")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedPortfolio, setSelectedPortfolio] = useState<any>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPortfolio) {
        setSelectedPortfolio(null)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [selectedPortfolio])

  // Get all projects data from the imported module
  const allProjects = (data?.projects || []) as any[]

  // Get projects for the active project and category filter
  const filteredProjects = allProjects.filter((p) => {
    if (p.project !== activeProject) return false
    if (activeCategory === "all") return true
    return p.category === activeCategory
  })

  // Get project description
  const projectDescription =
    portfolioData.projectDescriptions[activeProject as keyof typeof portfolioData.projectDescriptions] || ""

  const categories = ["all", "level design", "system design", "prototyping"]

  return (
    <>
      <div className="space-y-8 md:space-y-12">
        {/* Title */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Portfolio</h2>
          <div className="w-10 h-1 bg-accent rounded-full" />
        </div>

        {/* Project Filter - Logo Icons */}
        <div className="flex flex-wrap gap-3 md:gap-4 items-center">
          {portfolioData.projectCategories.map((project) => (
            <button
              key={project}
              onClick={() => setActiveProject(project)}
              className={`relative transition-all ${
                activeProject === project ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100"
              }`}
              title={project}
            >
              <div className="w-16 md:w-20 h-16 md:h-20 bg-secondary rounded-xl border border-border flex items-center justify-center p-2 hover:border-accent transition-colors">
                <img
                  src={portfolioData.projectLogos[project as keyof typeof portfolioData.projectLogos] || "/placeholder.svg"}
                  alt={project}
                  className="w-full h-full object-contain"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Project Description */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{activeProject}</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.projectGenres[activeProject as keyof typeof portfolioData.projectGenres]?.map(
                (genre, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-lg text-xs font-medium text-accent"
                  >
                    {genre}
                  </span>
                )
              )}
            </div>
          </div>
          <div className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-wrap">
            {projectDescription.split('\n').map((line, idx) => (
              <div key={idx}>
                {line.split(/__(.+?)__/g).map((part, i) =>
                  i % 2 === 1 ? (
                    <u key={i} className="font-semibold">
                      {part}
                    </u>
                  ) : (
                    part
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Work Section Title */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6">Related Work</h3>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-6 justify-between">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((category) => {
                // Calculate count of projects in this category
                const categoryCount = category === "all" 
                  ? allProjects.filter((p) => p.project === activeProject).length
                  : allProjects.filter((p) => p.project === activeProject && p.category === category).length
                
                const isDisabled = categoryCount === 0

                if (isDisabled) return null

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium capitalize transition-all ${
                      activeCategory === category
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {category}
                  </button>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((category) => {
                // Calculate count of projects in this category
                const categoryCount = category === "all" 
                  ? allProjects.filter((p) => p.project === activeProject).length
                  : allProjects.filter((p) => p.project === activeProject && p.category === category).length
                
                const isDisabled = categoryCount === 0

                if (!isDisabled) return null

                return (
                  <button
                    key={category}
                    disabled={true}
                    className="px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium capitalize transition-all bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((project, index) => (
              <button
                key={index}
                onClick={() => setSelectedPortfolio(project)}
                className="group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 text-left cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-background">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
                </div>

                {/* Bottom Section with Title and Genre Tag */}
                <div className="relative z-10 mt-auto p-4 md:p-6 bg-secondary border-t border-border/50">
                  <div className="mb-3">
                    <h4 className="text-sm md:text-base font-bold text-foreground mb-1">{project.title}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-2.5 py-1 bg-accent/10 border border-accent/30 rounded text-xs font-medium text-accent capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPortfolio && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm"
          onClick={() => setSelectedPortfolio(null)}
        >
          <div
            className="relative w-full max-w-6xl h-[90vh] bg-secondary border border-border rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with title and actions */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background/50">
              <div className="flex items-center gap-3">
                <h2 className="text-lg md:text-xl font-bold text-foreground">{selectedPortfolio.title}</h2>
                <span className="px-2 py-0.5 bg-accent/20 border border-accent rounded text-xs font-medium text-accent">
                  {selectedPortfolio.project}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {selectedPortfolio.pdfUrl && (
                  <>
                    <a
                      href={selectedPortfolio.pdfUrl}
                      download
                      className="p-2 bg-background border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <a
                      href={selectedPortfolio.pdfUrl}
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
                  onClick={() => setSelectedPortfolio(null)}
                  className="p-2 bg-background border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 bg-background">
              {selectedPortfolio.pdfUrl ? (
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedPortfolio.pdfUrl)}&embedded=true`}
                  className="w-full h-full border-0"
                  title={selectedPortfolio.title}
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
