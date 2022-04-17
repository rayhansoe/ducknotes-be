const express = require('express')
const router = express.Router()

const { createNote, getNotes, getNoteById, updateNote } = require('../controllers/notesController')

router.route('/').get(getNotes).post(createNote)

router.route('/:id').get(getNoteById).put(updateNote)

module.exports = router
