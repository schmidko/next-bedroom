const express = require('express');
const router = express.Router();

router.get('*', (request, res) => {
    res.render('app', {layout: false});
});

module.exports = router;
