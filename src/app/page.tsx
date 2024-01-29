import PlayerLine from "@/components/PlayerLine"
import { Button } from "@/components/ui/button"
import { FilterIcon } from "lucide-react"
import Image from "next/image"

const PLAYERS: TPlayer[] = [
  {
    name: "Mbappé",
    nationality: "FR",
    teamName: "PSG",
    position: "ST",
    playerId: 231747,
    rating: {
      pace: 97,
      shooting: 90,
      passing: 80,
      dribbling: 92,
      defending: 36,
      physicality: 78,
    },
  },
  {
    name: "Mbappé",
    nationality: "FR",
    teamName: "PSG",
    position: "ST",
    playerId: 231747,
    rating: {
      pace: 97,
      shooting: 90,
      passing: 80,
      dribbling: 92,
      defending: 36,
      physicality: 78,
    },
  }
]

export default function Home() {
  const textStyle = {
    margin: '8px',
  };
  return (
    <div style={textStyle}>Oups.. This page is currently under construction, check out the Players List section</div>
  )
}
