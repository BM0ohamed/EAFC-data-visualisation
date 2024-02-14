type TPlayerRating = {
	pace: number
	shooting: number
	passing: number
	dribbling: number
	defending: number
	physicality: number
	overall ?: number
}

type TPlayer = {
	overall: number
	name: string
	nationality: string
	teamName: string
	position: string
	rating: TPlayerRating
	playerId: number
	teamId: number
	nationId: number
	fifaVersion: number
	valueEur: number
}
