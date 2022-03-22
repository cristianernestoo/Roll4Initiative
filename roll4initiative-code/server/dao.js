'use strict';
/* Data Access Object (DAO) module for accessing tasks and exams */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('roll4initiative.db', (err) => {
    if (err) throw err;
});


// get the task identified by {id}
exports.getGames = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT GAME_SETTINGS.id AS id, game_title, number_players, dice, role_secret, id_room, creation_date, narration_mode, role, name FROM GAME_SETTINGS INNER JOIN (GAMESETTINGS_USERS LEFT JOIN USERS ON USERS.id = GAMESETTINGS_USERS.id_user) WHERE GAME_SETTINGS.id = GAMESETTINGS_USERS.id_game';
        db.all(sql, [], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ errors: 'Games not found.' });
            } else {
                const games = row.map( (row) => ({
                    id: row.id, game_title: row.game_title, number_players: row.number_players, dice: row.dice,
                    role_secret: row.role_secret, id_room: row.id_room, creation_date: row.creation_date, narration_mode: row.narration_mode, role: row.role, name:row.name
                }));
                resolve(games);
            }
        });
    });
};

exports.getNarrationMode = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT narration_mode FROM GAME_SETTINGS where id = ?';
        db.all(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ errors: 'Games not found.' });
            } else {
                const narration_mode = row;
                resolve(narration_mode);
            }
        });
    });
};


exports.createGame = (c) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO GAME_SETTINGS ( game_title, number_players, dice, role_secret, id_room, creation_date, narration_mode) VALUES( ?, ?, ?, ?, ?, ?, ?)";
        db.run(sql, [c.game_title, c.number_players, c.dice, c.role_secret, c.id_room, c.creation_date, c.narration_mode], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.setNarrationMode = (value, id) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE GAME_SETTINGS SET narration_mode = ? WHERE id = ?';
        db.run(sql, [value, id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};


exports.getManuals = (id_game) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM MANUAL WHERE id_game = ?';
        db.all(sql, [id_game], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ errors: 'Manuals not found.' });
            } else {
                const manual = row.map( (row) => ({
                    name: row.name , content: row.content
                }));
                resolve(manual);
            }
        });
    });
};


exports.createManual = (c) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO MANUAL ( id_game, name, content) VALUES( ?, ?, ?)";
        db.run(sql, [c.id_game, c.name, c.content], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM USERS';
        db.all(sql, [], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ errors: 'USERS not found.' });
            } else {
                const users = row.map( (row) => ({
                    id: row.id,
                    name: row.name
                }));
                resolve(users);
            }
        });
    });
};

exports.getLast10Rolls = (game_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM ROLLS INNER JOIN USERS WHERE id_game = ? ORDER BY id desc limit 10 ';
        db.all(sql, [game_id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row == undefined) {
                resolve({ errors: 'ROLLS not found.' });
            } else {
                const rolls = row.map( (row) => ({
                    id: row.id,
                    user: row.name,
                    result: row.result,
                    type_of_dice: row.type_of_dice
                }));
                resolve(rolls);
            }
        });
    });
}

//add roll into db
exports.addRoll = (r) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO ROLLS ( id_game, user, result, type_of_dice) VALUES( ?, ?, ?, ?)";
        db.run(sql, [r.id_game, r.user, r.result, r.type_of_dice], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

//delete an asset
exports.deleteAsset = (id_game, asset_name) => new Promise((resolve, reject) => {
    const sql = 'DELETE FROM MANUAL WHERE id_game = ? AND name = ?';
    db.run(sql, [id_game, asset_name], (err) => {
        if (err) {
            reject(err);
        } else resolve(null);
    });
});

//create gamesettings_users record in db
exports.addUser_Game = (id_user, id_game, role) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO GAMESETTINGS_USERS ( id_user, id_game, role) VALUES( ?, ?, ?)";
        db.run(sql, [id_user, id_game, role], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};