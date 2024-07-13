import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Button, Avatar } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { ClipLoader } from 'react-spinners';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import copy from 'clipboard-copy';
import { Card, CardContent, CardActions, Typography, Grow, Grid, } from '@mui/material';
import firebaseConfig from '../../Component/firebaseConfig';
import Nav_Bar from './Nav_Bar';
import { bangladeshLocations } from '../../Other/Constant/data_string';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




const Search_Donors = () => {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    BloodGroup: '',
    Location: [],
    DonorType: '',
  });



  const [isHovered, setIsHovered] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const searchUsers = async () => {
    try {
      setLoading(true);
      let q = query(collection(db, 'User_Info'));

      if (filters.BloodGroup) {
        q = query(q, where('BloodGroup', '==', filters.BloodGroup));
      }
      if (filters.Location.length > 0) {
        q = query(q, where('Location', 'in', filters.Location));
      }

      if (filters.DonorType) {
        if (filters.DonorType !== 'All') {
          q = query(q, where('DonorType', '==', filters.DonorType));
        } else {
          console.log("DonorType is 'All");
        }
      }

      const querySnapshot = await getDocs(q);

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      setItems(users);
      
    } catch (error) {
      console.error('Error searching for users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    searchUsers();
  }, []);

  return (
    <div className=''>

      <img src="../../Asset/img/as.png" alt="" />

      
      <Nav_Bar></Nav_Bar>
      <div className="relative w-full max-w-5xl mx-auto mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 px-4">
  <Autocomplete
    className="w-full sm:w-1/3"
    name="BloodGroup"
    options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Blood Group"
        variant="outlined"
        fullWidth
      />
    )}
    onChange={(event, value) => handleInputChange('BloodGroup', value)}
  />
  <Autocomplete
    className="w-full sm:w-1/3"
    name="Location"
    options={bangladeshLocations}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Location"
        variant="outlined"
        fullWidth
      />
    )}
    onChange={(event, value) => handleInputChange('Location', value)}
    multiple={true}
    filterOptions={(options, state) => {
      return options.filter((option) =>
        option.toLowerCase().includes(state.inputValue.toLowerCase())
      );
    }}
  />
  <Autocomplete
    className="w-full sm:w-1/3"
    name="DonorType"
    options={['All', 'Eligible']}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Donor Type"
        variant="outlined"
        fullWidth
      />
    )}
    onChange={(event, value) => handleInputChange('DonorType', value)}
  />

  <Button
    variant="contained"
    color="primary"
    onClick={searchUsers}
    className="w-full sm:w-auto"
    style={{ height: '50px', padding: '0 16px' }}
  >
    Search
  </Button>
</div>


      {isLoading && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <ClipLoader
            color={'#d73636'}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <div className=' mt-20 pl-10 pr-10'>
        <Grid container spacing={2} style={{ display: isLoading ? 'none' : 'flex' }}>
          {items.map((item, index) => (
            <Grow in={true} key={index} timeout={500}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  className={`relative w-full h-200 bg-cover bg-center card-image`}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  variant="outlined"
                  elevation={isHovered === index ? 8 : 2}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                    transform: isHovered === index ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <div
                    style={{
                      width: '300px',
                      height: '300px',
                      borderRadius: '50%',
                      border: '2px solid #fff',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.ProfileImage}
                      alt="Profile"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        borderRadius: '50%',
                      }}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <Typography
                      variant="h5"
                      color="primary"
                      style={{ textAlign: 'center', fontSize: '1.5rem' }}
                    >
                      {item.Name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ textAlign: 'center', fontSize: '1.2rem' }}
                    >
                      Gender: {item.Gender}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ textAlign: 'center', fontSize: '1.2rem' }}
                    >
                      Location: {item.Location}
                    </Typography>

                      {/* Phone NO Show */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ textAlign: 'center', fontSize: '1.2rem', cursor: 'pointer' }}
                      onClick={() => window.location.href = `tel:${item.Phone}`}
                    >
                      Phone: {item.Phone}
                    </Typography>

                    


                      




                    <Typography
                      variant="h6"
                      color="secondary"
                      style={{ textAlign: 'center', fontSize: '1.5rem', margin: '10px' }}
                    >
                      {item.BloodGroup}
                    </Typography>
                  </div>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Search_Donors;