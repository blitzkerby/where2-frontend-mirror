import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const commonClass = `cursor-pointer h-[24px] w-[24px] lg:h-[32px] lg:w-[32px] p-2 flex items-center justify-center rounded border-2`;
const commonStyle = {
    borderRadius: '2px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#ADB6B9',
};

/**
 * PaginationButton component renders different types of pagination buttons.
 * 
 * @param {string} type         - The type of button to render ('prev', 'next', 'number').
 * @param {number} currentPage  - The current active page number.
 * @param {number} pageNumber   - The page number to display (used only for 'number' type).
 * 
 * @example
 * <PaginationButton type="prev" />
 * <PaginationButton type="number" currentPage={1} pageNumber={1} />
 * <PaginationButton type="next" />
 */

const PaginationButton = ({ currentNumber, type, onClick, isActive }) => {
    const renderButtonContent = () => {
        switch (type) {
            case 'prev':
                return <MdOutlineKeyboardArrowLeft />;
            case 'next':
                return <MdOutlineKeyboardArrowRight />;
            case 'number':
                return <>{currentNumber}</>;
            default:
                return null;
        }
    };

    const PaginationStyle = type !== 'number'
        ? commonStyle
        : {
            ...commonStyle,
            borderColor: isActive ? '#32ADE6' : '#ADB6B9'
        };

    return (
        <button
            className={commonClass}
            style={PaginationStyle}
            onClick={onClick}
            disabled={type === 'prev' && isActive === 1}
        >
            {renderButtonContent()}
        </button>
    );
};

export default PaginationButton;