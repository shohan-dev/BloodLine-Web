import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import Nav_Bar from './Nav_Bar';

const Home = () => {
  const donateNow = () => {
    alert("Thank you for your willingness to donate blood. Your contribution can save lives!");
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <Nav_Bar />

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" style={{ padding: '16px', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" className="text-4xl font-bold">Welcome to our<br />Blood Donation</Typography>
            <Typography variant="body1" className="text-xl mt-4 mb-20">
              Help save lives by donating blood. <br />Your contribution can make a difference.
            </Typography>
            <Button variant="contained" color="primary" onClick={donateNow} className="bg-red-600 hover:bg-red-700 mt-6 px-8 py-3 rounded-full text-xl">
              Donate Now
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="https://www.shutterstock.com/image-vector/blood-bag-donated-cute-cartoon-600nw-2293990295.jpg" alt="Blood Donation" style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
        </Grid>

        <Grid container spacing={4} className="mt-8">
          <Grid item xs={12} md={6}>
            <div className="p-8 bg-white rounded-md shadow-lg">
              <Typography variant="h4">Donor Testimonials</Typography>
              <blockquote className="italic mt-4">
                "Donating blood through this organization was a great experience. I felt safe and the staff was friendly and professional."
              </blockquote>
              <Typography variant="body2" className="text-gray-500 mt-2 text-sm">- Mahadi, Donor</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className="p-8 bg-white rounded-md shadow-lg">
              <Typography variant="h4">Our Impact</Typography>
              <Typography variant="h3" className="mt-4 font-semibold">5,000</Typography>
              <Typography variant="body2" className="text-gray-500">Lives saved last year</Typography>
            </div>
          </Grid>
        </Grid>

        <div className="bg-red-600 h-1 mx-auto max-w-xl my-12"></div>

        <section className="max-w-3xl mx-auto p-8 bg-white rounded-md shadow-lg">
          <Typography variant="h5" className="font-semibold mb-6">Frequently Asked Questions</Typography>
          <div className="border-b border-gray-200 pb-4 mb-4">
            <Typography variant="h6" className="font-semibold mb-2">Who can donate blood?</Typography>
            <Typography variant="body2" className="text-gray-700">Most people over age 16 and in good health can donate blood...</Typography>
          </div>
        </section>
      </Container>

      <footer className="#c03c38 p-4 text-center text-white shadow-2xl">
        <Typography variant="body2">&copy; 2023 Blood Donation</Typography>
      </footer>
    </div>
  );
};

export default Home;
