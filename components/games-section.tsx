"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { GenreDistributionChart } from "./genre-distribution-chart"

interface Game {
  id: number
  name: string
  image: string
  playTime: string
  notes: string
  genre: string // Can contain multiple genres separated by "|"
}

interface GamesSectionProps {
  data: {
    currentGames: Game[]
    pastGames: Game[]
  }
}

export function GamesSection({ data }: GamesSectionProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>("전체")

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedGame) {
        setSelectedGame(null)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [selectedGame])

  const allGenres = new Set<string>()
  data.pastGames.forEach((game) => {
    const genres = game.genre.split("|")
    genres.forEach((genre) => allGenres.add(genre.trim()))
  })
  const genres = ["전체", ...Array.from(allGenres).sort()]

  const filteredPastGames =
    selectedGenre === "전체"
      ? data.pastGames
      : data.pastGames.filter((game) => {
          const gameGenres = game.genre.split("|").map((g) => g.trim())
          return gameGenres.includes(selectedGenre)
        })

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="text-lg md:text-xl font-semibold text-accent">#RPG</span>
        <span className="text-lg md:text-xl font-semibold text-accent">#서브컬쳐</span>
        <span className="text-lg md:text-xl font-semibold text-accent">#FPS</span>
      </div>

      {/* Current Games */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Currently Playing</h2>
          <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {data.currentGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary border border-border hover:border-accent transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={game.image || "/placeholder.svg"}
                alt={game.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">{game.playTime}</p>
                  <p className="text-white/80 text-xs md:text-sm mt-1">플레이 시간</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm md:text-base truncate drop-shadow-lg">{game.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Past Games */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Previously Enjoyed</h2>
          <div className="w-10 h-1 bg-accent rounded-full mb-6" />

          <div className="mb-8">
            <GenreDistributionChart games={data.pastGames} />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedGenre === genre
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredPastGames.map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary border border-border hover:border-accent transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={game.image || "/placeholder.svg"}
                alt={game.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">{game.playTime}</p>
                  <p className="text-white/80 text-xs md:text-sm mt-1">플레이 시간</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm md:text-base truncate drop-shadow-lg">{game.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Game Details Modal */}
      {selectedGame && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="bg-card rounded-2xl border border-border max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">{selectedGame.name}</h3>
              <button
                onClick={() => setSelectedGame(null)}
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden mb-4">
              <img
                src={selectedGame.image || "/placeholder.svg"}
                alt={selectedGame.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">장르</span>
                <span className="text-sm font-medium text-foreground">{selectedGame.genre.split("|").join(", ")}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">플레이 시간</span>
                <span className="text-sm font-medium text-foreground">{selectedGame.playTime}</span>
              </div>
              <div className="py-2">
                <p className="text-sm text-muted-foreground mb-1">기타 기재사항</p>
                <p className="text-sm text-foreground">{selectedGame.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
