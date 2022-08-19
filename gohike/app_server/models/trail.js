var mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    activity1: {type: String},
    activity2: {type: String},
    activity3: {type: String},
    activity4: {type: String},
    activity5: {type: String},
    activity6: {type: String},
    activity7: {type: String},
    activity8: {type: String}
 });

 const reviewSchema = new mongoose.Schema({
    // author:{type:String},
    review:{type:String},
    ratings:{type:String}
    // img: { 
    //    data: Buffer, 
    //    contentType: String 
    // }
});


const gallerySchema = mongoose.Schema({
    author: {type: String},
    ratings: {type: String},
    review: {type: String},
    imagePath: {type: String}
});

const trailDetailSchema = new mongoose.Schema({
    name : {type: String, required: true, unique: true },
    location : {type:String, required: true  },
    description : {type: String },
    imagePath : {type: String },
    activities:[activitySchema],
    fee : {type: String, required: true },
    starRatings : {type: Number, required: true },
    trail_length:{type: String, required: true },
    trail_review: [gallerySchema]
 });



const userSchema = new mongoose.Schema({
    fullname : {type: String, required: true },
    mobile:{type:String, required: true, min:10,max:11},
    email:{type:String, required: true, unique: true},
    password:{type:String, required: true}
});

// const signinSchema = new mongoose.Schema({
//     fullname : {type: String, required: true, unique: true },
//     email:{type:String, required: true}
// });

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    img: { 
        data: Buffer, 
        contentType: String 
    },
    description: {type: String, required: true, unique: true }
});

const savedTrailSchema = new mongoose.Schema({
    name : {type: String, required: true},
    location : {type:String, required: true  },
    description : {type: String },
    imagePath : {type: String },
    activities:[activitySchema],
    fee : {type: String, required: true },
    starRatings : {type: Number, required: true },
    trail_length:{type: String, required: true },
    trail_review: [gallerySchema]
 });

var trailModel = mongoose.model("Trail", trailDetailSchema);
var userModel = mongoose.model("User", userSchema);
// var signinModel = mongoose.model("Signin", signinSchema);
var articleModel = mongoose.model("Article", articleSchema);
var reviewModel = mongoose.model("Review", reviewSchema);
var galleryModel = mongoose.model("Gallery", gallerySchema);
var savedTrailModel = mongoose.model("SavedTrail", savedTrailSchema);

module.exports = {
    trailModel, userModel, articleModel, reviewModel, galleryModel, savedTrailModel
}