import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import csv from "csv-parser";

const CSV_FILE_PATH = path.join(process.cwd(), 'src', 'dataset', 'male_teams.csv');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { fifaVersion, leagueName } = req.query;
	if (!fifaVersion) {
		return res.status(400).json({ error: 'FIFA version is required' });
	}
	const fifaVersionInt = parseInt(fifaVersion as string);

	const teamData: TTeam[] = [];
	const stream = fs.createReadStream(CSV_FILE_PATH).pipe(csv());

	for await (const team of stream) {
		if (parseInt(team.fifa_version) === fifaVersionInt && (leagueName === "all" || team.league_name === leagueName)) {
			teamData.push({
				teamId: team.team_id,
				teamUrl: team.team_url,
				fifaVersion: parseInt(team.fifa_version),
				teamName: team.team_name,
				leagueId: parseInt(team.league_id),
				leagueName: team.league_name,
				nationalityId: parseInt(team.nationality_id),
				nationalityName: team.nationality_name,
				overall: parseInt(team.overall),
				attack: parseInt(team.attack),
				midfield: parseInt(team.midfield),
				defence: parseInt(team.defence),
				defStyle: team.def_style,
				offStyle: team.off_style
			});
		}
	}
	res.status(200).json(teamData);
}
