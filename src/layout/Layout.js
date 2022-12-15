import React from 'react';
import Leftbar from '../bars/Leftbar';
import { LayoutStyle } from './LayoutStyle';
import Topbar from '../bars/Topbar';


function Layout({children}) {
    const classes = LayoutStyle();
    const [isMobile, setIsMobile] = React.useState(false);
    const funcSetIsMobile = () => {
        setIsMobile(!isMobile);
    };
    return (
        <div className={classes.root}>
            <Leftbar isMobile = {isMobile} funcSetIsMobile = {funcSetIsMobile}/>
            <Topbar funcSetIsMobile = {funcSetIsMobile}/>
            <main>
                <div className={classes.topbarWidth}/>
                {children}
            </main>
        </div>
    );
}

export default Layout;