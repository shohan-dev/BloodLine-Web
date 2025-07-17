import React, { useState, useEffect } from 'react';
import {
    Card,
    Typography,
    Grid,
    Button,
    Chip,
    Box,
    Container,
    TextField,
    Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Avatar,
    Divider,
    Alert,
    Snackbar,
    Badge,
} from '@mui/material';
import {
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    AccessTime as TimeIcon,
    LocalHospital as MedicalIcon,
    FilterList as FilterIcon,
    Refresh as RefreshIcon,
    Close as CloseIcon,
    Bloodtype as BloodIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    query,
    doc,
    updateDoc,
    arrayUnion,
    Timestamp,
    setDoc,
    serverTimestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ClipLoader } from 'react-spinners';
import firebaseConfig from '../../Component/firebaseConfig';
import { bangladeshLocations } from '../../Other/Constant/data_string';
import { useTheme } from '../../context/ThemeContext';
import ModernNavbar from '../../components/navigation/ModernNavbar';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const ViewBloodRequests = () => {
    const [bloodRequests, setBloodRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        BloodGroup: '',
        Location: '',
        urgency: ''
    });
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [responseDialog, setResponseDialog] = useState(false);
    const [donorResponse, setDonorResponse] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const { isDark } = useTheme();

    // Create test blood request for testing purposes
    const createTestBloodRequest = async () => {
        try {
            const testEmail = 'test@example.com';
            const mainCollectionRef = collection(db, 'show data');
            const mainDocRef = doc(mainCollectionRef, testEmail);
            const subcollectionRef = collection(mainDocRef, 'Blood Request');
            const subDocRef = doc(subcollectionRef);

            await setDoc(subDocRef, {
                Name: 'Test Patient',
                Email: testEmail,
                Phone: '01712345678',
                BloodGroup: 'O+',
                Location: 'Dhaka',
                Gender: 'Male',
                timestamp: serverTimestamp(),
                status: 'active',
                responses: []
            });

            setSnackbar({
                open: true,
                message: 'Test blood request created successfully!',
                severity: 'success'
            });

            // Refresh the data
            fetchBloodRequests();
        } catch (error) {
            console.error('Error creating test request:', error);
            setSnackbar({
                open: true,
                message: 'Error creating test request: ' + error.message,
                severity: 'error'
            });
        }
    };

    // Fetch all blood requests from Firebase
    const fetchBloodRequests = async () => {
        try {
            setLoading(true);
            console.log('Starting to fetch blood requests...');
            const requests = [];

            // First, try to get all users who have blood requests
            const usersQuery = query(collection(db, 'show data'));
            const usersSnapshot = await getDocs(usersQuery);

            console.log('Found users:', usersSnapshot.size);

            // For each user, get their blood requests
            for (const userDoc of usersSnapshot.docs) {
                try {
                    const bloodRequestsRef = collection(userDoc.ref, 'Blood Request');
                    const bloodRequestsSnapshot = await getDocs(bloodRequestsRef);

                    console.log(`User ${userDoc.id} has ${bloodRequestsSnapshot.size} blood requests`);

                    bloodRequestsSnapshot.forEach((requestDoc) => {
                        const data = requestDoc.data();
                        console.log('Blood request data:', data);
                        requests.push({
                            id: requestDoc.id,
                            userEmail: userDoc.id,
                            ...data,
                            timestamp: data.timestamp || new Date(),
                            responses: data.responses || [],
                            status: data.status || 'active'
                        });
                    });
                } catch (subError) {
                    console.log(`No blood requests for user: ${userDoc.id}`, subError);
                }
            }

            // Sort by timestamp (newest first)
            requests.sort((a, b) => {
                const timestampA = a.timestamp?.toDate ? a.timestamp.toDate() : new Date(a.timestamp);
                const timestampB = b.timestamp?.toDate ? b.timestamp.toDate() : new Date(b.timestamp);
                return timestampB - timestampA;
            });

            console.log('Total fetched blood requests:', requests.length);
            console.log('Blood requests array:', requests);
            setBloodRequests(requests);
            setFilteredRequests(requests);
        } catch (error) {
            console.error('Error fetching blood requests:', error);
            setSnackbar({
                open: true,
                message: 'Error loading blood requests. Please try again.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    // Apply filters to requests
    useEffect(() => {
        let filtered = bloodRequests;

        if (filters.BloodGroup) {
            filtered = filtered.filter(request => request.BloodGroup === filters.BloodGroup);
        }

        if (filters.Location) {
            filtered = filtered.filter(request =>
                request.Location?.toLowerCase().includes(filters.Location.toLowerCase())
            );
        }

        if (filters.urgency === 'recent') {
            const oneDayAgo = new Date();
            oneDayAgo.setDate(oneDayAgo.getDate() - 1);
            filtered = filtered.filter(request => {
                const requestDate = request.timestamp?.toDate ? request.timestamp.toDate() : new Date(request.timestamp);
                return requestDate >= oneDayAgo;
            });
        }

        setFilteredRequests(filtered);
    }, [filters, bloodRequests]);

    // Handle donor response
    const handleDonorResponse = async () => {
        if (!donorResponse.trim() || !selectedRequest) return;

        try {
            const user = auth.currentUser;
            if (!user) {
                setSnackbar({
                    open: true,
                    message: 'Please login to respond to blood requests.',
                    severity: 'warning'
                });
                return;
            }

            // Update the blood request with donor response
            const requestRef = doc(db, 'show data', selectedRequest.Email, 'Blood Request', selectedRequest.id);

            const response = {
                donorEmail: user.email,
                donorName: user.displayName || user.email,
                message: donorResponse,
                timestamp: Timestamp.now(),
                phone: user.phoneNumber || 'Not provided'
            };

            await updateDoc(requestRef, {
                responses: arrayUnion(response)
            });

            setSnackbar({
                open: true,
                message: 'Your response has been sent successfully!',
                severity: 'success'
            });

            setResponseDialog(false);
            setDonorResponse('');
            setSelectedRequest(null);

            // Refresh data
            fetchBloodRequests();
        } catch (error) {
            console.error('Error sending response:', error);
            setSnackbar({
                open: true,
                message: 'Error sending response. Please try again.',
                severity: 'error'
            });
        }
    };

    // Calculate time ago
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const requestTime = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
        const diffInHours = Math.floor((now - requestTime) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    // Get urgency color
    const getUrgencyColor = (timestamp) => {
        const now = new Date();
        const requestTime = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp);
        const diffInHours = Math.floor((now - requestTime) / (1000 * 60 * 60));

        if (diffInHours < 6) return 'error';
        if (diffInHours < 24) return 'warning';
        return 'default';
    };

    useEffect(() => {
        fetchBloodRequests();
    }, []);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor={isDark ? 'grey.900' : 'grey.50'}
            >
                <ClipLoader color="#dc2626" size={60} />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: isDark ? 'grey.900' : 'grey.50' }}>
            {/* <ModernNavbar /> */}

            <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
                {/* Header */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: isDark ? 'white' : 'text.primary',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2
                        }}
                    >
                        <BloodIcon sx={{ fontSize: '3rem', color: 'error.main' }} />
                        Blood Requests
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Help save lives by responding to blood donation requests
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                        <Button
                            variant="outlined"
                            startIcon={<RefreshIcon />}
                            onClick={fetchBloodRequests}
                            disabled={loading}
                        >
                            Refresh
                        </Button>
                        <Chip
                            label={`${filteredRequests.length} Active Requests`}
                            color="error"
                            variant="outlined"
                        />
                    </Box>
                </Box>

                {/* Filters */}
                <Card sx={{ p: 3, mb: 4, bgcolor: isDark ? 'grey.800' : 'white' }}>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterIcon />
                        Filter Requests
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                options={bloodGroups}
                                value={filters.BloodGroup}
                                onChange={(_, value) => setFilters(prev => ({ ...prev, BloodGroup: value || '' }))}
                                renderInput={(params) => (
                                    <TextField {...params} label="Blood Group" variant="outlined" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                options={bangladeshLocations}
                                value={filters.Location}
                                onChange={(_, value) => setFilters(prev => ({ ...prev, Location: value || '' }))}
                                renderInput={(params) => (
                                    <TextField {...params} label="Location" variant="outlined" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                options={[
                                    { label: 'All Requests', value: '' },
                                    { label: 'Recent (24h)', value: 'recent' }
                                ]}
                                value={filters.urgency === 'recent' ? { label: 'Recent (24h)', value: 'recent' } : { label: 'All Requests', value: '' }}
                                onChange={(_, value) => setFilters(prev => ({ ...prev, urgency: value?.value || '' }))}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField {...params} label="Urgency" variant="outlined" />
                                )}
                            />
                        </Grid>
                    </Grid>
                </Card>

                {/* Blood Requests Grid */}
                {filteredRequests.length === 0 ? (
                    <Card sx={{ p: 6, textAlign: 'center', bgcolor: isDark ? 'grey.800' : 'white' }}>
                        <MedicalIcon sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            No Blood Requests Found
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {bloodRequests.length === 0
                                ? "There are currently no active blood requests in the database."
                                : "Try adjusting your filters to see more requests."}
                        </Typography>

                        {/* Debug Information */}
                        <Box sx={{ mt: 3, p: 2, bgcolor: isDark ? 'grey.700' : 'grey.100', borderRadius: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Debug Info: Found {bloodRequests.length} total requests
                            </Typography>
                            {bloodRequests.length === 0 && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    To test this page, create a blood request using the "Request Blood" page first.
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={() => window.location.href = '/blood-request'}
                            >
                                Create a Blood Request
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={createTestBloodRequest}
                            >
                                Create Test Request
                            </Button>
                        </Box>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {filteredRequests.map((request, index) => (
                                <Grid item xs={12} md={6} lg={4} key={request.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                bgcolor: isDark ? 'grey.800' : 'white',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: 6
                                                },
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {/* Urgency Badge */}
                                            <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                                                <Chip
                                                    label={getTimeAgo(request.timestamp)}
                                                    color={getUrgencyColor(request.timestamp)}
                                                    size="small"
                                                    icon={<TimeIcon />}
                                                />
                                            </Box>

                                            <Box sx={{ p: 3, flexGrow: 1 }}>
                                                {/* Patient Info */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                                                        <PersonIcon />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="h6" component="h3">
                                                            {request.Name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {request.Gender}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Divider sx={{ my: 2 }} />

                                                {/* Blood Group - Prominent */}
                                                <Box sx={{ textAlign: 'center', mb: 2 }}>
                                                    <Typography
                                                        variant="h3"
                                                        component="div"
                                                        sx={{
                                                            color: 'error.main',
                                                            fontWeight: 'bold',
                                                            lineHeight: 1
                                                        }}
                                                    >
                                                        {request.BloodGroup}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Blood Type Needed
                                                    </Typography>
                                                </Box>

                                                <Divider sx={{ my: 2 }} />

                                                {/* Contact & Location */}
                                                <Box sx={{ mb: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                        <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                                        <Typography variant="body2">{request.Location}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                                        <Typography variant="body2">{request.Phone}</Typography>
                                                    </Box>
                                                </Box>

                                                {/* Response Count */}
                                                {request.responses && request.responses.length > 0 && (
                                                    <Box sx={{ mb: 2 }}>
                                                        <Badge badgeContent={request.responses.length} color="success">
                                                            <Chip
                                                                label="Responses received"
                                                                variant="outlined"
                                                                size="small"
                                                            />
                                                        </Badge>
                                                    </Box>
                                                )}
                                            </Box>

                                            {/* Action Buttons */}
                                            <Box sx={{ p: 2, pt: 0 }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            fullWidth
                                                            variant="outlined"
                                                            startIcon={<PhoneIcon />}
                                                            onClick={() => window.open(`tel:${request.Phone}`)}
                                                            size="small"
                                                        >
                                                            Call
                                                        </Button>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Button
                                                            fullWidth
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => {
                                                                setSelectedRequest(request);
                                                                setResponseDialog(true);
                                                            }}
                                                            size="small"
                                                        >
                                                            Respond
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                )}

                {/* Response Dialog */}
                <Dialog
                    open={responseDialog}
                    onClose={() => setResponseDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">Respond to Blood Request</Typography>
                            <IconButton onClick={() => setResponseDialog(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>

                    <DialogContent>
                        {selectedRequest && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    <strong>Patient:</strong> {selectedRequest.Name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Blood Type:</strong> {selectedRequest.BloodGroup}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Location:</strong> {selectedRequest.Location}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Contact:</strong> {selectedRequest.Phone}
                                </Typography>
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Your message to the patient"
                            placeholder="I'm available to donate blood. When and where should I come?"
                            value={donorResponse}
                            onChange={(e) => setDonorResponse(e.target.value)}
                            variant="outlined"
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setResponseDialog(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDonorResponse}
                            variant="contained"
                            color="error"
                            disabled={!donorResponse.trim()}
                        >
                            Send Response
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for notifications */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                >
                    <Alert
                        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default ViewBloodRequests;
