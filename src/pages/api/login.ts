import { NextApiRequest, NextApiResponse } from 'next';

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end(); // Return "Method Not Allowed" status code for non-POST requests
    return;
  }

  const body = req.body;

  try {
    // Placeholder for login logic and authentication with database.

    // status code if login is not verified
    // if (!verified) {
    //   return res.status(200).json({ notVerified: true });
    // }

    // redirect to the homepage upon successful login - may have to change endpoint
    return res.status(303).json({ redirectUrl: '/homepage' });
  } catch (err) {
    console.error('Error: ', err);
    return res.status(500).json({ error: 'There was an error logging in' });
  }
};

export default loginHandler;