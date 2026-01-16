"use client"

import { PenTool, Code, Smartphone, Zap, Settings, Map, Scale, ChevronDown } from "lucide-react"
import { aboutData } from "@/lib/portfolio-data"
import { useState } from "react"

const iconMap = {
  Code,
  Zap,
  Smartphone,
  PenTool,
  Settings,
  Map,
  Scale,
}

interface AboutSectionProps {
  data?: typeof aboutData
}

export function AboutSection({ data = aboutData }: AboutSectionProps) {
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0)
  const [isDevelopHistoryOpen, setIsDevelopHistoryOpen] = useState(false)

  const nextWork = () => {
    setCurrentWorkIndex((prev) => (prev + 1) % data.majorWorks.length)
  }

  const prevWork = () => {
    setCurrentWorkIndex((prev) => (prev - 1 + data.majorWorks.length) % data.majorWorks.length)
  }

  return (
    <div className="space-y-8 md:space-y-10">
      {/* About Me */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">About Me</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
          {data.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Develop History Accordion */}
      <div>
        <button
          onClick={() => setIsDevelopHistoryOpen(!isDevelopHistoryOpen)}
          className="w-full flex items-center justify-between p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group"
        >
          <h3 className="text-lg md:text-xl font-bold text-foreground text-left">Development Journey</h3>
          <ChevronDown
            className={`w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-accent transition-all duration-300 ${
              isDevelopHistoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDevelopHistoryOpen && (
          <div className="mt-4 p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border space-y-4">
            {data.developHistory.map((paragraph, index) => (
              <p key={index} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* What I'm Doing */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">담당 작업</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap]
            return (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <IconComponent className="w-full h-full text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">{service.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Major Works Slider */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">주요 작업</h3>
        <div className="relative">
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentWorkIndex * 100}%)` }}
            >
              {data.majorWorks.map((work, index) => (
                <div key={index} className="min-w-full px-2">
                  <div className="bg-secondary rounded-2xl border border-border p-6 md:p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-background rounded-xl flex items-center justify-center border border-border p-2 overflow-hidden">
                        <img
                          src={work.companyLogo || "/placeholder.svg"}
                          alt={work.company}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{work.company}</p>
                        <p className="text-xs text-muted-foreground/70">{work.period}</p>
                      </div>
                    </div>

                    {/* Project Name */}
                    <h4 className="text-xl md:text-2xl font-bold text-foreground">{work.project}</h4>

                    {/* Work Title */}
                    <h5 className="text-lg md:text-xl font-semibold text-accent">{work.workTitle}</h5>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{work.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-background rounded-lg text-xs font-medium text-foreground border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevWork}
              className="w-10 h-10 rounded-full bg-secondary border border-border hover:border-accent flex items-center justify-center transition-colors"
              aria-label="Previous work"
            >
              <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {data.majorWorks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWorkIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentWorkIndex ? "bg-accent w-8" : "bg-border"
                  }`}
                  aria-label={`Go to work ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextWork}
              className="w-10 h-10 rounded-full bg-secondary border border-border hover:border-accent flex items-center justify-center transition-colors"
              aria-label="Next work"
            >
              <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Clients with Marquee Animation */}
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">Tools</h3>
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-4 md:gap-6 animate-marquee-slow">
            {[...data.tools, ...data.tools].map((tool, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-secondary rounded-xl md:rounded-2xl border border-border flex items-center justify-center p-3 md:p-4 hover:border-accent transition-colors group"
                title={tool.name}
              >
                <img
                  src={tool.logo || "/placeholder.svg"}
                  alt={tool.name}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
