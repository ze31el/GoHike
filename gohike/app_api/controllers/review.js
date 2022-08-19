const res = require("express/lib/response");
var mongoose = require("mongoose");
const Review = mongoose.model('Review');

const createReview = (req, res) => {
    Review.create({
        author : req.body.author,
        ratings : req.body.ratings,
        review : req.body.review,
    
    },
        (err, reviewdata) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(reviewdata);
            }
        }
    );
};

const getReviews = function (req, res) {
    Review.find().exec(function (err, reviewdata) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        res.status(200)
            .json(reviewdata)
    });
};

const getSingleReview = (req, res) => {
    Review
        .findById(req.params.reveiwId)
        .exec((err, review) => {
            if (!review) {
                return res
                    .status(404)
                    .json({
                        "message": "Review not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(review);
        });
};

const deleteReview = (req, res) => {
    const reviewid = req.params.reviewid;
    if (reviewid) {
        Trail
            .findByIdAndRemove(reviewid)
            .exec((err, reviewdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res.status(200)
                    .json(reviewdata);

            });
    } 
    else {
        res
            .status(404)
            .json({ "message": "No revieId" });
    }
};


module.exports = {
    createReview,
    getReviews,
    getSingleReview,
    deleteReview
}