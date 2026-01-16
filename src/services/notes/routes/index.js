import express from 'express';
import {
  addNote,
  getNotes,
  getNoteById,
  editNoteById,
  deleteNoteById,
} from '../controller/note-controller.js';
import validate from '../../../middlewares/validate.js';
import validateQuery from '../../../middlewares/validateQuery.js';
import {
  notePayloadSchema,
  noteQuerySchema,
  noteUpdatePayloadSchema,
} from '../validator/schema.js';

const router = express.Router();

router.post('/notes', validate(notePayloadSchema), addNote);
router.get('/notes', validateQuery(noteQuerySchema), getNotes);

router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate(noteUpdatePayloadSchema), editNoteById);
router.delete('/notes/:id', deleteNoteById);

export default router;
