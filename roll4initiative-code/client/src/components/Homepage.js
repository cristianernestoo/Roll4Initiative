import * as React from 'react';
import { Grid, Container, Box, Stack, Menu, Badge, Button, Typography, Divider, IconButton, Snackbar, Alert } from "@mui/material";
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import RunningGame from "./RunningGame";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import BottomNav from "./BottomNav";

function Homepage(props) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [invite, setInvite] = useState([{ id: 1, name: 'Lorenzo' }, { id: 2, name: 'Marco' }]);
    const [view, setView] = useState(0); 
    const [snackbarOpen, setSnackbarOpen] = useState(props.location.state ? true : false);
    //const myGames = props.location.state ? props.location.state['games'] : props.games;
    const open = Boolean(anchorEl);

    useEffect(()=> {
        props.location.state ? props.setGames(props.location.state['games']) : props.setGames(props.games);
    },[props]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = (event) => {
        setInvite(invite.filter(x => x.id !== event.target.id));
        
    };

    const handleClose = () => {
        setAnchorEl(null);
        setView(invite.length);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };

    return (
        <>
        <Container fixed>
            <Box sx={{ height: 'auto', pb: "156px", alignItems: "start" }} className="centerContent">
                <Grid container direction="column" sx={{ width: "80vw" }} >
                    <Stack direction="row" spacing={2} sx={{ mt: "2rem", mb: "1rem", pl: "10px" }}>
                        <Grid container direction="row" fontSize={"2rem"}>
                            <Grid whiteSpace="nowrap" item xs={10} className="runningGames" sx={{fontWeight: 500}}>
                                My Games
                            </Grid>
                            <Grid item xs={2} className="centerContent">
                                <Badge color="primary" variant="dot"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        badgeContent={
                                    invite.length - view !== 0 ?
                                    <Typography variant="inherit" sx={{color:"white"}}>{invite.length - view}</Typography> : 0
                                    }>
                                    <IconButton onClick={handleClick}>
                                        <NotificationsNoneRoundedIcon sx={{color:"black", fontSize: "2rem" }} id='account-menu' />
                                    </IconButton>
                                </Badge>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Menu
                        sx={{transform:"translateX(1.45rem)"}}
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 2,
                                borderRadius: '10px',
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 36,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {
                            invite.map((x, index) => {
                                return (
                                    <List key={index} sx={{px:".5rem"}}>
                                        {index !== 0 ? <Divider sx={{transform:"translateY(-.5rem)"}}/> : ""}
                                        <ListItem sx={{borderRadius:"10px"}}>
                                            <ListItemAvatar>
                                                <Avatar sx={{transform:"scale(1.5)"}}>{x.name.charAt(0)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography sx={{mb:".8rem"}} variant={"subtitle2"}>{x.name + ' has invited you to a game!'}</Typography>
                                                    }
                                                secondary={
                                                    <>
                                                        <Button size='small' startIcon={<CheckIcon/>} variant="contained" color='primary' style={{marginRight:"0.5rem", color:"white", boxShadow: 'none'}}>Accept</Button>
                                                        <Button size='small' startIcon={<CloseIcon/>} id={x.id} variant="outlined"  onClick={(e) => handleDelete(e)}>Decline</Button>
                                                        </>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                )
                            })
                        }
                    </Menu>
                    <Grid sx={{ mt: '0' }} container spacing={0} rowSpacing={2} direction="column" justifyContent="center">
                        {props.games.filter(game => game.name === props.player).map((g) => (
                            <Grid key={g.id} item>
                                <RunningGame game={g} player={props.player} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Box>
            <Fab sx={{ position: "fixed", bottom: "76px", boxShadow: '5px 5px 0px rgba(0,0,0,0.1)', color: "white" }} color="primary" className="fab" variant="extended" onClick={() => { history.push('/setup') }}>
                <AddIcon sx={{ mr: 1 }} ></AddIcon>
                create game
            </Fab>
            { !props.location.state ? '' :
                <Snackbar
                    anchorOrigin={{vertical:'bottom', horizontal:'right'}}
                    open={snackbarOpen}
                    onClose={handleSnackbarClose}
                    autoHideDuration={3000}
                    message="Game succesfully created!"
                    sx={{ bottom: { xs: 140, sm: 140 }, left:0}}
                >
                    <Alert severity="success" variant='standard' sx={{ width: '60%' }}>
                        <b>Game succesfully created!</b>
                    </Alert>
                </Snackbar>     
            }
        </Container>
        <BottomNav/>
        </>
    );
}

export default Homepage;