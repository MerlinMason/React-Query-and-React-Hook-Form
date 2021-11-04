import axios, { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

import type { User } from "../types";

const useUsers = (id: string): UseQueryResult<User, AxiosError> =>
    useQuery(["user", id], async () => {
        if (id) {
            const { data } = await axios.get(`/api/users/${id}`);
            return data;
        }
    });

export default useUsers;
