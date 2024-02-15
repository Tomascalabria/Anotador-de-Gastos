// SplitwiseAuth.js
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../Context/AuthContext';
import { Button } from '@chakra-ui/react';

export const SplitwiseAuth = () => {
  const user = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [isInitiating, setIsInitiating] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const authorizationCode = params.get('oauth_token');

    if (authorizationCode) {
      exchangeAuthorizationCode(authorizationCode);
    }
  }, [location.search]);

  const exchangeAuthorizationCode = async (code) => {
    setIsInitiating(true);

    const clientId = process.env.REACT_APP_CONSUMER_KEY;
    const clientSecret = process.env.REACT_APP_CONSUMER_SECRET;
    const redirectUri = encodeURIComponent('http://localhost:3000/splitwise');
    const SPLITWISE_API_URL= 'https://secure.splitwise.com/'
    
    try {
      const response = await fetch(`${SPLITWISE_API_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
      });

      const data = await response.json();

      // Handle the obtained access token, e.g., store it in your state or context
      console.log('Access Token:', data.access_token);
      console.log('Refresh Token:', data.refresh_token);

      // Redirect to a different route or perform other actions as needed
      navigate('/dashboard'); // Use navigate to redirect
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error);
      // Handle the error as needed
    } finally {
      setIsInitiating(false);
    }
  };

  const initiateSplitwiseAuthentication = () => {
    setIsInitiating(true);
    const SPLITWISE_API_URL= 'https://secure.splitwise.com'
    const clientId = process.env.REACT_APP_CONSUMER_KEY;
    const redirectUri = encodeURIComponent('http://localhost:3000/splitwise');

    const authUrl = `${SPLITWISE_API_URL}/oauth/authorize?client_id=${clientId}&scope=&redirect_uri=${redirectUri}`;
    
    window.location.href = authUrl;
  };

  return (
    <div>
      {isInitiating ? (
        <p>Loading...</p>
      ) : (
        <Button color={'white'} onClick={initiateSplitwiseAuthentication}>
          Splitwise Authentication
        </Button>
      )}
    </div>
  );
};
