const res = require("express/lib/response");
var mongoose = require("mongoose");
const Gallery = mongoose.model('Gallery');

const getGallerys = async(req, res) =>{
    const gallery = await Gallery.find();
    res.status(200).json({gallery});
}

const createGallery = async(req, res)=>{
    const{author} = req.body;
    const{ratings} = req.body;
    const{review} = req.body;
    const imagePath = 'http://localhost:3000/images/' + req.file.filename;
    const gallery = new Gallery({
        author,
        ratings,
        review,
        imagePath
    });
    const createdGallery = await gallery.save();
    res.status(201).json({
        gallery:{
            ...createdGallery._doc
        }
    })
}



module.exports = {
    getGallerys,
    createGallery
}
