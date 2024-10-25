import { Link } from "react-router-dom";
import React from "react";
const DefaultCard = ({ card }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105">
      <Link to={card.path}>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-96 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
        <p className="text-sm text-gray-600 truncate">{card.description}</p>
      </div>
    </div>
  );
};

export default DefaultCard;

