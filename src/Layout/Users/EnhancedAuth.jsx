import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../Component/firebaseConfig';
import { ClipLoader } from 'react-spinners';
import { Container, Paper, Typography } from '@mui/material';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Auth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthenticated(!!currentUser);
            setIsInitializing(false);
        });

        return () => unsubscribe();
    }, []);

    if (isInitializing) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Container maxWidth="sm">
                    <Paper className="p-8 text-center shadow-lg">
                        <ClipLoader
                            color="#dc2626"
                            loading={true}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <Typography variant="h6" className="mt-4 text-gray-600">
                            Checking authentication...
                        </Typography>
                    </Paper>
                </Container>
            </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Auth;
