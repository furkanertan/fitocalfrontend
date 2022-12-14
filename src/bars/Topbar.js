import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import React from "react";
import { TopbarStyle } from "./TopbarStyle";
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import logo from '../images/fitocal-logo.png';

function Topbar({funcSetIsMobile}) {
  const classes = TopbarStyle();
  return (
    <div>
      <AppBar position ='fixed' elevation={1}>
        <Toolbar className={classes.topbar}>
          <IconButton 
                      className={classes.topbarContent}
                      onClick={funcSetIsMobile}
                      >
            <MenuIcon>
            </MenuIcon>
          </IconButton>
          <div className={classes.topbarContent}>
            <Avatar variant= 'square' alt = 'Fitocal' src={logo} className = {classes.topbarLogo}/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Topbar;