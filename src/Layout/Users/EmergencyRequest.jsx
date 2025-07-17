import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Box,
    Alert,
    AlertTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stepper,
    Step,
    StepLabel,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider
} from '@mui/material';
import {
    LocalHospital as HospitalIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Person as PersonIcon,
    Bloodtype as BloodIcon,
    MedicalServices as EmergencyIcon,
    Check as CheckIcon,
    Send as SendIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const EmergencyRequest = () => {
    const { userProfile } = useAuth();
    const [activeStep, setActiveStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [nearbyDonors, setNearbyDonors] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const [formData, setFormData] = useState({
        patientName: '',
        bloodType: '',
        urgencyLevel: 'critical',
        unitsNeeded: 1,
        hospitalName: '',
        hospitalAddress: '',
        contactPerson: '',
        contactPhone: '',
        medicalCondition: '',
        additionalNotes: '',
        requiredBy: '',
        location: {
            latitude: null,
            longitude: null,
            address: ''
        }
    });

    const urgencyLevels = [
        { value: 'critical', label: 'Critical (Within 1 hour)', color: '#ef4444', priority: 1 },
        { value: 'urgent', label: 'Urgent (Within 4 hours)', color: '#f97316', priority: 2 },
        { value: 'moderate', label: 'Moderate (Within 12 hours)', color: '#eab308', priority: 3 },
        { value: 'routine', label: 'Routine (Within 24 hours)', color: '#22c55e', priority: 4 }
    ];

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const steps = [
        'Patient Information',
        'Medical Details',
        'Location & Contact',
        'Review & Submit'
    ];

    // Mock nearby donors data
    const mockDonors = [
        {
            id: 1,
            name: 'John Doe',
            bloodType: 'O+',
            distance: '0.5 km',
            lastDonation: '3 months ago',
            verified: true,
            rating: 4.9,
            phone: '+1-234-567-8901'
        },
        {
            id: 2,
            name: 'Sarah Smith',
            bloodType: 'O+',
            distance: '1.2 km',
            lastDonation: '2 months ago',
            verified: true,
            rating: 4.8,
            phone: '+1-234-567-8902'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            bloodType: 'A+',
            distance: '2.1 km',
            lastDonation: '4 months ago',
            verified: true,
            rating: 4.7,
            phone: '+1-234-567-8903'
        }
    ];

    useEffect(() => {
        // Get user location for emergency request
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        location: {
                            ...prev.location,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                    toast.error('Unable to get your location. Please enter manually.');
                }
            );
        }

        // Pre-fill with user data if available
        if (userProfile) {
            setFormData(prev => ({
                ...prev,
                contactPerson: userProfile.name || '',
                contactPhone: userProfile.phone || ''
            }));
        }
    }, [userProfile]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const searchNearbyDonors = async () => {
        setIsSearching(true);
        // Simulate API call
        setTimeout(() => {
            const compatibleDonors = mockDonors.filter(donor =>
                donor.bloodType === formData.bloodType ||
                donor.bloodType === 'O-' ||
                (formData.bloodType.includes('+') && donor.bloodType === 'O+')
            );
            setNearbyDonors(compatibleDonors);
            setIsSearching(false);
        }, 2000);
    };

    const handleNext = () => {
        if (activeStep === 1 && formData.bloodType) {
            searchNearbyDonors();
        }
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 3000));

            toast.success('Emergency request submitted successfully!');
            setShowConfirmDialog(true);

            // Send notifications to nearby donors
            nearbyDonors.forEach(donor => {
                console.log(`Notifying ${donor.name} about emergency request`);
            });

        } catch (error) {
            toast.error('Failed to submit emergency request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getUrgencyColor = (level) => {
        return urgencyLevels.find(u => u.value === level)?.color || '#ef4444';
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Alert severity="error" className="mb-4">
                                <AlertTitle>Emergency Blood Request</AlertTitle>
                                This is for urgent blood requirements. For non-emergency requests, please use the regular blood request form.
                            </Alert>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Patient Name"
                                value={formData.patientName}
                                onChange={(e) => handleInputChange('patientName', e.target.value)}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Blood Type</InputLabel>
                                <Select
                                    value={formData.bloodType}
                                    onChange={(e) => handleInputChange('bloodType', e.target.value)}
                                    label="Blood Type"
                                >
                                    {bloodTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            <Box className="flex items-center space-x-2">
                                                <BloodIcon className="text-red-500" />
                                                <span>{type}</span>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Urgency Level</InputLabel>
                                <Select
                                    value={formData.urgencyLevel}
                                    onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
                                    label="Urgency Level"
                                >
                                    {urgencyLevels.map((level) => (
                                        <MenuItem key={level.value} value={level.value}>
                                            <Box className="flex items-center space-x-2">
                                                <Box
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: level.color }}
                                                />
                                                <span>{level.label}</span>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Units Needed"
                                type="number"
                                value={formData.unitsNeeded}
                                onChange={(e) => handleInputChange('unitsNeeded', parseInt(e.target.value))}
                                required
                                inputProps={{ min: 1, max: 10 }}
                            />
                        </Grid>
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Medical Condition/Reason"
                                value={formData.medicalCondition}
                                onChange={(e) => handleInputChange('medicalCondition', e.target.value)}
                                multiline
                                rows={3}
                                required
                                helperText="Please describe the medical condition requiring blood transfusion"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Required By (Date & Time)"
                                type="datetime-local"
                                value={formData.requiredBy}
                                onChange={(e) => handleInputChange('requiredBy', e.target.value)}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Additional Notes"
                                value={formData.additionalNotes}
                                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                                multiline
                                rows={2}
                                helperText="Any special requirements or additional information"
                            />
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Hospital/Medical Facility Name"
                                value={formData.hospitalName}
                                onChange={(e) => handleInputChange('hospitalName', e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: <HospitalIcon className="mr-2 text-gray-500" />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Hospital Address"
                                value={formData.hospitalAddress}
                                onChange={(e) => handleInputChange('hospitalAddress', e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: <LocationIcon className="mr-2 text-gray-500" />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Contact Person"
                                value={formData.contactPerson}
                                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: <PersonIcon className="mr-2 text-gray-500" />
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Contact Phone"
                                value={formData.contactPhone}
                                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                                required
                                InputProps={{
                                    startAdornment: <PhoneIcon className="mr-2 text-gray-500" />
                                }}
                            />
                        </Grid>
                    </Grid>
                );

            case 3:
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500">
                                <CardContent>
                                    <Typography variant="h6" className="flex items-center mb-4">
                                        <EmergencyIcon className="mr-2 text-red-500" />
                                        Emergency Request Summary
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="body2" color="textSecondary">Patient</Typography>
                                            <Typography variant="body1" className="font-semibold">{formData.patientName}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="body2" color="textSecondary">Blood Type</Typography>
                                            <Typography variant="body1" className="font-semibold">{formData.bloodType}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="body2" color="textSecondary">Urgency</Typography>
                                            <Chip
                                                label={urgencyLevels.find(u => u.value === formData.urgencyLevel)?.label}
                                                style={{ backgroundColor: getUrgencyColor(formData.urgencyLevel), color: 'white' }}
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="body2" color="textSecondary">Units Needed</Typography>
                                            <Typography variant="body1" className="font-semibold">{formData.unitsNeeded}</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" color="textSecondary">Hospital</Typography>
                                            <Typography variant="body1" className="font-semibold">{formData.hospitalName}</Typography>
                                            <Typography variant="body2">{formData.hospitalAddress}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Nearby Donors */}
                        {nearbyDonors.length > 0 && (
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" className="mb-4">
                                            Nearby Compatible Donors ({nearbyDonors.length})
                                        </Typography>
                                        {isSearching ? (
                                            <Box className="text-center py-4">
                                                <LinearProgress className="mb-4" />
                                                <Typography>Searching for nearby donors...</Typography>
                                            </Box>
                                        ) : (
                                            <List>
                                                {nearbyDonors.map((donor, index) => (
                                                    <React.Fragment key={donor.id}>
                                                        <ListItem className="px-0">
                                                            <ListItemAvatar>
                                                                <Avatar className="bg-red-500">
                                                                    {donor.name.charAt(0)}
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                    <Box className="flex items-center space-x-2">
                                                                        <Typography className="font-semibold">{donor.name}</Typography>
                                                                        {donor.verified && (
                                                                            <CheckIcon className="text-green-500 text-sm" />
                                                                        )}
                                                                    </Box>
                                                                }
                                                                secondary={
                                                                    <Box>
                                                                        <Typography variant="body2">
                                                                            {donor.bloodType} • {donor.distance} • Last donation: {donor.lastDonation}
                                                                        </Typography>
                                                                        <Typography variant="body2" color="primary">
                                                                            {donor.phone}
                                                                        </Typography>
                                                                    </Box>
                                                                }
                                                            />
                                                        </ListItem>
                                                        {index < nearbyDonors.length - 1 && <Divider />}
                                                    </React.Fragment>
                                                ))}
                                            </List>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                );

            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" className="py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Header */}
                <Box className="text-center mb-8">
                    <Box className="flex justify-center mb-4">
                        <Box className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                            <EmergencyIcon className="text-red-500 text-4xl" />
                        </Box>
                    </Box>
                    <Typography variant="h3" className="font-bold text-gray-800 dark:text-white mb-2">
                        Emergency Blood Request
                    </Typography>
                    <Typography variant="h6" className="text-gray-600 dark:text-gray-300">
                        Submit an urgent blood request and notify nearby donors immediately
                    </Typography>
                </Box>

                {/* Stepper */}
                <Card className="mb-6">
                    <CardContent className="py-8">
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </CardContent>
                </Card>

                {/* Form Content */}
                <Card>
                    <CardContent className="p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderStepContent(activeStep)}
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <Box className="flex justify-between mt-8">
                            <Button
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                variant="outlined"
                                className="px-6"
                            >
                                Back
                            </Button>

                            <Box className="space-x-4">
                                {activeStep === steps.length - 1 ? (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        className="px-8"
                                        startIcon={isSubmitting ? <RefreshIcon className="animate-spin" /> : <SendIcon />}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Emergency Request'}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNext}
                                        variant="contained"
                                        className="px-6"
                                    >
                                        Next
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Confirmation Dialog */}
                <Dialog
                    open={showConfirmDialog}
                    onClose={() => setShowConfirmDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle className="text-center">
                        <Box className="flex flex-col items-center">
                            <CheckIcon className="text-green-500 text-5xl mb-2" />
                            <Typography variant="h5" className="font-bold">
                                Request Submitted Successfully!
                            </Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <Typography className="text-center mb-4">
                            Your emergency blood request has been submitted and nearby donors have been notified.
                        </Typography>
                        <Alert severity="info">
                            <AlertTitle>What happens next?</AlertTitle>
                            <ul className="mt-2 ml-4">
                                <li>Nearby compatible donors will receive immediate notifications</li>
                                <li>Hospital blood banks in your area will be alerted</li>
                                <li>You'll receive updates as donors respond</li>
                                <li>Emergency coordinators will contact you within 15 minutes</li>
                            </ul>
                        </Alert>
                    </DialogContent>
                    <DialogActions className="justify-center pb-6">
                        <Button
                            onClick={() => setShowConfirmDialog(false)}
                            variant="contained"
                            className="px-8"
                        >
                            Understood
                        </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>
        </Container>
    );
};

export default EmergencyRequest;
