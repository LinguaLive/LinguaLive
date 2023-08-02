import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
  }
}