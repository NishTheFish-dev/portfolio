import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Box, Typography, IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function CollaborativeWhiteboardDemo() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowFallback(!loaded);
    }, 1600);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      maxWidth="lg"
      sx={{ py: { xs: 4, md: 8 } }}
   >
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => navigate('/demos')} size="large" aria-label="Back to demos">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Collaborative Whiteboard
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="outlined"
          size="small"
          href="https://collaborativewhiteboard-bice.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in new tab
        </Button>
      </Box>

      <Box
        sx={{
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          bgcolor: 'background.paper',
          aspectRatio: '16 / 9',
          // Fallback for older browsers
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <iframe
            src="https://collaborativewhiteboard-bice.vercel.app/"
            title="Collaborative Whiteboard"
            style={{ border: 0, width: '100%', height: '100%' }}
            allow="fullscreen"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: showFallback ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 2,
            bgcolor: 'background.default',
            px: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Embedding blocked by site security settings
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            Your browser is preventing this page from loading inside an iframe. You can open it in a new tab instead.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="https://collaborativewhiteboard-bice.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Whiteboard in new tab
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CollaborativeWhiteboardDemo;
