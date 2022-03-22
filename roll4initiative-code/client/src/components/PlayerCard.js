import * as React from 'react';
import { Grid, Modal, Box, Button, ToggleButtonGroup, ToggleButton, styled, Dialog, DialogTitle, DialogActions } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useState } from "react";
import PlayerView from './PlayerView';
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import HearingIcon from '@mui/icons-material/Hearing';
import HearingDisabledIcon from '@mui/icons-material/HearingDisabled';
import Zoom from '@mui/material/Zoom';
import { useEffect } from "react";
import Item from './Item';

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

function PlayerCard(props){

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleKickClick = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    let role = "";
    switch(props.id_game){
        case 0:
            if(props.player === "Luigi"){
                role = "Werewolf"
            }else role = "Narrator";
            break;
        case 1:
            if(props.player === "Luigi"){
                role = "Narrator"
            }else role = "Archer";
            break;
        case 11:
            if(props.player === "Luigi"){
                role = "Warrior"
            }else role = "Narrator";
            break;
        case 12:
            if(props.player === "Luigi"){
                role = "Narrator"
            }else role = "Thief";
            break;
        default:
            break;

    }
    
    let timerDescription = null;
    const {peers, setPeers, peer} = props;
    const [open, setOpen] = useState(false)
    const handleOpen = () =>
    {
        setOpen(true);
    }
    const handleClose = () =>
    {
        setOpen(false);
        const buttons = document.querySelectorAll(".userCardButton");
        buttons.forEach((button) => {button.focus(); button.blur();})
    }

    const [showDescription, setShowDescription] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [text, setText] = useState('');
    const other = props.player === "Luigi" ? "Fulvio" : "Luigi";

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

    useEffect(()=>{
        if(anchorEl){
          let btn = parseInt(anchorEl.id);
          switch(btn){
            case 1:
              setText('Change role');
              break;
            case 2:
              setText('Mute');
              break;
            case 3:
              setText('Kick out');
              break;
            case 4:
              setText('Disable Audio and Mute');
              break;
            default:
              setText('');
              break;
          }
        }
      },[anchorEl])

    const modalStyle = {
        flexDirection: 'column',
        borderRadius: '20px',
        marginTop: '35vh',
        bgcolor: 'transparent',
        outline: 'none',
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center'
    }

    const boxStyle = {
        borderRadius: '20px',
        bgcolor: 'background.paper',
        boxShadow: 40,
        p: 4,
        minHeight: '145px',
        maxHeight: '200px',
        minWidth: '155px',
        maxWidth: '200px',
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
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

    const removePeers = (p) => {
        setPeers(peers.filter(peer => peer !== p));
    }

    const handleMute = () => {
        props.peer._remoteTracks[0]['track'].enabled = !props.peer._remoteTracks[0]['track'].enabled;
        props.setMutedOtherPlayer(!props.mutedOtherPlayer);
        handleClose();
    }

    return(
    

    <Grid item xs={1} sx = {role === "Narrator" ? {zIndex:"1000"} : {}}>
        <Button className="userCardButton" onClick={handleOpen}
         sx={{borderRadius:"20px", margin:"0", padding:"0", width:"100%", height:"100%", textTransform:"none"}}>
            <Item sx={{height:"25vw", textAlign:"center"}}>
                <Grid container padding=".2rem" height="100%">
                    <Grid item xs={12} pt="1.3rem" height="75%" className="centerContent">
                        <PlayerView role={role} player={props.player} id_game={props.id_game}/>
                    </Grid>
                    <Grid item xs={12} textAlign="right" mr="2px">
                       {props.audioDisabled ? <HearingDisabledIcon sx={props.audioDisabled ? {} : {opacity:"0"}}/> : <MicOffRoundedIcon sx={props.mutedOtherPlayer ? {} : {opacity:"0"}}/>}
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
                        <PlayerView role={role} id_game={props.id_game} scale="1.2" player={props.player}/>
                    </Box>
                    
                    <Box sx={optionsStyle}>

                    <ToggleButtonGroup size="large">
                        <ToggleButton disabled={props.role === "Narrator" ? false : true} value={"change role"} id={1} onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescription} onMouseLeave={handleMouseUpDescription} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescription}>
                            <svg overflow="visible" viewBox="0 0 20 20" width={20} height={20}>
                                <path transform="scale(0.035)" fill="currentColor" vectorEffect={"non-scaling-stroke"} d="M507.31 462.06L448 402.75l31.64-59.03c3.33-6.22 2.2-13.88-2.79-18.87l-17.54-17.53c-6.25-6.25-16.38-6.25-22.63 0L420 324 112 16 18.27.16C8.27-1.27-1.42 7.17.17 18.26l15.84 93.73 308 308-16.69 16.69c-6.25 6.25-6.25 16.38 0 22.62l17.53 17.54a16 16 0 0 0 18.87 2.79L402.75 448l59.31 59.31c6.25 6.25 16.38 6.25 22.63 0l22.62-22.62c6.25-6.25 6.25-16.38 0-22.63zm-149.36-76.01L60.78 88.89l-5.72-33.83 33.84 5.72 297.17 297.16-28.12 28.11zm65.17-325.27l33.83-5.72-5.72 33.84L340.7 199.43l33.94 33.94L496.01 112l15.84-93.73c1.43-10-7.01-19.69-18.1-18.1l-93.73 15.84-121.38 121.36 33.94 33.94L423.12 60.78zM199.45 340.69l-45.38 45.38-28.12-28.12 45.38-45.38-33.94-33.94-45.38 45.38-16.69-16.69c-6.25-6.25-16.38-6.25-22.62 0l-17.54 17.53a16 16 0 0 0-2.79 18.87L64 402.75 4.69 462.06c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L109.25 448l59.03 31.64c6.22 3.33 13.88 2.2 18.87-2.79l17.53-17.54c6.25-6.25 6.25-16.38 0-22.63L188 420l45.38-45.38-33.93-33.93z" className="">
                                </path>
                            </svg>
                        </ToggleButton>
                        <ToggleButton disabled={props.role === "Narrator"  && !props.audioDisabled ? false : true} value={"mute"} onClick={handleMute} id={2} onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescription} onMouseLeave={handleMouseUpDescription} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescription}>
                        {
                                props.mutedOtherPlayer ?
                                <MicOffOutlinedIcon sx={{width:"20px", height:"20px", m:0, overflow:"visible", transform:"scale(1.3)"}}/>
                            :
                                <MicNoneOutlinedIcon sx={{width:"20px", height:"20px", m:0, overflow:"visible", transform:"scale(1.3)"}}/>
                            }
                        </ToggleButton>
                        <ToggleButton disabled={props.role === "Narrator" ? false : true} value={"audioDisabled"} onClick={()=>{props.setAudioDisabled(!props.audioDisabled);handleMute();}} id={4} onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescription} onMouseLeave={handleMouseUpDescription} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescription}>
                        {
                                props.audioDisabled ?
                                <HearingDisabledIcon sx={{width:"20px", height:"20px", m:0, overflow:"visible", transform:"scale(1.3)"}}/>
                            :
                                <HearingIcon sx={{width:"20px", height:"20px", m:0, overflow:"visible", transform:"scale(1.3)"}}/>
                        }
                        </ToggleButton>
                        <ToggleButton disabled={props.role === "Narrator" ? false : true} value={"kick out"} onClick={handleKickClick} id={3} onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescription} onMouseLeave={handleMouseUpDescription} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescription}>
                            <svg overflow="visible" viewBox="0 0 20 20" width={20} height={20}>
                                <path transform="scale(0.035)" fill="currentColor" vectorEffect={"non-scaling-stroke"} d="M593.9 240l41.4-41.4c6.2-6.2 6.2-16.4 0-22.6L624 164.7c-6.2-6.2-16.4-6.2-22.6 0L560 206.1l-41.4-41.4c-6.2-6.2-16.4-6.2-22.6 0L484.7 176c-6.2 6.2-6.2 16.4 0 22.6l41.4 41.4-41.4 41.4c-6.2 6.2-6.2 16.4 0 22.6l11.3 11.3c6.2 6.2 16.4 6.2 22.6 0l41.4-41.4 41.4 41.4c6.2 6.2 16.4 6.2 22.6 0l11.3-11.3c6.2-6.2 6.2-16.4 0-22.6L593.9 240zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96zm89.6 256c-28.8 0-42.4 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464z" className="">
                                </path>
                            </svg>
                        </ToggleButton>
                    </ToggleButtonGroup>
                        
                    </Box>
                    <StyledTooltip
                        TransitionComponent={Zoom}
                        title = {text}
                        enterTouchDelay={100}
                        open={showDescription}
                        onClose={handleNoDescription}
                    >
                        <div></div>                            
                    </StyledTooltip>
                </Box>
            </Zoom>
        </Modal>

        <Dialog
            sx={{bottom:"56px"}}
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Zoom}
        >
        <DialogTitle id="alert-dialog-title">
            {"Do you really want to kick " + other +" out?"}
            </DialogTitle>
            <DialogActions>
            <Button onClick={handleDialogClose}>No</Button>
            <Button onClick={()=>{removePeers(peer)}}>Yes</Button>
            </DialogActions>
        </Dialog>

    </Grid>
    )  
}export default PlayerCard;
                           
