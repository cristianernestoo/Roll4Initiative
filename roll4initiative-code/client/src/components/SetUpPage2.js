import { Grid, Autocomplete, TextField, Input, Button, IconButton, List, ListItem, Avatar, ListItemAvatar, ListItemText, Box} from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoBox from './InfoBox';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import Item from './Item';
import CircularProgress from '@mui/material/CircularProgress';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';

/******************* AUTCOMPLETE LOADING EFFECT ********************/
function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
/*******************************************************************/

function SetUpPage2(props) {

    const { users, player, nPlayers, friends, setFriends, assets, setAssets } = props;
    const [limitReached, setLimitReached] = useState(false);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    /******************* AUTCOMPLETE LOADING EFFECT ********************/
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...users.filter(user => user.name !== player)]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, player, users]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    /*******************************************************************/

    const onSelect = useCallback((event, newValues) => {
        setFriends(newValues);
        setLimitReached(newValues.length >= nPlayers-1);
    }, [nPlayers, setFriends, setLimitReached]);

    const removeAssets = (f) => {
        setAssets(assets.filter(file => file.name !== f.name));
        document.getElementById('contained-button-file').value = "";
    };

    const handleUpload = (e) =>{
        let files = Array.from(e.target.files);                                     //convert uploaded FileList object into array
        files.forEach((file => {                                                    //for each of these files verify that there are no
            if(!assets.find(asset => asset.name === file.name)){                    //other already uploaded file with the same name
                setAssets(prevAssets => [...prevAssets, file]);                     //then proceed uploading it, otherwise nothing happen
            }
        }))
    }    

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    }));


    const checkDisable = useCallback(option => limitReached && !friends.includes(option), [limitReached, friends]);

    

    return (

        <Grid container fixed="true" rowSpacing={2} columnSpacing={0} direction="column" alignItems="center" sx={{ marginTop:'1.5rem', paddingTop: "0rem", paddingBottom: "2rem" }}>       

            {/* Friends search bar */}
            <Grid container sx={{ width: '80%', padding: '0.3rem', px: '0' }}>
                <Grid item xs={12} sx={{ mt: -2, px:"10px"}}>
                    <h3 className='centerContentY'>
                        <GroupAddRoundedIcon/>
                        &nbsp;&nbsp;Invite Your Friends!</h3>
                </Grid>

                <Item sx={{display:"block", textAlign:"left", p: '1rem', minHeight: '100%', width: '100%'}}>
                    <Grid item xs={12}>

                        <Autocomplete
                            open={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            multiple
                            getOptionDisabled={checkDisable}
                            id="tags-outlined"
                            options={options.sort()}
                            loading={loading}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            onChange={onSelect}
                            value={friends}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Find your friends"
                                    color={(nPlayers - 1) - friends.length ? "warning" : "secondary"}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <InfoBox text={`${(nPlayers - 1) - friends.length} friends left to be invited!`} severity={(nPlayers - 1) - friends.length ? 'warning' : 'success'}></InfoBox>

                </Item>
            </Grid>

            {/* Assets upload */}
            <Grid container sx={{ width: '80%', padding: '0.3rem', px: '0', mt: 0 }}>

                <Grid item xs={12} sx={{px:"10px", mt:0}}>
                    <h3 className='centerContentY'>
                        <LibraryBooksRoundedIcon/>
                        &nbsp;&nbsp;Game Assets
                    </h3>
                </Grid>
                <Item sx={{ p: '1rem', minHeight: '100%', width: '100%'}}>
                    <InfoBox text="Upload documents, manuals, character sheets that you think will be useful during the game. You can still add and delete them later." severity="info" />

                    {/* Upload button */}
                    <Grid container sx={{mt:"1.5rem", padding: '0.5rem', width: '100%', justifyContent: 'center' }}>
                        <label htmlFor="contained-button-file">
                            <Input multiple accept="application/pdf" id="contained-button-file" inputProps={{ multiple: true }} type="file" sx={{ display: 'none' }} onChange={(e) => { handleUpload(e) }} />
                            <Button variant="contained" component="span" sx={{color:"white"}}>
                                Upload <UploadRoundedIcon variant="white"/>
                            </Button>
                        </label>
                    </Grid>

                    {/* Assets List + delete button*/}
                    <Grid container sx={{ padding: '0.5rem', width: '100%', justifyContent: 'center' }}>
                        <Demo className='centerContent'>
                            <Box sx={{ width: '100%', height: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: '100%',
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: 100,
                                        '& ul': { padding: 0 },
                                    }}
                                >
                                    {assets.map((f) => (
                                        <ListItem
                                            key={f.name}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ArticleIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={f.name.length < 16 ? f.name : f.name.substring(0, 15) + "..."}
                                            />
                                            <IconButton edge="end" aria-label="delete" onClick={() => { removeAssets(f); }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Demo>
                    </Grid>
                </Item>
            </Grid>

        </Grid>
    );
}

export default SetUpPage2;