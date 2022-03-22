import { useState } from 'react';
import { Avatar, Grid, Button, Slider, Typography, Input, Container, Box, Dialog, DialogActions, DialogTitle} from '@mui/material';
import VolumeUp from '@mui/icons-material/VolumeUp';
import EditIcon from '@mui/icons-material/Edit';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MicIcon from '@mui/icons-material/Mic';
import Item from './Item';
import List from '@mui/material/List';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useHistory } from "react-router-dom";
import BottomNav from './BottomNav';
import Zoom from '@mui/material/Zoom';


function UserSettings(props) {
    const [value, setValue] = useState(30);
    const [valueSound, setValueSound] = useState(30);

    const history = useHistory();

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleLogoutClick = () =>{
        setDialogOpen(true);
    }

    const handleLogout = () =>{
        history.push('/login');
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSliderChangeSound = (event, newValue) => {
        setValueSound(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleInputChangeSound = (event) => {
        setValueSound(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    const handleBlurSound = () => {
        if (value < 0) {
            setValueSound(0);
        } else if (value > 100) {
            setValueSound(100);
        }
    };

    return (
        <>
        <Container sx={{width:"80%", marginTop:'2rem'}} className='centerContentX'>
            <Item sx={{boxShadow: '0 5px 0px rgba(0,0,0,0.1)', display: "block", textAlign: "left", p: '1rem', minHeight: '100%', width: '90%', overflow: 'visible'}}>
                <Grid
                    container
                    direction="row"
                    alignItems="start"
                    justifyContent="start"
                    style={{ marginTop: "0rem", p:"1rem"}}
                >

                    <Grid item xs={5} sx={{fontSize:'1rem'}}>
                        <Avatar
                            alt="Remy Sharp"

                            sx={{ width: "5rem", height: "5rem" }}
                        >{props.player.charAt(0).toUpperCase()} </Avatar>
                    </Grid>
                    <Grid item xs={7} className="centerContent" flexDirection={"column"}>
                        <Typography variant="h6" width={"100%"}>
                            {props.player}
                        </Typography>
                        <Typography variant="h7" width={"100%"}>
                            {props.player.toLowerCase() + '@gmail.com'}
                        </Typography>
                        
                    </Grid>




                </Grid>
            </Item>


            <Box className="hideScrollbar" sx={{borderRadius:"20px", height:"50vh", overflowY:"scroll", overflowX:'visible', my:"1rem"}}>
                <TreeView
                    sx={{marginBottom:"1rem"}}
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >

                    <Grid
                        container
                        direction="row"
                        alignItems="start"
                        justifyContent="start"
                    >
                        <Item sx={{boxShadow: '0 5px 0px rgba(0,0,0,0.1)', overflow: 'visible', display: "block", textAlign: "left", p: 'rem', minHeight: '100%', width: '100%' }} style={{ marginTop: "1rem" }}>
                            <TreeItem  sx={{p:'1rem'}}  nodeId='1' 
                                label=
                                    {
                                    <Typography variant="headline" component="h3"> Audio Settings </Typography>
                                    }  
                            >

                                <Box marginTop="1rem">
                                    <Typography sx={{paddingTop:"1rem"}} id="input-slider" gutterBottom variant="headline">
                                        Volume
                                    </Typography>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <MicIcon />
                                        </Grid>
                                        <Grid item xs>
                                            <Slider
                                                value={typeof value === 'number' ? value : 0}
                                                onChange={handleSliderChange}
                                                aria-labelledby="input-slider"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                sx={{width:"1.8rem", mr:"15px"}}
                                                value={value}
                                                size="small"
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                inputProps={{
                                                    step: 10,
                                                    min: 0,
                                                    max: 100,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                

                                    
                                    <Typography id="input-slider-2" gutterBottom variant='headline'>
                                        Sound
                                    </Typography>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item >
                                            <VolumeUp />
                                        </Grid>
                                        <Grid item xs>
                                            <Slider
                                                value={typeof valueSound === 'number' ? valueSound : 0}
                                                onChange={handleSliderChangeSound}
                                                aria-labelledby="input-slider-2"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                sx={{width:"1.8rem", mr:"15px"}}
                                                value={valueSound}
                                                size="small"
                                                label="outlined"
                                                onChange={handleInputChangeSound}
                                                onBlur={handleBlurSound}
                                                inputProps={{
                                                    step: 10,
                                                    min: 0,
                                                    max: 100,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider-2',
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TreeItem>
                        </Item>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        alignItems="start"
                        justifyContent="start"
                        style={{ marginTop: "1rem" }}
                    >
                        <Item sx={{boxShadow: '0 5px 0px rgba(0,0,0,0.1)', overflow: 'visible', display: "block", textAlign: "left", p: 'rem', minHeight: '100%', width: '100%' }}>
                            <TreeItem  sx={{p:'1rem'}} nodeId='2' label={
                                <Typography variant="headline" component="h3"> Account Settings </Typography>
                            }  >
                                <List
                                    sx={{ width: '100%', maxWidth: 360 }}
                                >
                                    <Button startIcon={<EditIcon />} variant="containend" sx={{py:1 , my:1, borderRadius:"10px"}}>
                                        Edit account
                                    </Button>

                                    <Button startIcon={<ArchiveIcon />} variant="containend" sx={{py:1 ,borderRadius:"10px"}}>
                                        Archived games
                                    </Button>
                                    
                                </List>
                            </TreeItem>
                        </Item>
                    </Grid >
                </TreeView>

                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    style={{ marginTop: "rem" }}
                >

                </Grid>
            </Box>

            <Button variant="contained" sx={{ width: 250, height: 50, backgroundColor:"#A62639", boxShadow: '0 5px 0px rgba(0,0,0,0.1)'}} onClick={handleLogoutClick}>
                Logout
            </Button>
            
        </Container >

        <Dialog
            sx={{bottom:"56px"}}
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            TransitionComponent={Zoom}
        >
            <DialogTitle id="alert-dialog-title">
            {"Do you really want to logout?"}
            </DialogTitle>
            <DialogActions>
            <Button onClick={handleDialogClose}>No</Button>
            <Button onClick={handleLogout}>Yes</Button>
            </DialogActions>
        </Dialog>

        <BottomNav/>
        </>
    );
}

export default UserSettings;