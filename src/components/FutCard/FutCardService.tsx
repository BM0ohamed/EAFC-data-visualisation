import * as d3 from 'd3';
import React, { useEffect, useRef } from "react";

interface FutCardProps {
	playerData : TPlayer;
	height: number;
	width: number;
}

// @ts-ignore
const FutCard : React.FC<FutCardProps> = ({playerData, height, width}) => {
	const svgRef = useRef<SVGSVGElement>(null);
	useEffect(() => {
		if (svgRef.current) {
			const svg = d3.select(svgRef.current);

			svg.append("image")
				.attr('xlink:href', "/gold_card.png")
				.attr('width', width)
				.attr('height', height);


			svg.append("text")
				.attr("x", width / 2)
				.attr("y", "57%")
				.attr("text-anchor", "middle")
				.text(playerData.name);

			svg.append("text")
				.attr("x", "25%")
				.attr("y", "29%")
				.attr("text-anchor", "middle")
				.text(playerData["overall"]);

			svg.append("text")
				.attr("x", "25%")
				.attr("y", "34%")
				.attr("text-anchor", "middle")
				.text(playerData.position.split(',')[0]);

			svg.append("image")
				.attr('xlink:href', `https://cdn.futbin.com/content/fifa24/img/nation/${playerData.nationId}.png`)
				.attr('width', width / 6)
				//.attr('height', height/10)
				.attr("x", "18%")
				.attr("y", "36.5%");

			svg.append("image")
				.attr('xlink:href', `https://cdn.futbin.com/content/fifa24/img/clubs/${Math.round(playerData.teamId)}.png`)
				.attr('width', width / 6)
				.attr("x", "18%")
				.attr("y", "43%");

			svg.append("image")
				.attr('xlink:href', `https://cdn.futbin.com/content/fifa${Math.round(playerData.fifaVersion)}/img/players/${playerData.playerId}.png?v=${Math.round(playerData.fifaVersion)}`)
				.attr('width', width * 0.58)
				.attr("x", "35%")
				.attr("y", "22%")
				.on("error", function() {
					d3.select(this).attr('xlink:href', `https://cdn.sofifa.net/player_0.svg`);
				});


			svg.append("text")
				.attr("x", "15%")
				.attr("y", "64%")
				.text("PAC " + Math.round(playerData.rating.pace));

			svg.append("text")
				.attr("x", "15%")
				.attr("y", "69%")
				.text("SHO " + Math.round(playerData.rating.shooting));

			svg.append("text")
				.attr("x", "15%")
				.attr("y", "74%")
				.text("PAS " + Math.round(playerData.rating.passing));

			svg.append("text")
				.attr("x", "60%")
				.attr("y", "64%")
				.text("DRI " + Math.round(playerData.rating.dribbling));

			svg.append("text")
				.attr("x", "60%")
				.attr("y", "69%")
				.text("DEF " + Math.round(playerData.rating.defending));

			svg.append("text")
				.attr("x", "60%")
				.attr("y", "74%")
				.text("PHY " + Math.round(playerData.rating.physicality));


			svg.append("text")
		}
	}, [playerData, height, width]);

	return (
		<svg ref={svgRef} width={width} height={height}>
		</svg>
	);}
export default FutCard