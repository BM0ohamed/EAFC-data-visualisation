import React, { useEffect, useState } from 'react';
import { table2Tree, TreeNode } from './sunburstService';
import PartitionChart from "@/components/sunburst/PartitionChart";

function Sunburst() {
	const [data, setData] = useState<TPlayer[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`/api/get-players-above-85`);
			if (response.ok) {
				const players: TPlayer[] = await response.json();
				setData(players);
			}
		};

		fetchData();
	}, []);

	const treeData: TreeNode = table2Tree(data, ["teamName", "overall", "name", "nationality", "valueEur"]);

	return (
		<div style={{ display: 'flex', justifyContent: 'space-around' }}>
			<PartitionChart data={treeData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }} />
		</div>
	);
}

export default Sunburst;
