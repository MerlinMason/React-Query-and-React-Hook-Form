import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import type { User } from "../types";

const useSaveUser = ({
    onSuccess,
}: {
    onSuccess?: () => void;
} = {}) => {
    const queryClient = useQueryClient();
    const saveUserMutation = useMutation(
        async ({ id, ...restUserProperties }: User): Promise<string> => {
            if (id) {
                const { data } = await axios.put(`/api/users/${id}`, { id, ...restUserProperties });

                return data;
            } else {
                const { data } = await axios.post("/api/users", { ...restUserProperties });

                return data;
            }
        },
        {
            onSuccess: async () => {
                await queryClient.removeQueries("user");
                await queryClient.removeQueries("users");
                if (onSuccess) {
                    onSuccess();
                }
            },
        }
    );

    return saveUserMutation;
};

export default useSaveUser;
