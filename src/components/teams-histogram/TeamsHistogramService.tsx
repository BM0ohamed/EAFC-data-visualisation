import * as d3 from 'd3';

export type histogramData = {
	label: string
	count: number
}

export const createHistogram = (data: histogramData[]) => {
	const width = 960;
	const height = 500;
	const margin = {top: 20, right: 0, bottom: 30, left: 40};

	const svg = d3.create("svg")
		.attr("viewBox", [0, 0, width, height]);

	const x = d3.scaleBand()
		// @ts-ignore
		.domain(data.map(d => d.label))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	// @ts-ignore
	const y = d3.scaleLinear()
		// @ts-ignore
		.domain([0, d3.max(data, d => d.count)]).nice()
		.range([height - margin.bottom, margin.top]);

	// @ts-ignore
	svg.append("g")
		.attr("fill", "steelblue")
		.selectAll("rect")
		.data(data)
		.join("rect")
		// @ts-ignore
		.attr("x", d => x(d.label))
		// @ts-ignore
		.attr("y", d => y(d.count))
		// @ts-ignore
		.attr("height", d => y(0) - y(d.count))
		// @ts-ignore
		.attr("width", x.bandwidth());

	svg.append("g")
		.call(d3.axisLeft(y));

	svg.append("g")
		.call(d3.axisBottom(x))
		.attr("transform", `translate(0,${height - margin.bottom})`);

	return svg.node();
}