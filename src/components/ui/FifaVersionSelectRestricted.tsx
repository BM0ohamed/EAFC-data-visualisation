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

interface FifaVersionSelectRestrictedProps {
	selectedVersion: string;
	setSelectedVersion: any;
	versions: string[];
}

const FifaVersionSelectRestricted: React.FC<FifaVersionSelectRestrictedProps> = ({
																					 selectedVersion,
																					 setSelectedVersion,
																					 versions
																				 }) => {
	return (
		<Select value={selectedVersion} onValueChange={setSelectedVersion}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Version de Fifa"/>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Version de Fifa</SelectLabel>
					{versions.map((version, index) => (
						<SelectItem key={index} value={version}>{`FIFA ${version}`}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default FifaVersionSelectRestricted;
