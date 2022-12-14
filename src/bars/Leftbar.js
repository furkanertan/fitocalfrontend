import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { LeftbarStyle } from './LeftbarStyle';
import Hidden from '@material-ui/core/Hidden';

function Leftbar({isMobile, funcSetIsMobile}) {
    const classes = LeftbarStyle();
    return (
        <div>
            <nav className={classes.Drawer}>
                <Hidden xsDown implementation='css'>
                    <Drawer
                        variant='permanent'
                        open
                        anchor='left'
                        classes={{paper: classes.drawerPaper}}>
                    </Drawer>
                </Hidden>
                <Drawer
                        variant='temporary'
                        open = {isMobile}
                        anchor='left'
                        classes={{paper: classes.drawerPaper}}
                        onClick={funcSetIsMobile}
                >
                </Drawer>
            </nav>
        </div>
    );
}

export default Leftbar;