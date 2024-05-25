import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { AuthContext } from '../users/Auth'; 
import { auth } from '../../utils/firebase';

const Home = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        // Redirect if user is not logged in
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            // Sign-out successful, redirect to login page
            navigate('/login');
        }).catch((error) => {
            // Handle errors here if necessary
            console.error('Error signing out:', error);
        });
    };

    return (
        <div>
            <div>
                <h1>Welcome</h1>
                <p>This is Dashboard. If you can see this, you are logged in.</p>
                <Button onClick={handleLogout} color='danger'>Log Out</Button>
            </div>
        </div>
    );
};

export default Home;
