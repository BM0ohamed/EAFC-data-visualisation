// page.tsx
"use client"
import { useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import PlayerList from "@/components/player-list/PlayerList";
import FifaVersionSelect from "@/components/ui/FifaVersionSelect";

export default function Home() {
	const [selectedVersion, setSelectedVersion] = useState("24"); // Initialize with FIFA 15 as default

	return (
		<div className="px-4 py-6">
			<div className="flex justify-between items-center mb-4">
				<div className="flex flex-row gap-4 items-center">
					<Button variant={"outline"}
							className="justify-between border rounded-xl">
						Filtre <FilterIcon className="ml-2"/>
					</Button>
					<div>
						<FifaVersionSelect selectedVersion={selectedVersion}
										   setSelectedVersion={setSelectedVersion}
						></FifaVersionSelect>
					</div>
				</div>
				<div className="text-sm">
					<span>Nombre de résultats affichés par page : 35</span>
				</div>
			</div>
			<PlayerList selectedVersion={selectedVersion}/>
		</div>
	);
}
