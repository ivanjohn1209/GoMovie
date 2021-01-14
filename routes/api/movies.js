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
// router.get('/watch-list/:id/:_id', (req, res) => {
//     User.findById(req.params.id, { 'movie': { $elemMatch: { _id: req.params._id } } }, function (err, user) {
//         if (err) {
//             return res.status(404).json({ msg: 'Movie Is Not Available' });
//         }
//         if (user) {
//             res.send(user.movie[0])
//         } else {
//             return res.status(404).json({ msg: 'Movie Is Not Available' });
//         }

//     });
// })
// @route POST api/mvoie
// @desc CREATE a items
// @acces public
router.post('/', auth, (req, res) => {
    User.findById(req.body.id, (err, doc) => {
        if (err) {
            return res.sendStatus(401);
        }
        let movieExist = doc.movie.filter(movies => movies.id == req.body.movieId).length !== 0;
        if (movieExist) {
            res.send({ msg: 'Movie Already Exist in Watchlist' });
        } else {
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
        }
    });
})

router.delete('/:id', auth, (req, res) => {
    const id = req.params.id.split("-");
    User.findByIdAndUpdate(
        id[0],
        { $pull: { 'movie': { _id: id[1] } } }, function (err, movie) {
            if (err) {
                return res.send(err);
            }
            return res.json(movie);
        });
})
module.exports = router;

//https://tech-blog.maddyzone.com/node.js/add-update-delete-object-array-schema-mongoosemongodb