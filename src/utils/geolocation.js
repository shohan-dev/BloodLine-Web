// Geolocation utilities
export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                });
            },
            (error) => {
                let errorMessage = 'Unknown error occurred.';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'User denied the request for Geolocation.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'The request to get user location timed out.';
                        break;
                    default:
                        errorMessage = 'Unknown geolocation error occurred.';
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000, // 5 minutes
            }
        );
    });
};

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

// Find nearby donors within a specified radius
export const findNearbyDonors = (userLocation, donors, radiusKm = 10) => {
    return donors
        .map(donor => {
            if (!donor.location || !donor.location.latitude || !donor.location.longitude) {
                return null;
            }

            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                donor.location.latitude,
                donor.location.longitude
            );

            return {
                ...donor,
                distance,
            };
        })
        .filter(donor => donor && donor.distance <= radiusKm)
        .sort((a, b) => a.distance - b.distance);
};

// Reverse geocoding to get address from coordinates
export const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch address');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return data.results[0].formatted;
        }

        return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
        console.error('Error getting address:', error);
        return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
};

// Get coordinates from address
export const getCoordinatesFromAddress = async (address) => {
    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch coordinates');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            return {
                latitude: result.geometry.lat,
                longitude: result.geometry.lng,
                formatted: result.formatted,
            };
        }

        throw new Error('Address not found');
    } catch (error) {
        console.error('Error getting coordinates:', error);
        throw error;
    }
};
