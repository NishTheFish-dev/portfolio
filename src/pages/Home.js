import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="lg">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to My Portfolio
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Full Stack Developer | Problem Solver | Tech Enthusiast
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/projects"
              sx={{ mr: 2 }}
            >
              View Projects
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={RouterLink}
              to="/contact"
            >
              Contact Me
            </Button>
          </Box>
        </motion.div>
      </Box>

      {/* Featured Skills Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom align="center">
          Featured Skills
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {['Frontend Development', 'Backend Development', 'Database Management', 'DevOps'].map((skill) => (
            <Grid item xs={12} sm={6} md={3} key={skill}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {skill}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Click to learn more about my {skill.toLowerCase()} experience
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 