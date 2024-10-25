import ButtonComponent from "./../reusable/Button";
import WrapperComponent from "./../reusable/WrapperComponent";

const HealthArticleCard = ({ id, image, title, description, onClick }) => {
  return (
    <WrapperComponent>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-3xl cursor-pointer tracking-tightest"
        onClick={() => onClick(id)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">
            {description.substring(0, 100)}...
          </p>
          <ButtonComponent
            variant="primary"
            size="medium"
            onClick={(e) => {
              e.stopPropagation(); 
              onClick(id);
            }}
          >
            Read More
          </ButtonComponent>
        </div>
      </div>
    </WrapperComponent>
  );
};

export default HealthArticleCard;
