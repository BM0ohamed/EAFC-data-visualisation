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

interface FifaVersionSelectProps {
  selectedVersion: string;
  setSelectedVersion: any;
}
const FifaVersionSelect : React.FC<FifaVersionSelectProps> = ({ selectedVersion, setSelectedVersion }) => {
  return (
    <Select value={selectedVersion}
    onValueChange={setSelectedVersion}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Version de Fifa" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Version de Fifa</SelectLabel>
          <SelectItem value="24">FIFA 24</SelectItem>
          <SelectItem value="23">FIFA 23</SelectItem>
          <SelectItem value="22">FIFA 22</SelectItem>
          <SelectItem value="21">FIFA 21</SelectItem>
          <SelectItem value="20">FIFA 20</SelectItem>
          <SelectItem value="19">FIFA 19</SelectItem>
          <SelectItem value="18">FIFA 18</SelectItem>
          <SelectItem value="17">FIFA 17</SelectItem>
          <SelectItem value="16">FIFA 16</SelectItem>
          <SelectItem value="15">FIFA 15</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FifaVersionSelect;
