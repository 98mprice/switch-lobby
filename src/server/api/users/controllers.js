import User from './models'
import { ServerError } from 'express-server-error'

export const user_index = {
  /**
   *  Finds all Users or specific User by id and returns array
   */
  async get (req, res) {
    console.log("getting user" + req.params.user_id)
    try {
      if (req.params.user_id) {
        let user = await User.findById(req.params.user_id)
        if (!user) throw new ServerError('No User with that id exists at this moment.', { status: 404 })
        res.json(user)
      } else {
        console.log("getting all Users")
        let users = await User.find({})
        if (!users) throw new ServerError('No Users exist at this moment.', { status: 404 })
        res.json(users)
      }
    } catch (error) {
      res.handleServerError(error)
    }
  },
  async post (req, res) {
    try {
      let { username, friendcode, bookmark } = req.body
      console.log("saving user" + username + friendcode + JSON.stringify(bookmark))
      let new_user = new User({ username: username,
        friendcode: friendcode,
        bookmark: bookmark
      })
      console.log("here")
      try {let saved_user = await new_user.save()
      console.log('saved user' + saved_user._id)
      res.json(saved_user)}
      catch (err) {
        console.log(err)
      }
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const bookmark_index = {
  async post (req, res) {
    try {
      let { user_id, game_id } = req.body
      console.log("adding or removing" + user_id)
      let user = await User.findById(user_id)
      if (!user) throw new ServerError('No User with that id exists at this moment.', { status: 404 })
      if (user.bookmark.indexOf(game_id) > -1) {
        var index = user.bookmark.indexOf(game_id);
        if (index > -1) {
          user.bookmark.splice(index, 1);
        }
      } else {
        user.bookmark.push(game_id)
      }
      let saved_user = await user.save()
      res.json({ message: `User updated, ${saved_user.username}!` })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}

export const friend_index = {
  async post (req, res) {
    try {
      let { user_id, friend_id } = req.body
      console.log("adding or removing" + friend_id + "from" + user_id)
      let user = await User.findById(user_id)
      if (!user) throw new ServerError('No User with that id exists at this moment.', { status: 404 })
      if (user.friends.indexOf(friend_id) > -1) {
        var index = user.friends.indexOf(friend_id);
        if (index > -1) {
          user.friends.splice(index, 1);
        }
      } else {
        user.friends.push(friend_id)
      }
      let saved_user = await user.save()
      res.json({ message: `User updated, ${saved_user.username}!` })
    } catch (error) {
      res.handleServerError(error)
    }
  }
}
