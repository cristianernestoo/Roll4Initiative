import * as React from 'react';
import {Typography, Box} from "@mui/material";

function PlayerView(props){
    
const typostyle = {
    fontSize:"1.2rem"
}
    return(
        <Box sx={{display:"flex", flexDirection:"column", transform:"scale("+props.scale+")"}}>
            <Typography sx={typostyle} variant="inherit" component="h3" >
             {props.role}
            </Typography>
            <Typography sx={typostyle} color="rgba(0,0,0,0.3)" id="modal-modal-description" variant="inherit">
              {props.player === "Luigi" ? "Fulvio" : "Luigi"}
            </Typography>
        </Box>
    )  
}export default PlayerView;
                           
