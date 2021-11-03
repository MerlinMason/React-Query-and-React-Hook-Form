import axios, { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

import type { UserFull } from "../types";

const useUsers = (id: string): UseQueryResult<UserFull, AxiosError> =>
    useQuery(["user", { id }], async () => {
        if (id) {
            const { data } = await axios.get(`/api/user/${id}`);
            return data;
        }
    });

export default useUsers;
