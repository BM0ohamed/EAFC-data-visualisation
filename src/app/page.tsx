"use client"

import Sunburst from "@/components/sunburst/Sunburst";
import TeamsHistogram from "@/components/teams-histogram/TeamsHistogram";

export default function Home() {
	return (
		<div style={{display:'flex', flexDirection:'column'}}>
			<h1 style={{alignSelf:'center', margin:'4px'}}>Comment EA SPORTS modèlise le monde du football à travers un jeu vidéo ?</h1>
		<Sunburst></Sunburst>
		</div>
	)
}
