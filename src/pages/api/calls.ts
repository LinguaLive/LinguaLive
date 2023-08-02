import type { NextApiRequest, NextApiResponse } from 'next';
import { Calls } from '../../../models/Calls';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const body = JSON.parse(req.body);
  if (req.method === 'POST') {
    if (body.id) {
      const docs = await Calls.findById(body.id);
      return res.status(200).json(docs);
    }
  } else {
    
  }
}