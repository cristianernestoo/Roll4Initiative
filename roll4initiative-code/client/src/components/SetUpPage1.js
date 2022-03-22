import { useCallback } from 'react';
import { Grid, Typography, TextField, Button, Switch, Autocomplete, createFilterOptions } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import PopularRoles from './PopularRoles';
import InfoBox from './InfoBox';
import Item from './Item';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

const filter = createFilterOptions();

const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
      borderColor: '#84d179',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: '#ff9800',
      borderWidth: 2,
    },
  });
  

function SetUpPage1(props) {

    const { title, setTitle, nPlayers, setNPlayers, dices, setDices, roles, setRoles, secret, setSecret, limitReached, setLimitReached } = props;
    //const [limitReached, setLimitReached] = useState(false);

    const scrollToRoles = () => {
        var element = document.getElementById("scrollToRoles");
        element.scrollIntoView();
    };

    const updateNPlayers = (e) => {
        e.preventDefault();
        let n = nPlayers;
        switch (e.target.id) {
            case 'btn-decrease':
                if ((!secret && nPlayers > 2) || (secret && nPlayers > 3)) {
                    setNPlayers(--n);
                    if(roles.length >= n){
                       roles.splice(-1);
                    }
                }
                break;
            case 'btn-increase':
                if (nPlayers < 8) {
                    setNPlayers(++n);
                }
                break;
            default:
                break;
        }     
        setLimitReached(roles.length >= n-1);
    }

    const onSelect = useCallback((event, newValues) => {
        //const regex = /^Add\s+.*$/;
        const regex = /^Add\s".*"$/;
        let lastRole = newValues[newValues.length-1];
        if (regex.test(lastRole)) {                                                 //If the user input is smt like Add "[...]"
            newValues[newValues.length-1] = lastRole.slice(5, -1);                  //Create a new value from the user input 
            setRoles(newValues);                                                    //Taking only what's inside the quotes
          } else {
            setRoles(newValues);
          }
        setLimitReached(newValues.length >= nPlayers-1);
    }, [nPlayers, setRoles, setLimitReached]);

    const checkDisable = useCallback(() => limitReached , [limitReached]);

    /**When role are set visible the roles array is emptied */
    const handleSecret = () =>{
        if(secret){
            setRoles([]);
        }
        if(!secret && nPlayers<3){ //set nPlayers min = 3 when roles secret 
            setNPlayers(3);
        }
        setSecret(!secret);
        setLimitReached(false);
    }

    return (

        <Grid container fixed="true" rowSpacing={2} columnSpacing={0} direction="column" alignItems="center" sx={{ marginTop:'1.5rem', paddingTop: "0rem"}}>

            {/* Crown Icon + screen info */}
            <Item sx={{mb:2, boxShadow:"none", color:"white", width:"80%", backgroundImage:"linear-gradient(to right, #7209b7, #de577a)"}}>
                <Grid container className='centerContent' sx={{textAlign: 'center' }}>
                    <Grid xs={2.5} item className='centerContent'><FontAwesomeIcon className='centerContent' icon={faCrown} size="3x" style={{paddingTop:'1rem'}} /></Grid>
                    <Grid xs={8} item className='centerContent'><Typography><b style={{ fontSize: '120%' }}>You are the Narrator</b><br />You are the rules!</Typography></Grid>
                </Grid>
            </Item>

            {/* Game Title */}
            <Grid item xs={12} sx={{width:"80%"}}>
                <ValidationTextField 
                    required variant="outlined"  color="primary" label="Insert a Game Title" id="fullWidth" autoComplete='off'
                    sx={{width:"100%", marginBottom: '0.5rem', borderRadius: "20px", backgroundColor: 'white', boxShadow: '5px 5px 0px rgba(0,0,0,0.1)' }}
                    onChange={(event) => setTitle(event.target.value)} 
                    value={title}
                />
            </Grid>

            {/* Set Up details */}
            
            <Grid container sx={{ width: '80%', padding: '0.3rem', px: '0' }}>

                <Grid item xs={12} sx={{px:"10px"}}>
                    <h3 className='centerContentY'>
                        <SettingsIcon/>
                        &nbsp;&nbsp;Game Setup
                    </h3>
                </Grid>

                <Item sx={{ p: '1rem', minHeight: '100%', width: '100%'}}>

                    <Grid container sx={{ width: '100%', padding: '0.3rem', px: '0' }}>
                        <Grid item xs={7}>
                            <Typography sx={{ paddingTop: '0.2rem' }}>How many <b>players</b>?</Typography>
                        </Grid>

                        {/*Number of players buttons */}
                        <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', textAlign: 'center', alignSelf: 'center' }}>
                            <Button color="primary" sx={{ border: '2px solid grey', borderRadius: '50px', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} id='btn-decrease' onClick={(e) => { updateNPlayers(e) }}>-</Button>
                            <Typography sx={{ border: '2px solid white', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', textAlign: 'center', verticalAlign: 'middle' }}>{nPlayers}</Typography>
                            <Button color="secondary" sx={{ border: '2px solid grey', borderRadius: '50px', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} id='btn-increase' onClick={(e) => { updateNPlayers(e) }}>+</Button>
                        </Grid>

                        {/* Dices setting */}
                        <Grid item xs={8}>
                            <Typography sx={{ paddingTop: '0.4rem' }}>Will you need the <b>dice</b>?</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'end' }}>
                            <Switch color="secondary" checked={dices} onChange={() => { setDices(!dices) }} />
                        </Grid>

                        {/* Roles setting */}  
                        <Grid item xs={8}>
                            <Typography sx={{ paddingTop: '0.4rem' }}>Are the <b>roles</b> secret?</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'end' }}>
                            <Switch color="secondary" checked={secret} onChange={() => {handleSecret()}} />
                        </Grid>
                        <Grid item xs={12} sx={{my:'.5rem'}}>
                                <InfoBox text='If secret, roles will be randomly assigned to players. Use this option for games like "Lupus in Fabula".'
                                severity="info"/>
                        </Grid>
                    </Grid>
                </Item>

            </Grid>

            {/* define roles autocomplete */}
            {
                secret ?
                    <Grid id="scrollToRoles" container sx={{width: '80%', padding: '0.3rem', px: '0'}} className={!roles.length ? "animated_slideY":""} onAnimationStart={scrollToRoles}>
                        <Grid item xs={12} direction="row" sx={{px:"10px"}}>
                            <h3>
                                <svg overflow="visible" viewBox="0 0 16 16" width={16} height={16}>
                                    <path transform="scale(0.035)" transformOrigin="10" fill="currentColor" vectorEffect={"non-scaling-stroke"} d="M507.31 462.06L448 402.75l31.64-59.03c3.33-6.22 2.2-13.88-2.79-18.87l-17.54-17.53c-6.25-6.25-16.38-6.25-22.63 0L420 324 112 16 18.27.16C8.27-1.27-1.42 7.17.17 18.26l15.84 93.73 308 308-16.69 16.69c-6.25 6.25-6.25 16.38 0 22.62l17.53 17.54a16 16 0 0 0 18.87 2.79L402.75 448l59.31 59.31c6.25 6.25 16.38 6.25 22.63 0l22.62-22.62c6.25-6.25 6.25-16.38 0-22.63zm-149.36-76.01L60.78 88.89l-5.72-33.83 33.84 5.72 297.17 297.16-28.12 28.11zm65.17-325.27l33.83-5.72-5.72 33.84L340.7 199.43l33.94 33.94L496.01 112l15.84-93.73c1.43-10-7.01-19.69-18.1-18.1l-93.73 15.84-121.38 121.36 33.94 33.94L423.12 60.78zM199.45 340.69l-45.38 45.38-28.12-28.12 45.38-45.38-33.94-33.94-45.38 45.38-16.69-16.69c-6.25-6.25-16.38-6.25-22.62 0l-17.54 17.53a16 16 0 0 0-2.79 18.87L64 402.75 4.69 462.06c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L109.25 448l59.03 31.64c6.22 3.33 13.88 2.2 18.87-2.79l17.53-17.54c6.25-6.25 6.25-16.38 0-22.63L188 420l45.38-45.38-33.93-33.93z" className="">
                                    </path>
                                </svg>
                                &nbsp;&nbsp;Define Roles
                            </h3>
                        </Grid>

                        <Item sx={{ p: '1rem', minHeight: '100%', width: '100%', display: 'block'}}>
                            <Grid item xs={12} >
                                <Autocomplete
                                    multiple
                                    freeSolo={!limitReached}
                                    getOptionDisabled={checkDisable}
                                    isOptionEqualToValue={(option, value) => false}
                                    id="tags-outlined"
                                    options={PopularRoles.sort()}
                                    getOptionLabel={(option) => option}
                                    onChange={onSelect}
                                    value={roles}
                                    selectOnFocus
                                    handleHomeEndKeys
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.unshift(`Add "${inputValue}"`)
                                        }
                                        return filtered;
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Type some roles..."
                                            placeholder="Roles"
                                            color={(nPlayers - 1) - roles.length ? "warning" : "secondary"}
                                        />
                                    )}
                                />
                            </Grid>
                            <InfoBox text={`${(nPlayers - 1) - roles.length} roles left to define!`} severity={(nPlayers - 1) - roles.length ? 'warning' : 'success'}></InfoBox>
                        </Item>
                    </Grid>
                    :
                    ''
            }

        </Grid>

    );
}

export default SetUpPage1;