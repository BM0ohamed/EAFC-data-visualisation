import * as d3 from 'd3';

export interface TreeNode {
	name: string;
	children?: TreeNode[];
	value?: number;
}

export function table2Tree<T>(data: T[], attribs: string[]): TreeNode {
	const valueFn = (v: T[]) => v.length; // Count nodes
	return rollupsToTree(
		d3.rollups(data, valueFn, ...attribs.map(a => (d: T) => (d as any)[a]))
	);
}

function rollupsToTree(rollupsData: any): TreeNode {
	const makeTreeNode = (d: any): TreeNode => {
		let res: TreeNode = {
			name: "" + d[0],
			value: Array.isArray(d[1]) ? undefined : d[1]
		};

		if (Array.isArray(d[1])) res.children = rollupsToTree(d[1]);
		return res;
	};

	function rollupsToTree(groupedData: any[]): TreeNode[] | undefined {
		if (!groupedData) return;

		return groupedData.map(makeTreeNode);
	}

	return {
		name: "",
		children: Array.isArray(rollupsData)
			? rollupsToTree(rollupsData)
			: [{ name: "", value: rollupsData }]
	};
}
