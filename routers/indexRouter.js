const router = require('express').Router()
const User = require('../schemas/userSchema')
const axios = require('axios');



router.get('/', (req, res) => {
    if (!req.user) return res.redirect('/login')
    res.render('index', {user: req.user})
})

router.post('/start', async (req, res) => {
    try {
        const response = await axios.post('https://7779-103-25-231-104.ngrok-free.app/api/start');
        console.log(response.data);
        res.redirect('/')
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

router.post('/stop', async (req, res) => {
    try {
        const response = await axios.post('https://7779-103-25-231-104.ngrok-free.app/api/stop');
        console.log(response.data);
        res.redirect('/')
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

router.post('/status', async (req, res) => {
    try {
        const response = await axios.get('https://7779-103-25-231-104.ngrok-free.app/api/status');
        console.log(response.data);
        res.redirect('/')
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


module.exports = router