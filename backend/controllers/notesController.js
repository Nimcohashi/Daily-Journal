const Notes = require("../model/notesModel");
const User = require("../model/userModel");

// Create a new note
const createNote = async (req, res) => {
  const { title, content } = req.body;
  const { _id } = req.user;

  // Input validation
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new note
    const note = new Notes({
      title: title,
      content: content,
      createdBy: _id,
    });

    await note.save();

    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all notes
const getNotes = async (req, res) => {
  const { _id } = req.user;
  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const notes = await Notes.find({ createdBy: _id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single note by ID
const getSingularNote = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  // Input validation
  if (!id) {
    return res.status(400).json({ error: "Note ID is required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const note = await Notes.findOne({ _id: id, createdBy: _id });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit a note
const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { _id } = req.user;

  // Input validation
  if (!id) {
    return res.status(400).json({ error: "Note ID is required" });
  }
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Edit the note
    const note = await Notes.findOneAndUpdate(
      { _id: id, createdBy: _id },
      { title: title, content: content },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a note with validation
const deleteNote = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  // Input validation
  if (!id) {
    return res.status(400).json({ error: "Note ID is required" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the note
    const note = await Notes.findOneAndDelete({ _id: id, createdBy: _id });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getSingularNote,
  editNote,
  deleteNote,
};
