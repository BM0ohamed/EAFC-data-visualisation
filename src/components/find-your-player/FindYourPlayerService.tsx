export function findClosestPlayers(attributes: number[], players: TPlayer[]): TPlayer[] {
	return players
		.map(player => {
			const distance = Math.sqrt(
				Math.pow(player.rating.pace - attributes[0], 2) +
				Math.pow(player.rating.dribbling - attributes[1], 2) +
				Math.pow(player.rating.shooting - attributes[2], 2) +
				Math.pow(player.rating.defending - attributes[3], 2) +
				Math.pow(player.rating.passing - attributes[4], 2) +
				Math.pow(player.rating.physicality - attributes[5], 2)
			);
			return {player, distance};
		})
		.sort((a, b) => a.distance - b.distance)
		.slice(0, 3)
		.map(entry => entry.player);
}