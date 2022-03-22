import * as React from 'react';
import { Grid, Modal, Box, Autocomplete, TextField, Button} from "@mui/material";
import { useState, useCallback } from "react";
import Zoom from '@mui/material/Zoom';
import { useEffect } from "react";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import Item from './Item';

function InviteCard(){

    const nPlayers = 8;
    const friends = "";
    const setFriends = "";
    const limitReached = false;
    const setLimitReached = true;
    const friendsList = [];
    const checkDisable = useCallback(option => limitReached && !friends.includes(option), [limitReached, friends]);
    // eslint-disable-next-line
    const onSelect = useCallback((event, newValues) => {
        setFriends(newValues);
        setLimitReached(newValues.length >= nPlayers-1);
    }, [nPlayers, setLimitReached]);

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
    // eslint-disable-next-line
    const [anchorEl, setAnchorEl] = useState(null);
    // eslint-disable-next-line
    const [text, setText] = useState('');

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
            default:
              setText('');
              break;
          }
        }
      },[anchorEl])

    const modalStyle = {
        flexDirection: 'column',
        borderRadius: '10px',
        marginTop: '35vh',
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
        width: '60vw',
        height: '60vw',
        px:3,
        pb:3,
        minHeight: '145px',
        maxHeight: '200px',
        minWidth: '155px',
        maxWidth: '200px',
        marginBottom: '1rem',
        display: 'flex',
    };

    return(
    
    <Grid item xs={1}>
        <Button className="userCardButton" onMouseUp={handleOpen}
         sx={{borderRadius:"20px", margin:"0", padding:"0", width:"100%", height:"100%", textTransform:"none"}}>
            <Item className="invite" sx={{backgroundColor:"transparent", height:"25vw", boxShadow:'0', color:"rgb(169, 169, 169)"}}>
                <PersonAddAlt1RoundedIcon fontSize="large"></PersonAddAlt1RoundedIcon>
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
                        
                        {/* Friends search bar */}
                        <Grid container>
                            <Grid item xs={12}>
                                <h3>Invite Your Friends!</h3>
                            </Grid>
                            <Grid item xs={12} >
                                <Autocomplete
                                    multiple
                                    getOptionDisabled={checkDisable}
                                    id="tags-outlined"
                                    options={friendsList.sort()}
                                    getOptionLabel={(option) => option}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Find your friends"
                                            placeholder="Find your friends"
                                            color="secondary"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Zoom>
        </Modal>

    </Grid>
    )  
}export default InviteCard;
                           
