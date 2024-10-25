
import Card from "./reusable/Card";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { removedIsClicked,getFavorite } from "../features/slices/favoriteSlice";
import WrapperComponent from "./reusable/WrapperComponent";
import NoResults from "../layouts/NoResults";


const StudentLoanList = ({ studentLoans, page }) => {

    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (page === 1) {
                    dispatch(removedIsClicked());
                }
               await dispatch(getFavorite({ category: "loan"}));
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, [page, dispatch]);
	if (studentLoans.length === 0) {
		return <NoResults />;
	}
    return (
    <>
    {studentLoans.map(loan => {
        return (
            <WrapperComponent>
            <Card
                key={loan.loan_id}
                id={loan.loan_id}
                image={loan.img_url}
                imageAlt={loan.image_alt}
                title={loan.bank_name}
                description={loan.loan_type}
                interest={loan.interest_rate}
                loan_size={loan.loan_limit}
                term={loan.loan_term}
                // facebookLink={loan.updatedAt}
                // instagramLink={loan.updatedAt}
                // twitterLink={loan.createdAt}
                // youtubeLink={loan.createdAt}
                // websiteLink={loan.createdAt}
                location={loan.address}
                deadLine={loan.deadline}
                type={"loan"}
                redirect={loan.info_link}
                isHeartClicked={isClicked[loan.loan_id]}
                
                />
            </WrapperComponent>)
        
    })}
    </>
);
};

export default StudentLoanList;