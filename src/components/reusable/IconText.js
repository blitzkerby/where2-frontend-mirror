const IconText = ({svg, content}) => {
    return (
        <div className="flex gap-x-6 p-4">
            <img src={svg} className="w-20 h-20" /> <span>{content}</span>
        </div>
    )
};

export default IconText;