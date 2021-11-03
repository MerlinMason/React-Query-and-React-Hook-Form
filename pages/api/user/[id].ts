import axios, { AxiosResponse, AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import type { UserFull, BackendError } from "../../../types";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<UserFull | BackendError>
) {
    const { id } = request.query;

    try {
        if (request.method === "GET") {
            const externalResponse = await axios.get(
                `${process.env.DUMMY_API_BASE_URL}/user/${id}`,
                request.body
            );
            response.status(200).json(externalResponse.data);
        } else if (request.method === "PUT") {
            const externalResponse = await axios.put(
                `${process.env.DUMMY_API_BASE_URL}/user/${id}`,
                request.body
            );
            response.status(200).json(externalResponse.data);
        } else if (request.method === "DELETE") {
            const externalResponse = await axios.delete(
                `${process.env.DUMMY_API_BASE_URL}/user/${id}`
            );
            response.status(200).json(externalResponse.data);
        } else {
            response.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Access to config, request, and response
            response.status(error?.response?.status).json(error?.response.data);
        } else {
            // Just a stock error
            response.status(500);
        }
    }
}
