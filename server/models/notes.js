const mongoose = require('mongoose')
const NotesSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})
const Note = mongoose.model('Note', NotesSchema)

module.exports = Note