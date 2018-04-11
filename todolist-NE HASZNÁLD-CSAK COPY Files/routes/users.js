/* GET users listing. */
var express = require('express');
const Note = require('../controller/todoController');
var noteRouter = express.Router();

noteRouter.get('/', (req, res) => {
  res.json(Note.getAll());
});

noteRouter.get('/:id', (req, res) => {
  res.json(Note.getNote(req.params.id));
});
noteRouter.get('/with/:id', (req, res) => {
  res.json(Note.getNoteAndUser(req.params.id));
});

noteRouter.post('/', (req, res) => {
  console.log(req.body);

  res.json(Note.addNote(req.body));
});

noteRouter.put('/:id', (req, res) => {
  res.json(Note.editNote(req.params.id, req.body));
});

noteRouter.delete('/:id', (req, res) => {
  res.json(Note.removeNote(req.params.id));
});

module.exports = noteRouter;


/* app.listen(port, () => console.log('Server Running')); */

module.exports = noteRouter;