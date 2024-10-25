import Card from "../reusable/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavorite } from "../../features/slices/favoriteSlice";
import { removedIsClicked } from "../../features/slices/favoriteSlice";
import WrapperComponent from "../reusable/WrapperComponent";
import NoResults from "../../layouts/NoResults";
const JobList = ({ jobs, page }) => {
	const dispatch = useDispatch();
	const { isClicked } = useSelector((state) => state.favorites);
	let image;

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				if (page === 1) {
					dispatch(removedIsClicked());
				}
				await dispatch(getFavorite({ category: "job" }));
			} catch (error) {
				console.error("Error fetching favorites:", error);
			}
		};
		fetchFavorites();
	}, [page, dispatch]);
	if (jobs.length === 0) {
		return <NoResults />;
	}
	return (
		<>
			{jobs.map((job) => {
				job.company_id ? (image = job.company.img_url) : (image = null);
				return (
					<WrapperComponent>
						<Card
							key={job.id}
							id={job.id}
							image={image}
							imageAlt={job.job_rquire}
							title={job.company_name}
							position={job.position}
							salary={job.salary}
							description={job.job_desc}
							// facebookLink={job.updatedAt}
							// instagramLink={job.updatedAt}
							// twitterLink={job.createdAt}
							// youtubeLink={job.createdAt}
							// websiteLink={job.createdAt}
							location={job.location}
							deadLine={job.deadline}
							timeOut={job.salary}
							type={"job"}
							isHeartClicked={isClicked[job.id]}
							route={`/detail/job/${job.id}`}
						/>
					</WrapperComponent>
				);
			})}
		</>
	);
};

export default JobList;
