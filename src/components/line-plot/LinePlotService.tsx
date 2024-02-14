// LinePlotService.ts

import * as d3 from 'd3';


export const createLinePlot = (
	data: TPlayer[],
	height: number,
	width: number,
	margin: any,
	attribute_x: string,
	selectedStats: (keyof TPlayerRating)[]
) => {
	d3.select("#line-plot").select("svg").remove();
	const svg = d3.select("#line-plot").append("svg")
		.attr("width", width)
		.attr("height", height);

	svg.append("text")
		.attr("x", width / 2)
		.attr("y", height - 0.35 * margin.bottom)
		.text("Évolution des statistiques")
		.style("font-size", "16px")
		.style("font-family", "'__Inter_aaf875', '__Inter_Fallback_aaf875'")
		.style("fill", "#ffffff");

	svg.append("line")
		.attr("x1", width / 2)
		.attr("x2", width / 2 + 180)
		.attr("y1", height - 0.25 * margin.bottom)
		.attr("y2", height - 0.25 * margin.bottom)
		.style("stroke", "#ffffff")
		.style("stroke-width", 1.5);

	const h = height - margin.top - margin.bottom;
	const w = width - margin.left - margin.right;

	const color = d3.scaleOrdinal<string>()
		.domain(selectedStats)
		.range(d3.schemeCategory10);

	const x: d3.ScaleLinear<number, number> = d3.scaleLinear()
		.domain([15, 24])
		.range([margin.left, w]);


	let minValue: number = Infinity;
	let maxValue: number = -Infinity;

	data.forEach(d => {
		selectedStats.forEach(s => { // Ensure we only consider selected stats
			const val = d.rating[s];
			if (val !== undefined && val !== null) {
				if (val < minValue) minValue = val;
				if (val > maxValue) maxValue = val;
			}
		});
	});

	if (minValue === Infinity) minValue = 0; // Default minimum if no data
	if (maxValue === -Infinity) maxValue = 1; // Default maximum if no data, ensuring a range

// Update the y-axis scale with the new min and max
	const y: d3.ScaleLinear<number, number> = d3.scaleLinear()
		.domain([minValue - 1, maxValue]) // Use the recalculated min and max
		.nice()
		.range([h, margin.top]);

	const xAxis = (g: any) => g
		.attr("transform", `translate(0,${h})`)
		.call(d3.axisBottom(x));

	const yAxis = (g: any) => g
		.attr("transform", `translate(${margin.left},0)`)
		.call(d3.axisLeft(y));

	svg.append("g")
		.call(xAxis);

	svg.append("g")
		.call(yAxis);


	svg.append("text")
		.attr("transform", `translate(${width - 1 * margin.right}, ${height - 0.5 * margin.bottom})`)
		.style("font-size", "14px")
		.style("fill", "#ffffff")
		.style("text-anchor", "end")
		.text("Version de Fifa");

	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 0)
		.attr("x", 0 - 2 * margin.top)
		.attr("dy", "0.8em")
		.style("text-anchor", "end")
		.style("font-size", "14px")
		.style("fill", "#ffffff")
		.text("Note");

	const tooltip = svg.append("text")
		.style("font-size", "12px")
		.style("fill", "#ffffff")
		.style("visibility", "hidden");

	const line = d3.line<TPlayer>()
		.x((d, i) => x(data[i].fifaVersion as number))
		.y(d => y(d.rating[selectedStats[0]] as any));

	svg.selectAll(".line").remove();

	const paths = selectedStats.map((s, index) => {
		const line = d3.line<TPlayer>()
			.x((d, i) => x(data[i].fifaVersion as number))
			.y(d => y(d.rating[s] as any)); // Ensure y-value is correctly bound to each stat

		const path = svg.append("path")
			.datum(data) // Bind data for each stat
			.attr("class", "line " + s) // Use stat for a unique class
			.attr("fill", "none")
			.attr("stroke", color(s) as string)
			.attr("stroke-width", 1.5)
			.attr("d", line); // Generate the line

		return path;
	});

	return svg.node();
}