import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Favorite as FavoriteIcon,
  Security as SecurityIcon,
  Groups as GroupsIcon,
  LocalHospital as LocalHospitalIcon,
  VerifiedUser as VerifiedUserIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

const About_Us = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Director & Co-Founder",
      description: "Leading blood donation safety initiatives with 15+ years experience in hematology and transfusion medicine. Passionate about improving blood safety protocols.",
      avatar: "/api/placeholder/100/100",
      credentials: "MD, PhD in Hematology"
    },
    {
      name: "Michael Chen",
      role: "Technology Lead & Co-Founder",
      description: "Developing innovative solutions for blood donation management with expertise in healthcare technology and AI-driven matching algorithms.",
      avatar: "/api/placeholder/100/100",
      credentials: "MS Computer Science, Healthcare Tech Specialist"
    },
    {
      name: "Emily Rodriguez",
      role: "Community Outreach Director",
      description: "Building connections between donors and those in need. Expert in community engagement and public health awareness campaigns.",
      avatar: "/api/placeholder/100/100",
      credentials: "MPH Public Health, Community Engagement Specialist"
    },
    {
      name: "Dr. James Wilson",
      role: "Quality Assurance Manager",
      description: "Ensuring the highest standards of blood screening and storage protocols. 20+ years in laboratory medicine and blood banking.",
      avatar: "/api/placeholder/100/100",
      credentials: "MD, Board Certified in Pathology"
    },
    {
      name: "Lisa Kim",
      role: "Operations Manager",
      description: "Streamlining donation processes and coordinating with healthcare partners to ensure efficient blood distribution across the network.",
      avatar: "/api/placeholder/100/100",
      credentials: "MBA Healthcare Management"
    },
    {
      name: "David Brown",
      role: "Mobile App Developer",
      description: "Creating user-friendly mobile experiences that make blood donation convenient and accessible for donors and recipients alike.",
      avatar: "/api/placeholder/100/100",
      credentials: "BS Software Engineering, Mobile Specialist"
    }
  ];

  const values = [
    {
      icon: <FavoriteIcon className="text-red-600 text-4xl" />,
      title: "Compassion",
      description: "We believe in the power of human kindness and the willingness to help others in their time of need."
    },
    {
      icon: <SecurityIcon className="text-blue-600 text-4xl" />,
      title: "Safety First",
      description: "Rigorous screening processes and advanced technology ensure the highest safety standards for all blood donations."
    },
    {
      icon: <GroupsIcon className="text-green-600 text-4xl" />,
      title: "Community",
      description: "Building strong communities where donors and recipients are connected through shared purpose and mutual support."
    },
    {
      icon: <VerifiedUserIcon className="text-purple-600 text-4xl" />,
      title: "Transparency",
      description: "Open communication about our processes, impact, and how every donation makes a difference in someone's life."
    },
    {
      icon: <LocalHospitalIcon className="text-pink-600 text-4xl" />,
      title: "Medical Excellence",
      description: "Partnering with leading medical institutions to ensure clinical best practices in blood collection and distribution."
    },
    {
      icon: <TrendingUpIcon className="text-orange-600 text-4xl" />,
      title: "Innovation",
      description: "Continuously improving our technology and processes to make blood donation more efficient and accessible."
    }
  ];

  const achievements = [
    {
      year: "2020",
      title: "BloodLine Founded",
      description: "Started with a mission to modernize blood donation through technology"
    },
    {
      year: "2021",
      title: "First 1,000 Donors",
      description: "Reached our first milestone of registered active blood donors"
    },
    {
      year: "2022",
      title: "Hospital Partnerships",
      description: "Partnered with 25+ hospitals across the region for blood distribution"
    },
    {
      year: "2023",
      title: "Mobile App Launch",
      description: "Launched our award-winning mobile application for donors and recipients"
    },
    {
      year: "2024",
      title: "National Expansion",
      description: "Expanded operations to serve communities in 10+ states"
    },
    {
      year: "2025",
      title: "AI Integration",
      description: "Implemented AI-powered matching system for optimal donor-recipient pairing"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Container maxWidth="lg" className="py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Typography variant="h2" className="font-bold text-gray-800 dark:text-white mb-6">
            About BloodLine
          </Typography>
          <Typography variant="h5" className="text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Connecting life-savers with life-seekers through innovative technology, compassionate care,
            and a commitment to making blood donation accessible to everyone who needs it.
          </Typography>
          <Box className="flex justify-center space-x-4 mt-8">
            <Button variant="contained" color="primary" size="large" className="px-8 py-3">
              Join Our Mission
            </Button>
            <Button variant="outlined" color="primary" size="large" className="px-8 py-3">
              Learn More
            </Button>
          </Box>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card className="h-full shadow-xl border-l-4 border-l-red-600">
                <CardContent className="p-8">
                  <Typography variant="h4" className="font-bold text-red-600 mb-6">
                    Our Mission
                  </Typography>
                  <Typography variant="body1" className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    To bridge the gap between blood donors and recipients through innovative technology,
                    ensuring that no life is lost due to blood shortage. We believe every drop counts
                    and every donor is a hero.
                  </Typography>
                  <Typography variant="body1" className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our platform leverages cutting-edge technology including AI-powered matching,
                    real-time inventory tracking, and mobile accessibility to create the most
                    efficient blood donation network possible.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="h-full shadow-xl border-l-4 border-l-blue-600">
                <CardContent className="p-8">
                  <Typography variant="h4" className="font-bold text-blue-600 mb-6">
                    Our Vision
                  </Typography>
                  <Typography variant="body1" className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    A world where blood donation is accessible, efficient, and celebrated. Where
                    technology empowers communities to save lives and where every person in need
                    has access to safe blood when they need it most.
                  </Typography>
                  <Typography variant="body1" className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We envision a future where blood shortages are eliminated through predictive
                    analytics, community engagement, and seamless donor-recipient connections
                    powered by advanced technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <Typography variant="h3" className="font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Impact in Numbers
          </Typography>
          <Grid container spacing={4} className="text-center">
            <Grid item xs={12} sm={4}>
              <Box className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Typography variant="h2" className="font-bold text-red-600 mb-3">
                  15,247
                </Typography>
                <Typography variant="h6" className="text-gray-700 dark:text-gray-300 mb-2">
                  Lives Saved
                </Typography>
                <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                  Through successful blood donations
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Typography variant="h2" className="font-bold text-blue-600 mb-3">
                  8,934
                </Typography>
                <Typography variant="h6" className="text-gray-700 dark:text-gray-300 mb-2">
                  Active Donors
                </Typography>
                <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                  Registered and verified donors
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Typography variant="h2" className="font-bold text-green-600 mb-3">
                  127
                </Typography>
                <Typography variant="h6" className="text-gray-700 dark:text-gray-300 mb-2">
                  Partner Hospitals
                </Typography>
                <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                  Across 10+ states
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <Typography variant="h3" className="font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8 text-center">
                      <Box className="mb-4">
                        {value.icon}
                      </Box>
                      <Typography variant="h5" className="font-bold text-gray-800 dark:text-white mb-4">
                        {value.title}
                      </Typography>
                      <Typography variant="body1" className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <Typography variant="h3" className="font-bold text-center text-gray-800 dark:text-white mb-12">
            Our Journey
          </Typography>
          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6">
                      <Box className="flex items-start space-x-4">
                        <Box className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                          {achievement.year.slice(-2)}
                        </Box>
                        <Box className="flex-1">
                          <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-2">
                            {achievement.title}
                          </Typography>
                          <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-16"
        >
          <Typography variant="h3" className="font-bold text-center text-gray-800 dark:text-white mb-4">
            Meet Our Team
          </Typography>
          <Typography variant="h6" className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Our dedicated team of healthcare professionals, technologists, and community advocates
            working together to make blood donation accessible and efficient.
          </Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <CardContent className="p-8">
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        className="w-24 h-24 mx-auto mb-4 border-4 border-red-100"
                      />
                      <Typography variant="h5" className="font-bold text-gray-800 dark:text-white mb-2">
                        {member.name}
                      </Typography>
                      <Typography variant="h6" className="text-red-600 mb-2">
                        {member.role}
                      </Typography>
                      <Typography variant="body2" className="text-blue-600 mb-3 font-semibold">
                        {member.credentials}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center bg-gradient-to-r from-red-600 to-pink-600 rounded-xl p-12 text-white"
        >
          <Typography variant="h3" className="font-bold mb-4">
            Ready to Save Lives?
          </Typography>
          <Typography variant="h6" className="mb-8 opacity-90">
            Join thousands of heroes who are making a difference in their communities.
            Every donation counts, every donor matters.
          </Typography>
          <Box className="flex justify-center space-x-4">
            <Button
              variant="contained"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 font-bold"
              size="large"
            >
              Become a Donor
            </Button>
            <Button
              variant="outlined"
              className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3"
              size="large"
            >
              Find Blood
            </Button>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
};

export default About_Us;