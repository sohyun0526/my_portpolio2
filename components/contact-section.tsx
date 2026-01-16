import { Mail, Github, Linkedin, Globe } from "lucide-react"

export function ContactSection() {
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <h2 className="mb-16 text-3xl font-bold tracking-tight text-foreground md:text-4xl">Get In Touch</h2>
        <div className="max-w-2xl">
          <p className="mb-12 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            I'm currently available for freelance work and open to discussing new opportunities. Feel free to reach out
            if you'd like to collaborate or just want to say hello.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <a
              href="mailto:dbsghdyd3000@gmail.com"
              className="group flex items-center gap-3 text-foreground transition-colors hover:text-muted-foreground"
            >
              <Mail className="size-5" />
              <span className="text-base md:text-lg">dbsghdyd3000@gmail.com</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-foreground transition-colors hover:text-muted-foreground"
            >
              <Github className="size-5" />
              <span className="text-base md:text-lg">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-foreground transition-colors hover:text-muted-foreground"
            >
              <Linkedin className="size-5" />
              <span className="text-base md:text-lg">LinkedIn</span>
            </a>
            <a
              href="tel:+821044384384"
              className="group flex items-center gap-3 text-foreground transition-colors hover:text-muted-foreground"
            >
              <Globe className="size-5" />
              <span className="text-base md:text-lg">+82 10-4438-4384</span>
            </a>
            <div className="group flex items-center gap-3 text-foreground">
              <Linkedin className="size-5" />
              <span className="text-base md:text-lg">Gangnam-gu, Seoul, Korea</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
