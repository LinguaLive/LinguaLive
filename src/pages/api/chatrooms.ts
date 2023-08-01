import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "./../../../lib/dbConnect";
import Chatroom from "./../../../models/Chatroom";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  await dbConnect()
  .then(() => "Connected to MongoDB Database")
  .catch((error) => {
    error: 'Connection Failed...!';
  })

  if (req.method === 'POST') {
    // query the database here and add new chatroom
    await Chatroom.create({
      language: req
    })

  } else {
    // Add logic to fetch from database and return list of chatrooms
    const chatrooms = Chatroom.find({});
  }

  res.status(200).json(chatrooms);
}