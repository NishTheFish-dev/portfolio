import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';

import projectsData from '../data/projectsData';

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Project not found
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button component={RouterLink} to="/projects" startIcon={<ArrowBackIcon />}
            sx={{ textTransform: 'none' }}>
            Back to Projects
          </Button>
        </Box>
      </Container>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }} component={motion.div} initial="hidden" animate="visible" variants={fadeInUp}>
      <Button component={RouterLink} to="/projects" startIcon={<ArrowBackIcon />} sx={{ mb: 3, textTransform: 'none' }}>
        Back to Projects
      </Button>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 3 }}>
        {project.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
        {project.description}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
        {project.technologies.map((tech) => (
          <Chip key={tech} label={tech} variant="outlined" onClick={(e) => e.stopPropagation()} />
        ))}
      </Box>

      {project.images && project.images.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {project.images.map((src, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <Box
                component="img"
                src={src}
                alt={`Screenshot ${idx + 1} for ${project.title}`}
                sx={{ width: '100%', borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {project.githubLink && (
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textTransform: 'none' }}
        >
          View Code on GitHub
        </Button>
      )}
      {project.longDescription && (
        <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line', mt: 3 }}>
          {project.longDescription}
        </Typography>
      )}

      {project.features && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Features
          </Typography>
          <Box component="ul" sx={{ pl: 3, m: 0 }}>
            {project.features.map((feat, idx) => (
              <Typography component="li" variant="body1" color="text.secondary" key={idx} sx={{ mb: 1 }}>
                {feat}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ProjectDetails;
