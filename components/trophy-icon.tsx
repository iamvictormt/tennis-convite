import { Trophy } from "lucide-react"

export function TrophyIcon() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 ring-4 ring-primary/25">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/25">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
      </div>
    </div>
  )
}
