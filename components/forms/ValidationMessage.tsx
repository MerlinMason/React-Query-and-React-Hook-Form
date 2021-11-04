import { ExclamationCircleIcon } from "@heroicons/react/outline";

const ValidationMessage: React.FC = ({ children }) => {
    return (
        <div
            role="alert"
            className="bg-green-600 p-2 text-white rounded mt-4 flex items-center gap-2"
        >
            <ExclamationCircleIcon className="w-6" />
            <span>{children}</span>
        </div>
    );
};

export default ValidationMessage;
