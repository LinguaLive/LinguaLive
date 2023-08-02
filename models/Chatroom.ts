import mongoose from 'mongoose'

const ChatroomSchema = new mongoose.Schema({
  name: {type: String, require: true},
  users: {type: [String], default: []},
  language: {type: String, require: true},
//   messages: [
//     new mongoose.Schema ({ 
//     username: String,
//     message: String,
//     }, { timestamps: true }
//     )
//   ],
  expireAt: {
    type: Date,
    default: new Date(),
    expires: 86400, // In seconds, room expires after 24 hours
  }
}, { timestamps: true });

const Chatroom = mongoose.models.Chatroom || mongoose.model('Chatroom', ChatroomSchema);

export default Chatroom;