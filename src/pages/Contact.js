import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Contact = () => {
  const theme = useTheme();
  const darkBackground = alpha(theme.palette.background.paper, 0.5);
  const borderColor = alpha(theme.palette.divider, 0.5);
  const hoverBackground = alpha(theme.palette.primary.main, 0.1);
  
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

  

  const socialLinks = [
    {
      icon: <GitHubIcon />,
      url: 'https://github.com/NishTheFish-dev',
      label: 'GitHub',
      color: 'text.primary',
    },
    {
      icon: <LinkedInIcon />,
      url: 'https://www.linkedin.com/in/nishanth-pallapu',
      label: 'LinkedIn',
      color: '#0A66C2',
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeInUp}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <ContactMailIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography 
              variant="h4" 
              component="h1"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4,
              }}
            >
              Contact Information
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Grid container spacing={4} justifyContent="center">
            {/* Contact Info - Full Width */}
            <Grid item xs={12} md={10} lg={8}>
              <Paper 
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  borderRadius: 3,
                  background: darkBackground,
                  borderColor: borderColor,
                }}
              >

                {/* Social Links */}
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600 }}>
                    Connect With Me!
                  </Typography>
                  {/* Email card inside section (smaller) */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <motion.div 
                      variants={fadeInUp}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box 
                        component="a"
                        href="mailto:contact@nishpallapu.com"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          px: 3,
                          py: 2,
                          borderRadius: 2,
                          textDecoration: 'none',
                          color: 'text.primary',
                          bgcolor: darkBackground,
                          border: '1px solid',
                          borderColor: borderColor,
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: theme.shadows[3],
                            bgcolor: hoverBackground,
                          },
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            bgcolor: hoverBackground,
                            color: 'primary.main',
                            mb: 1,
                            '& .MuiSvgIcon-root': {
                              fontSize: '1.5rem',
                            },
                          }}
                        >
                          {React.cloneElement(<EmailIcon />, { fontSize: 'small' })}
                        </Box>
                        <Typography variant="subtitle1" component="h3" sx={{ mb: 0.5, fontWeight: 600 }}>
                          Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          contact@nishpallapu.com
                        </Typography>
                      </Box>
                    </motion.div>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          component="a"
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={React.cloneElement(social.icon, { 
                            sx: { 
                              color: social.color || 'primary.main',
                            } 
                          })}
                          sx={{
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            bgcolor: darkBackground,
                            border: '1px solid',
                            borderColor: borderColor,
                            '&:hover': {
                              bgcolor: hoverBackground,
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                            },
                          }}
                        >
                          {social.label}
                        </Button>
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default Contact;