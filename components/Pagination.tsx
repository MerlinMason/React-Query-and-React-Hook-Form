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
        <nav
            className="flex items-center justify-between"
            role="navigation"
            aria-label="Pagination Navigation"
        >
            {currentPage > 1 ? (
                <button
                    type="button"
                    onClick={() => onPaginate(currentPage - 1)}
                    aria-label={`Go to page ${currentPage - 1}`}
                >
                    <ChevronLeftIcon className="w-6" />
                </button>
            ) : (
                <ChevronLeftIcon className="w-6 text-gray-300" />
            )}

            <div>
                <span aria-label={`Current page ${currentPage}`} aria-current="true">
                    {currentPage}
                </span>
                of
                <span aria-label={`Total pages ${totalPages}`}>{totalPages}</span>
            </div>

            {currentPage < totalPages ? (
                <button
                    type="button"
                    onClick={() => onPaginate(currentPage + 1)}
                    aria-label={`Go to page ${currentPage + 1}`}
                >
                    <ChevronRightIcon className="w-6" />
                </button>
            ) : (
                <ChevronRightIcon className="w-6 text-gray-300" />
            )}
        </nav>
    );
};

export default Pagination;
