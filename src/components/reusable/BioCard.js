import React from "react";
import WrapperComponent from "./WrapperComponent";

const BioCard = ({ children, variant = "left", bioCard, className = "" }) => {
  const baseStyle = `flex items-center justify-center hover:scale-105 sm:w-full sm:flex-col m-auto p-6 gap-6 shadow-lg my-[32px] rounded-3xl sm:px-5`;


  const variants = {
    right: `lg:flex-row-reverse`,
  };

  const componentStyle = `${className} ${baseStyle} ${variants[variant]}`;

  return (
    <WrapperComponent>
          <div className={componentStyle}>
      <div className="lg:w-[50%] h-[50%] lg:h-full sm:h-auto">
        <img
          src={bioCard.image}
          alt={bioCard.title}
          className="min-w-full h-full rounded-2xl"
        />
      </div>
      <div className="w-full p-4 sm:w-full lg:w-1/3 lg:h-full">
        <h1 className="flex items-center justify-center w-full h-full ">
          {bioCard.title}
        </h1>
          <p
            className="flex items-center justify-center w-full h-full text-justify"
            dangerouslySetInnerHTML={{
              __html: bioCard.description.replace(/\n/g, "<br />"),
            }}
          />
      </div>
    </div>
    </WrapperComponent>
  );
};

export default BioCard;