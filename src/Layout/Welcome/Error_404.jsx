import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';

const Error_404 = () => {
  const navigate = useNavigate();

  const goback = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex items-center justify-center">
      <Container maxWidth="md" className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box className="mb-8">
            <Typography
              variant="h1"
              className="text-9xl font-bold text-red-600 mb-4"
              style={{ fontSize: '8rem' }}
            >
              404
            </Typography>
            <Typography variant="h4" className="text-gray-800 font-semibold mb-4">
              Oops! Page Not Found
            </Typography>
            <Typography variant="h6" className="text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </Typography>
          </Box>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={goback}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg shadow-lg"
              style={{
                background: 'linear-gradient(45deg, #dc2626 30%, #ef4444 90%)',
                boxShadow: '0 4px 20px rgba(220, 38, 38, 0.3)',
              }}
            >
              Go Back Home
            </Button>
          </motion.div>

          <Box className="mt-16">
            <Typography variant="body1" className="text-gray-500">
              Lost? No worries! Let's get you back to helping save lives.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </div>
  );
};
export default Error_404;