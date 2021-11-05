import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import type { User, BackendError } from "../../../types";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<User | BackendError>
) {
    const { id } = request.query;

    try {
        if (request.method === "GET") {
            const externalResponse = await axios.get(
                `${process.env.MOCK_API_BASE_URL}/users/${id}`,
                request.body
            );
            response.status(200).json(externalResponse.data);
        } else if (request.method === "PUT") {
            const externalResponse = await axios.put(
                `${process.env.MOCK_API_BASE_URL}/users/${id}`,
                request.body
            );
            response.status(200).json(externalResponse.data);
        } else if (request.method === "DELETE") {
            const externalResponse = await axios.delete(
                `${process.env.MOCK_API_BASE_URL}/users/${id}`
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
