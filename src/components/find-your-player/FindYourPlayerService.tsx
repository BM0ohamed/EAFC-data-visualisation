import { Attribute } from "@/components/find-your-player/FindYourPlayer";

export function findClosestPlayers(attributes: Attribute[], players: TPlayer[]): TPlayer[] {
	return players
		.map(player => {
			const activeAttributes = attributes.filter(attr => attr.value !== null);
			const distance = Math.sqrt(
				activeAttributes.reduce((acc, attribute) => {
					// @ts-ignore
					return acc + Math.pow(player.rating[attribute.label.toLowerCase()] - attribute.value, 2);
				}, 0)
			);
			return {player, distance};
		})
		.sort((a, b) => a.distance - b.distance)
		.slice(0, 3)
		.map(entry => entry.player);
}
