import { useDispatch, useSelector } from "react-redux";

import Card from "./reusable/Card";

import { useEffect } from "react";
import { removedIsClicked,getFavorite } from "../features/slices/favoriteSlice";

const isDebug = false;  // Set to false to turn off console logging

/**
 * UniversityList component
 *
 * @param {Array} universities - List of universities to display.
 * @returns {JSX.Element} The list of university cards or a "No results found" message.
 */



const UniversityList = ({ universities, page }) => {

    if (isDebug) {
        console.log("UniversityList says: ", universities);
    }

    if (universities.length === 0) {
        return <div style={{ textAlign: 'center', color: 'red', fontSize: '24px' }}>No results found :(</div>;
    }

    const dispatch = useDispatch();
    const { isClicked } = useSelector((state) => state.favorites);
 
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (page === 1) {
                    dispatch(removedIsClicked());
                }
               await dispatch(getFavorite({ category: "university" }));
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, [page, dispatch]);

    return (
        <>
        {
            universities.map((university, index) => {
                return (
                    <Card
                        key={index}
                        image={university.image_url}
                        imageAlt={university.image_alt}
                        title={university.name}
                        description={university.description}
                        facebookLink={university.facebook_url}
                        instagramLink={university.instagram_url}
                        telegramLink={university.telegram_url}
                        websiteLink={university.website}
                        location={university.location}
                        route={`/detail/university/${ university.id }`}
                        type={"university"}
                        id={university.id}
                        isHeartClicked={isClicked[university.id]}
                    />)
            })
            }
        </>
    );
};

export default UniversityList;
