"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface Game {
  genre: string
}

interface GenreDistributionChartProps {
  games: Game[]
}

const COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ef4444", // red
  "#f59e0b", // amber
  "#10b981", // green
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#f97316", // orange
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#a855f7", // violet
  "#84cc16", // lime
  "#f43f5e", // rose
  "#22d3ee", // sky
  "#eab308", // yellow
  "#64748b", // slate
  "#78716c", // stone
  "#a3a3a3", // neutral
]

export function GenreDistributionChart({ games }: GenreDistributionChartProps) {
  const genreCount: Record<string, number> = {}

  games.forEach((game) => {
    const genres = game.genre.split("|").map((g) => g.trim())
    genres.forEach((genre) => {
      genreCount[genre] = (genreCount[genre] || 0) + 1
    })
  })

  const chartData = Object.entries(genreCount)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / games.length) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)

  const totalGames = games.length

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">장르별 분포</h3>
        <p className="text-sm text-muted-foreground">Previously Enjoyed 게임 총 {totalGames}개</p>
        <div className="w-10 h-1 bg-accent rounded-full mt-3" />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percentage }) => `${name} (${percentage}%)`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              padding: "0.5rem",
            }}
            formatter={(value: number, name: string, props: any) => [`${value}개 (${props.payload.percentage}%)`, name]}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {chartData.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <div className="text-xs">
              <span className="font-medium text-foreground">{entry.name}</span>
              <span className="text-muted-foreground ml-1">({entry.value})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
