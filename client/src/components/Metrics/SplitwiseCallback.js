import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SplitwiseCallback = () => {
  const location = useLocation();

  useEffect(() => {
    // Parse query parameters from the URL
    const params = new URLSearchParams(location.search);
    const oauthToken = params.get('oauth_token');
    const oauthVerifier = params.get('oauth_verifier');

    // Do something with oauthToken and oauthVerifier
    console.log('oauth_token:', oauthToken);
    console.log('oauth_verifier:', oauthVerifier);

    // Perform any additional actions (e.g., save tokens, authenticate user)
  }, [location.search]);

  return (
    <div>
      <p>Handling Splitwise callback...</p>
    </div>
  );
};
