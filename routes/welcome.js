const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const ImageData = require('../models/imageData');
const UserData = require('../models/userData');

router.get('/:id', catchAsync(async (req, res) => {
    const dbUser = await UserData.findById(req.params.id)
    res.render('userdata/welcome', { dbUser })
}))
router.get('/:id/edit', catchAsync(async (req, res) => {
    const userData = await UserData.findById(req.params.id)
    res.render('userdata/edit', { userData });
}))
router.get('/:id/gallery', catchAsync(async (req, res) => {
    const userData = await UserData.findById(req.params.id)
    const userImages = await ImageData.find({ userId: req.params.id })
    res.render('gallery/gallery', { userData, userImages });
}))
router.get('/:id/gallery/add', catchAsync(async (req, res) => {
    const userData = await UserData.findById(req.params.id)
    res.render('gallery/addImage', { userData });
}))
router.post('/:id/gallery/add', catchAsync(async (req, res) => {
    const newImage = new ImageData(req.body.ImageData);
    newImage.userId = req.params.id
    const userData = await UserData.findById(req.params.id)
    userData.image.push(newImage);
    await userData.save()
    await newImage.save();
    res.redirect(`/welcome/${userData._id}/gallery`)
}))
router.put('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const userData = await UserData.findByIdAndUpdate(id, { ...req.body.userData });
    res.redirect(`/welcome/${userData._id}`)
}));

module.exports = router