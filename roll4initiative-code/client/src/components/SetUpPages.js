import { useState } from 'react';
import SetUpPage1 from './SetUpPage1';
import SetUpPage2 from './SetUpPage2';
import ProgressMobileStepper from './ProgressMobileStepper'
import * as React from 'react';
import { Fab, Grid, IconButton} from '@mui/material';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { v1 as uuid } from "uuid";
import API from '../API';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {useHistory} from 'react-router-dom';
import BottomNav from './BottomNav';


const Root = styled('div')(({ theme }) => ({
    height: "auto",
    paddingBottom: "96px", //compensa progress e nav bar
    overflow: 'hidden',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const Progress = styled(ProgressMobileStepper)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
    //Non funziona, perchè?
}));

function SetUpPages(props) {

    let history = useHistory();

    const { player, users } = props;
    const [activeStep, setActiveStep] = useState(0);
    const [title, setTitle] = useState('');
    const [nPlayers, setNPlayers] = useState(2);
    const [dices, setDices] = useState(false);
    const [roles, setRoles] = useState([]);
    const [secret, setSecret] = useState(false);
    const [friends, setFriends] = useState([]);
    const [assets, setAssets] = useState([]);
    const [limitReached, setLimitReached] = useState(false);

    const steps = ['Set up a new game', 'Invite your friends'];

    const handleNext = () => {
        if(activeStep === 1){
            const id = uuid();
            let today = new Date().toLocaleDateString();
            const game = {
                game_title: title,
                number_players: nPlayers,
                dice: dices ? 1 : 0,
                role_secret: secret ? 1 : 0,
                id_room: id,
                creation_date: today 
            }
            API.createGame(game).then((response)=>{                                   //create game in DB
                let id_user = (player === 'Luigi' ? 5 : 6);                           //set narrator id    
                API.addUser_Game(id_user, response.lastID, 'Narrator');               //add narrator into GAMESETTINGS_USERS table in db      
                friends.forEach((friend) => {                                         //then add each invited friend into same table
                    API.addUser_Game(friend.id, response.lastID, 'someRole');         //with some role
                })
                if(assets){                                                            //verify that assets array isn't empty
                    assets.forEach(function(asset){                                    //convert each file in assets array into a data64 object 
                        let reader = new FileReader();                                 //create buffer reader
                        reader.readAsDataURL(asset);
                        reader.onloadend = (e) =>{                                     //wait for the buffer to read the file
                            let content = e.target.result;                          
                            API.addManual(response.lastID, asset.name, content);       //and finally push it into DB
                        }
                    })
                }
                //API.addRoleUsers
                API.getGames().then((g) => {
                    props.history.push({
                        pathname: `/homepage`,
                        state: {
                            games: g
                        }
                    })
                });
            });
        }
        if(activeStep < 1){
            setActiveStep((prevActiveStep) => prevActiveStep + 1); 
            document.getElementById('next').focus();
            document.getElementById('next').blur();

        }
            
    };


    const handleBack = () => {
        if(activeStep===1)
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        else
            {history.push('/homepage');}
    };

    const isNextDisabled = !title || (secret && roles.length < nPlayers - 1);
    const isCreateDisabled = friends.length < nPlayers - 1;

    return (
        <>
            <Root width={"100%"} className='centerContent' sx={{ flexDirection: "column" }}>

                {/* Step Bar  */}
                <div className="fixedHeader">
                    <Progress steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} handleNext={handleNext} handleBack={handleBack} />
                </div>

                <Grid container sx={{ width: "80%" }} direction="row" paddingTop="5.5rem">
                    <Grid item xs={1} className="centerContent">
                    <IconButton onClick={handleBack}>
                        <ArrowBackIosRoundedIcon sx={{color:"black"}}/>
                    </IconButton>
                    </Grid>
                    <Grid sx={{ pl: "5px", transform: "translateY(-3px)", fontWeight: 500 }} fontSize={"2rem"} overflow="clip" className="centerContentY" item xs={11} whiteSpace="nowrap">
                        Create Game
                    </Grid>

                </Grid>


                {/* Set Up Pages */}
                <div>
                    {
                        activeStep === 0 ?
                            <SetUpPage1
                                title={title}
                                setTitle={setTitle}
                                nPlayers={nPlayers}
                                setNPlayers={setNPlayers}
                                dices={dices}
                                setDices={setDices}
                                roles={roles}
                                setRoles={setRoles}
                                secret={secret}
                                setSecret={setSecret}
                                limitReached={limitReached}
                                setLimitReached={setLimitReached}
                            /> :
                            <SetUpPage2
                                users={users}
                                player={player}
                                nPlayers={nPlayers}
                                friends={friends}
                                setFriends={setFriends}
                                assets={assets}
                                setAssets={setAssets}
                            />
                    }
                </div>

            </Root>
            <Fab id='next' disabled={activeStep === steps.length - 1 ? isCreateDisabled : isNextDisabled} sx={{ transition: "0.2s", zIndex: "1300", position: "fixed", bottom: "76px", boxShadow: '5px 5px 0px rgba(0,0,0,0.1)', color: "white", backgroundColor:"#7209b7" }} className="fab" variant="extended" onClick={handleNext}>
                {activeStep === 0 ? 'Next' : 'Create'}
                <ArrowForwardIosRoundedIcon sx={{ ml: 1 }} />
            </Fab>
            <BottomNav />
        </>
    );
}

export default SetUpPages;