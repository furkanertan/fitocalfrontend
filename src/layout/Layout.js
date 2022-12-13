import React from 'react';
import Leftbar from '../bars/Leftbar';
import { LayoutStyle } from './LayoutStyle';

function Layout() {
    const classes = LayoutStyle();
    return (
        <div className={classes.root}>
            <Leftbar />
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;