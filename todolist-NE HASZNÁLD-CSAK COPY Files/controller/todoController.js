const fs = require('fs');
const notesFile = './database/todo.json';
const userFile = './database/user.json';

const Note = {
    getUsers: function () {
        let users = [];
        try {
            const noteString = fs.readFileSync(userFile);
            users = JSON.parse(noteString);
        } catch (err) {
            return err;
        }
        return users;
    },

    getAll: function () {
        let notes = [];
        try {
            const noteString = fs.readFileSync(notesFile);
            notes = JSON.parse(noteString);
        } catch (err) {
            return {
                error: err
            };
        }
        return notes;
    },

    save: function (notes) {
        try {
            fs.writeFileSync(notesFile, JSON.stringify(notes));
        } catch (err) {
            return err;
        }
    },

    getNote: function (id = 0) {
        let notes = this.getAll();
        let note = notes.filter(note => note.id === parseInt(id));
        return note[0] || {
            error: 'Not found'
        };
    },

    getNoteAndUser: function (id = 0) {
        let notes = this.getAll();
        let users = this.getUsers();
        let note = notes.filter(note => note.id === parseInt(id));
        let user = users.filter(us => us.id === parseInt(note[0].userid));
        return {
            note: note[0],
            user: user[0]
        } || 'Not found';
    },

    addNote: function (body) {
        console.log(body);

        let notes = this.getAll();
        let id = 0;
        let colorDef = "#00f";
        let stamp = new Date();
        if (body.color == ("#f00" || "#0f0" || "#ff0")) {
            colorDef = body.color;
        }
        if (body.text == "" || body.text == undefined) {
            return {
                error: "Add meg a feladat szövegét!!"
            }
        }
        notes.forEach(note => {
            if (note.id > id)
                id = note.id;
        });
        const note = {
            id: id + 1,
            userid: body.userid,
            text: body.text,
            important: body.important,
            done: Boolean(body.done),
            color: colorDef,
            update: stamp,
            delete: stamp
        };
        notes.push(note);
        this.save(notes);
        return notes;
    },

    removeNote: function (id) {
        let notes = this.getAll();
        notes = notes.filter(note => note.id !== parseInt(id));
        this.save(notes);
        return notes;
    },

    editNote: function (id, body) {
        let notes = this.getAll();
        let colorDef = "#00f";
        if (body.color == ("#f00" || "#0f0" || "#ff0")) {
            colorDef = body.color;
        }
        const index = notes.findIndex(note => note.id === parseInt(id));
        if (index !== -1) {
            notes[index].text = body.text || notes[index].text;
            notes[index].userid = body.userid || notes[index].userid;
            notes[index].important = body.important || notes[index].important;
            notes[index].done = body.done || notes[index].done;
            notes[index].color = colorDef || notes[index].color;
            notes[index].update = new Date();
            this.save(notes);
            return notes;
        }
        return {
            error: 'Not found'
        };
    }
};

module.exports = Note;