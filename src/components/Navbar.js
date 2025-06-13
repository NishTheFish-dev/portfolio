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
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects' },
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
        background: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.9)
          : alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid',
        borderColor: theme.palette.divider,
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
              '&.Mui-selected': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: 'white',
                '&:hover': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                }
              },
            }}
            selected={location.pathname === item.path}
          >
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: 500,
                variant: 'body1',
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
          background: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(theme.palette.background.paper, 0.9),
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
              <Box sx={{ display: 'flex', ml: 'auto' }}>
                <AnimatePresence>
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.text}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        component={RouterLink}
                        to={item.path}
                        sx={{
                          mx: 1,
                          color: location.pathname === item.path 
                            ? theme.palette.primary.main 
                            : 'text.primary',
                          fontWeight: location.pathname === item.path ? 600 : 400,
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: location.pathname === item.path ? '100%' : '0%',
                            height: '2px',
                            bottom: 0,
                            left: 0,
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            transition: 'width 0.3s ease-in-out',
                          },
                          '&:hover::after': {
                            width: '100%',
                          },
                          '&:hover': {
                            background: 'transparent',
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