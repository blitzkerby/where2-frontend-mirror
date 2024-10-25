import Navbar from "./../components/reusable/Navbar";
import Footer from "./../components/reusable/Footer";
import ListContainer from "./../components/reusable/ListContainer";
import TypewriterEffect from "./../styles/TypeWriterEffect";

const ErrorPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-blue-900 text-white">
            <Navbar />
            <ListContainer className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4"><TypewriterEffect text={"Error 404"}/></h1>
                    <p className="text-2xl mb-8"><TypewriterEffect text={"The page you're looking for doesn't exist."}/></p>
                    <p className="text-lg"><TypewriterEffect text={"It looks like you're trying to access a page that has been moved or doesn't exist."}/></p>
                    <p className="text-lg"><TypewriterEffect text={"Please check the URL or return to the homepage."}/></p>
                    <p className="text-9xl mt-8">:&#40;</p>
                </div>
            </ListContainer>
            <Footer />
        </div>
    );
}

export default ErrorPage;
