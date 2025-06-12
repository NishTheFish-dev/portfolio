import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const About = () => {
  const skills = [
    'JavaScript/TypeScript',
    'React.js',
    'Node.js',
    'Python',
    'SQL/NoSQL',
    'Git',
    'Docker',
    'AWS',
  ];

  const experiences = [
    {
      title: 'Senior Developer',
      company: 'Tech Company',
      period: '2020 - Present',
      description: 'Led development of multiple full-stack applications.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2018 - 2020',
      description: 'Developed and maintained web applications using React and Node.js.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University Name',
      period: '2014 - 2018',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Me
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph align="center">
          Full Stack Developer with a passion for creating efficient and scalable applications
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Skills Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2">
                  Skills
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {skills.map((skill) => (
                  <Grid item xs={6} key={skill}>
                    <Typography variant="body1">• {skill}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Experience Section */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2">
                  Experience
                </Typography>
              </Box>
              <List>
                {experiences.map((exp, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          {exp.title} at {exp.company}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {exp.period}
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            {exp.description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Education Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2">
                  Education
                </Typography>
              </Box>
              <List>
                {education.map((edu, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Typography variant="h6">{edu.degree}</Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {edu.school}
                          </Typography>
                          <br />
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {edu.period}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About; 