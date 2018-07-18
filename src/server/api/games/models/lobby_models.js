import mongoose from 'mongoose'

const lobbySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  }]
}, {
  timestamps: true
})

const Lobby = mongoose.model('Lobby', lobbySchema)

export default Lobby
