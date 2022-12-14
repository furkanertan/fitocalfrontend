import { makeStyles } from '@material-ui/core/styles';

export const LeftbarStyle = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: '200px'
        }
    },
    drawerPaper: {
        width: '200px',
        color: 'white',
        backgroundColor: '#00095c'
    }
}));