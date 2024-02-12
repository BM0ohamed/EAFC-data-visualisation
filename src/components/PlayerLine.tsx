import { doRatingOverral } from "@/utils/rating"
import React from "react"

type PlayerLineProps = TPlayer & {
	ranking: number,
	fifaVersion: string;
}
export default function PlayerLine({
									   name,
									   teamName,
									   ranking,
									   nationality,
									   position,
									   rating,
									   playerId,
									   overall,
									   teamId,
									   nationId,
									   fifaVersion
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
					src={`https://cdn.futbin.com/content/fifa${fifaVersion}/img/players/${playerId}.png?v=${fifaVersion}`}
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
					src={`https://cdn.futbin.com/content/fifa24/img/nation/${nationId}.png`}
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
					src={`https://cdn.futbin.com/content/fifa24/img/clubs/${teamId}.png`}
					style={{
						aspectRatio: "20/20",
						objectFit: "cover",
					}}
					width="20"
				/>
			</td>
			<td className="p-4">{position}</td>
			<td className="p-4">{overall}</td>
			<td className="p-4">{rating.pace}</td>
			<td className="p-4">{rating.shooting}</td>
			<td className="p-4">{rating.passing}</td>
			<td className="p-4">{rating.dribbling}</td>
			<td className="p-4">{rating.defending}</td>
			<td className="p-4">{rating.physicality}</td>
		</tr>
	)
}
