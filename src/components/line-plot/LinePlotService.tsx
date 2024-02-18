import * as d3 from 'd3';
import React, { useEffect, useRef } from "react";


interface CreateLinePlotProps {
	data: TPlayer[];
	height: number;
	width: number;
	margin: any;
	attribute_x: string;
	selectedStats: (keyof TPlayerRating)[];
	setSelectedVersion: React.Dispatch<React.SetStateAction<string | undefined>>; // Allow for undefined values
}

const CreateLinePlot: React.FC<CreateLinePlotProps> = ({
														   data,
														   height,
														   width,
														   margin,
														   attribute_x,
														   selectedStats,
														   setSelectedVersion
													   }) => {
	const svgRef = useRef<SVGSVGElement>(null);
	useEffect(() => {
		if (svgRef.current) {
			const svg = d3.select(svgRef.current).append("svg")
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

			const tooltip = svg.append("g")
				.attr("class", "tooltip")
				.style("display", "none");


			tooltip.append("text")
				.attr("x", 150)
				.attr("y", 30)
				.attr("dy", "0.32em")
				.style("text-anchor", "middle")
				.style("fill", "white")
				.attr("font-size", "16px")
				.attr("font-weight", "bold");

			selectedStats.forEach(stat => {
				svg.selectAll(`circle.${stat}`)
					.data(data)
					.enter().append("circle")
					.attr("class", `dot ${stat}`)
					.attr("cx", (d) => x(d.fifaVersion as number))
					.attr("cy", (d) => y(d.rating[stat] as any))
					.attr("r", 8)
					.style("fill", "white")
					.style("stroke", (d) => color(d.rating[stat] as any))
					.style("stroke-width", 2)
					.on("mouseover", function (event, d) {
						tooltip.style("display", null);
						tooltip.select("text").text(`Fifa Version: ${d.fifaVersion}, ${stat}: ${d.rating[stat]}`);
					})
					.on("mouseout", function () {
						tooltip.style("display", "none");
					})
					.on("click", function(event, d) {
						setSelectedVersion(d.fifaVersion.toString());
					});
			});

			const legend = svg.append("g")
				.attr("transform", `translate(${width - margin.right}, ${margin.top})`);

			// Add legend items
			selectedStats.forEach((stat, index) => {
				const legendItem = legend.append("g")
					.attr("transform", `translate(0, ${index * 20})`);

				// Add color swatch
				legendItem.append("rect")
					.attr("x", -15)
					.attr("y", -7)
					.attr("width", 10)
					.attr("height", 10)
					.style("fill", color(stat) as string);

				// Add text
				legendItem.append("text")
					.attr("x", 0)
					.attr("y", 0)
					.attr("dy", "0.32em")
					.text(stat)
					.style("font-size", "12px")
					.style("fill", "#ffffff");
			});

			const paths = selectedStats.map((s, index) => {
				const line = d3.line<TPlayer>()
					.x((d, i) => x(data[i].fifaVersion as number))
					.y(d => y(d.rating[s] as any));

				const path = svg.append("path")
					.datum(data) // Bind data for each stat
					.attr("class", "line " + s) // Use stat for a unique class
					.attr("fill", "none")
					.attr("stroke", color(s) as string)
					.attr("stroke-width", 1.5)
					.attr("d", line); // Generate the line

			});
		}
	}, [data, selectedStats]);

	useEffect(() => {
		return () => {
			if (svgRef.current) {
				d3.select(svgRef.current).selectAll("*").remove();
			}
		};
	}, [data]);

	return (
		<svg ref={svgRef} width={width} height={height}>
		</svg>
	);
}
export default CreateLinePlot
