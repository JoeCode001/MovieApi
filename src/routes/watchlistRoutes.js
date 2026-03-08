import express from 'express';
import { addToWatchlist, removeFromWatchlist } from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToWatchlistSchema } from '../validators/watchlistValidators.js';
const router = express.Router();

router.use(authMiddleware)

router.post('/',addToWatchlist)

router.put('/:id', validateRequest(addToWatchlistSchema), updateFromWatchlist)

router.delete('/:id', removeFromWatchlist)

// router.get('/', (req, res) => {
//   res.send('Get user watchlist');
// });

export default router;