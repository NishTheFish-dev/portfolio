import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  alpha,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const background = alpha(theme.palette.background.paper, 0.9);
  const borderColor = theme.palette.divider;
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects' },
    { text: 'Demos', path: '/demos' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      } 
    }
  };

  const drawer = (
    <Box 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      sx={{
        width: 250,
        height: '100%',
        background: background,
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid',
        borderColor: borderColor,
        p: 2,
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={RouterLink}
            to={item.path}
            key={item.text}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              mb: 1,
              textDecoration: 'none',
              '&:hover': {
                background: 'transparent',
              },
              '&:active': {
                background: 'transparent',
              },
              '&:focus': {
                background: 'transparent',
              },
            }}
          >
            <ListItemText 
              primary={
                <Typography 
                  variant="body1"
                  sx={{
                    fontWeight: location.pathname === item.path ? 700 : 500,
                    background: location.pathname === item.path
                      ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                      : 'none',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: location.pathname === item.path 
                      ? 'transparent' 
                      : theme.palette.text.primary,
                    display: 'inline-block',
                    '&:hover': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    },
                    '&:active': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    },
                  }}
                >
                  {item.text}
                </Typography>
              }
              primaryTypographyProps={{
                component: 'div',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky"
        elevation={0}
        sx={{
          background: background,
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
          py: 1,
        }}
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: isMobile ? 1 : 0,
                textDecoration: 'none',
                fontWeight: 700,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              Nishanth Pallapu
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', ml: 'auto', alignItems: 'center' }}>
                <AnimatePresence>
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        component={RouterLink}
                        to={item.path}
                        sx={{
                          mx: 1,
                          background: location.pathname === item.path 
                            ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                            : 'none',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: location.pathname === item.path 
                            ? 'transparent' 
                            : theme.palette.text.primary,
                          '&:hover': {
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            bgcolor: 'transparent',
                          },
                          minWidth: 'auto',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 500,
                          fontSize: '0.9rem',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: location.pathname === item.path ? '80%' : '0%',
                            height: '2px',
                            backgroundColor: 'primary.main',
                            transition: 'width 0.3s ease',
                          },
                          '&:hover::after': {
                            width: '80%',
                          },
                        }}
                      >
                        {item.text}
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            border: 'none',
            background: 'transparent',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;