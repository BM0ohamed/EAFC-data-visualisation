import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import type { NextApiRequest, NextApiResponse } from 'next';

const CSV_FILE_PATH = path.join(process.cwd(), 'src', 'dataset', 'filtered','cropped_male_players.csv');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const playerData: TPlayer[] = [];
	const stream = fs.createReadStream(CSV_FILE_PATH).pipe(csv());

	for await (const player of stream) {
		playerData.push({
			name: player.short_name,
			overall: player.overall,
			nationality: player.nationality_name,
			teamName: player.teamName,
			position: player.player_positions,
			rating: {
				pace: parseFloat(player.pace),
				shooting: parseFloat(player.shooting),
				passing: parseFloat(player.passing),
				dribbling: parseFloat(player.dribbling),
				defending: parseFloat(player.defending),
				physicality: parseFloat(player.physic),
			},
			playerId: parseInt(player.player_id),
		});
	}

	res.status(200).json(playerData);
}
