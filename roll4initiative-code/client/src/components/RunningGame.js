import { Button, Grid, Typography, Modal, Box, Zoom, ToggleButtonGroup, ToggleButton, styled } from "@mui/material";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import API from "../API";
import Item from "./Item";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

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

function RunningGame(props) {

  let clickHoldTimer = null;
  let timerDescription = null;
  const [open, setOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState('');
  const [rolls, setRolls] = useState([]);
  const [assets, setAssets] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleShowDescription = () => setShowDescription(true);
  const handleNoDescription = () => setShowDescription(false);

  const handleMouseDown = () => {
    clickHoldTimer = setTimeout(() => {
      //Action to be performed after holding down mouse
      handleOpen();
    }, 400); //Change 1000 to number of milliseconds required for mouse hold
  }

  const handleMouseDescription = (event) => {
    const button = event.currentTarget;
    timerDescription = setTimeout(() => {
      //Action to be performed after holding down mouse
      setAnchorEl(button);
      handleShowDescription();
    }, 50); //Change 1000 to number of milliseconds required for mouse hold
  }

  const handleMouseUpDescritption = () => {
    setAnchorEl(null);
    setShowDescription(false);
    clearTimeout(timerDescription);
  }

  const handleMouseUp = () => {
    clearTimeout(clickHoldTimer);
  }

  useEffect(() => {
    if (anchorEl) {
      let btn = parseInt(anchorEl.id);
      switch (btn) {
        case 1:
          setText('Edit Game');
          break;
        case 2:
          setText('Archive Game');
          break;
        case 3:
          setText('Delete Game');
          break;
        default:
          setText('');
          break;
      }
    }
  }, [anchorEl]);

  useEffect(()=> {
    API.getLast10Rolls(props.game.id).then((r)=>{
      setRolls(r);
    });
    API.getManuals(props.game.id).then((a)=>{
      setAssets(a);
    })
  },[props.game.id])

  const modalStyle = {
    flexDirection: 'column',
    borderRadius: '10px',
    marginTop: '30vh',
    bgcolor: 'transparent',
    outline: 'none',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const boxStyle = {
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 40,
    p: 4,
    width: '40vw',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
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
    <>
      <Button sx={{m:"0", p:"0", width:"100%", borderRadius:"20px"}}>
        
          <Item sx={{width:"100%"}} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} onTouchEnd={handleMouseUp} onMouseUp={handleOpen} onMouseLeave={handleMouseUp} onClick={handleOpen}>
            <PaperRow game={props.game} player={props.player} />
          </Item>
        
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Zoom in={open}>
          <Box sx={modalStyle}>
            <Box sx={boxStyle}>
              <strong>{props.game.game_title}</strong>

              <Button sx={{mt:"20px",boxShadow: '5px 5px 0px rgba(0,0,0,0.1)'}} variant="contained" color="primary" endIcon={<ExitToAppRoundedIcon sx={{color:"white"}}/>}>
                <Link
                  style={{ color:"white", textDecoration: 'none', width:"100%"}}
                  to={{
                    pathname: `/room/${props.game.id_room}`,
                    state: {
                      id_game: props.game.id,
                      title: props.game.game_title,
                      role: props.game.role,
                      dice: props.game.dice,
                      isSecret: props.game.role_secret,
                      rolls: rolls,
                      assets: assets,
                      narration_mode: props.game.narration_mode,
                    },
                  }}
                >
                  Join game
                </Link>
              </Button>

            </Box>
            
            <Box sx={optionsStyle}>
              <ToggleButtonGroup size="large">
                <ToggleButton id={1} value="edit" onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescritption} onMouseLeave={handleMouseUpDescritption} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescritption}><EditOutlinedIcon /></ToggleButton>
                <ToggleButton id={2} value="archive" onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescritption} onMouseLeave={handleMouseUpDescritption} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescritption}><ArchiveOutlinedIcon /></ToggleButton>
                <ToggleButton id={3} value="delete" onMouseDown={handleMouseDescription} onMouseUp={handleMouseUpDescritption} onMouseLeave={handleMouseUpDescritption} onTouchStart={handleMouseDescription} onTouchEnd={handleMouseUpDescritption}><DeleteOutlineOutlinedIcon /></ToggleButton>
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
    </>
  );
}

function PaperRow(props) {

  return (
    <Grid container columnSpacing="10px" sx={{ paddingX:"20px", display: 'flex', width: '100%', alignItems: 'center', height: "10vh" }}>
      <Grid item sx={{ textAlign: "center" }} xs={2} className="centerContent">
        {props.game.role === 'Narrator' ? <FontAwesomeIcon className='centerContent crownIcon' icon={faCrown} style={{paddingTop:'1rem'}} /> : <AutoFixHighIcon/>}
      </Grid>
      <Grid item sx={{ textAlign: 'start'}} xs={6}>
        <strong>{props.game.game_title}</strong>
      </Grid>
      <Grid item sx={{ textAlign: 'right', opacity:"0.4"}} xs={4}>
        <Typography variant="h7">{props.game.creation_date}</Typography>
      </Grid>
    </Grid>
  );
}

export default RunningGame;