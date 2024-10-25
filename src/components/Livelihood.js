import CardSlider from "./reusable/CardsSlider";
import PartTimeJob from '../assets/images/part-time-job.jpg';
import StudentLoan from '../assets/images/student-loan.jpeg';
import Accommodation from '../assets/images/accommodation.jpg';
import JobFinder from '../assets/images/job-finder.jpg';
import LiveliHood from '../assets/images/livelihood.png'
import LivelihoodBox from "./reusable/LivelihoodBox";
import { useState, useEffect } from "react";
import WrapperComponent from "./reusable/WrapperComponent";
import { Link } from "react-router-dom";
const Livelihood = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
      
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const cards = [
        {
            title: "Part-time Job",
            image: PartTimeJob,
            path: "/list/job"
        },
        {
            title: "Student Loan",
            image: StudentLoan,
            path: "/list/student-loan"
        },
        {
            title: "Accommodation",
            image: Accommodation,
            path: "/list/accommodation"
        },
    ];
    return (
        <section className="bg-[#F4F8FA]">
            <div className="flex flex-col align-middle justify-center gap-6 p-6 mt-[64px] h-max">
                <WrapperComponent>
                <div className="w-full lg:h-[925px] sm:h-[500px]">
                    <img src={LiveliHood} className="h-full sm:min-h-full lg:object-fit sm:object-none" alt="Hero photo of livelidhood page"/>
                </div>
                </WrapperComponent>
                <WrapperComponent>
                <CardSlider cards={cards} header={"Conveniently Self-Supporting"} className="h-fit"/>
                </WrapperComponent>
                <section className="flex gap-x-12 lg:px-12 sm:px-2 mx-auto mb-[64px]">
                    {isMobile ? null : <div className="flex-1 content-center">
                        <h1 className="text-[#367588] pb-[54px]"><b>Ready to discover how we can help you achieve your academic and financial goal?</b></h1>
                        <img src={JobFinder} className="rounded-full w-96 h-96" />
                    </div>}
                    <div className="flex-1 content-center">
                        <div>
                            <Link to={'/list/job'}>
                                <LivelihoodBox title={"Part Time Job"} content={"Invest in your future. Discover part-time jobs that help fund your education goals."} />
                            </Link>
                            <Link to={'/list/student-loan'}>
                                <LivelihoodBox title={"Student Loan"} content={"Simplify your student loan journey. Explore refinancing options and get personalized advice."} />
                            </Link>
                            <Link to={'/list/accommodation'}>
                                <LivelihoodBox title={"Accommodation"} content={"Enhance your learning experience with the perfect living space. Find accommodations that inspire and support your academic journey."} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Livelihood;