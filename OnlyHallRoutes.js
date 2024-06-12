const express = require('express');
const router = express.Router();
const {OnlyHall} = require('./cofig');

router.post('/', async (req, res) => {
    try {
        const hall = new OnlyHall(req.body);
        await hall.save();
        console.log("Success");
        res.status(201).json(hall);
    } catch (error) {
        console.log("Fail");
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
