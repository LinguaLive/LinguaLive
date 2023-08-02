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
}, { timestamps: true });

ChatroomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // Deleted after 24 hours

const Chatroom = mongoose.models.Chatroom || mongoose.model('Chatroom', ChatroomSchema);

export default Chatroom;