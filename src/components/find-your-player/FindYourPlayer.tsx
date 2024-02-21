"use client";

import SliderAndInput from "@/components/find-your-player/SliderAndInput";
import { useEffect, useState } from "react";
import FifaVersionSelect from "@/components/ui/FifaVersionSelect";
import { findClosestPlayers } from "@/components/find-your-player/FindYourPlayerService";
import FutCard from "@/components/FutCard/FutCardService";

export interface Attribute {
	label: string;
	value?: number;
}

interface FindYourPlayerProps {
}

const FindYourPlayer: React.FC<FindYourPlayerProps> = ({}) => {
	const [pace, setPace] = useState<number>(50);
	const [dribbling, setDribbling] = useState<number>(50);
	const [shooting, setShooting] = useState<number>(50);
	const [defending, setDefending] = useState<number>(50);
	const [passing, setPassing] = useState<number>(50);
	const [physic, setPhysic] = useState<number>(50);
	const [selectedVersion, setSelectedVersion] = useState<string>("24");
	const [data, setData] = useState<TPlayer[]>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [closestPlayers, setClosestPlayers] = useState<TPlayer[]>();
	const [attributes, setAttributes] = useState<Attribute[]>([]);
	const [activeAttributes, setActiveAttributes] = useState<Set<string>>(new Set([
		"Pace", "Dribbling", "Shooting", "Defending", "Passing", "Physicality"
	]));
	const handleDeactivate = (label: string, isActive: boolean) => {
		setActiveAttributes((prevActiveAttributes) => {
			const newActiveAttributes = new Set(prevActiveAttributes);
			if (!isActive) {
				newActiveAttributes.delete(label);
			} else {
				newActiveAttributes.add(label);
			}
			return newActiveAttributes;
		});
	};


	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true); // Set isLoading to true at the start of the request
				const apiUrl = `/api/get-players-fifa-version?fifaVersion=${selectedVersion}`;
				const res = await fetch(apiUrl);
				if (!res.ok) {
					throw new Error(`Error: ${res.status}`);
				}
				const playersData = await res.json();
				setData(playersData);
			} catch (error) {
				console.error("Failed to fetch players:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [selectedVersion]);

	useEffect(() => {
		if (data) {
			const attributesArray: Attribute[] = [
				activeAttributes.has("Pace") && {label: "Pace", value: pace},
				activeAttributes.has("Dribbling") && {label: "Dribbling", value: dribbling},
				activeAttributes.has("Shooting") && {label: "Shooting", value: shooting},
				activeAttributes.has("Defending") && {label: "Defending", value: defending},
				activeAttributes.has("Passing") && {label: "Passing", value: passing},
				activeAttributes.has("Physicality") && {label: "Physicality", value: physic},
			].filter(Boolean); // Filtre les valeurs fausses pour s'assurer que seuls les attributs actifs sont inclus
			setAttributes(attributesArray);
		}
	}, [data, pace, dribbling, shooting, defending, passing, physic, activeAttributes]);

	useEffect(() => {
		if (data) {
			const playersFromAlgorithm = findClosestPlayers(attributes, data);
			console.log("résultat algo", playersFromAlgorithm)
			setClosestPlayers(playersFromAlgorithm);
		}
	}, [attributes, data]);

	return (
		<div className="flex flex-row gap-4 px-4 py-6">
			<div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
				<FifaVersionSelect
					selectedVersion={selectedVersion}
					setSelectedVersion={setSelectedVersion}
				></FifaVersionSelect>
				<SliderAndInput
					value={pace}
					setValue={setPace}
					label={"Pace"}
					onToggleAttribute={handleDeactivate}
				></SliderAndInput>
				<SliderAndInput
					value={dribbling}
					setValue={setDribbling}
					label={"Dribbling"}
					onToggleAttribute={handleDeactivate}
				></SliderAndInput>
				<SliderAndInput
					value={shooting}
					setValue={setShooting}
					label={"Shooting"}
					onToggleAttribute={handleDeactivate}
				></SliderAndInput>
				<SliderAndInput
					value={defending}
					setValue={setDefending}
					label={"Defending"}
					onToggleAttribute={handleDeactivate}
				></SliderAndInput>
				<SliderAndInput
					value={passing}
					setValue={setPassing}
					label={"Passing"}
					onToggleAttribute={handleDeactivate}
				></SliderAndInput>
				<SliderAndInput
					value={physic}
					setValue={setPhysic}
					label={"Physicality"}
					onToggleAttribute={handleDeactivate}
				></SliderAndInput>
			</div>
			<div style={{display: "flex", flexDirection: "row", gap: "8px"}}>
				{!!closestPlayers &&
					closestPlayers.map((playerData, index) => (
						<FutCard
							key={index}
							playerData={playerData}
							height={400}
							width={200}
						/>
					))}
			</div>
		</div>
	);
};

export default FindYourPlayer;
