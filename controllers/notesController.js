const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')

// @desc Set Note || Create Note
// @route POST /api/notes
// @access PUBLIC
const createNote = asyncHandler(async (req, res) => {
	if (!req.body.note) {
		res.status(400)
		throw new Error('Please add a note field')
	}

	const note = await Note.create({
		note: req.body.note,
		type: 'note',
	})

	res.status(201).json({ note, message: 'New Note Created!' })
})

// @desc Get Notes
// @route GET /api/notes
// @access PUBLIC
const getNotes = asyncHandler(async (req, res) => {
	const notes = await Note.find().select({ note: 1, _id: 1, createdAt: 1, updatedAt: 1 }).lean()
	res.status(200).json(notes)
})

// @desc Get Note by ID
// @route GET /api/notes/:id
// @access PUBLIC
const getNoteById = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id)
		.select({ note: 1, _id: 1, createdAt: 1, updatedAt: 1 })
		.lean()

	res.status(200).json(note)
})

// @desc Update Note by ID
// @route PUT /api/notes/:id
// @access PRIVATE
const updateNote = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id)

	if (!note) {
		res.status(400)

		throw new Error('Note Not Found!')
	}

	try {
		const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		}).lean()

		res.status(200).json({
			updatedNote,
			message: 'The Note is Updated',
		})
	} catch (error) {
		res.status(401)
		throw new Error(error)
	}
})

// *
// **
// ****
// export all functions
module.exports = {
	createNote,
	getNotes,
	getNoteById,
	updateNote,
}
