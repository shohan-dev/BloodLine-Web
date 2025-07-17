import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { getCurrentLocation, findNearbyDonors } from '../../utils/geolocation';
import { showError, showSuccess } from '../../utils/notifications';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const AdvancedDonorSearch = ({
    onResults = () => { },
    onLocationUpdate = () => { },
    initialFilters = {}
}) => {
    const [filters, setFilters] = useState({
        bloodGroup: '',
        location: '',
        radius: 10,
        availability: 'all',
        urgency: 'normal',
        gender: 'all',
        ageRange: 'all',
        lastDonation: 'all',
        ...initialFilters
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch] = useDebounce(searchQuery, 300);
    const [userLocation, setUserLocation] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [donors, setDonors] = useState([]);
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        if (debouncedSearch || Object.values(filters).some(v => v && v !== 'all')) {
            performSearch();
        }
    }, [debouncedSearch, filters, userLocation]);

    const getUserLocation = async () => {
        try {
            const location = await getCurrentLocation();
            setUserLocation(location);
            onLocationUpdate(location);
            showSuccess('Location detected successfully');
        } catch (error) {
            console.error('Error getting location:', error);
            showError('Could not detect your location. Please enter it manually.');
        }
    };

    const performSearch = async () => {
        setIsSearching(true);
        try {
            // Simulate API call - replace with actual API
            await new Promise(resolve => setTimeout(resolve, 500));

            // Mock donors data - replace with actual API call
            const mockDonors = [
                {
                    id: 1,
                    name: 'John Doe',
                    bloodGroup: 'O+',
                    phone: '+8801234567890',
                    location: { latitude: 23.8103, longitude: 90.4125 },
                    locationName: 'Dhaka Medical College',
                    available: true,
                    gender: 'male',
                    age: 28,
                    lastDonation: '2024-01-15'
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    bloodGroup: 'A+',
                    phone: '+8801234567891',
                    location: { latitude: 23.7269, longitude: 90.4125 },
                    locationName: 'United Hospital',
                    available: true,
                    gender: 'female',
                    age: 32,
                    lastDonation: '2023-12-20'
                }
            ];

            let filteredDonors = mockDonors;

            // Apply filters
            if (filters.bloodGroup) {
                filteredDonors = filteredDonors.filter(d => d.bloodGroup === filters.bloodGroup);
            }

            if (filters.availability !== 'all') {
                filteredDonors = filteredDonors.filter(d =>
                    filters.availability === 'available' ? d.available : !d.available
                );
            }

            if (filters.gender !== 'all') {
                filteredDonors = filteredDonors.filter(d => d.gender === filters.gender);
            }

            // Location-based filtering
            if (userLocation && filters.radius) {
                filteredDonors = findNearbyDonors(userLocation, filteredDonors, filters.radius);
            }

            // Search query
            if (debouncedSearch) {
                filteredDonors = filteredDonors.filter(d =>
                    d.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                    d.locationName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                    d.bloodGroup.toLowerCase().includes(debouncedSearch.toLowerCase())
                );
            }

            setDonors(filteredDonors);
            onResults(filteredDonors);
        } catch (error) {
            showError('Error searching for donors');
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            bloodGroup: '',
            location: '',
            radius: 10,
            availability: 'all',
            urgency: 'normal',
            gender: 'all',
            ageRange: 'all',
            lastDonation: 'all'
        });
        setSearchQuery('');
    };

    const activeFilterCount = useMemo(() => {
        return Object.values(filters).filter(v => v && v !== 'all' && v !== 10).length;
    }, [filters]);

    return (
        <Card className="mb-6">
            <div className="space-y-4">
                {/* Main Search Bar */}
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search by name, location, or blood type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                        />
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                        className="relative"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                        Filters
                        {activeFilterCount > 0 && (
                            <span className="ml-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </Button>

                    <Button
                        onClick={getUserLocation}
                        variant="ghost"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                        }
                    >
                        {userLocation ? 'Update Location' : 'Get Location'}
                    </Button>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                    {isAdvancedOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-gray-200 pt-4"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Blood Group */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Blood Group
                                    </label>
                                    <select
                                        value={filters.bloodGroup}
                                        onChange={(e) => handleFilterChange('bloodGroup', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="">All Blood Groups</option>
                                        {bloodGroups.map(group => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Radius */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Search Radius: {filters.radius}km
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={filters.radius}
                                        onChange={(e) => handleFilterChange('radius', parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                {/* Availability */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Availability
                                    </label>
                                    <select
                                        value={filters.availability}
                                        onChange={(e) => handleFilterChange('availability', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="all">All</option>
                                        <option value="available">Available Now</option>
                                        <option value="unavailable">Not Available</option>
                                    </select>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender
                                    </label>
                                    <select
                                        value={filters.gender}
                                        onChange={(e) => handleFilterChange('gender', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="all">All</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>

                                {/* Urgency */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Urgency Level
                                    </label>
                                    <select
                                        value={filters.urgency}
                                        onChange={(e) => handleFilterChange('urgency', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="normal">Normal</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="emergency">Emergency</option>
                                    </select>
                                </div>

                                {/* Last Donation */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Donation
                                    </label>
                                    <select
                                        value={filters.lastDonation}
                                        onChange={(e) => handleFilterChange('lastDonation', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="all">Any Time</option>
                                        <option value="recent">Last 3 months</option>
                                        <option value="eligible">Eligible (3+ months ago)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                                <Button variant="ghost" onClick={clearFilters}>
                                    Clear All
                                </Button>
                                <Button onClick={() => setIsAdvancedOpen(false)}>
                                    Apply Filters
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Search Status */}
                {isSearching && (
                    <div className="flex items-center space-x-2 text-primary-600">
                        <LoadingSkeleton width="w-4" height="h-4" className="rounded-full" />
                        <span className="text-sm">Searching for donors...</span>
                    </div>
                )}

                {/* Results Summary */}
                {!isSearching && donors.length > 0 && (
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Found {donors.length} donor{donors.length !== 1 ? 's' : ''}</span>
                        {userLocation && (
                            <span>Within {filters.radius}km of your location</span>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default AdvancedDonorSearch;
