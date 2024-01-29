import { doRatingOverral } from "@/utils/rating"
import React from "react"

type PlayerLineProps = TPlayer & {
	ranking: number
}
export default function PlayerLine({
									   name,
									   teamName,
									   ranking,
									   nationality,
									   position,
									   rating,
									   playerId,
								   }: PlayerLineProps
) {
	return (
		<tr className="bg-gray-900 hover:bg-gray-800">
			<td className="p-4">{ranking}</td>
			<td className="p-4 flex items-center space-x-2">
				<img
					alt="Player"
					className="h-10 w-10 rounded-full"
					height="40"
					src={
						'https://media.contentapi.ea.com/content/dam/ea/easfc/fc-24/ratings/common/full/player-portraits/p' + playerId + '.png.adapt.50w.png'
					}
					style={{
						aspectRatio: "40/40",
						objectFit: "cover",
					}}
					width="40"
				/>
				<span>{name}</span>
			</td>
			<td className="p-4">
				<img
					alt="Country Flag"
					className="h-5"
					height="20"
					src="https://images.ctfassets.net/rs6bgs1g8dbr/5Il39kdF0vuuJ1Gc18R7Ww/b982b6f565d2d59fe0dc61e5ca620092/f_18.png"
					style={{
						aspectRatio: "30/20",
						objectFit: "cover",
					}}
					width="30"
				/>
			</td>
			<td className="p-4">
				<img
					alt="Team Logo"
					className="h-5"
					height="20"
					src="https://images.ctfassets.net/rs6bgs1g8dbr/65jMMhRXpQl9A65F6kQtBe/c7b08b18574c48533c1526783bd9b601/73.png"
					style={{
						aspectRatio: "20/20",
						objectFit: "cover",
					}}
					width="20"
				/>
			</td>
			<td className="p-4">{position}</td>
			<td className="p-4">{doRatingOverral(rating)}</td>
			<td className="p-4">{rating.pace}</td>
			<td className="p-4">{rating.shooting}</td>
			<td className="p-4">{rating.passing}</td>
			<td className="p-4">{rating.dribbling}</td>
			<td className="p-4">{rating.defending}</td>
			<td className="p-4">{rating.physicality}</td>
		</tr>
	)
}
