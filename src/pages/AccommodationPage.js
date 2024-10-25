import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useQueryParams } from '../hooks/useQueryParams';

import { LoadingOverlay } from '../components/reusable/Loading';

import Navbar from '../components/reusable/Navbar';
import Footer from '../components/reusable/Footer';
import Pagination from '../components/reusable/Pagination';
import ListContainer from '../components/reusable/ListContainer';
import AccommodationList from '../components/AccommodationList';
import { fetchAllList } from '../features/slices/paginationSlice';
/** Enable for debugging */
const isDebug = true;

const AccommodationPage = () => {
    const urlParams = useQueryParams();

    const page = parseInt(urlParams.get('page')) || 1;
    const limit = parseInt(urlParams.get('limit')) || 10;
    const searchQuery = urlParams.get('q') || '';

    const dispatch = useDispatch();
    const { totalPage, data, error, loading } = useSelector((state) => state.pagination);

    useEffect(() => {
        dispatch(fetchAllList({page,limit:10,model: 'Accommodation'}))
    },[dispatch, page])
    return (
        <div>
            <Navbar />
            <ListContainer>
            {loading && <LoadingOverlay/>}
            {error && <p>{error}</p>}
                <AccommodationList accommodations={data} page={page} />
            </ListContainer>
            <Pagination totalPage={totalPage} currentPage={page} category='accommodation'/>
            <Footer />
        </div>
    )
};

export default AccommodationPage;