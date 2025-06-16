import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import ColorModeContext from './contexts/ColorModeContext';
import { Box, Typography } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Demos from './pages/Demos';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';
import Contact from './pages/Contact';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 2,
        px: 2,
        mt: 'auto',
        textAlign: 'center',
        color: 'text.secondary',
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
        fontSize: '0.8rem',
      }}
    >
      <Typography variant="caption">
        © {new Date().getFullYear()} Nishanth Pallapu. All rights reserved.
      </Typography>
    </Box>
  );
};

// Theme is now created dynamically inside the App component

function App() {
  const [mode, setMode] = React.useState('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#90caf9' },
          secondary: { main: '#f48fb1' },
          background: {
            default: mode === 'dark' ? '#121212' : '#ffffff',
            paper: mode === 'dark' ? '#1e1e1e' : '#f9f9f9',
          },
        },
        typography: { fontFamily: 'Roboto, sans-serif' },
      }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <style>{`
          html, body { transition: background-color 0.5s ease, color 0.5s ease; }
          .MuiPaper-root, .MuiAppBar-root { transition: background-color 0.5s ease; }
        `}</style>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/demos/*" element={<Demos />} />
                        </Routes>
          </Box>
          <Footer />
          <Analytics />
        </Box>
      </Router>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;