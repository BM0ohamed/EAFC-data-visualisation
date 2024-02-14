"use client"
import LinePlot from "@/components/line-plot/LinePlot";
import { useSearchParams } from "next/navigation";

export default function Home() {
	const query = useSearchParams();
	const playerName = query?.get("playerName");
	return (
		<div className="px-4 py-6">
			{!!playerName &&<LinePlot
				initialSelectedPlayerName={playerName}
			></LinePlot>}
			{ !playerName && <LinePlot></LinePlot>
			}
		</div>
	)
}
