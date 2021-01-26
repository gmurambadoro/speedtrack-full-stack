const router = require('express').Router();
const Joi = require('joi');

const Speed = require('../models/speed.model');

router.route('/').get((req, res) => {
    const { page = 1 } = req.query;

    const options = {
        page,
        limit: 10,
        sort: {
            timestamp: -1,
        }
    };

    Speed.paginate({}, options)
        .then(data => res.json(data))
        .catch(err => {
            res.status(400).json(err);
        })
    ;
});

module.exports = router;