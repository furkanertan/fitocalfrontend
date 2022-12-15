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
    },
    logoDiv: {
        borderBottom:  '1px solid #004d40',
        padding: theme.spacing(4)
    },
    logoStyle: {
        width: theme.spacing(15),
        height: theme.spacing(10)
    },
    active: {
        backgroundColor: '#004d40',
        border: '1px solid #004d40'
    },
    deactive: {
        border: '1px solid #004d40'
    },
    linkIcon: {
        color: 'white'
    }
}));