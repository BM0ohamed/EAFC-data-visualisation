import React, { useEffect, useState } from 'react';
import { createLinePlot } from "@/components/line-plot/LinePlotService";

export type StatKey = 'pace' | 'shooting' | 'passing' | 'dribbling' | 'defending' | 'physicality' | 'overall';

interface LinePlotProps {
	initialSelectedPlayerName?: string; // Optional prop for initial selected player name
}

const LinePlot: React.FC<LinePlotProps> = ({initialSelectedPlayerName}) => {
	const [data, setData] = useState<TPlayer[]>([]);
	const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
	const [selectedPlayer, setSelectedPlayer] = useState<TPlayer | null>(null);
	const [selectedStats, setSelectedStats] = useState<StatKey[]>(['overall']);

	useEffect(() => {
		const fetchData = async () => {
			const fifaVersion = 24; // Hardcoded value for FIFA version
			const response = await fetch(`/api/get-players?fifaVersion=${fifaVersion}`);
			if (response.ok) {
				const players: TPlayer[] = await response.json();
				setData(players);
			}
		};

		fetchData();
	}, []); // Empty dependency array means this runs once on mount

	useEffect(() => {
		const player = data.find(player => player.playerId === selectedPlayerId);
		setSelectedPlayer(player ?? null);
	}, [data, selectedPlayerId]);

	useEffect(() => {
		if (selectedPlayer) {
			const dataFilteredByPlayer = transformData(data, selectedPlayer);
			createLinePlot(
				dataFilteredByPlayer,
				600,
				800,
				{top: 50, right: 50, bottom: 50, left: 50},
				"fifa_version",
				selectedStats
			);
		}
	}, [selectedPlayer, selectedStats]);

	useEffect(() => {
		if (initialSelectedPlayerName) {
			const player = data.find(player => player.name === initialSelectedPlayerName);
			if (player) {
				setSelectedPlayerId(player.playerId);
			}
		}
	}, [initialSelectedPlayerName, data]);

	const transformData = (dataSet: TPlayer[], selectedPlayer: TPlayer | null): TPlayer[] => {
		if (!selectedPlayer) return [];
		return dataSet.filter(player => player.name === selectedPlayer.name);
	};

	const handleStatChange = (stat: StatKey) => {
		setSelectedStats(prev => {
			if (prev.includes(stat)) {
				return prev.filter(s => s !== stat);
			} else {
				return [...prev, stat];
			}
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<select
				className="bg-gray-700 hover:bg-gray-600 max-w-64"
				onChange={e => setSelectedPlayerId(Number(e.target.value))}
				value={selectedPlayerId || ''}
			>
				<option value="">Select a player</option>
				{data.map(player => (
					<option key={`${player.playerId}-${player.fifaVersion}`} value={player.playerId}>
						{player.name}
					</option>
				))}
			</select>

			<div className="flex flex-row gap-4">
				{["overall", "pace", "shooting", "passing", "dribbling", "defending", "physicality"].map((statName: string) => (
					<label className="flex gap-1" key={statName}>
						<input
							type="checkbox"
							checked={selectedStats.includes(statName as StatKey)}
							onChange={() => handleStatChange(statName as StatKey)}
						/>
						{statName}
					</label>
				))}
			</div>
			<div id="line-plot"></div>
		</div>
	);
};

export default LinePlot;
