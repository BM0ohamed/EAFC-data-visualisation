// page.tsx
"use client"
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import PlayerList from "@/components/player-list/PlayerList";

export default function Home() {
	return (
		<div className="px-4 py-6">
			<div className="flex justify-between items-center mb-4">
				<Button className="bg-gray-700 hover:bg-gray-600">
					Filter <FilterIcon className="ml-2" />
				</Button>
				<div className="text-sm">
					<span>Showing 45 results</span>
					<Button className="text-blue-500 hover:text-blue-400 ml-4">
						Reset all
					</Button>
				</div>
			</div>
			<PlayerList />
		</div>
	);
}
