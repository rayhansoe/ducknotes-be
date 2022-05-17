const express = require('express')
const router = express.Router()

// route for pinging the backend.

router.route('/').get((req, res) => {
	res.status(200).json({ isBackEndReady: true })
})

module.exports = router
