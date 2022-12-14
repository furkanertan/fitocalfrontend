import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";

function Topbar() {
  return (
    <div>
      <AppBar position ='fixed' elevation={1}>
        <Toolbar>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Topbar;