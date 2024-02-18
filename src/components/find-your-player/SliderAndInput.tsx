"use client";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";

interface SliderAndInputProps {
	value: number;
	setValue: React.Dispatch<React.SetStateAction<number>>;
	label: string;
	onToggleAttribute: (label: string, isActive: boolean, value: number) => void; // Modified prop
}

const SliderAndInput: React.FC<SliderAndInputProps> = ({
														   value,
														   setValue,
														   label,
														   onToggleAttribute,
													   }) => {
	const [isChecked, setIsChecked] = useState(true); // State to manage checkbox checked status

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value.trim(); // Trim the input value
		if (inputValue === "") {
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

	const handleCheckboxChange = (isChecked: boolean) => {
		setIsChecked(isChecked);
		onToggleAttribute(label, isChecked, value); // Pass the current checked status and the value
	};


	// @ts-ignore
	return (
		<div style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center" }}>
			<p style={{ width: "90px" }}>{label} : </p>
			<Slider
				style={{ width: "200px" }}
				value={[value]}
				max={100}
				step={1}
				onValueChange={(e) => setValue(e[0])}
				disabled={!isChecked} // Disable Slider when checkbox is unchecked
			/>
			<Input
				value={value === 0 ? "" : value} // Render empty string if value is 0
				onChange={handleInputChange}
				style={{ maxWidth: "50px" }}
				disabled={!isChecked} // Disable Slider when checkbox is unchecked
			/>
			<Checkbox onCheckedChange={handleCheckboxChange} defaultChecked={true} />
		</div>
	);
};

export default SliderAndInput;
