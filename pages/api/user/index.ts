import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import type { Users, BackendError } from "../../../types";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<Users | BackendError>
) {
    const { page, limit } = request.query;

    try {
        if (request.method === "GET") {
            const externalResponse = await axios.get(`${process.env.DUMMY_API_BASE_URL}/user`, {
                params: { page, limit },
            });
            response.status(200).json(externalResponse.data);
        } else if (request.method === "POST") {
            const externalResponse = await axios.post(
                `${process.env.DUMMY_API_BASE_URL}/user`,
                request.body
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
