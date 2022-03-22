import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import {useHistory, useLocation} from 'react-router-dom';

function BottomNav(props) {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname === "/userSettings" ? "user" : "homepage");
  let history = useHistory();
  
  const handleChange = (event, newValue) => {
    let oldValue = value;
    setValue(newValue);
    switch(newValue){
      case "homepage":
        if(location.pathname !== '/setup' && location.pathname !== '/homepage' && location.pathname !== '/userSettings'){
          props.handleBackClick();
        } else if(location.pathname === '/setup') history.push('/homepage');
        else if(oldValue === "user") history.push('/homepage');
        break;
      case "user":
        if(location.pathname !== '/setup' && location.pathname !== '/homepage' && location.pathname !== '/userSettings'){
          props.handleBackClick();
        } else if(oldValue === "homepage") history.push('/userSettings');
      break;
      default:
      break;
    }
  }
  

  return (
    <BottomNavigation
    className="stickyToBottom" value={value} onChange={handleChange}
    sx={{boxShadow: '2px 2px 4px 2px rgb(0 0 0 / 5%)',
          width:'100vw'}}
    >
      <BottomNavigationAction
        label="Homepage"
        value="homepage"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="User Settings"
        value="user"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}
export default BottomNav;