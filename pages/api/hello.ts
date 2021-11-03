import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function helloAPI(req: NextApiRequest, res: NextApiResponse<Data>): void {
    res.status(200).json({
        name: "John Doe",
    });
}
