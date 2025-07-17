import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color = 'red', type = 'donor') => {
    const iconHtml = type === 'donor'
        ? `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">🩸</div>`
        : `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">📍</div>`;

    return L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
};

// Component to fit map bounds to markers
const FitBounds = ({ markers }) => {
    const map = useMap();

    useEffect(() => {
        if (markers && markers.length > 0) {
            const group = new L.featureGroup(
                markers.map(marker => L.marker([marker.position.lat, marker.position.lng]))
            );
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }, [map, markers]);

    return null;
};

const DonorMap = ({
    donors = [],
    userLocation = null,
    center = [23.8103, 90.4125], // Dhaka, Bangladesh
    zoom = 10,
    height = '400px',
    onDonorClick = null,
    showUserLocation = true
}) => {
    const [mapReady, setMapReady] = useState(false);

    const markers = [
        // User location marker
        ...(userLocation && showUserLocation ? [{
            id: 'user-location',
            position: { lat: userLocation.latitude, lng: userLocation.longitude },
            type: 'user',
            popup: (
                <div className="text-center">
                    <strong>Your Location</strong>
                    <br />
                    <span className="text-sm text-gray-600">Current Position</span>
                </div>
            )
        }] : []),
        // Donor markers
        ...donors.map(donor => ({
            id: donor.id,
            position: {
                lat: donor.location?.latitude || 0,
                lng: donor.location?.longitude || 0
            },
            type: 'donor',
            data: donor,
            popup: (
                <div className="min-w-48">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="text-2xl">🩸</div>
                        <div>
                            <h3 className="font-semibold text-gray-900">{donor.name}</h3>
                            <p className="text-sm text-gray-600">Blood Type: {donor.bloodGroup}</p>
                        </div>
                    </div>

                    <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Phone:</span> {donor.phone}</p>
                        <p><span className="font-medium">Location:</span> {donor.locationName || 'Not specified'}</p>
                        {donor.distance && (
                            <p><span className="font-medium">Distance:</span> {donor.distance} km away</p>
                        )}
                        <p><span className="font-medium">Available:</span>
                            <span className={`ml-1 px-2 py-1 rounded-full text-xs ${donor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {donor.available ? 'Yes' : 'No'}
                            </span>
                        </p>
                    </div>

                    {onDonorClick && (
                        <button
                            onClick={() => onDonorClick(donor)}
                            className="mt-3 w-full bg-primary-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-primary-700 transition-colors"
                        >
                            Contact Donor
                        </button>
                    )}
                </div>
            )
        }))
    ];

    const mapCenter = userLocation
        ? [userLocation.latitude, userLocation.longitude]
        : center;

    return (
        <div className="relative" style={{ height }}>
            <MapContainer
                center={mapCenter}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
                whenReady={() => setMapReady(true)}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={[marker.position.lat, marker.position.lng]}
                        icon={createCustomIcon(
                            marker.type === 'user' ? '#3b82f6' : '#dc2626',
                            marker.type
                        )}
                    >
                        <Popup>{marker.popup}</Popup>
                    </Marker>
                ))}

                {mapReady && <FitBounds markers={markers} />}
            </MapContainer>

            {/* Map controls */}
            <div className="absolute top-4 right-4 z-10 space-y-2">
                <button
                    onClick={() => {
                        // Implement zoom to user location
                        if (userLocation && window.map) {
                            window.map.setView([userLocation.latitude, userLocation.longitude], 15);
                        }
                    }}
                    className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-lg shadow-md border border-gray-200 transition-colors"
                    title="My Location"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-10 bg-white p-3 rounded-lg shadow-md border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Legend</h4>
                <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">🩸</div>
                        <span>Available Donors</span>
                    </div>
                    {showUserLocation && userLocation && (
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">📍</div>
                            <span>Your Location</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonorMap;
