const express = require('express');
const router = express.Router();
const ctrlTrail = require('../controllers/trail');
const trailStorage = require('../helpers/trailStorage');
//const {verifyToken} = require('../../app')

// trail data
router.get('/trail',
// function verifyToken(req,res){
//     if(!req.header.authorization){
//       return res.status(401).send('Unauthorized request')
//     }
//     let token = req.authorization.split(' ')[1]
//     if(token === ''){
//       return res.status(401).send('Unauthorized request')
//     }
//     let payload = jwt.verify(token,'secretkey',{})
//     if(!payload){
//       return res.status(401).send('Unauthorized request')
//     }
//     req.userId = payload.subject
//     next()
// },
ctrlTrail.getTrails)
router.post('/trail', trailStorage, ctrlTrail.createTrail);

// router.route('/customTrail?paramValue:paramData')
//     .get(ctrlTrail.getSelectedTrails)

router.route('/trail/:trailid')
    .get(ctrlTrail.getSingleTrail)
    .put(ctrlTrail.updateTrail)
    .delete(ctrlTrail.deleteTrail);


    

module.exports = router;