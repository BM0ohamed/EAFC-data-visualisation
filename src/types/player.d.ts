type TPosition = "ST" | "CM" | "CF"
type TPlayerRating = {
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physicality: number
}

type TPlayer = {
  name: string
  image?: string
  nationality: string
  teamName: string
  position: TPosition
  rating: TPlayerRating
}
