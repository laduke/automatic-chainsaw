const router = require('express').Router();
const fetchBuoyData = require('./ndbc').fetchBuoyData;


const get = (req, res) => {
  fetchBuoyData(req.url).fork(
    error => res.status(500).send('Something broke! ' + error),
    data => res.status(200).send(data)
  );
};

router.get('/', get);


module.exports = router;
