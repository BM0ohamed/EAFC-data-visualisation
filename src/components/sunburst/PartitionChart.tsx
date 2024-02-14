import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { TreeNode } from "@/components/sunburst/sunburstService";

interface PartitionChartProps {
	data: TreeNode;
	margin: { top: number; right: number; bottom: number; left: number };
}

const PartitionChart: React.FC<PartitionChartProps> = ({ data, margin }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);

	useEffect(() => {
		if (!svgRef.current) return;

		// Specify the chart’s dimensions.
		const width = 850 - margin.left - margin.right;
		const height = 850 - margin.top - margin.bottom;
		const radius = width / 6;

		// Create the color scale.
		const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children!.length + 1));

		// Compute the layout.
		const hierarchy = d3.hierarchy(data)
			// @ts-ignore
			.sum(d => d.value)
			// @ts-ignore
			.sort((a, b) => b.value - a.value);
		const root = d3.partition()
			// @ts-ignore
			.size([2 * Math.PI, hierarchy.height + 1])
			// @ts-ignore
			(hierarchy);
		root.each(d => (d as any).current = d);

		// Create the arc generator.
		const arc = d3.arc()
			.startAngle(d => (d as any).x0)
			.endAngle(d => (d as any).x1)
			.padAngle(d => Math.min(((d as any).x1 - (d as any).x0) / 2, 0.005))
			.padRadius(radius * 1.5)
			.innerRadius(d => (d as any).y0 * radius)
			.outerRadius(d => Math.max((d as any).y0 * radius, (d as any).y1 * radius - 1))

		// Create the SVG container.
		const svg = d3.select(svgRef.current)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", `translate(${margin.left + width / 2},${margin.top + height / 2})`);

		// Append the arcs.
		const path = svg.append("g")
			.selectAll("path")
			.data(root.descendants().slice(1))
			.join("path")
			.attr("fill", d => { while ((d as any).depth > 1) d = (d as any).parent; return color((d as any).data.name); })
			.attr("fill-opacity", d => arcVisible((d as any).current) ? ((d as any).children ? 0.6 : 0.4) : 0)
			.attr("pointer-events", d => arcVisible((d as any).current) ? "auto" : "none")
			.attr("d", d => arc((d as any).current));

		// Make them clickable if they have children.
		path.filter(d => (d as any).children)
			.style("cursor", "pointer")
			.on("click", clicked);

		const format = d3.format(",d");
		path.append("title")
			// @ts-ignore
			.text(d => `${(d as any).ancestors().map(d => (d as any).data.name).reverse().join("/")}\n${format((d as any).value)}`);

		const label = svg.append("g")
			.attr("pointer-events", "none")
			.attr("text-anchor", "middle")
			.style("user-select", "none")
			.selectAll("text")
			.data(root.descendants().slice(1))
			.join("text")
			.attr("dy", "0.35em")
			.attr("fill-opacity", d => +labelVisible((d as any).current))
			.attr("transform", d => labelTransform((d as any).current))
			.text(d => (d as any).data.name);

		const parent = svg.append("circle")
			.datum(root)
			.attr("r", radius)
			.attr("fill", "none")
			.attr("pointer-events", "all")
			.on("click", clicked);

		// Handle zoom on click.
		function clicked(event: any, p: any) {
			parent.datum(p.parent || root);

			root.each(d => (d as any).target = {
				x0: Math.max(0, Math.min(1, ((d as any).x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
				x1: Math.max(0, Math.min(1, ((d as any).x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
				y0: Math.max(0, (d as any).y0 - p.depth),
				y1: Math.max(0, (d as any).y1 - p.depth)
			});

			const t = svg.transition().duration(750);

			// Transition the data on all arcs, even the ones that aren’t visible,
			// so that if this transition is interrupted, entering arcs will start
			// the next transition from the desired position.
			// @ts-ignore
			path.transition(t)
				.tween("data", d => {
					const i = d3.interpolate((d as any).current, (d as any).target);
					return t => (d as any).current = i(t);
				})
				// @ts-ignore
				.filter(function (d) {
					// @ts-ignore
					return +this.getAttribute("fill-opacity") || arcVisible((d as any).target);
				})
				.attr("fill-opacity", d => arcVisible((d as any).target) ? ((d as any).children ? 0.6 : 0.4) : 0)
				.attr("pointer-events", d => arcVisible((d as any).target) ? "auto" : "none")

				.attrTween("d", d => () => arc((d as any).current));
			// @ts-ignore

			label.filter(function (d) {
				// @ts-ignore
				return +this.getAttribute("fill-opacity") || labelVisible((d as any).target);
				// @ts-ignore
			}).transition(t)
				.attr("fill-opacity", d => +labelVisible((d as any).target))
				.attrTween("transform", d => () => labelTransform((d as any).current));
		}

		function arcVisible(d: any) {
			return (d as any).y1 <= 3 && (d as any).y0 >= 1 && (d as any).x1 > (d as any).x0;
		}

		function labelVisible(d: any) {
			return (d as any).y1 <= 3 && (d as any).y0 >= 1 && ((d as any).y1 - (d as any).y0) * ((d as any).x1 - (d as any).x0) > 0.03;
		}

		function labelTransform(d: any) {
			const x = ((d as any).x0 + (d as any).x1) / 2 * 180 / Math.PI;
			const y = ((d as any).y0 + (d as any).y1) / 2 * radius;
			return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
		}

		return () => {
			svg.selectAll("*").remove(); // Clean up on unmount
		};

	}, [data, margin]);

	return (
		<svg ref={svgRef} style={{ font: '10px sans-serif' }} />
	);
}

export default PartitionChart;
