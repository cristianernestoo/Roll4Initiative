import {Typography, Box} from "@mui/material";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles'

function RollRow(props) {

const theme = useTheme();

let style = {borderRadius:'8px', display:'flex', justifyContent:'left'};
let user = props.user;
let luck = "";
let primary_color = theme.palette.primary.dark;

if(props.isUser)
{
  style = {backgroundColor:alpha(theme.palette.primary.main, 0.15), marginY:"2px", borderRadius:'8px', display:'flex', justifyContent:'left'};
  user = props.user + " (You)";
}

if(props.max === 20 && props.result === props.max)         luck="Critical success!";
else if(props.max === 20 && props.result === 1)            {luck="Critical failure!"; primary_color=theme.palette.error.main;}
else                                                       primary_color = "black";


return (
    <Box sx={style} className="animated_slideY">
        <Typography sx={{color:primary_color, paddingLeft:"10px", paddingY:"3px"}}><b>D{props.max}</b> {user} rolled {props.result}. {luck}</Typography>
    </Box>
  );
}

export default RollRow;