import { useDispatch, useSelector } from "react-redux";
import Card from "./reusable/Card";
import { useEffect } from "react";
import { removedIsClicked,getFavorite } from "../features/slices/favoriteSlice";

const isDebug = true;  // Set to false to turn off console logging

/**
 * ScholarshipList component
 *
 * @param {Array} scholarships - List of scholarships to display.
 * @returns {JSX.Element} The list of scholarship cards or a "No results found" message.
 */
const ScholarshipList = ({ scholarships, page}) => {
    // Debugging
    if (isDebug) {
        console.log("ScholarshipList says: ", scholarships);
    }

    if (scholarships.length === 0) {
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
               await dispatch(getFavorite({ category: "scholarship" }));
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, [page, dispatch]);

    // if (scholarships[0] == "No results found") {
    //     return null;
    // }

    return (
        <>
            {scholarships.map((scholarship, index) => (
                <Card
                    key={index}
                    image={scholarship.image_url}
                    imageAlt={scholarship.image_alt}
                    title={scholarship.name}
                    description={scholarship.description}
                    facebookLink={scholarship.facebook_url}
                    instagramLink={scholarship.instagram_url}
                    telegramLink={scholarship.telegram_url}
                    websiteLink={scholarship.website}
                    location={scholarship.location}
                    route={`/detail/scholarship/${ scholarship.id }`}
                    id={scholarship.id}
                    type={"scholarship"}
                    isHeartClicked={isClicked[scholarship.id]}
                />
            ))}
        </>
    );
};

export default ScholarshipList;
