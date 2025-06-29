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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
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

  const contactInfo = [
    {
      icon: <LocationOnIcon fontSize="large" color="primary" />,
      title: 'Location',
      text: 'Tempe, AZ',
    },
    {
      icon: <EmailIcon fontSize="large" color="primary" />,
      title: 'Email',
      text: 'contact@nishpallapu.com',
      url: 'mailto:contact@nishpallapu.com',
    },
    {
      icon: <PhoneIcon fontSize="large" color="primary" />,
      title: 'Phone',
      text: '(602) 703-6949',
      url: 'tel:16027036949',
    },
  ];

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
                <Box textAlign="center" mb={6}>
                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
                    Feel free to reach out through any of these channels!
                  </Typography>
                </Box>
                
                <Grid container spacing={4} justifyContent="center">
                  {contactInfo.map((item, index) => (
                    <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <motion.div 
                        variants={fadeInUp}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Box 
                          component="a"
                          href={item.url || '#'}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            p: 3,
                            height: '100%',
                            borderRadius: 3,
                            textDecoration: 'none',
                            color: 'text.primary',
                            bgcolor: darkBackground,
                            border: '1px solid',
                            borderColor: borderColor,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: theme.shadows[4],
                              bgcolor: hoverBackground,
                            },
                          }}
                        >
                          <Box 
                            sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 70,
                              height: 70,
                              borderRadius: '50%',
                              bgcolor: hoverBackground,
                              color: 'primary.main',
                              mb: 2,
                              '& .MuiSvgIcon-root': {
                                fontSize: '2rem',
                                transition: 'transform 0.3s ease-in-out',
                              },
                              '&:hover .MuiSvgIcon-root': {
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            {React.cloneElement(item.icon, { fontSize: 'large' })}
                          </Box>
                          <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {item.text}
                          </Typography>
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>

                {/* Social Links */}
                <Box sx={{ mt: 6, textAlign: 'center' }}>
                  <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 600 }}>
                    Connect With Me
                  </Typography>
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