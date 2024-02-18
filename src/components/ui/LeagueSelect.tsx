import React from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import FifaVersionSelect from "@/components/ui/FifaVersionSelect";


interface LeagueSelectProps {
	selectedLeague: string;
	setSelectedLeague: any;
}

const LeagueSelect : React.FC<LeagueSelectProps> = ({ selectedLeague, setSelectedLeague}) => {

	return (
		<Select value={selectedLeague}
				onValueChange={setSelectedLeague}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Version de Fifa" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Leagues</SelectLabel>
					<SelectItem value="Premier League">Premier League</SelectItem>
					<SelectItem value="La Liga">La Liga</SelectItem>
					<SelectItem value="Bundesliga">Bundesliga</SelectItem>
					<SelectItem value="Ligue 1">Ligue 1</SelectItem>
					<SelectItem value="Serie A">Serie A</SelectItem>
					<SelectItem value="all">Tout</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
export default FifaVersionSelect;
