const Review = require('../models/reviewModel')

function createComment(req, res) {
  const comment = req.body
  req.body.user = req.currentuser

  Review
    .findById(req.params.id)
    .then(review => {
      if (!review) return res.status(404).send({
        message: 'Not found'
      })

      review.comments.push(comment)
      return review.save()
    })
    .then(review => res.send(review))
    .catch(err => res.send(err))
}

function editComment(req, res) {
  Review
    .findById(req.params.reviewId)
    .then(review => {
      if (!review) return res.status(404).send({ message: 'Comment not found' })
      const comment = review.comments.id(req.params.commentId)
      comment.set(req.body)
      return review.save()
    })
    .then(review => res.status(202).send(review))
    .catch(err => res.send(err))
}



function deleteComment(req, res) {
  Review
    .findById(req.params.reviewId)
    .then(review => {
      // const currentUserId = req.currentUser._id
      const comment = review.comments.id(req.params.commentId)
      comment.remove()
      review.save()
    })
    .catch(err => res.send(err))
}



module.exports = {
  createComment,
  editComment,
  deleteComment
}


