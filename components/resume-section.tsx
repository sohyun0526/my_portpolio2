import { BookOpen, Briefcase } from "lucide-react"
import { resumeData } from "@/lib/portfolio-data"
import Image from "next/image"

interface ResumeSectionProps {
  data?: typeof resumeData
}

export function ResumeSection({ data = resumeData }: ResumeSectionProps) {
  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Resume</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-6">
          <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">교육 과정</h3>
        </div>
        <div className="space-y-4">
          {data.education.map((item, index) => (
            <div key={index} className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-xs md:text-sm text-accent mb-2">{item.period}</p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-6">
          <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-accent" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">업계 이력</h3>
        </div>
        <div className="space-y-4">
          {data.experience.map((item, index) => (
            <div key={index} className="relative pl-5 md:pl-6 pb-6 border-l-2 border-border last:pb-0">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent" />
              <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">{item.title}</h4>
              <p className="text-xs md:text-sm text-accent mb-2">{item.period}</p>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">핵심 스킬</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="w-16 h-16 relative">
                <Image src={skill.icon || "/placeholder.svg"} alt={skill.name} fill className="object-contain" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">{skill.name}</h4>
                <p className="text-xs text-muted-foreground">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
