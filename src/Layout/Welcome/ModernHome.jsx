import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

const ModernHome = () => {
    const [stats, setStats] = useState({
        totalDonors: 1247,
        bloodDonated: 3891,
        livesImpacted: 15673,
        activeCampaigns: 23
    });
    const [isVisible, setIsVisible] = useState(false);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const heroVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        {
            icon: '🔍',
            title: 'Find Donors Instantly',
            description: 'Search for blood donors near you with our advanced location-based matching system.',
            action: 'Search Now',
            link: '/search-donors'
        },
        {
            icon: '🚨',
            title: 'Emergency Requests',
            description: 'Submit urgent blood requests and get immediate alerts to nearby donors.',
            action: 'Emergency Request',
            link: '/blood-request'
        },
        {
            icon: '🗺️',
            title: 'Interactive Map',
            description: 'View donors and blood banks on an interactive map for better coordination.',
            action: 'View Map',
            link: '/map'
        },
        {
            icon: '📱',
            title: 'Real-time Notifications',
            description: 'Get instant notifications for blood requests and donation opportunities.',
            action: 'Enable Alerts',
            link: '/notifications'
        }
    ];

    const testimonials = [
        {
            name: 'Dr. Sarah Ahmed',
            role: 'Emergency Medicine',
            content: 'BloodLine helped us find donors within minutes for a critical emergency. Life-saving technology!',
            avatar: '👩‍⚕️'
        },
        {
            name: 'Mohammad Rahman',
            role: 'Regular Donor',
            content: 'The app makes donating blood so convenient. I get notified when someone nearby needs help.',
            avatar: '🧑‍💼'
        },
        {
            name: 'Fatima Khan',
            role: 'Patient Family',
            content: 'When my father needed blood urgently, BloodLine connected us with donors in our area instantly.',
            avatar: '👩‍👧‍👦'
        }
    ];

    const bloodTypes = [
        { type: 'O-', label: 'Universal Donor', color: 'bg-red-500' },
        { type: 'AB+', label: 'Universal Recipient', color: 'bg-blue-500' },
        { type: 'A+', label: 'Most Common', color: 'bg-green-500' },
        { type: 'B+', label: 'High Demand', color: 'bg-purple-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Hero Content */}
                        <motion.div
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            variants={heroVariants}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                                >
                                    🩸 Save Lives Today
                                </motion.div>

                                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                    Connect{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
                                        Donors
                                    </span>{' '}
                                    with{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
                                        Lives
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Join Bangladesh's largest blood donation network. Find donors instantly,
                                    make emergency requests, and help save lives in your community.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="xl"
                                    onClick={() => navigate(isAuthenticated ? '/blood-request' : '/register')}
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                                >
                                    🚨 Request Blood Now
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    onClick={() => navigate('/search-donors')}
                                >
                                    🔍 Find Donors
                                </Button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                                {Object.entries(stats).map(([key, value], index) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-2xl md:text-3xl font-bold text-red-600">
                                            {value.toLocaleString()}+
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Blood Donation"
                                    className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent rounded-2xl"></div>
                            </div>

                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
                            >
                                <div className="text-2xl">🩸</div>
                                <div className="text-sm font-medium">Live Donors</div>
                                <div className="text-lg font-bold text-green-600">Online</div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
                            >
                                <div className="text-2xl">❤️</div>
                                <div className="text-sm font-medium">Lives Saved</div>
                                <div className="text-lg font-bold text-red-600">Today</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose BloodLine?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Our platform combines modern technology with humanitarian values to create
                            the most efficient blood donation network in Bangladesh.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                transition={{ delay: index * 0.1 }}
                                variants={cardVariants}
                                viewport={{ once: true }}
                            >
                                <Card hover className="h-full text-center group">
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        {feature.description}
                                    </p>
                                    <Button
                                        as={Link}
                                        to={feature.link}
                                        variant="outline"
                                        size="sm"
                                        className="group-hover:bg-red-600 group-hover:text-white transition-all duration-200"
                                    >
                                        {feature.action}
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blood Types Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Blood Type Compatibility
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Understanding blood type compatibility saves lives
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {bloodTypes.map((blood, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className={`w-20 h-20 ${blood.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg`}>
                                    {blood.type}
                                </div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{blood.label}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            What Our Community Says
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Real stories from real people whose lives have been touched by BloodLine
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full">
                                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                                        "{testimonial.content}"
                                    </p>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Ready to Save Lives?
                        </h2>
                        <p className="text-xl text-red-100">
                            Join thousands of donors who are making a difference in their communities.
                            Your donation can save up to three lives.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="xl"
                                variant="outline"
                                className="bg-white text-red-600 border-white hover:bg-red-50"
                                onClick={() => navigate('/register')}
                            >
                                🩸 Become a Donor
                            </Button>
                            <Button
                                size="xl"
                                className="bg-red-800 hover:bg-red-900 text-white"
                                onClick={() => navigate('/blood-request')}
                            >
                                📱 Request Blood
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ModernHome;
