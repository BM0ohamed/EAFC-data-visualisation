// page.tsx
"use client"
import { ChangeEvent, useState } from "react"; // Import useState
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import PlayerList from "@/components/player-list/PlayerList";

export default function Home() {
	const [selectedVersion , setSelectedVersion] = useState("24"); // Initialize with FIFA 15 as default

	// Function to handle the dropdown change event
	const handleVersionChange = (event: ChangeEvent<HTMLSelectElement>) => {
		console.log("event value",event.target.value)
		console.log(parseInt(event.target.value as string))
		setSelectedVersion(event.target.value);
	};

	return (
		<div className="px-4 py-6">
			<div className="flex justify-between items-center mb-4">
				<div className="flex flex-row gap-4 items-center">
					<Button className="bg-gray-700 hover:bg-gray-600">
						Filter <FilterIcon className="ml-2"/>
					</Button>
					<div>
						<label htmlFor="fifaVersion" className="mr-2">
							FIFA Version:
						</label>
						<select
							className="bg-gray-700 hover:bg-gray-600"
							id="fifaVersion"
							name="fifaVersion"
							value={selectedVersion}
							onChange={handleVersionChange}
						>
							<option value="15">FIFA 15</option>
							<option value="16">FIFA 16</option>
							<option value="17">FIFA 17</option>
							<option value="18">FIFA 18</option>
							<option value="19">FIFA 19</option>
							<option value="20">FIFA 20</option>
							<option value="21">FIFA 21</option>
							<option value="22">FIFA 22</option>
							<option value="23">FIFA 23</option>
							<option value="24">FIFA 24</option>
						</select>
					</div>
				</div>
				<div className="text-sm">
					<span>Showing 45 results</span>
					<Button className="text-blue-500 hover:text-blue-400 ml-4">
						Reset all
					</Button>
				</div>
			</div>
			<PlayerList selectedVersion={selectedVersion}/>
		</div>
	);
}
