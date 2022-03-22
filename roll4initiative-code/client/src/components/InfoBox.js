import { Alert } from "@mui/material";

function InfoBox(props){

    var style;
    if(props.severity !== "info")
        style = {fontSize:".8rem", opacity:"0.8", border:"none", pb:"0"};
    else
        style = {fontSize:".8rem", opacity:"0.8"};

    return(
        <>
            <Alert color={props.severity === "info" ? "primary":""}  variant="outlined" sx={style} severity={props.severity}>
                {props.text}
            </Alert>
        </>
    )  
}export default InfoBox;
                           