import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import type { User, Users } from "../types";

type Context = { previousUsers: Users };
function isContext(value: unknown): value is Context {
    return typeof value === "object" && value !== null && value.hasOwnProperty("previousUsers");
}

const useDeleteUser = ({
    page,
    limit,
    onSuccess,
    removeOnSuccess = false,
}: {
    page?: number;
    limit?: number;
    onSuccess?: () => void;
    removeOnSuccess?: boolean;
}) => {
    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation(
        async (id?: string): Promise<User> => {
            const { data } = await axios.delete(`/api/users/${id}`);
            return data;
        },
        {
            onMutate: async (id) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(["users", { page, limit }]);

                // Snapshot the previous value
                const previousUsers = queryClient.getQueryData<Users>(["users", { page, limit }]);

                // Optimistically update to the new value
                if (previousUsers) {
                    queryClient.setQueryData<Users>(["users", { page, limit }], {
                        ...previousUsers,
                        data: previousUsers.data.filter((user) => {
                            return user.id !== id;
                        }),
                    });
                }

                return { previousUsers };
            },
            onSuccess: async () => {
                if (removeOnSuccess) {
                    // When deleting a user form the single user page, we want to ensure we have fresh data when being redirected back to the index.
                    // However, when deleting from the index we don't want to reload the whole index
                    await queryClient.removeQueries("users");
                }
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: (err, variables, context) => {
                // If the mutation fails, use the context returned from onMutate to roll back
                if (isContext(context)) {
                    queryClient.setQueryData<Users>(
                        ["users", { page, limit }],
                        context.previousUsers
                    );
                }
            },
        }
    );

    return deleteUserMutation;
};

export default useDeleteUser;
