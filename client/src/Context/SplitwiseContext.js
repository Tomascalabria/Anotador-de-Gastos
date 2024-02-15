import React, { createContext, useContext, useEffect, useState } from 'react';

const SplitwiseContext = createContext();

export const SplitwiseProvider = ({ children }) => {
  const [splitwiseData, setSplitwiseData] = useState(null);

  // Add any additional state or functions needed for your Splitwise integration

  useEffect(() => {
    // Fetch Splitwise data or perform any initialization here
    // You can use the SplitwiseProvider logic here

    // For example, fetching the current user's data
    // const fetchData = async () => {
    //   const response = await fetch(`${SPLITWISE_API_URL}/api/v3.0/get_current_user`, {
    //     headers: {
    //       Authorization: `Bearer ${splitwiseData.tokens.access_token}`,
    //     },
    //   });
    //   const userData = await response.json();
    //   setSplitwiseData((prevData) => ({ ...prevData, user: userData }));
    // };

    // fetchData();
  }, []);

  const contextValue = {
    splitwiseData,
    // Add any functions or state that you want to expose to components
  };

  return (
    <SplitwiseContext.Provider value={contextValue}>{children}</SplitwiseContext.Provider>
  );
};

export const useSplitwise = () => {
  const context = useContext(SplitwiseContext);
  if (!context) {
    throw new Error('useSplitwise must be used within a SplitwiseProvider');
  }
  return context;
};
