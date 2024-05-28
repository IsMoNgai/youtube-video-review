import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    //static function so you can call this func without an object of reviewController
    /*
    this post review require request to contain videoId, review, user. And it will pack it all tgt to reviewResponse
    and add it to review through ReviewsDAO.addReview
    */
  static async apiPostReview(req, res, next) {
    try {
      const videoId = (req.body.videoId).toString()
      const review = req.body.review
      const user = req.body.user
      console.log('videoid', videoId)
      const reviewResponse = await ReviewsDAO.addReview(
        videoId,
        user,
        review
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  /*
  req = request
  res = result
  this function try to search through reviews using the getReview(id) func
  */
  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {}
      let review = await ReviewsDAO.getReview(id)
      if (review.length == 0) {
        res.status(404).json({ error: "Not found" })
        return
      }
      console.log(id)
      res.json(review)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const review = req.body.review
      const user = req.body.user

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      )

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review",
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

    // this func intake review's id
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  //this function intake video id
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {}
      let reviews = await ReviewsDAO.getReviewsByVideoId(id)
      if (reviews.length == 0) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(reviews)
      console.log(reviews.length)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}