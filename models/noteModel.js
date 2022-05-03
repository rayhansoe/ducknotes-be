const mongoose = require('mongoose')
const { Schema, model } = mongoose

const normalNote = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Please add a text value'],
		},

		note: {
			type: String,
			required: [true, 'Please add a text value'],
		},
		type: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

normalNote.index({ type: -1 })

const noteSchema = model('Note', normalNote)

module.exports = noteSchema
