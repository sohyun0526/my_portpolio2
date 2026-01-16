"use client"

import { useState } from "react"
import { Mail, Phone, Calendar, MapPin, RefreshCw } from "lucide-react"
import { Twitter } from "lucide-react"
import { profileData } from "@/lib/portfolio-data"

interface ProfileSidebarProps {
  data?: typeof profileData
}

const profileImages = [
  "/yoon-profile.png",
  "/yoon-profile-2.png", // 두 번째 프로필 이미지
]

export function ProfileSidebar({ data = profileData }: ProfileSidebarProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const toggleImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % profileImages.length)
  }

  return (
    <aside className="w-full lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 h-fit">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6 group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 via-accent/5 to-transparent animate-pulse-slow" />
          <div className="absolute inset-[2px] rounded-3xl bg-secondary overflow-hidden">
            <img
              src={profileImages[currentImageIndex] || "/placeholder.svg"}
              alt={data.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          <button
            onClick={toggleImage}
            className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-accent/80"
            aria-label="프로필 이미지 전환"
          >
            <RefreshCw className="w-4 h-4 text-accent-foreground" />
          </button>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {profileImages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-accent" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">{data.name}</h1>
        <p className="text-xs md:text-sm text-muted-foreground bg-secondary px-3 md:px-4 py-1 rounded-lg mb-2">
          {data.title}
        </p>
        <p className="text-xs md:text-sm text-accent font-semibold">경력: 6년</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-4 md:my-6" />

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase mb-1">Email</p>
            <a
              href={`mailto:${data.email}`}
              className="text-sm text-foreground hover:text-accent transition-colors break-all"
            >
              {data.email}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Phone</p>
            <a
              href={`tel:${data.phone.replace(/\s/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-accent transition-colors"
            >
              {data.phone}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Birthday</p>
            <p className="text-sm text-foreground">{data.birthday}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Location</p>
            <p className="text-sm text-foreground">{data.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Twitter className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground uppercase mb-1">Twitter</p>
            <a
              href={data.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground hover:text-accent transition-colors"
            >
              @David_Yoon111
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
