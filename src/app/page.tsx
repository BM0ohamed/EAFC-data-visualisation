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
    rating: {
      pace: 97,
      shooting: 90,
      passing: 80,
      dribbling: 92,
      defending: 36,
      physicality: 78,
    },
  },
]

export default function Home() {
  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <Button className="bg-gray-700 hover:bg-gray-600">
          Filter <FilterIcon className="ml-2" />
        </Button>
        <div className="text-sm">
          <span>Showing 17326 results</span>
          <Button className="text-blue-500 hover:text-blue-400 ml-4">
            Reset all
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-sm uppercase bg-gray-800">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Player</th>
              <th className="p-4">Nat</th>
              <th className="p-4">Team</th>
              <th className="p-4">Pos</th>
              <th className="p-4">Ovr</th>
              <th className="p-4">Pac</th>
              <th className="p-4">Sho</th>
              <th className="p-4">Pas</th>
              <th className="p-4">Dri</th>
              <th className="p-4">Def</th>
              <th className="p-4">Phy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {PLAYERS.map((player, playerIndex) => {
              return (
                <PlayerLine
                  key={`${player.name}-${playerIndex}`}
                  {...player}
                  ranking={playerIndex + 1}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
