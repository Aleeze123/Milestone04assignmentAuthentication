import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, login,log} from 'next-auth/react';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            // Your GET logic here
            const session = await getSession({ req });
            res.status(200).json(session);
            break;

        case 'POST':
            // Your POST logic here
            const result = await signIn(req.body.provider, req.body.credentials);
            res.status(200).json(result);
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
};
