import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Card,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';

const Home = () => {
  const theme = useTheme();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      } 
    },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skills = [
    {
      title: 'Full-Stack Development',
      description: 'Building responsive applications with Java, Python, C#, and JavaScript/React',
      icon: <CodeIcon fontSize="large" />,
      color: 'primary',
    },
    {
      title: 'Software Engineering',
      description: 'Designing robust applications with strong knowledge of data structures and algorithms',
      icon: <StorageIcon fontSize="large" />,
      color: 'secondary',
    },
    {
      title: 'Game Development',
      description: 'Creating immersive experiences with Unity Engine, C#, and VR technologies',
      icon: <CloudIcon fontSize="large" />,
      color: 'info',
    },
    {
      title: 'Information Security',
      description: 'Experience in network security, cryptography, and penetration testing',
      icon: <BuildIcon fontSize="large" />,
      color: 'warning',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Hero Section */}
        <Box
          sx={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 8,
          }}
        >
          <motion.div variants={fadeInUp}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{
                fontWeight: 700,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Hi, I'm Nishanth Pallapu
            </Typography>
            <Typography 
              variant="h4" 
              color="text.secondary" 
              paragraph
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              Computer Science Junior at ASU with experience in Python, Java, and C# development. Passionate about software engineering, game development, and information security.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/projects"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  }}
                >
                  View Projects
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/contact"
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                    }
                  }}
                >
                  Contact Me
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>

        {/* Skills Section */}
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              <CodeIcon sx={{ mr: 2, color: 'primary.main', fontSize: '2rem' }} />
              <Typography 
                variant="h4" 
                component="h2"
                sx={{
                  fontWeight: 600,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                What I Do
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', px: { xs: 2, sm: 4 } }}>
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', maxWidth: '600px', marginBottom: '2rem' }}
                >
                  <Card 
                    elevation={0}
                    sx={{
                      width: '100%',
                      minHeight: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                      borderRadius: 3,
                      background: theme.palette.mode === 'dark' 
                        ? alpha(theme.palette.background.paper, 0.8)
                        : alpha(theme.palette.background.paper, 0.9),
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Box 
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: `${skill.color}.main`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mb: 2,
                      }}
                    >
                      {skill.icon}
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1, wordBreak: 'break-word' }}>
                      {skill.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                      {skill.description}
                    </Typography>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Home;