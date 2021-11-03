const Error: React.FC = () => (
    <>
        <h1 className="text-xl mb-2">Sorry, something has gone wrong.</h1>
        <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
        >
            Try again
        </button>
    </>
);

export default Error;
