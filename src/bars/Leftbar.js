import React from 'react';
import Drawer from '@material-ui/core/Drawer';


function Leftbar() {
    return (
        <div>
            <nav>
                <Drawer>
                    variant='permanent'
                    open
                    anchor='left'
                </Drawer>
            </nav>
            I'm left bar
        </div>
    );
}

export default Leftbar;