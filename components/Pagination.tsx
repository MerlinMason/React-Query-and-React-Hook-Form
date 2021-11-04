import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

interface Props {
    currentPage?: number | undefined;
    itemsPerPage: number;
    totalItems: number | undefined;
    onPaginate: (nextPage: number) => void;
}

const Pagination: React.FC<Props> = ({
    currentPage = 1,
    itemsPerPage = 1,
    totalItems = 1,
    onPaginate,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="flex items-center justify-between">
            {currentPage > 1 ? (
                <button type="button" onClick={() => onPaginate(currentPage - 1)}>
                    <ChevronLeftIcon className="w-6" />
                </button>
            ) : (
                <ChevronLeftIcon className="w-6 text-gray-300" />
            )}

            <div>{`${currentPage} of ${totalPages}`}</div>

            {currentPage < totalPages ? (
                <button type="button" onClick={() => onPaginate(currentPage + 1)}>
                    <ChevronRightIcon className="w-6" />
                </button>
            ) : (
                <ChevronRightIcon className="w-6 text-gray-300" />
            )}
        </div>
    );
};

export default Pagination;
