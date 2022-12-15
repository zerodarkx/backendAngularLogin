const { Router } = require('express');
const { getData, postData } = require('../controllers/personal');
const router = Router();

router.post('', postData)

router.get('', getData)

module.exports = router