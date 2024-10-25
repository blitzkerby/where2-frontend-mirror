import React from "react";
import Clock from "../../assets/images/red-stopwatch-flat-style_78370-7251.avif"
import Chess from "../../assets/images/chess_53876-25541.avif"
import Coins from "../../assets/images/cenik_04.png"
const saveLogo = [
	{
		image:Clock,
		title:"Save Time",
		subTitle:"Your future starts with one click.",
	},
	{
		image:Chess,
		title:"Save Stress",
		subTitle:"Confidence in every click.",
	},
	{
		image:Coins,
		title:"Save Money",
		subTitle:"Our tools are completely free.",
	},
]
	
const saveSection = ()  => {
	return (
		<div className="flex flex-wrap justify-between sm:justify-center relative w-full max-w-6xl mx-auto my-[32px]">
			{saveLogo.map((logo, index) => (
				<div key={index} className="flex flex-col  items-center sm:h-[222px] sm:w-[222px] sm:space-x-2 space-y-2 mt-[50px] mb-[30px]">
					<img src={logo.image} className="h-[96px] w-[96px]" />
					<div className="text-center ">
						<h4 className="text-[#13188C] font-bold">{logo.title}</h4>
						<h3 className="text-[#255BAB]">{logo.subTitle}</h3>
					</div>
				</div>
			))}
		</div>
	);
};

export default saveSection;