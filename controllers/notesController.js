const asyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')

// @desc Set Note || Create Note
// @route POST /api/notes
// @access PUBLIC
const createNote = asyncHandler(async (req, res) => {

	let note = 'New Note'

	let title = note

	if (req.body.note) {
		note = req.body.note

		if (req.body.note.length > 25) {
			title = note.slice(0, 20) + '. . .'
		}

	}


	const newNote = await Note.create({
		title,
		note,
		type: 'note',
	})

	res.status(201).json({ newNote, message: 'New Note Created!' })
})

// @desc Get Notes
// @route GET /api/notes
// @access PUBLIC
const getNotes = asyncHandler(async (req, res) => {
	let notes
	let limit = 10
	const lastNote = req.query._lastNote

	if (req?.query?._limit) {
		limit = parseInt(req?.query?._limit)
	}

	notes = await Note.find()
		.sort({ updatedAt: 'desc' })
		.limit(limit)
		.select({ title: 1, note: 1, _id: 1, updatedAt: 1 })
		.lean()

	if (lastNote) {
		notes = await Note.find({ updatedAt: { $lt: lastNote } })
			.sort({ updatedAt: 'desc' })
			.limit(limit)
			.select({ title: 1, note: 1, _id: 1, updatedAt: 1 })
			.lean()
	}

	res.status(200).json(notes)
})

// @desc Get Note by ID
// @route GET /api/notes/:id
// @access PUBLIC
const getNoteById = asyncHandler(async (req, res) => {
	const note = await Note.findById(req.params.id)
		.select({ title: 1, note: 1, _id: 1, updatedAt: 1 })
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
		req.body.title = req.body.note

		if (req.body.note.length > 25) {
			req.body.title = req.body.note.slice(0, 20) + '. . .'
		}

		const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
			.select({ title: 1, note: 1, _id: 1, updatedAt: 1 })
			.lean()

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
