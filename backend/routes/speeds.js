const router = require('express').Router();
const moment = require('moment');

const Speed = require('../models/speed.model');

router.route('/').get((req, res) => {
    const { page = 1, date = moment().format('YYYY-MM-DD')  } = req.query;

    // convert the date to utc time
    const dateUTC = new Date(date);

    const options = {
        page,
        limit: 10,
        sort: {
            timestamp: 1, // order by timestamp asc
        }
    };

    const query = {
        timestamp: new RegExp(`^${moment(dateUTC).format('YYYY-MM-DD')}T`), // 2021-01-26T12:12:02.344771Z
    };

    Speed.paginate(query, options)
        .then(data => res.json(data))
        .catch(err => {
            res.status(400).json(err);
        })
    ;
});

module.exports = router;