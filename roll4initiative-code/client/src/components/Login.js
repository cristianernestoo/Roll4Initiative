import { Avatar, Grid, Button, Typography } from '@mui/material';
import { useHistory } from "react-router-dom";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Item from './Item';



function Login(props) {
    let history = useHistory();
    return (
        <Grid 
            
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{  marginTop: "2.5rem" }}
        >

            <Typography fontFamily={'Title'} fontSize="2rem" marginBottom={"1.5rem"}>
                Roll4Initiative
            </Typography>

            <Avatar
                sx={{ width: 200, height: 200 }}
            >
                <SportsEsportsIcon sx={{ fontSize: 100 }}/>
            </Avatar>

            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '30vh' }}
            >
                <Item sx={{ width: 200, height: 100 }}>
                    <Button variant="outlined" color="primary" sx={{ width: 200, height: 100, fontSize:'15px'}} onClick={() => { props.setPlayer('Luigi'); history.push("/homepage"); }}>
                        Luigi
                    </Button>
                </Item>

            </Grid>

            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                
            >
                <Item sx={{ width: 200, height: 100 }}>
                    <Button variant="outlined" color="info" sx={{ width: 200, height: 100, fontSize:'15px' }} onClick={() => { props.setPlayer('Fulvio'); history.push("/homepage"); }}>
                        Fulvio
                    </Button>
                </Item>

            </Grid>


        </Grid>

    );



}

export default Login;