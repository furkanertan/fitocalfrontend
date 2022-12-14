import { makeStyles } from '@material-ui/core/styles';

export const TopbarStyle = makeStyles((theme) => ({
    topbar: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '200px'
        },
        backgroundColor: '#00695c'
    },
    topbarLogo: {
        width: '80px',
        height: '50px'
    },
    topbarContent: {
        color: 'white',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
}));