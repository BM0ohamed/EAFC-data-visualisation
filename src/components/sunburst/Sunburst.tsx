import React, { useEffect, useState } from 'react';
import { table2Tree, TreeNode } from './sunburstService';
import PartitionChart from "@/components/sunburst/PartitionChart";
import { SyncLoader } from "react-spinners";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

function Sunburst() {
	const [data, setData] = useState<TPlayer[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [selectedVersion, setSelectedVersion] = useState("24"); // Initialize with FIFA 15 as default
	const [selectedOverall, setSelectedOverall] = useState("85"); // Initialize with FIFA 15 as default
	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true); // Set isLoading to true at the start of the request
				const apiUrl = `/api/get-players-above-85?fifaVersion=${selectedVersion}&minOverall=${selectedOverall}`;
				const response = await fetch(apiUrl);
				if (response.ok) {
					const players: TPlayer[] = await response.json();
					setData(players);
				}
			} catch (error) {
				console.error("Failed to fetch data:", error);
			} finally {
				setIsLoading(false); // Set isLoading to false at the end of the request
			}
		};

		fetchData();
	}, [selectedVersion, selectedOverall]);

	const treeData: TreeNode = table2Tree(data, ["teamName", "overall", "name", "nationality", "valueEur"]);

	return (
		<div style={{ display: 'flex', justifyContent: 'space-around' }}>
			{isLoading ? (
				<div className="loading-spinner" style={{marginTop: "250px"}}>
					<SyncLoader size={10} color={"#123abc"} loading={isLoading}/>
				</div>
			) : (
				<div>
					<div className="flex flex-row justify-between" style={{marginTop:'8px'}}>
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

						<Select
							value={selectedOverall}
							onValueChange={setSelectedOverall}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Version de Fifa"/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Note minimale</SelectLabel>
									<SelectItem value="89">89</SelectItem>
									<SelectItem value="88">88</SelectItem>
									<SelectItem value="87">87</SelectItem>
									<SelectItem value="86">86</SelectItem>
									<SelectItem value="85">85</SelectItem>
									<SelectItem value="84">84</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<PartitionChart data={treeData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }} />
				</div>
			)}
		</div>
	);
}

export default Sunburst;
