import type { NextApiRequest, NextApiResponse } from 'next'

// Import chatroom model and connect to database

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    // query the database here and add new chatroom
  } else {
    // Add logic to fetch from database and return list of chatrooms
  }

  res.status(200).json([{id: '1', name: 'Spanish'}, {id: '2', name: 'French'}, {id: '3', name: 'Korean'}]);
}