const express = require('express');
const {HallwithRooms} = require('./cofig');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const hall = new HallwithRooms(req.body);
        await hall.save();
        console.log("Success");
        res.status(201).json(hall);
    } catch (error) {
        console.log("Failed to save hall:", error);
        res.status(400).json({ error: "Failed to save hall" });
    }
});

module.exports = router;