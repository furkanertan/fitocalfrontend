import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import useScreen from "../hooks/useScreen";
import { useState, useEffect, useCallback } from "react";
import logo from "../images/fitocal-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import { Constants } from "../constants/constants";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-245px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      marginRight: 0,
      backgroundColor: "#f8f9fc",
      minHeight: "94.8vh",
    }),
  })
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - 245px)`,
    marginLeft: `245px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#336699",
  }),
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Layout = ({ children }) => {
  const { width } = useScreen();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cb = useCallback(() => setOpen(width > 600), [width]);

  useEffect(() => {
    cb();
  }, [cb]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position='fixed' open={open}>
        <Toolbar
          sx={{ backgroundColor: "#336699", marginLeft: 0, marginRight: 0 }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              mr: 2,
              ...(open && { display: "none" }),
            }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: "245px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "245px",
            boxSizing: "border-box",
            backgroundColor: "#336699",
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}>
        <DrawerHeader>
          <Grid container>
            <Grid item xs={10}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}>
                <Box
                  component={"img"}
                  src={logo}
                  sx={{ width: 200, height: 100 }}
                />
              </Box>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  mt: 2,
                  color: "#ffffff",
                  ":hover": { backgroundColor: "#e1dfe1" },
                }}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </DrawerHeader>
        <List>
          {Constants.leftBarData.map(({ id, title, path, icon }) => (
            <ListItem key={id}>
              <ListItemButton onClick={() => navigate(path)}>
                {icon}
                <ListItemText
                  primary={title}
                  sx={{ marginLeft: 1, color: "#FFFFFF" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
};

export default Layout;