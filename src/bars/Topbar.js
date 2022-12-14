import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import React from "react";
import { TopbarStyle } from "./TopbarStyle";
import MenuIcon from '@material-ui/icons/Menu';

function Topbar() {
  const classes = TopbarStyle();
  return (
    <div>
      <AppBar position ='fixed' elevation={1}>
        <Toolbar className={classes.topbar}>
          <IconButton>
            <MenuIcon>
            </MenuIcon>
          </IconButton>
        </Toolbar>
        <div>
        </div>
      </AppBar>
    </div>
  );
}

export default Topbar;