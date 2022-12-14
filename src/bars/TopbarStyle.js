import { makeStyles } from '@material-ui/core/styles';

export const TopbarStyle = makeStyles((theme) => ({
    topbar: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '200px'
        },
        backgroundColor: '#00695c'
    }
}));