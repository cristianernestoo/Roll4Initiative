import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import API from './API';
import Homepage from './components/Homepage';
import SetUpPages from './components/SetUpPages'
import VoiceCall from './components/VoiceCall';
import UserSettings from './components/UserSettings';
import Login from './components/Login';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const [player, setPlayer] = useState('');
  const [games, setGames] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [users, setUsers] = useState([]);
  const theme = createTheme({
    shape: {
      borderRadius: 20
    },
    palette: 
    {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#7209b7',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#7209b7'
      },
      background: {
        default: '#f5f5f5'
      },
    }
  });

  useEffect(() => {
    if(!dirty){
      API.getGames().then((g) => {
        setGames(g);
     });
     API.getUsers().then((u)=>{
      setUsers(u);
     })
      setDirty(true);
    }
  },[games, dirty]);


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/userSettings">
            <UserSettings player={player} />
          </Route>
          <Route exact path="/login">
            <Login setPlayer={setPlayer}/>
          </Route>
          <Route exact path="/homepage" render={props =>
            <Homepage {...props} games={games} setGames={setGames} player={player} />}>
          </Route>
          <Route exact path="/setup" render={props => 
            <SetUpPages {...props} users={users} player={player}/>}>
          </Route>
          <Route path="/room/:roomID" render={props => 
            <VoiceCall {...props} player={player} setPlayer={setPlayer}/>} />
          <Route path="/" render={() =>
            <Redirect to={'/login'} />
          }></Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
