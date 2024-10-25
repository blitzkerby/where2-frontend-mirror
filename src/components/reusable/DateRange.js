import React from "react";
import { useState } from "react";
function DateRange(){
	const [date,setDate] = useState('2024-12-01')
	const handleDateChange = (event)=>{
		setDate(event.target.value)
	}
	return(

		<div>
			<h3 className="font-bold text-[#7cd1eb] text-[20px]"> Date Range</h3>
			<div className="flex flex-col"> 
			<div className="my-2.5 p-2">
				<fieldset className="relative inline-block border border-gray-400 rounded p-2 ">
					<legend className="absolute -top-3 left-2 bg-white px-1 text-gray-600 text-[12px]">Date</legend>
					<input 
					type="date"
					name="trip-start" value={date}   min="2024-11-01" max="2025-12-31"	
					className="w-full cursor-pointer"
					onChange={handleDateChange}
					/>
				</fieldset>
				<p className="text-[12px]  pl-2.5">DD/MM/YYYY</p>
			</div>
			<div className="my-2.5 p-2">
				<fieldset className="relative inline-block border border-gray-400 rounded p-2 ">
					<legend className="absolute -top-3 left-2 bg-white px-1 text-gray-600 text-[12px]">Date</legend>
					<input type="date" className="  w-full cursor-pointer"/>
				</fieldset>
				<p className="text-[12px]  pl-2">DD/MM/YYYY</p>
			</div>
				
			</div>
		</div>
	);
};
export default DateRange;