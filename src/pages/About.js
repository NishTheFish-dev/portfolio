import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  useTheme,
  alpha,
  Grid,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,

} from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/material';
import certificationsData from '../data/certificationsData';

const About = () => {
  const theme = useTheme();
  const cardBackground = alpha(theme.palette.background.paper, 0.8);
  const hoverBackground = alpha(theme.palette.primary.main, 0.1);
  const borderColor = alpha(theme.palette.divider, 0.3);
  
  const skills = [
    'Java',
    'Python',
    'C#',
    'JavaScript',
    'C++',
    'React.js',
    'Node.js',
    'HTML/CSS',
    'JavaFX',
    'Unity Engine',
    'Git/GitHub',
    'AWS',
    'Linux/Unix',
    'Network Security',
    'Cryptography',
    'Data Structures',
    'Algorithms',
    'Agile Development'
  ];


  const experiences = [
    {
      title: 'Undergraduate Teaching Assistant',
      company: 'Arizona State University - CSE365',
      period: 'Jan 2025 – May 2025',
      description: [
        'Assisted a class of ~900 students with coursework in Information Assurance.',
        'Taught topics including Network Security, Cryptography, Assembly, Penetration Testing, Reverse Engineering, and Binary Exploitation using the pwn.college platform with a capture-the-flag format.',
        'Achieved A+ in the class with 110% to qualify as a TA.',
      ],
      icon: <WorkIcon />,
      color: 'primary',
    },
    {
      title: 'Software Engineering Intern',
      company: 'Equity Methods, Scottsdale, AZ',
      period: 'Apr 2021 – Sep 2021',
      description: [
        'Worked on providing equity-based compensation solutions.',
        'Utilized Python with NumPy and Pandas to process large financial datasets and calculate amortization values.',
        'Improved financial reporting accuracy of the main reporting model from 87% to 90% during the internship period.',
      ],
      icon: <WorkIcon />,
      color: 'primary',
    },
  ];

  const education = [
    {
      title: 'Bachelor of Science in Computer Science',
      degree: 'B.S. Computer Science',
      school: 'Arizona State University, Tempe, AZ',
      period: 'Expected May 2026',
      description: [
        'Dean\'s List Awardee, 3.67 GPA',
        'Relevant Coursework: Data Structures and Algorithms, Information Assurance, Foundations of Machine Learning',
      ],
      icon: <SchoolIcon />,
      color: 'secondary',
    },
    {
      title: 'Associate of Science in Computer Science',
      degree: 'A.S. Computer Science',
      school: 'Paradise Valley Community College, Phoenix, AZ',
      period: 'Graduated May 2024',
      description: [
        '3.5 GPA',
      ],
      icon: <SchoolIcon />,
      color: 'secondary',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const ExperienceCard = ({ title, company, school, degree, period, description, icon, color }) => (
    <motion.div variants={fadeInUp}>
      <Card 
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 3,
          background: cardBackground,
          border: '1px solid',
          borderColor: borderColor,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box 
              sx={{
                width: 40,
                height: 40,
                minWidth: 40,
                minHeight: 40,
                borderRadius: '50%',
                bgcolor: `${color}.main`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                mr: 2,
                flexShrink: 0,
                '& svg': {
                  width: '1.25rem',
                  height: '1.25rem',
                },
                [theme.breakpoints.down('sm')]: {
                  width: 36,
                  height: 36,
                  minWidth: 36,
                  minHeight: 36,
                  '& svg': {
                    width: '1rem',
                    height: '1rem',
                  },
                },
              }}
            >
              {React.cloneElement(icon, {
                sx: {
                  width: '1.25rem',
                  height: '1.25rem',
                  [theme.breakpoints.down('sm')]: {
                    width: '1rem',
                    height: '1rem',
                  },
                }
              })}
            </Box>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                {degree || title}
              </Typography>
              <Typography variant="subtitle1" color={color}>
                {company || school}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontStyle: 'italic' }}>
            {period}
          </Typography>
          <Box component="ul" sx={{ pl: 2, mt: 1, mb: 0 }}>
            {Array.isArray(description) ? (
              description.map((item, index) => (
                <Typography 
                  key={index} 
                  component="li" 
                  variant="body1" 
                  sx={{ lineHeight: 1.7, mb: 0.5 }}
                >
                  {item}
                </Typography>
              ))
            ) : (
              <Typography 
                component="li" 
                variant="body1" 
                sx={{ lineHeight: 1.7 }}
              >
                {description}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const [selectedCert, setSelectedCert] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleCertClick = (cert) => {
    setSelectedCert(cert);
  };

  const handleClose = () => {
    setSelectedCert(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeInUp}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            About Me
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            align="center"
            sx={{
              maxWidth: '700px',
              mx: 'auto',
              mb: 6,
              lineHeight: 1.7,
            }}
          >
            Senior ASU Computer Science student with a keen eye for creating efficient,
            scalable, and user-friendly applications. I love turning complex problems
            into simple, beautiful, and intuitive solutions.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <motion.div variants={fadeInUp}>
              {/* Experience Section */}
              <Box sx={{ mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <WorkIcon 
                    sx={{ 
                      mr: 2, 
                      color: 'primary.main',
                      fontSize: '2rem',
                    }} 
                  />
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
                    Experience
                  </Typography>
                </Box>
                {experiences.map((item, index) => (
                  <ExperienceCard key={`exp-${index}`} {...item} />
                ))}
              </Box>

              {/* Education Section */}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SchoolIcon 
                    sx={{ 
                      mr: 2, 
                      color: 'secondary.main',
                      fontSize: '2rem',
                    }} 
                  />
                  <Typography 
                    variant="h4" 
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Education
                  </Typography>
                </Box>
                {education.map((item, index) => (
                  <ExperienceCard key={`edu-${index}`} {...item} />
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CodeIcon 
                  sx={{ 
                    mr: 2, 
                    color: 'primary.main',
                    fontSize: '2rem',
                  }} 
                />
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
                  Skills
                </Typography>
              </Box>
              <Paper 
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: theme.palette.mode === 'dark' 
                    ? alpha(theme.palette.background.paper, 0.8)
                    : alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.1)',
                  height: '100%',
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        color="primary"
                        variant="outlined"
                        sx={{
                          mb: 1,
                          cursor: 'default',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: 'white',
                          },
                          transition: 'all 0.2s',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
    
              </Paper>

              {/* Certifications Section */}
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 4 }}>
                  <CardGiftcardIcon 
                    sx={{ 
                      mr: 2, 
                      color: 'secondary.main',
                      fontSize: '2rem',
                    }} 
                  />
                  <Typography 
                    variant="h4" 
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Certifications
                  </Typography>
                </Box>
                <Box sx={{ width: '100%' }}>
                  {/* Sort certifications by date (newest first) */}
                  {[...certificationsData]
                    .sort((a, b) => {
                      // Convert issue dates to Date objects for comparison
                      const dateA = new Date(
                        a.issueDate.split(' ')[1], // Year
                        ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December']
                        .indexOf(a.issueDate.split(' ')[0]) // Month
                      );
                      const dateB = new Date(
                        b.issueDate.split(' ')[1], // Year
                        ['January', 'February', 'March', 'April', 'May', 'June',
                         'July', 'August', 'September', 'October', 'November', 'December']
                        .indexOf(b.issueDate.split(' ')[0]) // Month
                      );
                      return dateB - dateA; // Sort newest first
                    })
                    .map((cert) => (
                    <motion.div
                      key={cert.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCertClick(cert)}
                      style={{ marginBottom: '12px' }}
                    >
                      <Card 
                        elevation={0}
                        sx={{
                          borderRadius: 2,
                          background: theme.palette.mode === 'dark' 
                            ? alpha(theme.palette.background.paper, 0.8)
                            : alpha(theme.palette.background.paper, 0.9),
                          backdropFilter: 'blur(10px)',
                          border: '1px solid',
                          borderColor: theme.palette.mode === 'dark' 
                            ? 'rgba(255, 255, 255, 0.1)' 
                            : 'rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.2s ease-in-out',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: theme.shadows[2],
                          },
                        }}
                      >
                        <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box 
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                borderRadius: '50%',
                                overflow: 'hidden',
                                mr: 2,
                                flexShrink: 0
                              }}
                            >
                              <img 
                                src={cert.image} 
                                alt={cert.title}
                                style={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  objectFit: 'cover' 
                                }} 
                              />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography 
                                variant="subtitle2" 
                                fontWeight={600}
                                noWrap
                                sx={{ fontSize: '0.9rem' }}
                              >
                                {cert.title}
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ 
                                    fontSize: '0.75rem'
                                  }}
                                >
                                  <strong>Issuer:</strong> {cert.issuer}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ fontSize: '0.75rem' }}
                                >
                                  <strong>Issued:</strong> {cert.issueDate}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </Box>

                {/* Certification Dialog */}
                <Dialog 
                  open={!!selectedCert} 
                  onClose={handleClose}
                  fullWidth
                  maxWidth="sm"
                  fullScreen={isMobile}
                  PaperProps={{
                    sx: {
                      borderRadius: isMobile ? 0 : 2,
                      bgcolor: 'background.paper',
                      backgroundImage: 'none',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <DialogTitle sx={{ 
                    fontWeight: 600, 
                    borderBottom: '1px solid', 
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2
                  }}>
                    {selectedCert?.title || 'Certification Details'}
                    <IconButton 
                      onClick={handleClose}
                      size="small"
                      sx={{
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent sx={{ py: 3 }}>
                    {selectedCert?.image && (
                      <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
                        <img 
                          src={selectedCert.image} 
                          alt={selectedCert.title} 
                          style={{ 
                            width: '100%', 
                            height: 'auto',
                            display: 'block' 
                          }} 
                        />
                      </Box>
                    )}
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
                      {selectedCert?.description}
                    </Typography>

                    {selectedCert?.certificateLink && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<OpenInNewIcon />}
                        href={selectedCert.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mb: 2 }}
                      >
                        View Certificate
                      </Button>
                    )}
                    <Box sx={{ 
                      mt: 3, 
                      pt: 2, 
                      borderTop: '1px solid', 
                      borderColor: 'divider',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 1
                    }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Issuer:</strong> {selectedCert?.issuer}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Issued:</strong> {selectedCert?.issueDate}
                      </Typography>
                    </Box>
                  </DialogContent>
                </Dialog>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About; 