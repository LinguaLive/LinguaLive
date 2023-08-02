import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "./../../../lib/dbConnect";
import Chatroom from "./../../../models/Chatroom";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  // query the database here and add new chatroom
  await dbConnect()
  .then(() => "Connected to MongoDB Database")
  .catch((error) => {
    error: 'Connection Failed...!';
  })

  if (req.method === 'POST') {
    const { name, language } = req.body;
    // Look at NewRoomForm component for request being made
    // Return new room id
    const chatroom = await Chatroom.create({ name, language });
    res.status(201).json(chatroom.id)

  } else {
    // Add logic to fetch from database and return list of chatrooms
    const chatrooms = await Chatroom.find({});
    res.status(200).json(chatrooms)
  }

}