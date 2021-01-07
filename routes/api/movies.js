const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');

// @route GET api/items
// @desc GET all api/items
// @acces public
router.get('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user.movie))
        .catch(err => res.json(err));
})

// @route POST api/items
// @desc CREATE a items
// @acces public
router.post('/', auth, (req, res) => {
    // User.findById(req.body.id)
    //     .then(user => {
    //         const isExist = user.movie.filter(i => i.id == req.body.movieId).length == 0;
    //         if (isExist) {
    //             user.movie.push({ id: movieId });
    //             user.save()
    //         } else {
    //             console.log("Movie already exist")
    //             res.send("Movie already exist")
    //         }
    //     })
    //     .catch(err => console.log(err));
    User.findByIdAndUpdate(
        req.body.id,
        {
            $push: {
                "movie": {
                    id: req.body.movieId,
                    backPoster: req.body.backPoster,
                    popularity: req.body.popularity,
                    title: req.body.title,
                    poster: req.body.poster,
                    overview: req.body.overview,
                    rating: req.body.rating
                }
            }
        },
        { safe: true, upsert: true },
        function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });
})

router.delete('/:id', auth, (req, res) => {
    const movieId = "5ff339a95901da162ccad503"
    User.findByIdAndUpdate(
        req.params.id,
        { $pull: { 'movie': { _id: movieId } } }, function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json(model);
        });
})
module.exports = router;

//https://tech-blog.maddyzone.com/node.js/add-update-delete-object-array-schema-mongoosemongodb