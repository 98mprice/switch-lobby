import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  src: {
    type: String
  },
  background_src: {
    type: String
  },
  popular: {
    type: Number
  },
  lobbies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lobby'
  }]
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export default Game
