import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import React from "react";

interface SliderAndInputProps {
	value: number;
	setValue: React.Dispatch<React.SetStateAction<number>>;
	label: string;
}

const SliderAndInput: React.FC<SliderAndInputProps> = ({value, setValue, label}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value.trim(); // Trim the input value
		if (inputValue === '') {
			setValue(0); // Set value to 0 when input is empty
		} else {
			const parsedValue = parseInt(inputValue);
			if (isNaN(parsedValue) || parsedValue < 0 || parsedValue > 100) {
				setValue(50); // Set value to 50 if input is not a number or out of range
			} else {
				setValue(parsedValue);
			}
		}
	};

	return (
		<div style={{display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center'}}>
			<p style={{width:'90px'}}>{label} : </p>
			<Slider
				style={{width: '200px'}}
				value={[value]}
				max={100}
				step={1}
				onValueChange={e => setValue(e[0])}
			/>
			<Input
				value={value === 0 ? '' : value} // Render empty string if value is 0
				onChange={handleInputChange}
				style={{maxWidth: '50px'}}
			/>
		</div>
	);
};

export default SliderAndInput;
