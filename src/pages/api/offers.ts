import type { NextApiRequest, NextApiResponse } from 'next';
import { Offers } from '../../../models/Calls';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect().then((res) => {
    console.log(res)
    "Connected to MongoDB Database"
  })
  .catch((error) => {
    error: 'Connection Failed...!';
  });
  const { sdp, type } = JSON.parse(req.body);
  if (req.method === 'POST') {
    const doc = await Offers.create({ sdp, type });
    const newOffer = await doc.toJSON();
  } else {
    // Add something for get request here
  }
}