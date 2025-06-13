import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';

const Projects = () => {
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

  const projects = [
    {
      title: 'Custom Spotify Client',
      description: 'A responsive web application that interfaces with the Spotify Web API to provide a custom music streaming experience. Features include playlist management, track search, and playback controls with a modern UI built using React and TypeScript.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Spotify API', 'OAuth'],
      githubLink: 'https://github.com/NishTheFish-dev/custom-spotify-client',
      liveDemo: '#',
      featured: true
    },
    {
      title: 'YouTube Music Client',
      description: 'A custom desktop client for YouTube Music with a focus on a clean listening experience. Built to provide seamless music playback with a native app feel using modern web technologies.',
      technologies: ['Electron', 'React', 'TypeScript', 'YouTube Music API', 'Desktop App'],
      githubLink: 'https://github.com/NishTheFish-dev/custom-ytmusic-client',
      liveDemo: '#',
      featured: true
    },
    {
      title: 'Python Bot Application',
      description: 'Created a Python bot which handles asynchronous requests from users and delivers appropriate content. Utilized the Discord API for request handling and Amazon AWS for asynchronous hosting.',
      technologies: ['Python', 'Discord API', 'AWS', 'Asynchronous Programming'],
      githubLink: '#',
      liveDemo: '#',
      featured: true
    },
    {
      title: 'Helpdesk System',
      description: 'Created a Helpdesk application using Java and JavaFX to create a functional and smooth graphical user experience. Used the MVC (Model, View, Controller) Architecture and followed Agile software development conventions.',
      technologies: ['Java', 'JavaFX', 'MVC Architecture', 'Agile'],
      githubLink: '#',
      liveDemo: '#',
      featured: true
    },
    {
      title: 'VR Bowling Game',
      description: 'Created a bowling game that allows users to play a realistic game of bowling using a VR headset. Utilized the Unity game engine and C# to allow for real-time user input and physics simulation.',
      technologies: ['Unity', 'C#', 'VR Development', 'Game Physics'],
      githubLink: '#',
      liveDemo: '#',
      featured: true
    },
    {
      title: 'Virtual Board Game Concept',
      description: 'Worked on a team designing a board game for elementary and middle school students to connect with over COVID. Developed a project timeline and design specification according to user needs. Received Grand Prize award and recognition letter from AZ Congressman David Schweikert.',
      technologies: ['Game Design', 'Project Management', 'User-Centered Design'],
      githubLink: '#',
      liveDemo: '#',
      featured: false
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeInUp}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <CodeIcon sx={{ mr: 2, color: 'primary.main', fontSize: '2rem' }} />
            <Typography 
              variant="h4" 
              component="h1"
              sx={{
                fontWeight: 600,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              My Projects
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph 
            align="center"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              mb: 6,
              lineHeight: 1.7,
            }}
          >
            Here are some of my recent works. Each project showcases different skills and technologies I've worked with.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 0,
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.background.paper, 0.8)
                      : alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                        }}
                      >
                        {project.title}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="text.secondary" 
                      paragraph
                      sx={{ mb: 2, minHeight: 60 }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {project.technologies.map((tech, i) => (
                          <Chip
                            key={i}
                            label={tech}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: 1,
                              fontSize: '0.7rem',
                              height: 24,
                              '& .MuiChip-label': {
                                px: 1,
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      startIcon={<GitHubIcon />}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      Code
                    </Button>
                    <Button
                      startIcon={<LaunchIcon fontSize="small" />}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      Live Demo
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Projects;