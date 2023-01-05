import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEdit } from '../containers/hook/useEdit';

export default function ButtonAppBar() {
  const navigate = useNavigate()
  const {state} = useLocation()
  const {read} = useEdit()
  const handleArticle = (e) => {
    console.log(state.id)
    navigate('/article/'+ state.id, {state:{id:state.id, user:state.user}})
  }

  const handleAccount = () => {
    console.log(state)
    navigate('/account/'+state.id, {state:{id:state.id, user:state.user}});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#0b2e5b' }} >
        <Toolbar sx={{ alignItems: 'center', justifyContent: 'center', }}>

        {!read && state.id != '' ? <Button color="inherit" size="large" onClick={handleArticle}>Article</Button>:<></>}
          {/* <Button color="inherit" size="large">Photo</Button> */}
          
          {!read && state.id != '' ? <Button color="inherit" size="large" onClick={handleAccount}>Account</Button>:<></>}

        </Toolbar>
      </AppBar>
    </Box>
  );
}