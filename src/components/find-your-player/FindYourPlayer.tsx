"use client"

import SliderAndInput from "@/components/find-your-player/SliderAndInput";
import { useEffect, useState } from "react";
import FifaVersionSelect from "@/components/ui/FifaVersionSelect";
import { findClosestPlayers } from "@/components/find-your-player/FindYourPlayerService";
import FutCard from "@/components/FutCard/FutCardService";


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
			const attributes = Array(pace, dribbling, shooting, defending, passing, physic);
			const playersFromAlgorithm = findClosestPlayers(attributes, data);
			setClosestPlayers(playersFromAlgorithm);
		}
	}, [data, pace, dribbling, shooting, defending, passing, physic])

	return (
		<div className="flex flex-row gap-4 px-4 py-6">
			<div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
				<FifaVersionSelect selectedVersion={selectedVersion}
								   setSelectedVersion={setSelectedVersion}></FifaVersionSelect>
				<SliderAndInput value={pace} setValue={setPace} label={"Pace"}></SliderAndInput>
				<SliderAndInput value={dribbling} setValue={setDribbling} label={"Dribble"}></SliderAndInput>
				<SliderAndInput value={shooting} setValue={setShooting} label={"Shoot"}></SliderAndInput>
				<SliderAndInput value={defending} setValue={setDefending} label={"Defence"}></SliderAndInput>
				<SliderAndInput value={passing} setValue={setPassing} label={"Pass"}></SliderAndInput>
				<SliderAndInput value={physic} setValue={setPhysic} label={"Physicality"}></SliderAndInput>
			</div>
			<div style={{display:'flex',flexDirection:'row',gap:'8px'}}>
				{!!closestPlayers && closestPlayers.map((playerData, index) => (
					<FutCard
						key={index}
						playerData={playerData}
						height={400}
						width={200}
					/>
				))}
			</div>
		</div>
	)
}

export default FindYourPlayer