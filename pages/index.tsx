import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";

import Error from "../components/Error";
import Pagination from "../components/Pagination";
import useUsers from "../hooks/useUsers";
import useDeleteUser from "../hooks/useDeleteUser";
import Button from "../components/forms/Button";

const ITEMS_PER_PAGE = 10;

const Home: React.FC = () => {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const { isLoading, isError, data } = useUsers(page, ITEMS_PER_PAGE);
    const deleteUserMutation = useDeleteUser({ page, limit: ITEMS_PER_PAGE });
    const users = data?.data ?? [];

    useEffect(() => {
        if (data && Number.isInteger(data.total)) {
            setTotalCount(data.total);
        }
    }, [data]);

    if (isError) {
        return <Error />;
    }

    return (
        <div className="bg-white text-gray-700 rounded p-6 shadow-xl">
            <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold mb-6">Users</h1>

                <Button as="link" href="/users/create">
                    Create User
                </Button>
            </div>
            <table className="w-full text-left mb-6">
                <tbody className="divide-y divide-gray-200">
                    {isLoading
                        ? [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                              <tr key={i} className="animate-pulse">
                                  <td>
                                      <div className="flex items-center gap-4">
                                          <div className="rounded-full w-12 h-12 my-3 bg-gray-300"></div>
                                          <div className="flex gap-2">
                                              <span className="h-4 w-16 rounded bg-gray-300"></span>
                                              <span className="h-4 w-20 rounded bg-gray-300"></span>
                                          </div>
                                      </div>
                                  </td>
                                  <td>
                                      <div className="flex gap-5 justify-end">
                                          <span className="h-4 w-4 bg-gray-300 rounded"></span>
                                          <span className="h-4 w-4 bg-gray-300 rounded"></span>
                                      </div>
                                  </td>
                              </tr>
                          ))
                        : users.map(({ id, avatar, firstName, lastName }) => (
                              <tr key={id}>
                                  <td>
                                      <div className="flex items-center gap-4">
                                          <img
                                              src={avatar}
                                              alt={firstName}
                                              className="rounded-full w-12 h-12 my-3"
                                              data-testid={`avatar_${id}`}
                                          />
                                          <span className="capitalize text-lg">{`${firstName} ${lastName}`}</span>
                                      </div>
                                  </td>
                                  <td>
                                      <div className="flex gap-5 justify-end">
                                          <button
                                              onClick={() => deleteUserMutation.mutate(id)}
                                              disabled={deleteUserMutation.isLoading}
                                              className="disabled:opacity-50"
                                          >
                                              <TrashIcon className="w-6 h-6"></TrashIcon>
                                          </button>
                                          <Link href={`/users/${id}`}>
                                              <a>
                                                  <PencilIcon className="w-6 h-6"></PencilIcon>
                                              </a>
                                          </Link>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                </tbody>
            </table>

            <Pagination
                currentPage={page}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={totalCount}
                onPaginate={(nextPage) => {
                    setPage(nextPage);
                }}
            />
        </div>
    );
};

export default Home;
