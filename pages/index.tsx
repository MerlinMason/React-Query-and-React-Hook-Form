import Features from "../components/Features";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white text-gray-700 w-96 rounded p-6 shadow-xl">
                <h1 className="font-bold text-2xl mb-6">Welcome to NextProject</h1>

                <p className="mb-2">An mildly opinionated starting point for Next.js projects.</p>

                <Features />
            </div>
        </div>
    );
};

export default Home;
