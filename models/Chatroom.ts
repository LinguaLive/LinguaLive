import mongoose from 'mongoose'

const ChatroomSchema = new mongoose.Schema({
  users: [String],
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
    expires: 4320,
  }
}, { timestamps: true });

const Chatroom = mongoose.models.Chatroom || mongoose.model('Chatroom', ChatroomSchema);

export default Chatroom;