const router = require('express').Router(),
    User = require('../schemas/userSchema')

router.get('/', (req, res) => {
    if (!req.user) return res.redirect('/login')
    res.render('profile', {user: req.user})
})

module.exports = router