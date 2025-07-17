import React from 'react';
import { Container, Paper, Typography, Box, Switch, FormControlLabel } from '@mui/material';
import { useTheme } from '../../../context/ThemeContext';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const ThemeDemo = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <Container maxWidth="md">
                <Paper className="p-8 mb-8">
                    <Box className="text-center mb-8">
                        <Typography variant="h3" className="font-bold text-gray-900 dark:text-white mb-4">
                            Dark/Light Mode Demo
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isDark}
                                    onChange={toggleTheme}
                                    color="primary"
                                />
                            }
                            label={`${isDark ? 'Dark' : 'Light'} Mode`}
                            className="text-gray-700 dark:text-gray-300"
                        />
                    </Box>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6">
                            <Typography variant="h5" className="font-semibold text-gray-900 dark:text-white mb-4">
                                Blood Donation Stats
                            </Typography>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Total Donors</span>
                                    <span className="font-semibold text-red-600">1,247</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Blood Donated</span>
                                    <span className="font-semibold text-red-600">3,891 units</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Lives Saved</span>
                                    <span className="font-semibold text-red-600">15,673</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <Typography variant="h5" className="font-semibold text-gray-900 dark:text-white mb-4">
                                Quick Actions
                            </Typography>
                            <div className="space-y-3">
                                <Button fullWidth>Request Blood</Button>
                                <Button variant="outline" fullWidth>Find Donors</Button>
                                <Button variant="ghost" fullWidth>View History</Button>
                            </div>
                        </Card>
                    </div>

                    <Box className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <Typography variant="h6" className="font-semibold text-red-800 dark:text-red-200 mb-2">
                            🩸 Emergency Alert
                        </Typography>
                        <Typography className="text-red-700 dark:text-red-300">
                            Blood type O- urgently needed at Dhaka Medical College Hospital.
                            Donors within 5km radius, please respond immediately.
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default ThemeDemo;
