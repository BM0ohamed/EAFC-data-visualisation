"use client"
import { createLinePlot } from "@/components/line-plot/LinePlotService";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import * as React from "react"
import { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type StatKey = 'pace' | 'shooting' | 'passing' | 'dribbling' | 'defending' | 'physicality' | 'overall';

interface LinePlotProps {
	initialSelectedPlayerName?: string; // Optional prop for initial selected player name
}

const LinePlot: React.FC<LinePlotProps> = ({initialSelectedPlayerName}) => {
	const [data, setData] = useState<TPlayer[]>([]);
	const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
	const [selectedPlayer, setSelectedPlayer] = useState<TPlayer | null>(null);
	const [selectedStats, setSelectedStats] = useState<StatKey[]>(['overall']);
	const [playersDictionary, setPlayersDictionary] = useState<{ value: string; label: string; id : number}[]>([]);
	const [value, setValue] = React.useState("")
	const [open, setOpen] = React.useState(false)

	useEffect(() => {
		const fetchData = async () => {
			const fifaVersion = 24; // Hardcoded value for FIFA version
			const response = await fetch(`/api/get-players?fifaVersion=${fifaVersion}`);
			if (response.ok) {
				const players = await response.json();
				setData(players);

				const playerNamesSet = new Set();
				// @ts-ignore
				const dictionary = players.reduce((acc, player) => {
					const lowercaseName = player.name.toLowerCase();
					if (!playerNamesSet.has(lowercaseName)) {
						acc.push({
							value: lowercaseName,
							label: player.name,
							id: player.playerId,
						});
						playerNamesSet.add(lowercaseName);
					}
					return acc;
				}, []);

				setPlayersDictionary(dictionary);
			}
		};

		fetchData();
	}, []);
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
	}, [initialSelectedPlayerName, data, value]);

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
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="w-[200px] justify-between border rounded-xl"
						role="combobox"
						aria-expanded={open}
					>
						{value
							? playersDictionary.find((playersDictionary) => playersDictionary.value === value)?.label
							: "Choisir un joueur"}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Choisir un joueur"/>
						<CommandEmpty>Pas de joueur selectionné</CommandEmpty>
						<CommandGroup>
							{playersDictionary.map((player) => (
								<CommandItem
									key={player.value}
									value={player.value}
									onSelect={(currentValue) => {
										setSelectedPlayerId(Number(player.id))
										setValue(currentValue === value ? "" : currentValue)
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === player.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{player.label}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>

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