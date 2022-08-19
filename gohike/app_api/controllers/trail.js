const res = require("express/lib/response");
var mongoose = require("mongoose");
const Trail = mongoose.model('Trail');

const getTrails = function (req, res) {
    Trail.find().exec(function (err, traildata) {
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


// const getSelectedTrails = function (req, res) {
//     console.log("getSelectedTrails")
//     console.log(req.params.paramValue)
//     if (!req.params.paramValue) {
//         res.status(404)
//             .json({
//                 "message": "No trail with request data exist"
//             });
//         return;
//     }
//     Trail.find(req.params.paramValue).exec(function (err, traildata) {
//         if (err) {
//             res
//                 .status(404)
//                 .json(err);
//             return;
//         }
//         res.status(200)
//             .json(traildata)
//     });
// };
const createTrail = (req, res) => {
    Trail.create({
        name : req.body.name,
        location : req.body.location,
        description : req.body.description,
        imagePath: 'http://localhost:3000/trailImages/' + req.file.filename,
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

const updateTrail = (req, res) => {
    if (!req.params.trailid) {
        res
            .status(404)
            .json({
                "message": "Not found, trail id is required"
            });
        return;
    }
    Trail.findById(req.params.trailid)
        .exec((err, traildata) => {
            if (!traildata) {
                res
                    .status(404)
                    .json({
                        "message": "TrailId not found"

                    });
                return;
            }
            else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }

            traildata.name = req.body.name,
            traildata.location  = req.body.location,
            traildata.description = req.body.description,
            traildata.imagePath=req.body.imagePath,
            traildata.activities =  {
                activity1: req.body.activity1,
                activity2: req.body.activity2,
                activity3: req.body.activity3,
                activity4: req.body.activity4,
                activity5: req.body.activity5,
                activity6: req.body.activity6,
                activity7: req.body.activity7,
                activity8: req.body.activity8
            }
    
            traildata.fee = req.body.fee,
            traildata.starRatings = req.body.starRatings,
            traildata.trail_length = req.body.trail_length,
            trail_review={
                author: req.body.author,
                ratings: req.body.ratings,
                review: req.body.review,
                imagePath: req.body.imagePath
            }
            traildata.save((err, traildata) => {
                if (err) {

                    res
                        .status(404)
                        .json(err);
                }
                else {
                    res
                        .status(200)
                        .json(traildata);
                }
            });
        });
};

const getSingleTrail = (req, res) => {
    console.log("getSingleTrail")
    Trail
        .findById(req.params.trailid)
        .exec((err, trail) => {
            if (!trail) {
                return res
                    .status(404)
                    .json({
                        "message": "Trail not found"
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

const deleteTrail = (req, res) => {
    const trailid = req.params.trailid;
    if (trailid) {
        Trail
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
    getTrails,
    createTrail,
    updateTrail,
    getSingleTrail,
    deleteTrail,
    //getSelectedTrails
}