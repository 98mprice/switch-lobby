import { Router } from 'express'
import { game_index, game_search_index, lobby_index } from './controllers'

const router = Router()

router.get('/:game_id', game_index.get)
router.get('/', game_index.get)
router.get('/search/:search_term', game_search_index.get)
router.get('/lobby/:lobby_id', lobby_index.get)
router.get('/:game_id/lobby', lobby_index.get)

export default router
