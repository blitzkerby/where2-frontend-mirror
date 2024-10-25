import React from "react";
// import { useNavigate } from "react-router-dom";

const AccordionButton = ({ applyFilter , contentItem }) => {
    function handleClick() {
        console.log("AccordionButton says: applying filter...", contentItem)
        // navigate(`/list/university?location=${contentItem}`)
        applyFilter(contentItem)
    }

    return (
        <div className="p-5">
            <div className="bg-[#A9EBFF] w-fit border rounded-full px-2 cursor-pointer drop-shadow-lg"
                onClick={handleClick}
            >
                {contentItem}
            </div>
        </div>
    );
};

export default AccordionButton;
