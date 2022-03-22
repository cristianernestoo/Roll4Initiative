import * as React from 'react';
import {Typography, Box} from "@mui/material";

function UserView(props){
const typostyle = {
    fontSize:"1.4rem"
}
    return(
        <Box sx={{display:"flex", flexDirection:"column", transform:"scale("+props.scale+")"}}>
            <Typography sx={typostyle} id="modal-modal-title" variant="inherit" component="h2" >
            {props.role}
            </Typography>
            <Typography sx={typostyle} color="rgba(0,0,0,0.3)" id="modal-modal-description" variant="inherit">
                {props.player} <b>(You)</b>
            </Typography>
        </Box>
    )  
}export default UserView;
                           
