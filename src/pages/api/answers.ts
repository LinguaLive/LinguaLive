import type { NextApiRequest, NextApiResponse } from 'next';
import { Answers } from '../../../models/Calls';
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
    const newAnswer = await Answers.create({ sdp, type });
    return res.status(200).json(newAnswer);
  } else {
    const answers = await Answers.find({});
    return res.status(200).json(answers);
  }
}