import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, default: ''},
  nativeLang: {type: String, default: ''},
  learningLang: {type: String, default: ''},
  profile_pic: {
    type: String,
    validate: {
        validator: (val: string) => {
        let urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
        return urlRegex.test(val);
    }},
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;