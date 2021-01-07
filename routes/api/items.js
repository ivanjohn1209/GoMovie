const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Item = require('../../model/Item');

// @route GET api/items
// @desc GET all api/items
// @acces public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
        .catch(err => res.json(err));
})


// @route POST api/items
// @desc CREATE a items
// @acces Private
router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })
    newItem.save().then(items => res.json(items))
        .catch(err => res.json(err));
})


// @route POST api/items
// @desc CREATE a items
// @acces public
router.put('/', (req, res) => {
    const newName = req.body.name;
    const id = req.body.id;
    Item.findById(id, (err, updatedItem) => {
        updatedItem.name = newName;
        updatedItem.save()
        res.send("update")
    });
})


// @route DELETE api/items/:id
// @desc DELETE a items
// @acces Private
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })
        )).catch(err => res.status(404).json({ success: false }));

})
module.exports = router;