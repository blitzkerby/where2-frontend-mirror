import TermsAndConditionsComponent from "./../components/authentication/TermsAndConditions";
import Footer from "./../components/reusable/Footer";
import Navbar from "./../components/reusable/Navbar";

const TermsAndConditionsPage = () => {
    return (
        <>
            <Navbar/>
            <TermsAndConditionsComponent />
            <Footer />
        </>
    )
}

export default TermsAndConditionsPage;