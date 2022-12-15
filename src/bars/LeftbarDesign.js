import React from 'react';
import { Avatar, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import logo from '../images/fitocal-logo.png';
import { LeftbarStyle } from './LeftbarStyle';
import { LeftbarData } from './LeftbarData';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function LeftbarDesign () {
    const classes = LeftbarStyle();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <div className = {classes.logoDiv}>
                <Avatar alt = 'Fitocal' src= {logo} variant = 'square' className={classes.logoStyle}/>
            </div>
            {
                LeftbarData.map(item => (
                    <ListItem
                        button 
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className = {location.pathname === item.path ? classes.active : classes.deactive}

                        >
                        <ListItemIcon className={classes.linkIcon}>{item.icon}</ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                    </ListItem>
                ))
            }
        </div>
    );
}

export default LeftbarDesign;