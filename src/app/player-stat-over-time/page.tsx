"use client"
import { Suspense } from 'react'; // Import Suspense
import LinePlot from "@/components/line-plot/LinePlot";
import { useSearchParams } from "next/navigation";

export default function Home() {
	return (
		<div className="px-4 py-6">
			{/* Wrap the content using Suspense */}
			<Suspense fallback={<div>Loading...</div>}>
				<PlayerStatOverTime/>
			</Suspense>
		</div>
	);
}

function PlayerStatOverTime() {
	const query = useSearchParams();
	const playerName = query?.get("playerName");
	const fifaVersion = query?.get("version");

	return (
		<>
			{!!playerName && !!fifaVersion &&<LinePlot initialSelectedPlayerName={playerName} initialVersion={fifaVersion}/>}
			{!playerName && <LinePlot/>}
		</>
	);
}
