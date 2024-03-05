import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="flex justify-between items-center p-4 border-b border-gray-800">
			<div className="flex items-center space-x-4">
				<img
					alt="EA Sports Logo"
					className="h-10 rounded-[5px]"
					height="40"
					src="/placeholder.svg"
					style={{
						aspectRatio: "40/40",
						objectFit: "cover",
					}}
					width="40"
				/>
				<div className="flex space-x-4">
					<Button variant={"link"}
							asChild>
						<Link href="/">
							Page d&apos;accueil
						</Link>
					</Button>
					<Button variant={"link"}
							asChild>
						<Link href="list-players">
							Liste des joueurs
						</Link>
					</Button>
					<Button variant={"link"}
							asChild>
						<Link href="player-stat-over-time">
							Statistiques détaillées
						</Link>
					</Button>
					<Button variant={"link"}
							asChild>
						<Link href="find-your-player">
							Trouve ton joueur
						</Link>
					</Button>
					<Button variant={"link"}
							asChild>
						<Link href="https://observablehq.com/@guillerm-martin-ws/line-chart-evolution-joueur"
							  target="_blank">
							Plus d&apos;informations
						</Link>
					</Button>
				</div>

			</div>
		</nav>
	)
}
