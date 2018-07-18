import Game from './models/game_models'
import User from '../users/models'
import Lobby from './models/lobby_models'
import { ServerError } from 'express-server-error'

export const game_index = {
  /**
   *  Finds all games or specific game by id and returns array
   */
  async get (req, res) {
    console.log("getting game" + req.params.game_id)
    try {
      if (req.params.game_id) {
        let game = await Game.findById(req.params.game_id)
        if (!game) throw new ServerError('No game with that id exists at this moment.', { status: 404 })
        res.json(game)
      } else {
        console.log("getting all games")
        let games = await Game.find({})
        if (!games) throw new ServerError('No games exist at this moment.', { status: 404 })
        res.json(games)
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const lobby_index = {
  /**
   *  Finds all games or specific game by id and returns array
   */
  async get (req, res) {
    console.log("getting game" + req.params.lobby_id)
    try {
      if (req.params.lobby_id) {
        let game = await Lobby.findById(req.params.lobby_id)
        if (!lobby) throw new ServerError('No lobby with that id exists at this moment.', { status: 404 })
        res.json(game)
      } else {
        console.log("getting all lobbys")
        let lobbys = await Lobby.find({})
        if (!lobbys) throw new ServerError('No lobbys exist at this moment.', { status: 404 })
        res.json(lobbys)
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

export const game_search_index = {
  async get (req, res) {
    try {
      console.log("searching for" + req.params.search_term)
      const regex = new RegExp(escapeRegex(req.params.search_term), 'gi');
      let games = await Game.find({ title: regex })
      //if (!game) throw new ServerError('No game with that id exists at this moment.', { status: 404 })
      //Games.find({ "title": regex }, function(err, foundjobs) {
      //     if(err) {
      //         console.log(err);
      //     } else {
      //        res.render("jobs/index", { jobs: foundjobs });
      //     }
      //});
      console.log("returning " + JSON.stringify(games))
      let users = await User.find({ /*title: regex,*/
          $or: [
                { username: regex },
                { friendcode: regex }
            ]
          })
      res.json({
        games: games,
        users: users
      })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
