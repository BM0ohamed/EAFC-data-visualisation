import React, { useEffect, useState } from 'react';
import { table2Tree, TreeNode } from './sunburstService';
import PartitionChart from "@/components/sunburst/PartitionChart";
import { SyncLoader } from "react-spinners";

function Sunburst() {
	const [data, setData] = useState<TPlayer[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true); // Set isLoading to true at the start of the request
				const response = await fetch(`/api/get-players-above-85`);
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
	}, []);

	const treeData: TreeNode = table2Tree(data, ["teamName", "overall", "name", "nationality", "valueEur"]);

	return (
		<div style={{ display: 'flex', justifyContent: 'space-around' }}>
			{isLoading ? (
				<div className="loading-spinner" style={{marginTop: "50px"}}>
					<SyncLoader size={10} color={"#123abc"} loading={isLoading}/>
				</div>
			) : (
				<PartitionChart data={treeData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }} />
			)}
		</div>
	);
}

export default Sunburst;
