import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { showSuccess, showError, showUrgentAlert } from '../../utils/notifications';
import { getCurrentLocation } from '../../utils/geolocation';
import { bangladeshLocations } from '../../Other/Constant/data_string';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Validation schema
const bloodRequestSchema = yup.object({
    patientName: yup.string().required('Patient name is required').min(2, 'Name must be at least 2 characters'),
    contactName: yup.string().required('Contact person name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    bloodGroup: yup.string().required('Blood group is required'),
    unitsNeeded: yup.number().required('Units needed is required').min(1, 'At least 1 unit required').max(10, 'Maximum 10 units allowed'),
    hospital: yup.string().required('Hospital name is required'),
    location: yup.string().required('Location is required'),
    urgencyLevel: yup.string().required('Urgency level is required'),
    medicalCondition: yup.string().required('Medical condition is required'),
    requiredByDate: yup.date().required('Required by date is required').min(new Date(), 'Date must be in the future'),
});

const EnhancedBloodRequest = () => {
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [isLocationLoading, setIsLocationLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [requestDetails, setRequestDetails] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
    } = useForm({
        resolver: yupResolver(bloodRequestSchema),
        defaultValues: {
            urgencyLevel: 'normal',
            unitsNeeded: 1,
            requiredByDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 1 week from now
        }
    });

    const watchUrgency = watch('urgencyLevel');

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = async () => {
        setIsLocationLoading(true);
        try {
            const location = await getCurrentLocation();
            setUserLocation(location);
            showSuccess('Location detected successfully');
        } catch (error) {
            console.error('Error getting location:', error);
            showError('Could not detect location. Please select manually.');
        } finally {
            setIsLocationLoading(false);
        }
    };

    const onSubmit = async (data) => {
        if (!phone) {
            showError('Phone number is required');
            return;
        }

        setIsSubmitting(true);

        try {
            const requestData = {
                ...data,
                phone,
                location: userLocation ? {
                    name: data.location,
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude
                } : { name: data.location },
                timestamp: new Date().toISOString(),
                status: 'active',
                id: Date.now().toString()
            };

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            setRequestDetails(requestData);
            setShowSuccessModal(true);

            // Show urgent alert if emergency
            if (data.urgencyLevel === 'emergency') {
                showUrgentAlert(
                    `EMERGENCY: ${data.bloodGroup} blood needed for ${data.patientName} at ${data.hospital}`,
                    () => {
                        // Handle urgent response
                        console.log('Emergency response initiated');
                    }
                );
            } else {
                showSuccess('Blood request submitted successfully!');
            }

            // Reset form
            reset();
            setPhone('');

        } catch (error) {
            showError('Failed to submit request. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'emergency':
                return 'text-red-600 bg-red-50 border-red-200';
            case 'urgent':
                return 'text-orange-600 bg-orange-50 border-orange-200';
            default:
                return 'text-blue-600 bg-blue-50 border-blue-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        🩸 Blood Request Form
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Submit your blood requirement details and connect with potential donors
                    </p>
                </motion.div>

                <Card className="max-w-2xl mx-auto" padding="lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Patient Information Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                👤 Patient Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Patient Name"
                                    placeholder="Enter patient's full name"
                                    {...register('patientName')}
                                    error={errors.patientName?.message}
                                    required
                                />
                                <Input
                                    label="Contact Person"
                                    placeholder="Your name (if different)"
                                    {...register('contactName')}
                                    error={errors.contactName?.message}
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                📞 Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="contact@example.com"
                                    {...register('email')}
                                    error={errors.email?.message}
                                    required
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <PhoneInput
                                        country={'bd'}
                                        value={phone}
                                        onChange={setPhone}
                                        inputStyle={{
                                            width: '100%',
                                            height: '42px',
                                            borderRadius: '8px',
                                            border: '1px solid #d1d5db',
                                        }}
                                        containerStyle={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Blood Requirements */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                🩸 Blood Requirements
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Blood Group <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('bloodGroup')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="">Select Blood Group</option>
                                        {bloodGroups.map(group => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
                                    {errors.bloodGroup && (
                                        <p className="text-sm text-red-600 mt-1">{errors.bloodGroup.message}</p>
                                    )}
                                </div>

                                <Input
                                    label="Units Needed"
                                    type="number"
                                    min="1"
                                    max="10"
                                    {...register('unitsNeeded')}
                                    error={errors.unitsNeeded?.message}
                                    required
                                />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Urgency Level <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('urgencyLevel')}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${getUrgencyColor(watchUrgency)}`}
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="urgent">Urgent (24-48 hours)</option>
                                        <option value="emergency">Emergency (Immediate)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Location & Hospital */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                🏥 Location Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Hospital/Clinic Name"
                                    placeholder="Enter hospital name"
                                    {...register('hospital')}
                                    error={errors.hospital?.message}
                                    required
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        <select
                                            {...register('location')}
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="">Select Location</option>
                                            {bangladeshLocations.map(location => (
                                                <option key={location} value={location}>{location}</option>
                                            ))}
                                        </select>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={getUserLocation}
                                            disabled={isLocationLoading}
                                            size="sm"
                                        >
                                            {isLocationLoading ? <LoadingSpinner size="sm" /> : '📍'}
                                        </Button>
                                    </div>
                                    {errors.location && (
                                        <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Medical Information */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                ⚕️ Medical Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Medical Condition"
                                    placeholder="Brief description of condition"
                                    {...register('medicalCondition')}
                                    error={errors.medicalCondition?.message}
                                    required
                                />
                                <Input
                                    label="Required By Date"
                                    type="date"
                                    {...register('requiredByDate')}
                                    error={errors.requiredByDate?.message}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                variant={watchUrgency === 'emergency' ? 'error' : 'primary'}
                            >
                                {isSubmitting ? 'Submitting Request...' : 'Submit Blood Request'}
                            </Button>
                        </motion.div>

                        {/* Emergency Notice */}
                        {watchUrgency === 'emergency' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-50 border border-red-200 rounded-lg p-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">🚨</span>
                                    <div>
                                        <h3 className="font-semibold text-red-800">Emergency Request</h3>
                                        <p className="text-sm text-red-600">
                                            Your request will be marked as emergency and will be prioritized for immediate response.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </form>
                </Card>

                {/* Success Modal */}
                <Modal
                    isOpen={showSuccessModal}
                    onClose={() => setShowSuccessModal(false)}
                    title="Request Submitted Successfully!"
                    size="md"
                >
                    <div className="text-center py-4">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Your blood request has been submitted
                        </h3>
                        <p className="text-gray-600 mb-4">
                            We've notified potential donors in your area. You should receive responses soon.
                        </p>
                        {requestDetails && (
                            <div className="bg-gray-50 rounded-lg p-4 text-left text-sm">
                                <p><strong>Request ID:</strong> {requestDetails.id}</p>
                                <p><strong>Blood Group:</strong> {requestDetails.bloodGroup}</p>
                                <p><strong>Urgency:</strong> {requestDetails.urgencyLevel}</p>
                                <p><strong>Location:</strong> {requestDetails.location.name}</p>
                            </div>
                        )}
                        <div className="flex space-x-2 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setShowSuccessModal(false)}
                                className="flex-1"
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    // Navigate to tracking page
                                }}
                                className="flex-1"
                            >
                                Track Request
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default EnhancedBloodRequest;
