import express from 'express'
import ReviewsCtrl from './reviews.controller.js'

const router = express.Router()

router.route('/').get((req, res) => res.send("hello Mo"))
router.route('/video/:id').get(ReviewsCtrl.apiGetReviews)
router.route('/new').post(ReviewsCtrl.apiPostReview)
router.route('/:id')
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

// what is happening is that the router will redirect base on request type,
// for example if '/:id' received a get request it will run apiGetReview function etc

export default router