import PaginationButton from "./reusable/PaginationButton"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setTotalPage } from "../features/slices/universitySlice";

const Pagination = () => {
    const dispatch = useDispatch();

    const currentPage = useSelector((state) => state.universities.currentPage);
    const totalPage = useSelector((state) => state.universities.totalPage);

    const handlePageChange = (newPage) => {
        dispatch(setCurrentPage(newPage));
    }

    const handleTotalPageChange = (newTotalPage) => {
        dispatch(setTotalPage(newTotalPage));
    }

    return (
        <div className='flex items-center justify-center my-16 px-1 gap-[18px]'>

            <PaginationButton
                type={'prev'}
                // onClick={handlePrevClick} 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                isActive={currentPage}
            />

            {/* {[...Array(totalPages)].map((_, index) => (
                <PaginationButton
                    key={index + 1}
                    type='number'
                    onClick={() => handleNumberClick(index + 1)}
                    isActive={currentPage === (index + 1)}
                />
            ))} */}

            <span>{currentPage} of {totalPage}</span>

            <PaginationButton
                type={'next'}
                // onClick={handleNextClick}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                isActive={currentPage}
            />

        </div>
    );
};

export default Pagination;
