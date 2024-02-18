import { useEffect, useState } from "react";
import { histogramData } from "@/components/teams-histogram/TeamsHistogramService";
import FifaVersionSelect from "@/components/ui/FifaVersionSelect";

function TeamsHistogramPlot() {
	const [teamData, setTeamData] = useState<TTeam[]>([]);
	const [fifaVersion, setFifaVersion] = useState<string>("24");
	const [leagueName, setLeagueName] = useState<string>("all");
	const [defensiveStyleCount, setDefensiveStyleCount] = useState<histogramData[]>([]);
	const [offensiveStyleCount, setOffensiveStyleCount] = useState<histogramData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/get-teams?fifaVersion=${fifaVersion}&leagueName=${leagueName}`);
				if (response.ok) {
					const teams: TTeam[] = await response.json();
					setTeamData(teams);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [fifaVersion, leagueName]);

	return <div>
		<FifaVersionSelect
			selectedVersion={fifaVersion}
			setSelectedVersion={setFifaVersion}
		></FifaVersionSelect>
	</div>;
}

export default TeamsHistogramPlot;
