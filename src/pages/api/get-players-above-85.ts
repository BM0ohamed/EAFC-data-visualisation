import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import type { NextApiRequest, NextApiResponse } from 'next';

const CSV_FILE_PATH = path.join(process.cwd(), 'src', 'dataset', 'filtered', 'male_players_over_84.csv');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { fifaVersion, minOverall  } = req.query;
	if (!fifaVersion) {
		return res.status(400).json({ error: 'FIFA version is required' });
	}
	const fifaVersionInt = parseInt(fifaVersion as string);

	let minOverallInt = 85; // Default minimum overall value
	if (minOverall) {
		minOverallInt = parseInt(minOverall as string);
	}

	const playerData: TPlayer[] = [];
	const stream = fs.createReadStream(CSV_FILE_PATH).pipe(csv());

	for await (const player of stream) {
		if (parseInt(player.fifa_version) === fifaVersionInt && parseInt(player.overall) >= minOverallInt) {
			playerData.push({
				name: player.short_name,
				overall: player.overall,
				nationality: player.nationality_name,
				teamName: player.club_name,
				position: player.player_positions,
				rating: {
					pace: parseFloat(player.pace),
					shooting: parseFloat(player.shooting),
					passing: parseFloat(player.passing),
					dribbling: parseFloat(player.dribbling),
					defending: parseFloat(player.defending),
					physicality: parseFloat(player.physic),
					potential: parseFloat(player.potential),
				},
				playerId: parseInt(player.player_id),
				teamId: parseInt(player.club_team_id),
				nationId: parseInt(player.nationality_id),
				fifaVersion: parseInt(player.fifa_version),
				valueEur: parseInt(player.value_eur)
			});
		}
	}

	res.status(200).json(playerData);
}
