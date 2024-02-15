// page.tsx
"use client"
import { ChangeEvent, useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import PlayerList from "@/components/player-list/PlayerList";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

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
						<Select
							value={selectedVersion}
							onValueChange={setSelectedVersion}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Version de Fifa"/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Version de Fifa</SelectLabel>
									<SelectItem value="24">FIFA 24</SelectItem>
									<SelectItem value="23">FIFA 23</SelectItem>
									<SelectItem value="22">FIFA 22</SelectItem>
									<SelectItem value="21">FIFA 21</SelectItem>
									<SelectItem value="20">FIFA 20</SelectItem>
									<SelectItem value="19">FIFA 19</SelectItem>
									<SelectItem value="18">FIFA 18</SelectItem>
									<SelectItem value="17">FIFA 17</SelectItem>
									<SelectItem value="16">FIFA 16</SelectItem>
									<SelectItem value="15">FIFA 15</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className="text-sm">
					<span>Nombre de résultats affichés par page : 10</span>
				</div>
			</div>
			<PlayerList selectedVersion={selectedVersion}/>
		</div>
	);
}
