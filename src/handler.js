const { nanoid } = require('nanoid');
const notes = require('./notes');

// add
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  // Unique id
  const id = nanoid(16);

  //  Time
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // Push
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  // Push array
  notes.push(newNote);

  // Check success
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // Valid ?
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// get
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// Show
const getNoteByIdHandler = (request, h) => {
  // Initial id
  const { id } = request.params;

  // Get Object
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// edit
const editNoteByIdhandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  // get index
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Delete
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // Check index
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    // Delete array where index
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  // Else
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdhandler,
  deleteNoteByIdHandler,
};
