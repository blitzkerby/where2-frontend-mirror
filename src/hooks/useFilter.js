import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const filterByLocation = ({ location , category }) => {
    navigate(`/list/${category}/?location=${encodeURIComponent(location)}`, { replace: true });
}