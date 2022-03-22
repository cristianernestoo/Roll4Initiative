const BASEURL = '/api';

/**************************************DA TESTARE ******************************************/

//GET all games 
async function getGames() {
    const response = await fetch(BASEURL + '/games');
    const tasksJson = await response.json();
    if (response.ok) {
        return tasksJson.map((row) => { return {id: row.id, game_title: row.game_title, number_players: row.number_players, dice: row.dice,
            role_secret: row.role_secret, id_room: row.id_room, creation_date: row.creation_date, narration_mode: row.narration_mode, role: row.role, name: row.name   } });
    } else {
        throw tasksJson; 
    }
};


//POST create new game
function createGame(row) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({game_title: row.game_title, number_players: row.number_players, dice: row.dice,
                role_secret: row.role_secret, id_room: row.id_room, creation_date: row.creation_date} ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {             
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
};

//GET manuals for specific game  
async function getManuals(id_game) {
    const response = await fetch(BASEURL + '/manuals/' + id_game);
    const tasksJson = await response.json();
    if (response.ok) {
        return tasksJson.map((row) => { return { name: row.name , content: row.content   } });
    } else {
        throw tasksJson;  // An object with the error coming from the server
    }
};


//POST create new manual
function addManual(id_game, name, content) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/manual', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_game:id_game, name: name , content: content} ),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {             
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
};

//GET all games 
async function getUsers() {
    const response = await fetch(BASEURL + '/users');
    const tasksJson = await response.json();
    if (response.ok) {
        return tasksJson.map((row) => { return { id:row.id, name: row.name } });
    } else {
        throw tasksJson;  // An object with the error coming from the server
    }
};
//GET LAST 10 ROLLS OF A GAME

async function getLast10Rolls(id_game){

    const response = await fetch(BASEURL + '/games_rolls/' + id_game);
  
    const rolls = await response.json();
  
    if (response.ok) {
      return rolls;
    } else {
      return undefined;
    }
  }

  function addRoll(id_game,r) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/game_roll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_game: id_game, user: r.user, result: r.result, type_of_dice: r.type_of_dice}),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {             
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
};

async function deleteAsset(id_game, asset_name) {
    const response = await fetch(BASEURL + '/manual', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id_game: id_game, asset_name: asset_name}),
    });
    if (response.ok) {
        return null;
    } return { err: 'DELETE error' };
};

//create new gamesettings_users row
function addUser_Game(id_user, id_game, role) {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/user_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id_user:id_user, id_game:id_game, role:role}),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {             
                response.json()
                    .then((obj) => { reject(obj); }) // error msg in the response body
                    .catch((err) => { reject({ errors: [{ param: "Application", msg: "Cannot parse server response" }] }) }); // something else
            }
        }).catch((err) => { reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] }) }); // connection errors
    });
};

async function getNarrationMode(id_game){

    const response = await fetch(BASEURL + '/games/' + id_game);
  
    const narration_mode = await response.json();
  
    if (response.ok) {
      return narration_mode;
    } else {
      return undefined;
    }
  }

  async function setNarrationMode(value, id) {

    const response = await fetch(BASEURL + '/games/narration_mode', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: value,
          id:id
        })
      });
    return response.ok;

}


const API = {getGames, createGame, getManuals, addManual, getUsers, getLast10Rolls, addRoll, deleteAsset, addUser_Game, getNarrationMode, setNarrationMode};
export default API;