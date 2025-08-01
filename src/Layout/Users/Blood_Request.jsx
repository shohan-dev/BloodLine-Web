import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { collection, doc, getFirestore, setDoc, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../Component/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { Outlet } from 'react-router-dom';
import { bangladeshLocations } from '../../Other/Constant/data_string';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];


const updateFirestoreData = async (formData) => {
  try {

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Firestore collection and subcollection fetch data
    const mainCollectionRef = collection(db, 'show data');
    const mainDocRef = doc(mainCollectionRef, formData.Email);
    const subcollectionRef = collection(mainDocRef, 'Blood Request');
    const subDocRef = doc(subcollectionRef);

    await setDoc(subDocRef, {
      Name: formData.Name,
      Email: formData.Email,
      Phone: formData.Phone,
      BloodGroup: formData.BloodGroup,
      Location: formData.Location,
      Gender: formData.Gender,
      timestamp: serverTimestamp(),
      status: 'active',
      responses: []
    });

    console.log('Firestore data updated successfully');

    window.location.href = "/";
  } catch (e) {
    console.error('Error updating Firestore data:', e);
  }
};


const Blood_Request = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    BloodGroup: '',
    Location: '',
    dateOfBirth: null,
    Gender: 'Male',
  });

  const handleChange = (event, newValue, field) => {
    setFormData({
      ...formData,
      [field]: newValue,
    });
  };

  const handleGenderChange = (event) => {
    setFormData({
      ...formData,
      Gender: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await updateFirestoreData(formData);
    } catch (e) {
      setError('Error updating Firestore data: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=' flex'>



        <div className='flex flex-col items-center mt-40 pl-28'><img src="https://i.ibb.co/GTSXSNK/download.png" alt="1" /></div>

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

        <Container maxWidth="xs" style={{ marginRight: '13%', display: isLoading ? 'none' : 'block' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="center" marginTop={25}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={(e) => handleChange(e, e.target.value, 'Name')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="Email"
                  type="email"
                  value={formData.Email}
                  onChange={(e) => handleChange(e, e.target.value, 'Email')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="Phone"
                  type="tel"
                  value={formData.Phone}
                  onChange={(e) => {
                    const newValue = e.target.value.slice(0, 11);
                    handleChange(e, newValue, 'Phone');
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={bloodGroups}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth label="Blood Group" name="BloodGroup" />
                  )}
                  value={formData.BloodGroup}
                  onChange={(_, newValue) => handleChange(_, newValue, 'BloodGroup')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={bangladeshLocations}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth label="Location" name="Location" />
                  )}
                  value={formData.Location}
                  onChange={(_, newValue) => handleChange(_, newValue, 'Location')}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  aria-label="Gender"
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleGenderChange}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: 'primary',
                    color: 'white',
                    fontSize: '15px',
                    padding: '15px 30px'
                  }}
                >
                  Request
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>


      <Outlet />
    </div>
  );
};

export default Blood_Request;