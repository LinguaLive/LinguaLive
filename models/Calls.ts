import mongoose, { Schema } from "mongoose";

const offersSchema = new Schema({
  sdp: String,
  type: String
});

const Offers = mongoose.model('Offers', offersSchema);

const answersSchema = new Schema({
  sdp: String,
  type: String
});

const Answers = mongoose.model('Answers', answersSchema)

const callsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  offerCandidates: [{
    type: Schema.Types.ObjectId,
    ref: 'Offers'
  }],
  answerCandidates: [{
    type: Schema.Types.ObjectId,
    ref: 'Answers'
  }]
})

const Calls = mongoose.model('Calls', callsSchema);

export { Calls, Offers, Answers};