import React from 'react';
import { Container, Typography, List, ListItemButton, ListItemText, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Routes, Route, Link } from 'react-router-dom';
import SpyChartDemo from '../demos/SpyChartDemo';

const demoItems = [
  { label: '$SPY Candlestick Chart', path: 'spy-chart', element: <SpyChartDemo /> },
];


const DemoList = () => {
  const theme = useTheme();
  return (
  <Container component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
    <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
      Interactive Demos
    </Typography>
      <Typography align="center" variant="subtitle1" sx={{ mb: 4 }}>
        Here are some demos I've made in React.js. Click on a demo to view it!
      </Typography>
    <List>
      {demoItems.map((d, idx) => (
        <motion.div key={d.path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
          <ListItemButton component={Link} to={d.path} sx={{
          borderRadius: 2,
          mb: 2,
          px: 3,
          py: 2,
          bgcolor: 'background.paper',
          boxShadow: 3,
          '&:hover': { boxShadow: 6, bgcolor: 'action.hover' },
        }}>
          <ListItemText primary={d.label} />
          </ListItemButton>
        </motion.div>
      ))}
    </List>
  </Container>
  );
};

const Demos = () => (
  <Box sx={{ width: '100%' }}>
    <Routes>
      <Route index element={<DemoList />} />
      {demoItems.map((d, idx) => (
        <Route key={d.path} path={d.path} element={d.element} />
      ))}
    </Routes>
  </Box>
);

export default Demos;
