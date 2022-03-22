const { check, validationResult, body } = require('express-validator');
const express = require("express");
const app = express();


const dao = require('./dao'); // module for accessing the  DB
const PORT = 3001;

app.use(express.json({limit: '50mb'}));
app.use(express.json());


/************************************************************************************** API FROM DAO ********************************************************************************************************************************************/

// GET ALL GAMES
app.get('/api/games',  async (req, res) => {
    try {
        const result = await dao.getGames();
        if (result.error)
            res.status(404).json(result);
        else
            res.json(result);
    } catch (err) {
        res.status(500).json({ errors: 'Database error getting games.' });
    }
});

//POST CREATE GAMES
app.post('/api/game',[
    check('game_title').isString(),
    check('number_players').isInt(),
    check('dice').isInt(),
    check('role_secret').isInt(),
    check('id_room').isString(),
    check('creation_date').isString()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const game = {
        game_title: req.body.game_title,
        number_players: req.body.number_players,
        dice: req.body.dice,
        role_secret: req.body.role_secret,
        id_room: req.body.id_room,
        creation_date: req.body.creation_date,
        narration_mode : 0,
    };

    try {
        const lastID = await dao.createGame(game);
        res.status(201).json({ lastID: lastID });
    } catch (err) {
        res.status(503).json({ errors: 'Database error during the creation of game ' });
    }
});

// GET MANUAL FOR GAME
app.get('/api/manuals/:id_game',  async (req, res) => {
    try {
        const result = await dao.getManuals(req.params.id_game);
        if (result.error)
            res.status(404).json(result);
        else
            res.json(result);
    } catch (err) {
        res.status(500).json({ errors: 'Database error getting manual.' });
    }
});


app.post('/api/manual',[
    check('id_game').isInt(),
    check('name').isString()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const manual = {
        id_game: req.body.id_game,
        name: req.body.name,
        content: req.body.content
    };

    try {
        const lastID = await dao.createManual(manual);
        res.status(201).json({ lastID: lastID });
    } catch (err) {
        res.status(503).json({ errors: 'Database error during the creation of manual '+ err });
    }
});

// GET ALL USERS
app.get('/api/users',  async (req, res) => {
    try {
        const result = await dao.getUsers();
        if (result.error)
            res.status(404).json(result);
        else
            res.json(result);
    } catch (err) {
        res.status(500).json({ errors: 'Database error getting users.' });
    }
});

//GET LAST 10ROLLS OF A SPECIFIC GAME
app.get('/api/games_rolls/:id',
  (req, res) => {
    const game_id = req.params.id;
    dao.getLast10Rolls(game_id)
      .then((rolls) => { res.json(rolls) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
});

//GET LAST 10ROLLS OF A SPECIFIC GAME
app.get('/api/games/:id',
  (req, res) => {
    const game_id = req.params.id;
    dao.getNarrationMode(game_id)
      .then((narration_mode) => { res.json(narration_mode) })
      .catch((err) => res.status(500).json({ error: "Error " + err }));
});

app.post('/api/game_roll',[
    check('id_game').isInt(),
    check('result').isInt(),
    check('type_of_dice').isInt()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const roll = {
        id_game: req.body.id_game,
        user: req.body.user,
        result: req.body.result,
        type_of_dice: req.body.type_of_dice
    };

    try {
        const lastID = await dao.addRoll(roll);
        res.status(201).json({ lastID: lastID });
    } catch (err) {
        res.status(503).json({ errors: 'Database error when adding a roll '+ err });
    }
});

// delete an asset
app.delete('/api/manual', [check('id_game').isInt()], async (req, res) => {
    const id_game = req.body.id_game;
    const asset_name = req.body.asset_name;
  
    try {
      await dao.deleteAsset(id_game, asset_name);
      res.status(204).end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the deletion of asset: ${asset_name}.` });
    }
  });

  //create new gamesettings_users row
  app.post('/api/user_game',[
    check('id_game').isInt(),
    check('id_user').isInt()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const id_user = req.body.id_user;
    const id_game = req.body.id_game;
    const role = req.body.role;
    
    try {
        const lastID = await dao.addUser_Game(id_user, id_game, role);
        res.status(201).json({ lastID: lastID });
    } catch (err) {
        res.status(503).json({ errors: 'Database error during the creation user_game '+ err });
    }
});

app.put('/api/games/narration_mode',
  [
    check('value').isInt({ min: 0, max: 1 }),
    check('id').isInt({ min: 0 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    dao.setNarrationMode(req.body.value, req.body.id)
      .then((id) => res.status(201).json({ id: id }))
      .catch((err) =>
        res.status(500).json({
          error: "Error " + err,
        })
      );
  })
  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));


