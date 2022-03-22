import {Box, Button, Typography} from "@mui/material";
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import API from "../API";
import useSound from 'use-sound';
import narrationOffSound from '../sounds/narrationOffSound.mp3';

function NarrationMode(props){

    
    const [playDisable] = useSound(
        narrationOffSound,
        { volume: 0.25 }
    ); 

    const handleNarrationMode = () =>{
        if (!props.narrationMode) {
            props.peers.forEach(peer => {
                peer._remoteTracks[0]['track'].enabled = false;
            })
            props.setMutedOtherPlayer(true);
        }else{
            props.peers.forEach(peer => {
                peer._remoteTracks[0]['track'].enabled = true;
            })
        }
        playDisable();
        props.setMutedOtherPlayer(false);
        API.setNarrationMode(0, props.id_game);
        props.setNarrationMode(false);  
    }


    return(
        <>
        <Box
            style=
            {{
                position: "fixed",
                overflow: "visible",
                top: "0",
                left:"0",
                width:"calc(100% + 1px)",
                zIndex: "501",
                backgroundColor: "transparent",
            }}
        >
            <Box className="centerContentY animated_slideY" sx={{color:"rgba(0,0,0,0.7)", height:"2rem", backgroundColor: "white", boxShadow: 'px 5px 0px rgba(0,0,0,0.5)'}}>
                
                <RecordVoiceOverRoundedIcon sx={{padding:"0", ml:"4px", mr:"8px", fontSize:"1.5rem"}}/>
                <Typography className="centerContent" sx={{marginTop:"2px", padding:"0", fontSize:".75rem", display:"block", whiteSpace:"nowrap", overflow:"clip"}}>
                <b>Narration mode&nbsp;</b> is active. All players are muted.
                </Typography>
                &nbsp;{props.isNarrator ?
                <Button sx={{whiteSpace:"nowrap", paddingY:"0", paddingX:"2px", textTransform: "none", borderRadius:"5px"}} variant="outlined" size="small" onClick={handleNarrationMode}>Disable it.</Button> : ""}
            </Box>
            
        </Box>
        <Box className="animated_zoom2" sx={{borderRadius:"100%", transition:"1s", zIndex:"500", position: "fixed",height: "100vw", width: "calc(100vw + 1px)", backgroundColor: "rgba(0,0,0,0.75)", pointerEvents: "none"}}></Box>
        </>
    );
}
export default NarrationMode;