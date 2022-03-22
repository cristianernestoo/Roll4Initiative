import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice } from '@fortawesome/free-solid-svg-icons'
import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { Grid, Container, Box, Stack, Typography, Menu, Dialog, DialogActions, Button, DialogTitle, IconButton } from "@mui/material";
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CssBaseline from '@mui/material/CssBaseline';
import PlayerCard from './PlayerCard';
import UserCard from './UserCard';
import InfoBox from './InfoBox';
import InviteCard from './InviteCard';
import AssetRow from './AssetRow';
import UploadAssetRow from './UploadAssetRow';
import RollRow from './RollRow';
import DiceCard from './DiceCard';
import NarrationMode from './NarrationMode';
import io from "socket.io-client";
import Peer from "simple-peer";
import { useEffect, useRef, useState } from "react";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import {useHistory} from 'react-router-dom';
import Zoom from '@mui/material/Zoom';
import API from '../API';
import AssetDialog from './AssetDialog';
import BottomNav from './BottomNav';
import useSound from 'use-sound';
import muteSound from '../sounds/muteSound.mp3';
import unmuteSound from '../sounds/unmuteSound.mp3';

const drawerBleeding = 200;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const Audio = (props) => {

    const refPeer = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            refPeer.current.srcObject = stream;
        })
    }, [props.peer]);

    return (
        <>
            <PlayerCard id_game={props.id_game} audioDisabled={props.audioDisabled} setAudioDisabled={props.setAudioDisabled} handlePeerMute={props.handlePeerMute} refPeer={refPeer} mutedOtherPlayer={props.mutedOtherPlayer} role={props.role} isSecret={props.isSecret} peers={props.peers} player={props.player} setPeers={props.setPeers} peer={props.peer} setMutedOtherPlayer={props.setMutedOtherPlayer} />
            <audio autoPlay ref={refPeer} />
        </>
    );
}

