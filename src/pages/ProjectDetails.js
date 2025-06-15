import React, { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  Modal,
  Fade,
  Backdrop,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

import projectsData from '../data/projectsData';

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

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
      {project.images && project.images.length > 0 && (
        <Box sx={{ mt: 6, mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
            Project Screenshots
          </Typography>
          <Grid container spacing={3}>
            {project.images.map((img, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box
                  component="img"
                  src={img.src}
                  alt={img.alt}
                  onClick={() => handleImageClick(img)}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'scale(1.01)',
                      transition: 'all 0.2s ease-in-out',
                    },
                  }}
                />
                {img.caption && (
                  <Typography variant="caption" color="text.secondary" display="block" align="center" mt={1}>
                    {img.caption}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Image Modal */}
      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Fade in={!!selectedImage}>
          <Box sx={{
            position: 'relative',
            outline: 'none',
            maxWidth: '90vw',
            maxHeight: '90vh',
          }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                zIndex: 1,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={selectedImage?.src}
              alt={selectedImage?.alt || 'Enlarged view'}
              sx={{
                maxWidth: '100%',
                maxHeight: '90vh',
                borderRadius: 1,
                boxShadow: 24,
                display: 'block',
              }}
            />
            {selectedImage?.caption && (
              <Typography 
                variant="subtitle1" 
                color="white" 
                align="center" 
                sx={{
                  mt: 1,
                  textShadow: '0 0 8px rgba(0,0,0,0.8)',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  p: 1,
                  borderRadius: 1,
                }}
              >
                {selectedImage.caption}
              </Typography>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default ProjectDetails;
