import { urlencoded, json } from 'body-parser'
import cookieParser from 'cookie-parser'
// import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { Nuxt, Builder } from 'nuxt'

import config from '../../nuxt.config'
import apiRoutes from './api'

const app = express()
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// Global middleware
// only allow http://127.0.0.1:3000 and http://localhost:3000
// only allow process.env.API_URL, process.env.SERVER_API_URL, and process.env.PAGE_URL
// app.use(cors({
//   origin: process.env.NOW_URL // fix this.
// }))
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cookieParser())

// Import API Routes
app.use('/api', apiRoutes)

config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// setup the database connection
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL, { useMongoClient: true })

app.listen(process.env.PORT, process.env.HOST, err => {
  if (err) { console.log(err) }
  console.log(`Server listening on http://${process.env.HOST}:${process.env.PORT}`)
})

var shortid = require('shortid');
var games = {

}
var Hashids = require('hashids');
var hashids = new Hashids();
io.on('connection', function(socket){
  console.log('a user connected');
  var connected_games = [];
  var selected_game = null;
  var user = null;
  socket.on('disconnect', function(){
    console.log('user disconnected');
    for (var i = 0; i < games.length; i++) {
      io.to(games[i]).emit('leave game', user);
    }
  });
  socket.on('chat message', function(msg){
    console.log("got message" + msg)
    if (selected_game) io.to(selected_game).emit('chat message', msg)
  });

  socket.on('add friend', function(msg){
    console.log("add friend" + msg)
    if (selected_game) io.to(selected_game).emit('add friend', msg)
  });

  socket.on('join game', function(msg){
    console.log("join game" + JSON.stringify(msg))
    if (games[msg.game_id]) {
      socket.join(msg.game_id);
      console.log("games" + JSON.stringify(games))
      add_to_games(msg.user, msg.game_id)
      io.to(msg.game_id).emit('join game', {
        game_id: msg.game_id,
        new_user: msg.user,
        users: games[msg.game_id].users
      })
    }
  });

  socket.on('create game', function(msg){
    console.log("create lobby" + JSON.stringify(msg))
    if (!games[msg.game_id]) {
      var game_id = get_new_game_id()
      socket.join(game_id);
      add_to_games(msg.user, game_id)
      io.to(game_id).emit('join game', {
        game_id: msg.game_id,
        new_user: msg.user,
        users: games[msg.game_id].users
      })
    } else {

    }
    if (game) {
      console.log("adding lobby to " + game)
      games[game].lobby[count_id] = {
        users: [
          msg.user
        ]
      }
      io.to(game).emit('create lobby', {
        lobby_id: count_id,
        users: games[game].lobby[count_id].users
      })
      socket.join(game + '-' + count_id)
      io.to(msg.game_id).emit('join lobby', {
        lobby_id: count_id,
        new_user: msg.user,
        users: games[msg.game_id].users
      })
      count_id++
    }
  });

  socket.on('join lobby', function(msg){
    console.log("join lobby" + JSON.stringify(msg))
    socket.join(game + '-' + msg.lobby_id)
    io.to(game + '-' + msg.lobby_id).emit('join lobby', {
      lobby_id: msg.lobby_id,
      users: games[game].lobby[msg.count_id].users,
      new_user: msg.user
    })
  });
});

function get_new_game_id() {
  var hashids = new Hashids(shortid.generate(), 4);
  var hash = hashids.encrypt(1);
  return hash
}

function add_to_games(user, game){
  if (!((games[game])&&(games[game].users))) {
    games[game] = {
      users: [

      ]
    }
    console.log("initialised games" + JSON.stringify(games))
  }
  var index = games[game].users.findIndex(x => x._id == user._id)
  if (index == -1) {
    games[game].users.push(user)
  }
  console.log("games" + JSON.stringify(games))
}

/*var count_id = 0;
var games = {

}

io.on('connection', function(socket){
  console.log('a user connected');
  var game = null;
  socket.on('disconnect', function(){
    console.log('user disconnected');
    if (game) {
      io.emit('leave game', {
        _id: msg._id,
        username: msg.username
      })
    } else {
      io.emit('leave', {
        _id: msg._id,
        username: msg.username
      })
    }
  });
  socket.on('chat message', function(msg){
    console.log("got message" + msg)
    if (game) io.to(game).emit('chat message', msg)
    else      io.emit('chat message', msg)
  });

  socket.on('add friend', function(msg){
    console.log("add friend" + msg)
    if (game) io.to(game).emit('add friend', msg)
    else      io.emit('add friend', msg)
  });

  socket.on('join game', function(msg){
    console.log("join game" + JSON.stringify(msg))
    if (game) {
      console.log("leavin" + game)
      remove_from_games(msg.user, game)
      io.to(game).emit('leave game', {
        user: msg.user
      })
      socket.leave(game);
    }
    game = msg.game_id
    socket.join(msg.game_id);
    console.log("adding to game" + JSON.stringify(msg.user))
    add_to_games(msg.user, msg.game_id)
    io.to(msg.game_id).emit('join game', {
      game_id: msg.game_id,
      new_user: msg.user,
      users: games[msg.game_id].users
    })
  });

  socket.on('create lobby', function(msg){
    console.log("create lobby" + JSON.stringify(msg))
    if (game) {
      console.log("adding lobby to " + game)
      games[game].lobby[count_id] = {
        users: [
          msg.user
        ]
      }
      io.to(game).emit('create lobby', {
        lobby_id: count_id,
        users: games[game].lobby[count_id].users
      })
      socket.join(game + '-' + count_id)
      io.to(msg.game_id).emit('join lobby', {
        lobby_id: count_id,
        new_user: msg.user,
        users: games[msg.game_id].users
      })
      count_id++
    }
  });

  socket.on('join lobby', function(msg){
    console.log("join lobby" + JSON.stringify(msg))
    socket.join(game + '-' + msg.lobby_id)
    io.to(game + '-' + msg.lobby_id).emit('join lobby', {
      lobby_id: msg.lobby_id,
      users: games[game].lobby[msg.count_id].users,
      new_user: msg.user
    })
  });
});

function remove_from_games(user, game
) {
  if (!((games[game])&&(games[game].users))) {
    games[game] = {
      users: [

      ]
    }
    console.log("initialised games" + JSON.stringify(games))
  } else {
    var index = games[game].users.findIndex(x => x._id == user._id)
    if (index > -1) {
      games[game].users.splice(index, 1);
    }
  }
}

function add_to_games(user, game){
  if (!((games[game])&&(games[game].users))) {
    games[game] = {
      users: [

      ]
    }
    console.log("initialised games" + JSON.stringify(games))
  }
  var index = games[game].users.findIndex(x => x._id == user._id)
  if (index == -1) {
    games[game].users.push(user)
  }
  console.log("games" + JSON.stringify(games))
}*/

export default app
