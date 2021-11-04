import axios, { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

import type { Users } from "../types";

const useUsers = (page: number, limit: number): UseQueryResult<Users, AxiosError> =>
    useQuery(["users", { page, limit }], async () => {
        const { data } = await axios.get("/api/users", { params: { page, limit } });
        return data;
    });

export default useUsers;
