import { styled } from '@mui/material/styles';
import {Paper} from '@mui/material';


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
        height: "100%",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '5px 5px 0px rgba(0,0,0,0.1)',
        borderRadius:"20px",
    }));

export default Item;
