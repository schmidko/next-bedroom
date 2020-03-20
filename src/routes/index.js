const express = require('express');
const router = express.Router();

router.get('*', (request, res) => {
    if (NODE_ENV === 'local') {
        const user_object = require('../config/mock_user_local.json');
        request.session.loggedin = true;
        request.session.user_object = user_object;
        res.render('app', {layout: false});
    } else {
        if (request.session.loggedin === true) {
            res.render('app', {layout: false});
        } else {
            res.render('login', {layout: false});
        }
    }
});

module.exports = router;
