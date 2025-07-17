import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Alert,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
} from '@mui/material';
import {
    MedicalServices as EmergencyIcon,
    LocalHospital as HospitalIcon,
    Phone as PhoneIcon,
    Timer as TimerIcon,
    CheckCircle as CheckIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EmergencyGuidelines = () => {
    const navigate = useNavigate();

    const emergencySteps = [
        {
            icon: <PhoneIcon className="text-red-500" />,
            title: "Call Emergency Services",
            description: "In life-threatening situations, call 911 or local emergency number first",
            priority: "CRITICAL"
        },
        {
            icon: <HospitalIcon className="text-blue-500" />,
            title: "Contact Nearest Hospital",
            description: "Inform the hospital about the blood requirement and patient condition",
            priority: "HIGH"
        },
        {
            icon: <EmergencyIcon className="text-orange-500" />,
            title: "Submit Emergency Request",
            description: "Use our emergency request form to notify nearby donors immediately",
            priority: "HIGH"
        },
        {
            icon: <TimerIcon className="text-green-500" />,
            title: "Monitor Response",
            description: "Track donor responses and coordinate with medical staff",
            priority: "MEDIUM"
        }
    ];

    const eligibilityCriteria = [
        "Patient must be in immediate need of blood transfusion",
        "Medical emergency verified by healthcare professional",
        "Standard blood donation procedures will be followed",
        "Donor screening and testing protocols maintained",
        "Emergency does not override safety requirements"
    ];

    const responseTimeframes = [
        { urgency: "Critical", time: "Within 1 hour", color: "error" },
        { urgency: "Urgent", time: "Within 4 hours", color: "warning" },
        { urgency: "Moderate", time: "Within 12 hours", color: "info" },
        { urgency: "Routine", time: "Within 24 hours", color: "success" }
    ];

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
                        Emergency Blood Request Guidelines
                    </Typography>
                    <Typography variant="h6" className="text-gray-600 dark:text-gray-300">
                        Important information for emergency blood requests
                    </Typography>
                </Box>

                {/* Critical Warning */}
                <Alert severity="error" className="mb-6">
                    <Typography variant="h6" className="font-bold mb-2">
                        ⚠️ For Life-Threatening Emergencies
                    </Typography>
                    <Typography>
                        If this is a life-threatening emergency, call <strong>911</strong> or your local emergency number immediately.
                        Our emergency request system is designed to supplement, not replace, emergency medical services.
                    </Typography>
                </Alert>

                <Grid container spacing={4}>
                    {/* Emergency Steps */}
                    <Grid item xs={12} lg={8}>
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <Typography variant="h5" className="font-bold mb-4 flex items-center">
                                    <EmergencyIcon className="mr-2 text-red-500" />
                                    Emergency Response Steps
                                </Typography>

                                {emergencySteps.map((step, index) => (
                                    <Box key={index} className="mb-4">
                                        <Box className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <Box className="flex-shrink-0">
                                                {step.icon}
                                            </Box>
                                            <Box className="flex-1">
                                                <Box className="flex items-center space-x-2 mb-2">
                                                    <Typography variant="h6" className="font-semibold">
                                                        {index + 1}. {step.title}
                                                    </Typography>
                                                    <Box
                                                        className={`px-2 py-1 rounded text-xs font-bold ${step.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                                                                step.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                                                                    'bg-yellow-100 text-yellow-700'
                                                            }`}
                                                    >
                                                        {step.priority}
                                                    </Box>
                                                </Box>
                                                <Typography variant="body2" color="textSecondary">
                                                    {step.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Response Timeframes */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <Typography variant="h5" className="font-bold mb-4 flex items-center">
                                    <TimerIcon className="mr-2 text-blue-500" />
                                    Expected Response Timeframes
                                </Typography>

                                <Grid container spacing={3}>
                                    {responseTimeframes.map((timeframe, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Box className="p-4 border rounded-lg">
                                                <Typography variant="h6" className="font-semibold mb-1">
                                                    {timeframe.urgency}
                                                </Typography>
                                                <Typography variant="body1" color="primary" className="font-medium">
                                                    {timeframe.time}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} lg={4}>
                        {/* Quick Actions */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <Typography variant="h6" className="font-bold mb-4">
                                    Quick Actions
                                </Typography>

                                <Box className="space-y-3">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        onClick={() => navigate('/emergency-request')}
                                        startIcon={<EmergencyIcon />}
                                        className="font-bold"
                                    >
                                        Submit Emergency Request
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => navigate('/blood-request')}
                                        className="font-medium"
                                    >
                                        Regular Blood Request
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => navigate('/search-donors')}
                                        className="font-medium"
                                    >
                                        Find Donors
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Emergency Contacts */}
                        <Card className="mb-6">
                            <CardContent className="p-6">
                                <Typography variant="h6" className="font-bold mb-4 flex items-center">
                                    <PhoneIcon className="mr-2 text-green-500" />
                                    Emergency Contacts
                                </Typography>

                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <EmergencyIcon className="text-red-500" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Emergency Services"
                                            secondary="911"
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon>
                                            <HospitalIcon className="text-blue-500" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Blood Bank Hotline"
                                            secondary="1-800-BLOOD-01"
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemIcon>
                                            <InfoIcon className="text-gray-500" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="BloodLine Support"
                                            secondary="1-800-BLOODLINE"
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>

                        {/* Eligibility */}
                        <Card>
                            <CardContent className="p-6">
                                <Typography variant="h6" className="font-bold mb-4 flex items-center">
                                    <CheckIcon className="mr-2 text-green-500" />
                                    Eligibility Criteria
                                </Typography>

                                <List dense>
                                    {eligibilityCriteria.map((criteria, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <CheckIcon className="text-green-500 text-sm" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={criteria}
                                                primaryTypographyProps={{ variant: 'body2' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Bottom Call to Action */}
                <Box className="text-center mt-8 p-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl text-white">
                    <Typography variant="h4" className="font-bold mb-4">
                        Ready to Submit an Emergency Request?
                    </Typography>
                    <Typography variant="h6" className="mb-6 opacity-90">
                        Every second counts in an emergency. Submit your request now and we'll notify compatible donors immediately.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/emergency-request')}
                        className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 font-bold"
                        startIcon={<EmergencyIcon />}
                    >
                        Submit Emergency Request Now
                    </Button>
                </Box>
            </motion.div>
        </Container>
    );
};

export default EmergencyGuidelines;