function VoiceCall(props) {

    const [talking, setTalking] = useState(false);
    const [muted, setMuted] = useState(false);
    const [mutedOtherPlayer, setMutedOtherPlayer] = useState(false);
    const [audioDisabled, setAudioDisabled] = useState(false);
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userAudio = useRef();
    const peersRef = useRef([]);
    const roomID = props.match.params.roomID;
    const [rolls, setRolls] = useState(props.location.state['rolls'] ? props.location.state['rolls'] : []);
    const [assets, setAssets] = useState(props.location.state['assets'] ? props.location.state['assets'] : []);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dice, setDice] = useState('');
    const [dirty, setDirty] = useState(false);
    const [counter, setCounter] = useState(1);
    const { window } = props;
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [narrationMode, setNarrationMode] = useState(props.location.state['narration_mode'] === 0 ? false : true);
    const [assetShow, setAssetShow] = useState(false);
    const [asset, setAsset] = useState({ name: '', content: '' });
    const [firstTime, setFirstTime] = useState(true);
    const [showFirstTime, setShowFirstTime] = useState(false);

    const menuOpen = Boolean(anchorEl);

    const [playOn] = useSound(
        muteSound,
        { volume: 0.25 }
    );
    const [playOff] = useSound(
        unmuteSound,
        { volume: 0.25 }
    );

    const scrollToBottom = () => {
        var element = document.getElementById("scrollToBottom");
        element.scrollIntoView();
    };

    const handleClose = () => {
        setAssetShow(false);
    };

    let history = useHistory();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleBackClick = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleBack = () => {
        socketRef.current.disconnect();
        userAudio.current.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
        history.push('/homepage');
    };

    function rollDice(max) {
        const roll = { id: counter, user: props.player, result: Math.ceil(Math.random() * (max)), type_of_dice: max };
        API.addRoll(props.location.state.id_game, roll);
        rolls.push(roll);
        setCounter(counter + 1);
        return rolls;
    }
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };



    

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
            userAudio.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, [roomID]);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }


    useEffect(() => {
        if (dirty && dice) {
            switch (dice) {
                case 4:
                    setRolls(rollDice(4));
                    break;
                case 6:
                    setRolls(rollDice(6));
                    break;
                case 8:
                    setRolls(rollDice(8));
                    break;
                case 10:
                    setRolls(rollDice(10));
                    break;
                case 12:
                    setRolls(rollDice(12));
                    break;
                case 20:
                    setRolls(rollDice(20));
                    break;
                default:
                    break;
            }
            setDirty(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dirty, dice])

    const polling = () => {
        setTimeout(() => {
            //polling of the state
            getNarrationMode();
        }, 3000);
    }

    useEffect(() => {
        polling();
        // eslint-disable-next-line
    }, [])

    const getNarrationMode = () => {
        API.getNarrationMode(props.location.state['id_game']).then((nm) => {
            setNarrationMode(nm[0].narration_mode === 0 ? false : true);
        });
        polling();
    }

    const handleUserMute = () => {
        userAudio.current.srcObject.getAudioTracks()[0].enabled = !userAudio.current.srcObject.getAudioTracks()[0].enabled;
        !muted ? playOn() : playOff();
        setMuted(!muted);
    }


    return (
        <>
            <Root>
                <CssBaseline />
                <Global
                    styles={{
                        '.MuiDrawer-root > .MuiPaper-root': {
                            height: `65vh`,
                            overflow: 'visible',
                            transform: "translateY(50px)"
                        },
                    }}
                />

                {props.location.state.dice === 1 ?
                    <SwipeableDrawer
                        container={container}
                        anchor="bottom"
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        swipeAreaWidth={drawerBleeding}
                        disableSwipeToOpen={false}
                        disableDiscovery={true}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <StyledBox onClick={toggleDrawer(true)}
                            sx={{
                                boxShadow: 'none',
                                textAlign: 'center',
                                position: 'absolute',
                                top: -drawerBleeding + 60,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                visibility: 'visible',
                                right: 0,
                                left: 0,
                            }}
                        >

                            <Puller />
                            <br></br>

                            <FontAwesomeIcon sx={{ margin: "20px", zIndex: '20000' }} onClick={toggleDrawer(true)} icon={faDice} size='2x' />

                            <Box textAlign={"center"} marginLeft='20px' marginRight='20px' marginTop='0' sx={{ position: "relative", zIndex: "1401", borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                                <StyledBox onAnimationStart={scrollToBottom} id="history" className="hideScrollbar"
                                    sx={{
                                        scrollBehavior: 'smooth',
                                        zIndex: '1401',
                                        maxHeight: '28vh',
                                        overflowY: 'auto',
                                        fontSize: '1.1rem',
                                        textAlign: 'left',
                                        borderRadius: '20px',
                                        px: 2,
                                        pb: 2,
                                        marginBottom: '20px',
                                        paddingLeft: '16px',
                                        paddingTop: '13px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        background: "rgba(0,0,0,0.08)",
                                        color: "rgba(0,0,0,0.7)",
                                    }}
                                >

                                    {/* boxShadow: " 0 8px 15px rgba(255,255,255,0.5) inset" */}
                                    {
                                        rolls.map((roll, i) =>
                                            <RollRow key={i} isUser={roll.user === props.player} user={roll.user} result={roll.result} max={roll.type_of_dice} />)
                                    }
                                    <div id="scrollToBottom"></div>

                                </StyledBox>
                                <Typography sx={{ marginBottom: '20px' }} variant="inherit" component="h3" >
                                    Tap on a dice to roll it!
                                </Typography>
                                <Grid container spacing={2} alignItems="center" justifyContent="flex-start" columns={3}>
                                    <DiceCard type="D4" function={() => { setDice(4); setDirty(true); }} />
                                    <DiceCard type="D6" function={() => { setDice(6); setDirty(true); }} />
                                    <DiceCard type="D8" function={() => { setDice(8); setDirty(true); }} />
                                    <DiceCard type="D10" function={() => { setDice(10); setDirty(true); }} />
                                    <DiceCard type="D12" function={() => { setDice(12); setDirty(true); }} />
                                    <DiceCard type="D20" function={() => { setDice(20); setDirty(true); }} />
                                </Grid>

                            </Box>

                        </StyledBox>


                    </SwipeableDrawer> : ''}
            </Root>

            {narrationMode ? <NarrationMode id_game={props.location.state['id_game']} setNarrationMode={setNarrationMode} isNarrator={props.location.state.role === "Narrator"} peers={peers} setMutedOtherPlayer={setMutedOtherPlayer} /> : ''}

            <Container fixed>

                <Box sx={{ paddingBottom: "25vh", marginX: "1.2rem" }}>
                    <Grid container direction="column">
                        <Stack direction="row" spacing={2} marginTop={narrationMode ? "3rem" : "2rem"} sx={{ transition: "0.2s" }}>
                            <Grid container direction="row" marginBottom={"1.5rem"}>
                                <Grid item xs={1} className="centerContent">
                                    <IconButton onClick={handleBackClick}>
                                        <ArrowBackIosRoundedIcon sx={narrationMode ? { color: "white", zIndex: "600" } : { color: "black" }} />
                                    </IconButton>
                                </Grid>
                                <Grid sx={narrationMode ? { pl: "5px", color: "white", zIndex: "600", fontWeight: 500 } : { pl: "5px", fontWeight: 500 }} overflow="clip" className="centerContentY" item xs={9} fontSize={"2rem"} whiteSpace="nowrap">
                                    {props.location.state['title']}
                                </Grid>
                                <Grid sx={narrationMode ? {color:"white", zIndex:"600"} : {}} item xs={2} className="centerContentY" textAlign={"right"}  onClick={handleMenuClick}>
                                    <IconButton sx={narrationMode ? {color:"white", zIndex:"600"} : {color:"black"}}>
                                     <LibraryBooksRoundedIcon fontSize='large'/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Stack>

                        <Menu
                            sx={{ transform: 'translate(-10px, 0px)' }}
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={menuOpen}
                            onClose={handleMenuClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    borderRadius: '20px',
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
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
                            <UploadAssetRow id_game={props.location.state.id_game} assets={assets} setAssets={setAssets} />
                            {
                                assets.map((a, index) => (
                                    <div key={index}>
                                        <AssetRow type="doc" id_game={props.location.state.id_game} asset={a} setAsset={setAsset} assets={assets} setAssets={setAssets} setAssetShow={setAssetShow} />
                                        <AssetDialog
                                            open={assetShow}
                                            handleClose={handleClose}
                                            asset={asset}
                                        />
                                    </div>
                                ))
                            }
                        </Menu>

                        {(firstTime && props.location.state.role === "Narrator") || (showFirstTime && props.location.state.role === "Narrator" ) ?
                            <InfoBox
                                text={<b>Are your friends too annoying? Tap your card and try Narration Mode!</b>} severity="info" />
                            :
                            <InfoBox text={<b>Tap a user to show the options.</b>} severity="info" />
                        }

                        <Button size="small" onMouseDown={() => setTalking(true)} onMouseUp={() => setTalking(false)} onTouchStart={() => setTalking(true)} onTouchEnd={() => setTalking(false)} sx={{ mt: "1rem" }}>Try feedback dummy</Button>

                        <Grid
                            sx=
                            {{
                                marginTop: "0.1vh",
                                scrollbarWidth: 'none',
                            }}
                            container spacing={2} alignItems="center" justifyContent="flex-start" columns={3}>
                            <audio muted ref={userAudio} autoPlay />
                            <UserCard setFirstTime={setFirstTime} setShowFirstTime={setShowFirstTime} handleUserMute={handleUserMute} talking={talking} userAudio={userAudio} muted={muted} id_game={props.location.state['id_game']} isSecret={props.location.state.isSecret} handleBack={handleBackClick} player={props.player} narrationMode={narrationMode} role={props.location.state.role} setNarrationMode={setNarrationMode} setMutedOtherPlayer={setMutedOtherPlayer} mutedOtherPlayer={mutedOtherPlayer} setMuted={setMuted} peers={peers} />
                            {peers.map((peer, index) => (
                                <Audio key={index} mutedOtherPlayer={mutedOtherPlayer} setMutedOtherPlayer={setMutedOtherPlayer} audioDisabled={audioDisabled} setAudioDisabled={setAudioDisabled} role={props.location.state.role} isSecret={props.location.state.isSecret} peer={peer} player={props.player} id_game={props.location.state.id_game} />
                            ))}
                            <InviteCard />

                            <Dialog
                                sx={{ bottom: "56px" }}
                                open={dialogOpen}
                                onClose={handleDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                TransitionComponent={Zoom}
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Do you really want to disconnect?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleDialogClose}>No</Button>
                                    <Button onClick={handleBack}>Yes</Button>
                                </DialogActions>
                            </Dialog>

                        </Grid>
                    </Grid>
                </Box>

            </Container>
            <BottomNav handleBackClick={handleBackClick} />
        </>
    );
}

VoiceCall.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default VoiceCall;


