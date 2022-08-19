const res = require("express/lib/response");
var mongoose = require("mongoose");
const SavedTrail = mongoose.model('SavedTrail');

const getSavedTrails = function (req, res) {
    console.log("getSavedTrails")
    SavedTrail.find().exec(function (err, traildata) {
        if (err) {
            res
                .status(404)
                .json(err);
            return;
        }
        res.status(200)
            .json(traildata)
    });
};

const createSavedTrail = (req, res) => {
    console.log("createSavedTrail")
    SavedTrail.create({
        name : req.body.name,
        location : req.body.location,
        description : req.body.description,
        imagePath: req.body.imagePath,
        activities : req.body.activities,
        fee : req.body.fee,
        starRatings : req.body.starRatings,
        trail_length : req.body.trail_length,
        trail_review : req.body.trail_review
    },
        (err, traildata) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(traildata);
            }
        }
    );
};

const getSingleSavedTrail = (req, res) => {
    console.log("getSingleSavedTrail")
    console.log(req.params.trailname)
    SavedTrail
        .findOne(req.params.trailname)
        .exec((err, trail) => {
            if (!trail) {
                return res
                    .status(404)
                    .json({
                        "message": "Saved Trail not found"
                    });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(trail);
        });
};

const deleteSavedTrail = (req, res) => {
    const trailid = req.params.trailid;
    console.log("Inside delete" + trailid)
    if (trailid) {
        SavedTrail
            .findByIdAndRemove(trailid)
            .exec((err, traildata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res.status(200)
                    .json(traildata);

            });
    } 
    else {
        res
            .status(404)
            .json({ "message": "No trailId" });
    }
};

module.exports = {
    getSavedTrails,
    createSavedTrail,
    deleteSavedTrail,
    getSingleSavedTrail
}