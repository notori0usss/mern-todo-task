const noteModel = require("../models/notes");

const notes = async function getNoteById(req, res, next) {
    let note;
    try {
        note = await noteModel.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({message: "No Note Found"});
        }
    } catch (e) {
        return res.status(500).json({message: e.message});
    }
    res.note = note;
    next();
}

module.exports = notes
