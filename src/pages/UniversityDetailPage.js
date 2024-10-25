import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUniversity } from './../features/slices/universitySlice';

import DetailLayout from './../layouts/DetailLayout';

import Navbar from './../components/reusable/Navbar';
import Footer from './../components/reusable/Footer';
import { LoadingOverlay } from './../components/reusable/Loading';
import DiscussionContainer from '../components/reusable/DiscussionContainer';

const UniversityDetailPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const university = useSelector((state) => state.universities.university);
    const isLoading = useSelector((state) => state.universities.isLoading);
    

    useEffect(() => {
        dispatch(fetchUniversity(id));
    }, [dispatch, id]);

    if (isLoading) {
        return <LoadingOverlay/>;
    }

    return (
        <>
            <Navbar />
            {university && (
                <DetailLayout
                    image={university.image_url}
                    description={university.description}
                    title={university.name}
                    websiteLink={university.website}
                    facebookLink={university.facebook_url}
                    instagramLink={university.instagram_url}
                    twitterLink={university.twitter_url}
                    telegramLink={university.telegram_url}
                />
            )}
            <Footer />
        </>
    );
};

export default UniversityDetailPage;