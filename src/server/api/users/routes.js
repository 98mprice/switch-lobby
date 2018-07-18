import { Router } from 'express'
import authenticate from '~/middleware/authenticate'
import { user_index, bookmark_index, friend_index } from './controllers'

const router = Router()

router.get('/:user_id', user_index.get)
router.get('/', user_index.get)
router.post('/', user_index.post)
router.post('/bookmark/', bookmark_index.post)
router.post('/friends/', friend_index.post)

/*router.get('/check', check.get)

router.post('/sign-in', signIn.post)
router.post('/sign-out', authenticate(), signOut.post)

router.route('/:username')
  .all(authenticate())
  .get(username.get)
  .post(username.post)
  .delete(username.delete)*/

export default router
