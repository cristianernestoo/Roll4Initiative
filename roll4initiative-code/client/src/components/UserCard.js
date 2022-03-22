import * as React from 'react';
import { Grid, Modal, Box, Button, ToggleButtonGroup, ToggleButton, styled } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useState } from "react";
import UserView from './UserView';
import Zoom from '@mui/material/Zoom';
import { useEffect } from "react";
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import Item from './Item';
import { useTheme } from '@emotion/react';
import API from '../API';
import useSound from 'use-sound';
import narrationOnSound from '../sounds/narrationOnSound.mp3';
import narrationOffSound from '../sounds/narrationOffSound.mp3';


const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "rgba(0,0,0,0.6)",
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(16),
        paddingX: theme.typography.pxToRem(16),
        transform: "translateY(16rem)",
    },
}));

function UserCard(props) {

    const theme = useTheme();
    let timerDescription = null;
    const [firstTime, setFirstTime] = useState(true);
    const [open, setOpen] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [text, setText] = useState('');
    const [playActive] = useSound(
        narrationOnSound,
        { volume: 0.25 }
    );
    const [playDisable] = useSound(
        narrationOffSound,
        { volume: 0.25 }
    );

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setFirstTime(false);
        setOpen(false);
        const buttons = document.querySelectorAll(".userCardButton");
        buttons.forEach((button) => { button.focus(); button.blur(); })
    }

    const handleFirst = () => {
        if (firstTime) {
            props.setShowFirstTime(true);
        }
    }

    const handleShowDescription = () => setShowDescription(true);
    const handleNoDescription = () => setShowDescription(false);
    const handleMouseDescription = (event) => {
        const button = event.currentTarget;
        timerDescription = setTimeout(() => {
            //Action to be performed after holding down mouse
            setAnchorEl(button);
            handleShowDescription();
        }, 50); //Change 1000 to number of milliseconds required for mouse hold
    }

    const handleMouseUpDescription = () => {
        setAnchorEl(null);
        setShowDescription(false);
        clearTimeout(timerDescription);
    }

    const handleNarrationMode = () => {
        let enabled = props.userAudio.current.srcObject.getAudioTracks()[0].enabled;
        if (!props.narrationMode) {
            playActive();
            if (!enabled) {
                props.handleUserMute();
            }
            props.peers.forEach(peer => {
                peer._remoteTracks[0]['track'].enabled = false;
            })
            props.setMutedOtherPlayer(true);
        } else {
            props.peers.forEach(peer => {
                peer._remoteTracks[0]['track'].enabled = true;
            })
            props.setMutedOtherPlayer(false);
            playDisable();
        }
        API.setNarrationMode(!props.narrationMode === true ? 1 : 0, props.id_game);
        props.setNarrationMode(!props.narrationMode);
        handleClose();
    }

    useEffect(() => {
        if (anchorEl) {
            let btn = parseInt(anchorEl.id);
            switch (btn) {
                case 1:
                    setText('Change role');
                    break;
                case 2:
                    setText(props.muted ? 'Unmute' : 'Mute');
                    break;
                case 3:
                    setText('Leave');
                    break;
                default:
                    setText('');
                    break;
            }
        }
    }, [anchorEl, props.muted])

    const modalStyle = {
        flexDirection: 'column',
        borderRadius: '20px',
        marginTop: '30vh',
        bgcolor: 'transparent',
        outline: 'none',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
    }

    const boxStyle = {
        borderRadius: '20px',
        bgcolor: 'background.paper',
        boxShadow: 40,
        p: 4,
        width: '80vw',
        minHeight: '145px',
        maxHeight: '200px',
        minWidth: '155px',
        maxWidth: '250px',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column'
    };

    const optionsStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderRadius: '20px',
        marginBottom: '5rem',
        '& > :not(style) + :not(style)': { mt: 2 },
    };

    return (

        <Grid id="userCard" item xs={3} sx={props.role === "Narrator" ? { zIndex: "1000", height: "15vh", minHeight: "140px" } : { height: "15vh", minHeight: "140px" }}>



            <Button className="userCardButton" onClick={() => { handleOpen(); handleFirst() }}
                sx={{ borderRadius: "20px", margin: "0", padding: "0", width: "100%", height: "100%", textTransform: "none" }}>
                <Item sx={{ transition: "0.1s", textAlign: "center", outlineColor: `${theme.palette.primary.main}`, outlineWidth: `${props.talking ? "0.2rem" : "0"}`, outlineStyle: "solid" }} className="animated_zoom">
                    <Grid container padding="1rem">
                        <Grid item xs={12} pt="1.5rem">
                            <UserView player={props.player} role={props.role} />
                        </Grid>
                        <Grid item xs={12} textAlign="right">
                            <MicOffRoundedIcon sx={props.muted ? {} : { opacity: "0" }} />
                        </Grid>
                    </Grid>
                </Item>
            </Button>

            

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Zoom in={open} timeout={300}>
                    <Box sx={modalStyle}>
                        <Box className="centerContent" sx={boxStyle}>

                            <UserView player={props.player} role={props.role} scale="1.2" />

                            {
                                props.role === "Narrator" ?

                                    <Button disableElevation className={firstTime ? "animated_lookatme" : ""}
                                        onClick={() => { handleNarrationMode(); props.setShowFirstTime(false); props.setFirstTime(false) }}
                                        sx=
                                        {
                                            props.narrationMode ?
                                                { mt: "20px", boxShadow: '5px 5px 0px rgba(0,0,0,0.1)' } :
                                                { color: "white", mt: "20px", boxShadow: '5px 5px 0px rgba(0,0,0,0.1)' }

                                        }
                                        variant={props.narrationMode ? "outlined" : "contained"}
                                        color="primary"
                                        startIcon={props.narrationMode ? <HighlightOffRoundedIcon sx={{ color: "primary" }} /> : <RecordVoiceOverRoundedIcon color="white" />}>
                                        Narration Mode
                                    </Button>

                                    :
                                    ""
                            }

                        </Box>

                        <Box sx={optionsStyle}>

                            <ToggleButtonGroup size="large">
                                <ToggleButton disabled={props.role === "Narrator" || props.isSecret === 0 ? false : true} value={"Change Role"} id={1} onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescription} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescription}>
                                    <svg overflow="visible" viewBox="0 0 20 20" width={20} height={20}>
                                        <path transform="scale(0.035)" fill="currentColor" vectorEffect={"non-scaling-stroke"} d="M507.31 462.06L448 402.75l31.64-59.03c3.33-6.22 2.2-13.88-2.79-18.87l-17.54-17.53c-6.25-6.25-16.38-6.25-22.63 0L420 324 112 16 18.27.16C8.27-1.27-1.42 7.17.17 18.26l15.84 93.73 308 308-16.69 16.69c-6.25 6.25-6.25 16.38 0 22.62l17.53 17.54a16 16 0 0 0 18.87 2.79L402.75 448l59.31 59.31c6.25 6.25 16.38 6.25 22.63 0l22.62-22.62c6.25-6.25 6.25-16.38 0-22.63zm-149.36-76.01L60.78 88.89l-5.72-33.83 33.84 5.72 297.17 297.16-28.12 28.11zm65.17-325.27l33.83-5.72-5.72 33.84L340.7 199.43l33.94 33.94L496.01 112l15.84-93.73c1.43-10-7.01-19.69-18.1-18.1l-93.73 15.84-121.38 121.36 33.94 33.94L423.12 60.78zM199.45 340.69l-45.38 45.38-28.12-28.12 45.38-45.38-33.94-33.94-45.38 45.38-16.69-16.69c-6.25-6.25-16.38-6.25-22.62 0l-17.54 17.53a16 16 0 0 0-2.79 18.87L64 402.75 4.69 462.06c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L109.25 448l59.03 31.64c6.22 3.33 13.88 2.2 18.87-2.79l17.53-17.54c6.25-6.25 6.25-16.38 0-22.63L188 420l45.38-45.38-33.93-33.93z" className="">
                                        </path>
                                    </svg>
                                </ToggleButton>
                                <ToggleButton value={props.muted ? "Mute" : "Unmute"} id={2} onClick={props.handleUserMute} onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescription} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescription}>
                                    {
                                        props.muted ?
                                            <MicOffOutlinedIcon sx={{ width: "20px", height: "20px", m: 0, overflow: "visible", transform: "scale(1.3)" }} />
                                            :
                                            <MicNoneOutlinedIcon sx={{ width: "20px", height: "20px", m: 0, overflow: "visible", transform: "scale(1.3)" }} />
                                    }

                                </ToggleButton>
                                <ToggleButton value={"Leave Room"} onClick={props.handleBack} id={3} onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescription} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescription}>
                                    <svg overflow="visible" viewBox="0 0 20 20" width={20} height={20}>
                                        <path transform="scale(0.04)" fill="currentColor" vectorEffect={"non-scaling-stroke"} d="M 272 112 v 51.6 h -96 c -26.5 0 -48 21.5 -48 48 v 88.6 c 0 26.5 21.5 48 48 48 h 96 v 51.6 c 0 42.6 51.7 64.2 81.9 33.9 l 144 -143.9 c 18.7 -18.7 18.7 -49.1 0 -67.9 l -144 -144 C 323.8 48 272 69.3 272 112 Z m 192 144 L 320 400 v -99.7 H 176 v -88.6 h 144 V 112 l 144 144 Z M 96 64 h 84 c 6.6 0 12 5.4 12 12 v 24 c 0 6.6 -5.4 12 -12 12 H 96 c -26.5 0 -48 21.5 -48 48 v 192 c 0 26.5 21.5 48 48 48 h 84 c 6.6 0 12 5.4 12 12 v 24 c 0 6.6 -5.4 12 -12 12 H 96 c -53 0 -96 -43 -96 -96 V 160 c 0 -53 43 -96 96 -96 Z" className="">
                                        </path>
                                    </svg>
                                </ToggleButton>

                            </ToggleButtonGroup>
                        </Box>
                        <StyledTooltip
                            TransitionComponent={Zoom}
                            title={text}
                            enterTouchDelay={100}
                            open={showDescription}
                            onClose={handleNoDescription}
                        >
                            <div></div>
                        </StyledTooltip>
                    </Box>

                </Zoom>
            </Modal>

        </Grid >
    )
} export default UserCard;

