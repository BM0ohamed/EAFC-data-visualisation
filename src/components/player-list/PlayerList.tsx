// PlayerList.tsx
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import PlayerLine from "@/components/PlayerLine";

const ITEMS_PER_PAGE: number = 45;

interface PlayerListProps {
	selectedVersion: string; // Define the prop
}

const PlayerList: React.FC<PlayerListProps> = ({ selectedVersion }) => {
	const [players, setPlayers] = useState<TPlayer[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);

	const handlePageChange = (selectedPage: { selected: number }) => {
		setCurrentPage(selectedPage.selected);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl = `/api/players?fifaVersion=${selectedVersion}`;
				const res = await fetch(apiUrl);
				if (!res.ok) {
					throw new Error(`Error: ${res.status}`);
				}
				const playersData = await res.json();
				setPlayers(playersData);
			} catch (error) {
				console.error("Failed to fetch players:", error);
			}
		};

		fetchData();
	}, []);

	const offset = currentPage * ITEMS_PER_PAGE;
	const playersToDisplay = players.slice(offset, offset + ITEMS_PER_PAGE);

	return (
		<div>
			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead className="text-sm uppercase bg-gray-800">
					<tr>
						<th className="p-4">Rank</th>
						<th className="p-4">Player</th>
						<th className="p-4">Nat</th>
						<th className="p-4">Team</th>
						<th className="p-4">Pos</th>
						<th className="p-4">Ovr</th>
						<th className="p-4">Pac</th>
						<th className="p-4">Sho</th>
						<th className="p-4">Pas</th>
						<th className="p-4">Dri</th>
						<th className="p-4">Def</th>
						<th className="p-4">Phy</th>
					</tr>
					</thead>
					<tbody>
					{playersToDisplay.map((player: TPlayer, playerIndex: number) => (
						<PlayerLine
							key={`${player.name}-${playerIndex}`}
							{...player}
							ranking={offset + playerIndex + 1}
						/>
					))}
					</tbody>
				</table>
			</div>
			<ReactPaginate
				previousLabel={'Previous'}
				nextLabel={'Next'}
				breakLabel={'...'}
				pageCount={Math.ceil(players.length / ITEMS_PER_PAGE)}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={handlePageChange}
				containerClassName={'pagination'}
				activeClassName={'active'}
			/>
		</div>
	);
};

export default PlayerList;
